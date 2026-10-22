// Exercises walkthrough preflight, staged publication and failure cleanup against disposable files.
// Fake renderers never read owner recordings; existing outputs and every source byte must survive failed renders.
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { computePhoneLayout } from '../scripts/lib/walkthrough-render.mjs';
import { buildWalkthrough, RECORDINGS } from '../scripts/lib/walkthrough-build.mjs';
let parent: string, root: string, media: string;
const renderer = () => ({
  computePhoneLayout: vi.fn(computePhoneLayout),
  buildSlideTemplate: vi.fn(async () => undefined),
  renderSlide: vi.fn(async (_input: string, output: string) => { await fs.writeFile(output, 'new clip'); }),
  validateVideo: vi.fn(async () => undefined),
  concatSlides: vi.fn(async (_slides: string[], output: string) => { await fs.writeFile(output, 'new full'); }),
});
beforeEach(async () => {
  parent = await fs.mkdtemp(path.join(os.tmpdir(), "walkthrough '$()-")); root = path.join(parent, 'website');
  media = path.join(parent, 'videos', 'v2-walkthrough'); await fs.mkdir(root);
  await fs.mkdir(path.join(media, 'slides'), { recursive: true });
  for (const [index, name] of RECORDINGS.entries()) await fs.writeFile(path.join(parent, name), `original ${index}`);
  await fs.writeFile(path.join(media, 'slides', '01-walkthrough.mp4'), 'old clip');
  await fs.writeFile(path.join(media, 'v2-walkthrough-full.mp4'), 'old full');
});
afterEach(async () => { vi.restoreAllMocks(); await fs.rm(parent, { recursive: true, force: true }); });
async function preserved() {
  expect(await fs.readFile(path.join(media, 'slides', '01-walkthrough.mp4'), 'utf8')).toBe('old clip');
  expect(await fs.readFile(path.join(media, 'v2-walkthrough-full.mp4'), 'utf8')).toBe('old full');
  for (const [index, name] of RECORDINGS.entries()) expect(await fs.readFile(path.join(parent, name), 'utf8')).toBe(`original ${index}`);
  expect((await fs.readdir(media)).filter(name => name.startsWith('.build-'))).toEqual([]);
}
it('validates all six slides and the concatenation before publishing, without moving sources', async () => {
  const run = renderer(); run.validateVideo.mockImplementation(async () => {
    expect(await fs.readFile(path.join(media, 'slides', '01-walkthrough.mp4'), 'utf8')).toBe('old clip');
    expect(await fs.readFile(path.join(media, 'v2-walkthrough-full.mp4'), 'utf8')).toBe('old full');
  });
  const outputs = await buildWalkthrough({ root, renderer: run });
  expect(outputs).toEqual([...Array.from({ length: 6 }, (_, i) => path.join(media, 'slides', `0${i + 1}-walkthrough.mp4`)), path.join(media, 'v2-walkthrough-full.mp4')]);
  expect(run.validateVideo).toHaveBeenCalledTimes(7); expect(run.renderSlide).toHaveBeenCalledTimes(6);
  expect(run.concatSlides.mock.calls[0][0]).toEqual(run.renderSlide.mock.calls.map(call => call[1]));
  for (const [index, name] of RECORDINGS.entries()) {
    expect(run.renderSlide.mock.calls[index][0]).toBe(path.join(parent, name));
    expect(await fs.readFile(path.join(parent, name), 'utf8')).toBe(`original ${index}`);
  }
  for (const file of outputs) expect(await fs.readFile(file, 'utf8')).toBe(file.includes('/slides/') ? 'new clip' : 'new full');
  expect((await fs.readdir(media)).filter(name => name.startsWith('.build-'))).toEqual([]);
});
it('uses already organized source recordings without changing their bytes', async () => {
  await fs.mkdir(path.join(media, 'source'));
  for (const name of RECORDINGS) await fs.rename(path.join(parent, name), path.join(media, 'source', name));
  const run = renderer(); await buildWalkthrough({ root, renderer: run });
  for (const [index, name] of RECORDINGS.entries()) {
    expect(run.renderSlide.mock.calls[index][0]).toBe(path.join(media, 'source', name));
    expect(await fs.readFile(path.join(media, 'source', name), 'utf8')).toBe(`original ${index}`);
  }
});
it.each(['missing', 'ambiguous', 'directory', 'denied'])('rejects %s inputs before rendering or publication', async problem => {
  const last = path.join(parent, RECORDINGS.at(-1)!); const run = renderer();
  if (problem === 'missing' || problem === 'directory') await fs.rm(last);
  if (problem === 'directory') await fs.mkdir(last);
  if (problem === 'ambiguous') { await fs.mkdir(path.join(media, 'source')); await fs.writeFile(path.join(media, 'source', RECORDINGS[0]), 'different original'); }
  if (problem === 'denied') vi.spyOn(fs, 'access').mockRejectedValueOnce(Object.assign(Error('input denied'), { code: 'EACCES' }));
  const outcome = await buildWalkthrough({ root, renderer: run }).catch((error: Error) => error);
  expect(outcome).toBeInstanceOf(Error); expect((outcome as Error).message).toMatch(/Missing recording|Ambiguous recording|not a file|input denied/);
  expect(run.computePhoneLayout).not.toHaveBeenCalled();
  expect(await fs.readFile(path.join(media, 'slides', '01-walkthrough.mp4'), 'utf8')).toBe('old clip');
  expect((await fs.readdir(media)).filter(name => name.startsWith('.build-'))).toEqual([]);
});
it.each(['template', 'slide', 'slide validation', 'concat', 'full validation'])('preserves inputs and existing outputs after %s failure', async phase => {
  const run = renderer(); const fail = Error(`failed ${phase}`);
  if (phase === 'template') run.buildSlideTemplate.mockRejectedValueOnce(fail);
  if (phase === 'slide') run.renderSlide.mockRejectedValueOnce(fail);
  if (phase === 'slide validation') run.validateVideo.mockRejectedValueOnce(fail);
  if (phase === 'concat') run.concatSlides.mockRejectedValueOnce(fail);
  if (phase === 'full validation') run.validateVideo.mockImplementation(async () => { if (run.validateVideo.mock.calls.length === 7) throw fail; });
  expect(await buildWalkthrough({ root, renderer: run }).catch((error: Error) => error)).toBe(fail); await preserved();
});
it('reports publication failure even if earlier individual outputs were published', async () => {
  const rename = fs.rename.bind(fs); let count = 0;
  vi.spyOn(fs, 'rename').mockImplementation(async (from, to) => { if (++count === 2) throw Error('publish denied'); await rename(from, to); });
  await expect(buildWalkthrough({ root, renderer: renderer() })).rejects.toThrow('publish denied');
  expect(await fs.readFile(path.join(media, 'slides', '01-walkthrough.mp4'), 'utf8')).toBe('new clip');
  expect(await fs.readFile(path.join(media, 'v2-walkthrough-full.mp4'), 'utf8')).toBe('old full');
  expect((await fs.readdir(media)).filter(name => name.startsWith('.build-'))).toEqual([]);
});
it.each([false, true])('reports cleanup failure, preserving an earlier failure: %s', async earlier => {
  const run = renderer(); if (earlier) run.renderSlide.mockRejectedValueOnce(Error('render failed'));
  vi.spyOn(fs, 'rm').mockRejectedValueOnce(Error('cleanup failed'));
  const error = await buildWalkthrough({ root, renderer: run }).catch((error: Error) => error);
  if (earlier) { expect(error).toBeInstanceOf(AggregateError); expect((error as AggregateError).errors.map(item => item.message)).toEqual(['render failed', 'cleanup failed']); }
  else expect(error).toMatchObject({ message: 'cleanup failed' });
});
