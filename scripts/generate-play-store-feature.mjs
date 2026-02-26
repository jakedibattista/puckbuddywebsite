import puppeteer from 'puppeteer';
import path from 'node:path';
import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';

const projectRoot = path.resolve(process.cwd());
const publicDir = path.join(projectRoot, "public");
const outDir = path.join(projectRoot, "marketing-assets", "play-store"); // Output folder
const url = 'http://localhost:3000/play-store-feature';

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
  console.log("🏒 Generating Play Store Feature Graphic\n");
  
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
  
  // Set viewport large enough
  await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 1 });
  
  console.log("Navigating to feature graphic page...");
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Let framer motion, images, and fonts finish settling
  await new Promise(r => setTimeout(r, 2000));

  console.log(`Taking screenshot for feature_graphic.png...`);
  const element = await page.$(`#feature-graphic`);
  if (element) {
    await element.screenshot({
      path: path.join(outDir, 'feature_graphic.png'),
      type: 'png'
    });
    console.log(`  ✓ Saved feature_graphic.png (1024x500)`);
  } else {
    console.error(`  ✗ Element #feature-graphic not found on page!`);
  }

  await browser.close();
  
  if (serverProcess) {
    console.log("Shutting down temporary Next.js server...");
    process.kill(-serverProcess.pid); // Kill process group
  }

  console.log(`\n✅ Play Store Feature Graphic generated at ${outDir}`);
}

main().catch(console.error);
