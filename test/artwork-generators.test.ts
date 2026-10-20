// Exercises all artwork entrypoints with fake browser/provider boundaries and no real filesystem writes.
// Missing targets, failed capture and absent output must fail the command and release its browser.
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
const io = vi.hoisted(() => ({ missing: false, captureError: false, persist: true, validPng: true, correctSize: true, pageOk: true, responsePresent: true, imageLoaded: true, imageComplete: true, files: new Map<string, Buffer>(), close: vi.fn(), log: vi.fn(), error: vi.fn() }));
vi.mock('node:fs/promises', () => ({ default: {
  mkdir: vi.fn(async () => undefined), mkdtemp: vi.fn(async () => '/synthetic-staging'), rm: vi.fn(async () => undefined), rename: vi.fn(async (from: string, to: string) => { const bytes = io.files.get(from); if (!bytes) throw new Error('Staged file missing'); io.files.set(to, bytes); io.files.delete(from); }),
  readFile: vi.fn(async (file: string) => { const bytes = io.files.get(file); if (!bytes) throw new Error('Output missing'); return bytes; }),
} }));
vi.mock('puppeteer', () => ({ default: { launch: vi.fn(async () => {
  let route = '', scale = 1;
  return { close: io.close, newPage: vi.fn(async () => ({
    setViewport: vi.fn(async (viewport: { deviceScaleFactor: number }) => { scale = viewport.deviceScaleFactor; }),
    goto: vi.fn(async (url: string) => { route = url; return io.responsePresent ? { ok: () => io.pageOk } : null; }),
    evaluate: vi.fn(async (callback: () => Promise<void>) => callback()), emulateMediaFeatures: vi.fn(async () => undefined),
    $: vi.fn(async () => io.missing ? null : ({ screenshot: vi.fn(async ({ path }: { path: string }) => {
      if (io.captureError) throw new Error('Synthetic screenshot failure');
      const width = route.includes('feature') ? 1024 : route.includes('youtube') ? 2048 : route.includes('play-store') ? 1080 : 1284;
      const height = route.includes('feature') ? 500 : route.includes('youtube') ? 1152 : route.includes('play-store') ? 1920 : 2778;
      const bytes = Buffer.alloc(24); Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]).copy(bytes); bytes.write('IHDR', 12);
      bytes.writeUInt32BE(Math.round(width * scale) + (io.correctSize ? 0 : 1), 16); bytes.writeUInt32BE(Math.round(height * scale), 20);
      if (!io.validPng) bytes.fill(0);
      if (io.persist) io.files.set(path, bytes); return bytes;
    }) })),
  })) };
}) } }));
const entries = [
  () => import('../scripts/generate-app-store-v2.mjs'),
  () => import('../scripts/generate-play-store-screenshots.mjs'),
  () => import('../scripts/generate-play-store-tablets.mjs'),
  () => import('../scripts/generate-play-store-feature.mjs'),
  () => import('../scripts/generate-youtube-banner.mjs'),
];
let previousExitCode: typeof process.exitCode;
beforeEach(() => {
  previousExitCode = process.exitCode; process.exitCode = undefined;
  vi.resetModules(); vi.clearAllMocks(); vi.useFakeTimers(); io.missing = false; io.captureError = false; io.persist = true; io.validPng = true; io.correctSize = true; io.pageOk = true; io.responsePresent = true; io.imageLoaded = true; io.imageComplete = true; io.files.clear();
  Object.defineProperty(document, 'fonts', { configurable: true, value: { ready: Promise.resolve() } });
  vi.spyOn(document, 'images', 'get').mockReturnValue([{ get complete() { return io.imageComplete; }, get naturalWidth() { return io.imageLoaded ? 100 : 0; }, decode: vi.fn(async () => undefined) }] as unknown as HTMLCollectionOf<HTMLImageElement>);
  io.close.mockResolvedValue(undefined); vi.spyOn(console, 'log').mockImplementation(io.log); vi.spyOn(console, 'error').mockImplementation(io.error);
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true })));
});
afterEach(() => { process.exitCode = previousExitCode; vi.useRealTimers(); vi.unstubAllGlobals(); });
async function finish(entry: () => Promise<unknown>) { await entry(); await vi.dynamicImportSettled(); await vi.runAllTimersAsync(); }
it.each(entries)('fails when a required artwork element is absent: %s', async entry => {
  io.missing = true; await finish(entry); expect(process.exitCode).toBe(1); expect(io.close).toHaveBeenCalledOnce();
});
it.each(entries)('closes the browser after capture failure: %s', async entry => {
  io.captureError = true; await finish(entry); expect(process.exitCode).toBe(1); expect(io.close).toHaveBeenCalledOnce();
});
it.each(entries)('does not claim a saved output when capture produces no file: %s', async entry => {
  io.persist = false; await finish(entry); expect(process.exitCode).toBe(1); expect(io.close).toHaveBeenCalledOnce();
});

it.each(entries)('publishes validated outputs after successful capture: %s', async entry => {
  await finish(entry); expect(process.exitCode).toBeUndefined(); expect(io.close).toHaveBeenCalledOnce();
  expect(io.log).toHaveBeenLastCalledWith(expect.stringMatching(/^Artwork capture complete:/));
  expect([...io.files.keys()].every(file => !file.includes('/synthetic-staging/'))).toBe(true);
});
it.each(['invalid-png', 'wrong-size', 'bad-page', 'broken-image'])('rejects %s before publishing a capture', async failure => {
  io.validPng = failure !== 'invalid-png'; io.correctSize = failure !== 'wrong-size'; io.pageOk = failure !== 'bad-page'; io.imageLoaded = failure !== 'broken-image';
  await finish(entries[0]); expect(process.exitCode).toBe(1); expect(io.close).toHaveBeenCalledOnce();
  expect([...io.files.keys()].every(file => file.includes('/synthetic-staging/'))).toBe(true);
});
it('waits for an unfinished image to decode', async () => {
  io.imageComplete = false; await finish(entries[3]); expect(process.exitCode).toBeUndefined();
  expect(document.images[0].decode).toHaveBeenCalledOnce();
});
it('preserves both capture and browser-cleanup failures', async () => {
  io.captureError = true; io.close.mockRejectedValueOnce(Error('close failed')); await finish(entries[0]);
  expect(process.exitCode).toBe(1); const error = io.error.mock.calls[0][0];
  expect(error).toBeInstanceOf(AggregateError); expect(error.errors.map((item: Error) => item.message)).toEqual(['Synthetic screenshot failure', 'close failed']);
});
it('rejects unknown plans before acquiring browser or filesystem resources', async () => {
  const { captureArtwork } = await import('../scripts/lib/artwork-capture.mjs');
  await expect(captureArtwork('unknown' as never)).rejects.toThrow('Unknown artwork plan'); expect(io.close).not.toHaveBeenCalled();
});
it('honors explicit output and project roots without writing to the default draft directory', async () => {
  const { captureArtwork } = await import('../scripts/lib/artwork-capture.mjs');
  const captured = await captureArtwork('play-store-feature', { root: '/synthetic-project', outputRoot: '/synthetic-outputs', port: 3418 });
  expect(captured).toEqual([{ path: '/synthetic-outputs/play-store/feature_graphic.png', width: 1024, height: 500 }]);
});
it('preserves existing plan directories, routes, viewport settings and image sizes', async () => {
  const { artworkPlans } = await import('../scripts/lib/artwork-plans.mjs');
  expect(artworkPlans['app-store-v2'][0]).toMatchObject({ directory: 'app-store-iphone-lite', route: '/screenshots-export', viewport: { width: 6000, height: 3500, deviceScaleFactor: 1 } });
  expect(artworkPlans['play-store-screenshots'][0]).toMatchObject({ directory: 'play-store-phone', route: '/play-store-screenshots-export', viewport: { width: 5000, height: 2500, deviceScaleFactor: 1 } });
  expect(artworkPlans['play-store-tablets'].map(job => job.images[0])).toMatchObject([{ width: 1200, height: 2133 }, { width: 1800, height: 3200 }]);
  expect(artworkPlans['youtube-banner'][0].images).toEqual([{ id: 'youtube-banner', file: 'youtube_banner.png', width: 2048, height: 1152 }]);
  expect(artworkPlans['app-store-v2'][0].images.map(image => image.file)).toEqual(['v2_01_stop_average.png', 'v2_02_practice_mode.png', 'v2_03_follow_data.png', 'v2_04_ai_coaching.png']);
});

it('cleans staging after browser launch fails', async () => {
  const { default: puppeteer } = await import('puppeteer');
  vi.mocked(puppeteer.launch).mockRejectedValueOnce(Error('browser unavailable'));
  await finish(entries[0]); expect(process.exitCode).toBe(1); expect(io.close).not.toHaveBeenCalled();
  const { default: fs } = await import('node:fs/promises');
  expect(fs.rm).toHaveBeenCalledWith('/synthetic-staging', { recursive: true, force: true });
});
it('rejects a navigation with no HTTP response before publishing', async () => {
  io.responsePresent = false; await finish(entries[0]); expect(process.exitCode).toBe(1); expect(io.files.size).toBe(0);
});
it('fails without cleanup side effects when the output directory cannot be created', async () => {
  const { default: fs } = await import('node:fs/promises'); vi.mocked(fs.mkdir).mockRejectedValueOnce(Error('output denied'));
  await finish(entries[0]); expect(process.exitCode).toBe(1); expect(fs.rm).not.toHaveBeenCalled(); expect(io.close).not.toHaveBeenCalled();
});
it('does not print capture success when browser cleanup fails', async () => {
  io.close.mockRejectedValueOnce(Error('close failed')); await finish(entries[3]);
  expect(process.exitCode).toBe(1); expect(io.log).not.toHaveBeenCalled(); expect(io.error.mock.calls[0][0].message).toBe('close failed');
});
