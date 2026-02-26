import puppeteer from 'puppeteer';
import path from 'node:path';
import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';

const projectRoot = path.resolve(process.cwd());
const publicDir = path.join(projectRoot, "public");
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
  console.log("🏒 Generating Play Store Tablet Screenshots\n");
  
  // Set up output directories
  const outDir7Inch = path.join(projectRoot, "marketing-assets", "play-store-tablet-7");
  const outDir10Inch = path.join(projectRoot, "marketing-assets", "play-store-tablet-10");
  
  await fs.mkdir(outDir7Inch, { recursive: true });
  await fs.mkdir(outDir10Inch, { recursive: true });

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

  const screens = [
    { id: 'screen-1', file: 'v2_01_stop_average.png' },
    { id: 'screen-2', file: 'v2_02_practice_mode.png' },
    { id: 'screen-3', file: 'v2_03_follow_data.png' },
    { id: 'screen-4', file: 'v2_04_ai_coaching.png' },
  ];

  // For tablet sizes, Google allows 9:16 aspect ratio!
  // Since our UI designs are inherently vertical phone layouts, 
  // stretching them horizontally to 16:9 makes them look terrible.
  // Instead, we will keep the 9:16 design but export them at higher resolutions
  // to satisfy the tablet size requirements.
  
  // 7-inch tablet: 1200x2133 (9:16)
  console.log("\n📱 Generating 7-inch tablet screens (1200x2133)...");
  let browser = await puppeteer.launch({ headless: 'new' });
  let page = await browser.newPage();
  
  // 1200 width / 1080 (base design width) = 1.111 scale factor
  await page.setViewport({ width: 5500, height: 2600, deviceScaleFactor: 1.1111 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  for (const screen of screens) {
    console.log(`Taking 7-inch screenshot for ${screen.file}...`);
    const element = await page.$(`#${screen.id}`);
    if (element) {
      await element.screenshot({ path: path.join(outDir7Inch, screen.file), type: 'png' });
    }
  }
  await browser.close();

  // 10-inch tablet: 1800x3200 (9:16)
  console.log("\n📱 Generating 10-inch tablet screens (1800x3200)...");
  browser = await puppeteer.launch({ headless: 'new' });
  page = await browser.newPage();
  
  // 1800 width / 1080 (base design width) = 1.666 scale factor
  await page.setViewport({ width: 8000, height: 3500, deviceScaleFactor: 1.6666 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  for (const screen of screens) {
    console.log(`Taking 10-inch screenshot for ${screen.file}...`);
    const element = await page.$(`#${screen.id}`);
    if (element) {
      await element.screenshot({ path: path.join(outDir10Inch, screen.file), type: 'png' });
    }
  }
  await browser.close();

  if (serverProcess) {
    console.log("Shutting down temporary Next.js server...");
    process.kill(-serverProcess.pid); // Kill process group
  }

  console.log(`\n✅ Tablet screenshots generated in public/play-store-tablet-7 and public/play-store-tablet-10`);
}

main().catch(console.error);
