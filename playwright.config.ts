// Runs browser checks on a dedicated port; build and development still share Next output and must run sequentially.
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './test/browser', fullyParallel: false,
  use: { baseURL: 'http://127.0.0.1:3417', browserName: 'chromium', channel: process.platform === 'darwin' ? 'chrome' : undefined },
  webServer: { command: 'npm run dev -- --hostname 127.0.0.1 --port 3417', url: 'http://127.0.0.1:3417', reuseExistingServer: false, timeout: 120000 },
});
