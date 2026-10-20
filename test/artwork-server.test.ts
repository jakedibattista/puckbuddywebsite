// Checks temporary-server ownership, bounded startup and process-group cleanup with fake children.
import { EventEmitter } from 'node:events';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
const io = vi.hoisted(() => ({ spawn: vi.fn() }));
vi.mock('node:child_process', () => ({ spawn: io.spawn, default: { spawn: io.spawn } }));
import { createArtworkServer } from '../scripts/lib/artwork-server.mjs';
let child: EventEmitter & { pid?: number };
let fetcher: ReturnType<typeof vi.fn>;
beforeEach(() => {
  vi.useFakeTimers(); child = Object.assign(new EventEmitter(), { pid: 78901 }); io.spawn.mockReset().mockReturnValue(child);
  fetcher = vi.fn(async () => ({ ok: true, body: { cancel: vi.fn(async () => undefined) } })); vi.stubGlobal('fetch', fetcher);
  vi.spyOn(process, 'kill').mockImplementation((_pid, signal) => { child.emit('exit', 0, signal); return true; });
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });
it('reuses an existing ready server without owning or terminating it', async () => {
  const server = createArtworkServer('/fixture', 3418); await server.ready('/export'); await server.close();
  expect(io.spawn).not.toHaveBeenCalled(); expect(process.kill).not.toHaveBeenCalled();
  expect((await fetcher.mock.results[0].value).body.cancel).toHaveBeenCalledOnce();
  expect(fetcher).toHaveBeenCalledWith('http://127.0.0.1:3418/export', { signal: expect.any(AbortSignal) });
});
it('starts and stops only its own detached process group', async () => {
  fetcher.mockResolvedValueOnce({ ok: false }); const server = createArtworkServer('/fixture', 3418);
  await server.ready('/export'); await server.close();
  expect(io.spawn).toHaveBeenCalledWith('npm', ['run', 'dev', '--', '--hostname', '127.0.0.1', '--port', '3418'], { cwd: '/fixture', stdio: 'ignore', detached: true });
  expect(process.kill).toHaveBeenCalledExactlyOnceWith(-78901, 'SIGTERM'); expect(vi.getTimerCount()).toBe(0);
});
it('treats a failed readiness request as unavailable and starts a temporary server', async () => {
  fetcher.mockRejectedValueOnce(Error('connection refused')); const server = createArtworkServer('/fixture', 3418);
  await server.ready('/export'); await server.close(); expect(io.spawn).toHaveBeenCalledOnce();
});
it('reports spawn errors and never sends a signal without a child PID', async () => {
  child.pid = undefined; fetcher.mockResolvedValue({ ok: false });
  io.spawn.mockImplementation(() => { queueMicrotask(() => child.emit('error', Error('spawn denied'))); return child; });
  const server = createArtworkServer('/fixture', 3418); const outcome = server.ready('/export').catch(error => error);
  await vi.runAllTimersAsync(); expect((await outcome).message).toBe('spawn denied'); await server.close(); expect(process.kill).not.toHaveBeenCalled();
});
it('reports a child that exits before readiness without signaling a reused PID', async () => {
  fetcher.mockResolvedValue({ ok: false }); io.spawn.mockImplementation(() => { queueMicrotask(() => child.emit('exit', 1)); return child; });
  const server = createArtworkServer('/fixture', 3418); const outcome = server.ready('/export').catch(error => error);
  await vi.runAllTimersAsync(); expect((await outcome).message).toContain('exited before readiness'); await server.close(); expect(process.kill).not.toHaveBeenCalled();
});
it('bounds startup attempts and cleans up a server that never becomes ready', async () => {
  fetcher.mockResolvedValue({ ok: false }); const server = createArtworkServer('/fixture', 3418);
  const outcome = server.ready('/export').catch(error => error); await vi.runAllTimersAsync();
  expect((await outcome).message).toContain('did not become ready'); expect(fetcher).toHaveBeenCalledTimes(31);
  await server.close(); expect(process.kill).toHaveBeenCalledExactlyOnceWith(-78901, 'SIGTERM');
});
it('escalates to SIGKILL only when its child does not exit after SIGTERM', async () => {
  fetcher.mockResolvedValueOnce({ ok: false }); vi.mocked(process.kill).mockImplementation((_pid, signal) => {
    if (signal === 'SIGKILL') child.emit('exit', 0, signal); return true;
  });
  const server = createArtworkServer('/fixture', 3418); await server.ready('/export');
  const closed = server.close(); await vi.runAllTimersAsync(); await closed;
  expect(process.kill).toHaveBeenNthCalledWith(1, -78901, 'SIGTERM'); expect(process.kill).toHaveBeenNthCalledWith(2, -78901, 'SIGKILL');
});
it.each(['SIGTERM', 'SIGKILL'])('tolerates an already absent group during %s', async signal => {
  fetcher.mockResolvedValueOnce({ ok: false }); vi.mocked(process.kill).mockImplementation((_pid, received) => {
    if (received === signal) throw Object.assign(Error('gone'), { code: 'ESRCH' }); return true;
  });
  const server = createArtworkServer('/fixture', 3418); await server.ready('/export'); const closed = server.close();
  await vi.runAllTimersAsync(); await expect(closed).resolves.toBeUndefined();
});
it.each(['SIGTERM', 'SIGKILL'])('preserves a real cleanup failure during %s', async signal => {
  fetcher.mockResolvedValueOnce({ ok: false }); vi.mocked(process.kill).mockImplementation((_pid, received) => {
    if (received === signal) throw Object.assign(Error('denied'), { code: 'EPERM' }); return true;
  });
  const server = createArtworkServer('/fixture', 3418); await server.ready('/export'); const outcome = server.close().catch(error => error);
  await vi.runAllTimersAsync(); expect((await outcome).message).toBe('denied');
});
it('reports an owned child that survives both cleanup deadlines', async () => {
  fetcher.mockResolvedValueOnce({ ok: false }); vi.mocked(process.kill).mockReturnValue(true);
  const server = createArtworkServer('/fixture', 3418); await server.ready('/export'); const outcome = server.close().catch(error => error);
  await vi.runAllTimersAsync(); expect((await outcome).message).toContain('did not exit after cleanup');
});
