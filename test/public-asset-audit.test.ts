// Exercises the asset audit against temporary projects and its real read-only CLI.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { afterEach, expect, it, vi } from 'vitest';
import { auditPublicAssets, formatAssetReport, runAssetAudit } from '../scripts/lib/public-asset-audit.mjs';
const roots: string[] = [];
const cli = path.resolve('scripts/audit-public-assets.mjs');
function project() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'puckbuddy-assets-')); roots.push(root);
  for (const folder of ['public', 'src', 'scripts']) fs.mkdirSync(path.join(root, folder));
  return root;
}
function write(root: string, name: string, text = 'fixture') {
  fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true }); fs.writeFileSync(path.join(root, name), text);
}
function run(root: string, ...args: string[]) { return spawnSync(process.execPath, [cli, ...args], { cwd: root, encoding: 'utf8' }); }
afterEach(() => { vi.restoreAllMocks(); for (const root of roots.splice(0)) fs.rmSync(root, { recursive: true, force: true }); });
it('inventories nested images and videos while preserving their public-relative names', () => {
  const root = project();
  for (const asset of ['logo.svg', 'screenshots/phone.png', 'intro clip.mp4', 'crest#1.png', 'orphan.webp']) write(root, `public/${asset}`);
  write(root, 'public/robots.txt'); write(root, 'src/page.tsx', '"/logo.svg"; "/screenshots/phone.png"; "/intro%20clip.mp4"; "/crest%231.png";');
  const result = run(root, '--json'); expect(result.status).toBe(0);
  const report = JSON.parse(result.stdout);
  expect(report.publicCount).toBe(5); expect(report.used).toEqual(['crest#1.png', 'intro clip.mp4', 'logo.svg', 'screenshots/phone.png']);
  expect(report.unused).toEqual(['orphan.webp']); expect(report.references['screenshots/phone.png']).toEqual(['src/page.tsx']);
  expect(fs.readFileSync(path.join(root, 'public/orphan.webp'), 'utf8')).toBe('fixture');
});
it.each(['runtime', 'scripts'])('reads only the selected %s tree', scope => {
  const root = project(); write(root, 'public/logo.svg');
  const selected = scope === 'runtime' ? 'src' : 'scripts'; const excluded = scope === 'runtime' ? 'scripts' : 'src';
  write(root, `${selected}/page.ts`, '"logo.svg"'); fs.rmSync(path.join(root, excluded), { recursive: true });
  const result = run(root, `--scope=${scope}`, '--json'); expect(result.status).toBe(0);
  expect(JSON.parse(result.stdout).references['logo.svg']).toEqual([`${selected}/page.ts`]);
});
it('returns exit one for unused assets without changing or deleting files', () => {
  const root = project(); write(root, 'public/unused.png');
  const result = run(root, '--fail-on-unused', '--json'); expect(result.status).toBe(1);
  expect(JSON.parse(result.stdout).unused).toEqual(['unused.png']); expect(fs.readFileSync(path.join(root, 'public/unused.png'), 'utf8')).toBe('fixture');
});
it('rejects invalid scopes with a diagnostic', () => {
  const root = project(); const result = run(root, '--scope=unknown'); expect(result.status).toBe(2); expect(result.stderr).toContain('Invalid --scope');
});
it('rejects missing public input without emitting a success report', () => {
  const root = project(); fs.rmSync(path.join(root, 'public'), { recursive: true });
  const result = run(root, '--json'); expect(result.status).toBe(2); expect(result.stdout).toBe(''); expect(result.stderr).toContain('public/');
  const stdout = vi.fn(), stderr = vi.fn(); expect(runAssetAudit(['--json'], root, stdout, stderr)).toBe(2);
  expect(stdout).not.toHaveBeenCalled(); expect(stderr.mock.calls[0][0]).toContain('public/');
});

it('collects selected text inputs, excludes generated trees and reports stable paths', () => {
  const root = project();
  for (const asset of ['logo.svg', 'nested/poster.JPG', 'movie.webm', 'unreferenced.heic']) write(root, `public/${asset}`);
  write(root, 'src/page.tsx', 'logo.svg'); write(root, 'src/style.css', 'logo.svg');
  write(root, 'scripts/render.mjs', 'nested/poster.JPG'); write(root, 'package.json', 'movie.webm');
  write(root, 'README.md', 'logo.svg'); write(root, 'next.config.ts', 'logo.svg');
  for (const folder of ['node_modules', '.next', '.git']) write(root, `src/${folder}/ignored.ts`, 'unreferenced.heic');
  write(root, 'src/notes.txt', 'unreferenced.heic'); write(root, 'src/empty.ts', '');
  write(root, 'public/directory.png/notes.txt');
  const report = auditPublicAssets(root);
  expect(report.publicCount).toBe(4); expect(report.unused).toEqual(['unreferenced.heic']);
  expect(report.references['logo.svg']).toEqual(['README.md', 'next.config.ts', 'src/page.tsx', 'src/style.css']);
  expect(formatAssetReport(report)).toContain('  - README.md'); expect(formatAssetReport(report)).not.toContain('more)');
  expect(auditPublicAssets(root, 'runtime').used).toEqual(['logo.svg']);
  expect(auditPublicAssets(root, 'scripts').used).toEqual(['logo.svg', 'movie.webm', 'nested/poster.JPG']);
});
it('does not follow symlinks to media or reference text outside its inventory', () => {
  const root = project(); write(root, 'public/logo.svg'); write(root, 'external.ts', 'logo.svg');
  fs.symlinkSync(path.join(root, 'external.ts'), path.join(root, 'src/linked.ts'));
  fs.symlinkSync(path.join(root, 'public/logo.svg'), path.join(root, 'public/linked.svg'));
  const report = auditPublicAssets(root); expect(report.publicCount).toBe(1); expect(report.unused).toEqual(['logo.svg']);
});
it('fails closed on unreadable text instead of marking its assets unused', () => {
  const root = project(); write(root, 'public/logo.svg'); write(root, 'src/private.ts', 'logo.svg');
  const read = fs.readFileSync;
  vi.spyOn(fs, 'readFileSync').mockImplementation(((file: fs.PathOrFileDescriptor, ...args: unknown[]) => {
    if (String(file).endsWith('/private.ts')) throw new Error('Access denied');
    return Reflect.apply(read, fs, [file, ...args]);
  }) as typeof fs.readFileSync);
  const stdout = vi.fn(), stderr = vi.fn();
  expect(runAssetAudit(['--json'], root, stdout, stderr)).toBe(2);
  expect(stdout).not.toHaveBeenCalled(); expect(stderr).toHaveBeenCalledWith('Cannot read audit input: src/private.ts\n');
});
it('formats unused entries and limits long reference lists without losing the full JSON inventory', () => {
  const root = project(); write(root, 'public/logo.svg'); write(root, 'public/orphan.png');
  for (let i = 0; i < 7; i++) write(root, `src/page${i}.ts`, 'logo.svg');
  const report = auditPublicAssets(root); const text = formatAssetReport(report);
  expect(text).toContain('UNUSED ASSETS:\n- orphan.png'); expect(text).toContain('  - ... (2 more)');
  expect(text).toContain('src/page4.ts'); expect(text).not.toContain('src/page5.ts'); expect(report.references['logo.svg']).toHaveLength(7);
  const stdout = vi.fn(), stderr = vi.fn(); expect(runAssetAudit([], root, stdout, stderr)).toBe(0);
  expect(stdout).toHaveBeenCalledWith(text); expect(stderr).not.toHaveBeenCalled();
});
it('prints an empty inventory without claiming unused assets', () => {
  const root = project(); const stdout = vi.fn();
  expect(runAssetAudit(['--fail-on-unused'], root, stdout, vi.fn())).toBe(0);
  expect(stdout.mock.calls[0][0]).toContain('public assets: 0'); expect(stdout.mock.calls[0][0]).not.toContain('UNUSED ASSETS:');
});
it.each([['--scope=bad'], ['--scope=runtime', '--scope=scripts'], ['--typo']])('rejects ambiguous or unknown CLI options %s', (...args) => {
  const root = project(), stdout = vi.fn(), stderr = vi.fn();
  expect(runAssetAudit(args, root, stdout, stderr)).toBe(2); expect(stdout).not.toHaveBeenCalled(); expect(stderr).toHaveBeenCalledOnce();
});
it('fails when a selected source tree is missing', () => {
  const root = project(); fs.rmSync(path.join(root, 'src'), { recursive: true });
  expect(runAssetAudit(['--scope=runtime'], root, vi.fn(), vi.fn())).toBe(2);
});
it('reports unexpected filesystem failures without printing a success report', () => {
  const root = project(); vi.spyOn(fs, 'readdirSync').mockImplementation(() => { throw 'filesystem interrupted'; });
  const stdout = vi.fn(), stderr = vi.fn(); expect(runAssetAudit([], root, stdout, stderr)).toBe(2);
  expect(stdout).not.toHaveBeenCalled(); expect(stderr).toHaveBeenCalledWith('filesystem interrupted\n');
});
it('emits complete machine-readable JSON before returning the unused status', () => {
  const root = project(); write(root, 'public/orphan.png'); const stdout = vi.fn();
  expect(runAssetAudit(['--json', '--fail-on-unused'], root, stdout, vi.fn())).toBe(1);
  expect(JSON.parse(stdout.mock.calls[0][0])).toMatchObject({ unused: ['orphan.png'], usedCount: 0, unusedCount: 1 });
});
