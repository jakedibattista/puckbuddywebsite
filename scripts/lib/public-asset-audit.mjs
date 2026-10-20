// Inventories regular public image/video files and their conservative literal references.
// Collection, report formatting and CLI policy stay separate; no operation writes or removes assets.
import fs from 'node:fs';
import path from 'node:path';

const TEXT_FILE = /\.(ts|tsx|js|jsx|mjs|cjs|md|css|json)$/i;
const MEDIA_FILE = /\.(png|jpg|jpeg|webp|gif|svg|heic|mp4|webm|mov|m4v)$/i;
const IGNORED_DIRECTORIES = new Set(['node_modules', '.next', '.git']);

/** @param {string} directory @returns {string[]} */
function walkFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return IGNORED_DIRECTORIES.has(entry.name) ? [] : walkFiles(file);
    return entry.isFile() ? [file] : [];
  });
}

/** @param {string} root @param {string} file */
function relativeName(root, file) {
  return path.relative(root, file).split(path.sep).join('/');
}

/** @param {string} root @param {string} scope */
function referenceInputs(root, scope) {
  const files = [];
  if (scope !== 'scripts') files.push(...walkFiles(path.join(root, 'src')), path.join(root, 'next.config.ts'));
  if (scope !== 'runtime') files.push(...walkFiles(path.join(root, 'scripts')), path.join(root, 'package.json'), path.join(root, 'README.md'));
  return files.filter(file => fs.existsSync(file) && TEXT_FILE.test(file)).sort();
}

/** @param {string} root @param {string} scope */
export function auditPublicAssets(root, scope = 'all') {
  if (!['all', 'runtime', 'scripts'].includes(scope)) throw new Error('Invalid --scope. Use one of: all, runtime, scripts');
  const publicDir = path.join(root, 'public');
  if (!fs.existsSync(publicDir)) throw new Error(`public/ not found at: ${publicDir}`);
  const assets = walkFiles(publicDir).filter(file => MEDIA_FILE.test(file)).map(file => relativeName(publicDir, file)).sort();
  /** @type {Record<string, string[]>} */
  const references = Object.fromEntries(assets.map(asset => [asset, []]));
  for (const file of referenceInputs(root, scope)) {
    let text;
    try { text = fs.readFileSync(file, 'utf8'); }
    catch { throw new Error(`Cannot read audit input: ${relativeName(root, file)}`); }
    for (const asset of assets) {
      // Keep conservative filename matching; encoded URLs also count as references.
      if (text.includes(asset) || text.includes(asset.split('/').map(encodeURIComponent).join('/'))) references[asset].push(relativeName(root, file));
    }
  }
  const used = assets.filter(asset => references[asset].length > 0);
  const unused = assets.filter(asset => references[asset].length === 0);
  return { scope, publicCount: assets.length, usedCount: used.length, unusedCount: unused.length, used, unused, references };
}

/** @param {ReturnType<typeof auditPublicAssets>} report */
export function formatAssetReport(report) {
  const lines = [`scope:        ${report.scope}`, `public assets: ${report.publicCount}`, `used:         ${report.usedCount}`, `unused:       ${report.unusedCount}`];
  if (report.unused.length) lines.push('\nUNUSED ASSETS:', ...report.unused.map(asset => `- ${asset}`));
  lines.push('\nTOP REFERENCES (first 5 per asset):');
  for (const asset of report.used) {
    const refs = report.references[asset];
    lines.push(`- ${asset}`, ...refs.slice(0, 5).map(file => `  - ${file}`));
    if (refs.length > 5) lines.push(`  - ... (${refs.length - 5} more)`);
  }
  return lines.join('\n') + '\n';
}

/** @param {string[]} argv @param {string} root @param {(text: string) => void} stdout @param {(text: string) => void} stderr */
export function runAssetAudit(argv, root, stdout, stderr) {
  try {
    const scopeArgs = argv.filter(arg => arg.startsWith('--scope='));
    if (scopeArgs.length > 1) throw new Error('Invalid --scope: specify one scope.');
    const unknown = argv.find(arg => !['--json', '--fail-on-unused'].includes(arg) && !arg.startsWith('--scope='));
    if (unknown) throw new Error(`Unknown asset-audit option: ${unknown}`);
    const report = auditPublicAssets(root, scopeArgs[0]?.slice('--scope='.length) ?? 'all');
    stdout(argv.includes('--json') ? JSON.stringify(report, null, 2) + '\n' : formatAssetReport(report));
    return argv.includes('--fail-on-unused') && report.unusedCount > 0 ? 1 : 0;
  } catch (error) {
    stderr(`${error instanceof Error ? error.message : String(error)}\n`);
    return 2;
  }
}
