// Owns only the temporary Next.js process group started by an artwork capture.
// Probes are bounded; an existing server is reused and never terminated by this owner.
import { spawn } from 'node:child_process';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function reachable(url) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(2000) });
    await response.body?.cancel();
    return response.ok;
  }
  catch { return false; }
}
/** @param {string} root @param {number} port */
export function createArtworkServer(root, port) {
  const base = `http://127.0.0.1:${port}`;
  let child;
  let exited = false;
  let startupError;
  let exit;
  async function waitForExit() {
    return new Promise(resolve => {
      const timer = setTimeout(() => resolve(false), 2000);
      exit.then(() => { clearTimeout(timer); resolve(true); });
    });
  }
  return {
    base,
    async ready(route) {
      const url = base + route;
      if (await reachable(url)) return;
      child = spawn('npm', ['run', 'dev', '--', '--hostname', '127.0.0.1', '--port', String(port)], { cwd: root, stdio: 'ignore', detached: true });
      exit = new Promise(resolve => child.once('exit', () => { exited = true; resolve(); }));
      child.once('error', error => { startupError = error; });
      for (let attempt = 0; attempt < 30; attempt++) {
        if (startupError) throw startupError;
        if (exited) throw new Error('Temporary artwork server exited before readiness.');
        if (await reachable(url)) return;
        await sleep(1000);
      }
      throw new Error('Temporary artwork server did not become ready.');
    },
    async close() {
      if (!child?.pid || exited) return;
      try { process.kill(-child.pid, 'SIGTERM'); }
      catch (error) { if (error.code === 'ESRCH') return; throw error; }
      if (await waitForExit()) return;
      try { process.kill(-child.pid, 'SIGKILL'); }
      catch (error) { if (error.code === 'ESRCH') return; throw error; }
      if (!await waitForExit()) throw new Error('Temporary artwork server did not exit after cleanup.');
    },
  };
}
