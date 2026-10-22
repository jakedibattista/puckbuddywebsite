// Checks that the actual command reports completion only after its builder resolves and fails visibly on rejection.
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
const io = vi.hoisted(() => ({ build: vi.fn() }));
vi.mock('../scripts/lib/walkthrough-build.mjs', () => ({ buildWalkthrough: io.build }));
let previous: typeof process.exitCode;
beforeEach(() => { previous = process.exitCode; process.exitCode = undefined; vi.resetModules(); io.build.mockReset(); vi.spyOn(console, 'log').mockImplementation(() => {}); vi.spyOn(console, 'error').mockImplementation(() => {}); });
afterEach(() => { process.exitCode = previous; vi.restoreAllMocks(); });
it('prints only the acknowledged destination paths', async () => {
  io.build.mockResolvedValue(['/synthetic/01.mp4', '/synthetic/full.mp4']);
  await import('../scripts/build-v2-walkthrough.mjs'); await vi.dynamicImportSettled();
  expect(io.build).toHaveBeenCalledExactlyOnceWith();
  expect(vi.mocked(console.log).mock.calls).toEqual([['Walkthrough build complete:'], ['/synthetic/01.mp4'], ['/synthetic/full.mp4']]);
  expect(process.exitCode).toBeUndefined(); expect(console.error).not.toHaveBeenCalled();
});
it('returns failure without printing completion when the builder rejects', async () => {
  const error = Error('synthetic render failed'); io.build.mockRejectedValue(error);
  await import('../scripts/build-v2-walkthrough.mjs'); await vi.dynamicImportSettled();
  expect(process.exitCode).toBe(1); expect(console.error).toHaveBeenCalledExactlyOnceWith(error); expect(console.log).not.toHaveBeenCalled();
});
