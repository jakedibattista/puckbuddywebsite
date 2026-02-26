import puppeteer from 'puppeteer';
import path from 'node:path';
import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';

const projectRoot = path.resolve(process.cwd());
const publicDir = path.join(projectRoot, "public");
const outDir = path.join(projectRoot, "marketing-assets", "play-store-phone"); // Output folder
const url = 'http://localhost:3000/play-store-screenshots-export';

async function waitForServer(url) {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch (e) {
      // server not ready yet
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  return false;
}

async function main() {
  console.log("🏒 Generating Play Store Phone Screenshots (1080x1920)\n");
  
  await fs.mkdir(outDir, { recursive: true });

  console.log("Checking if Next.js dev server is running...");
  let serverProcess;
  let isServerRunning = await waitForServer(url).catch(() => false);
  
  if (!isServerRunning) {
    console.log("Starting Next.js dev server on port 3000...");
    serverProcess = spawn('npm', ['run', 'dev'], { stdio: 'ignore', detached: true });
    serverProcess.unref();
    const ready = await waitForServer(url);
    if (!ready) {
      console.error("Failed to start Next.js dev server");
      process.exit(1);
    }
    console.log("Next.js dev server is ready!");
  } else {
    console.log("Found existing Next.js dev server running.");
  }

  console.log("Launching headless browser...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport large enough to hold all 4 screens
  await page.setViewport({ width: 5000, height: 2500, deviceScaleFactor: 1 });
  
  console.log("Navigating to screenshots page...");
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Let framer motion and fonts finish settling
  await new Promise(r => setTimeout(r, 2000));

  const screens = [
    { id: 'screen-1', file: 'v2_01_stop_average.png' },
    { id: 'screen-2', file: 'v2_02_practice_mode.png' },
    { id: 'screen-3', file: 'v2_03_follow_data.png' },
    { id: 'screen-4', file: 'v2_04_ai_coaching.png' },
  ];

  for (const screen of screens) {
    console.log(`Taking screenshot for ${screen.file}...`);
    const element = await page.$(`#${screen.id}`);
    if (element) {
      await element.screenshot({
        path: path.join(outDir, screen.file),
        type: 'png'
      });
      console.log(`  ✓ Saved ${screen.file}`);
    } else {
      console.error(`  ✗ Element #${screen.id} not found on page!`);
    }
  }

  await browser.close();
  
  if (serverProcess) {
    console.log("Shutting down temporary Next.js server...");
    process.kill(-serverProcess.pid); // Kill process group
  }

  console.log(`\n✅ All Play Store screenshots generated at ${outDir}`);
}

main().catch(console.error);
