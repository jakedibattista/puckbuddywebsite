import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = path.resolve(process.cwd());
const publicDir = path.join(projectRoot, "public");
const outDir = path.join(projectRoot, "marketing-assets", "app-store-bold");

// Configuration
const CONFIG = {
  width: 1284,
  height: 2778,
  padding: 80,
  phoneTopMargin: 400,
  frameColor: "#000000", // Pure black frame
  frameBorder: 20,
  cornerRadius: 80,
  textColor: "#FFFFFF", // White text
  statusBarCrop: 140,
};

// Screenshots (using v2- names)
const IMAGES = [
  { 
    id: "01_home",
    file: "v2-home.png", 
    title: ["Your Personal", "AI Hockey Coach"] 
  },
  { 
    id: "03_scorecard",
    file: "v2-scorecard.png", 
    title: ["Get Instant", "AI Feedback"] 
  },
  { 
    id: "04_feedback",
    file: "v2-coach-feedback.png", 
    title: ["Detailed Mechanics", "Breakdown"] 
  },
  { 
    id: "05_chat",
    file: "v2-chat.png", 
    title: ["Chat with", "Your Coach"] 
  },
  { 
    id: "06_stats",
    file: "v2-stats.png", 
    title: ["Track Your", "Progress"] 
  },
];

// Dark Hero Background from Website
// bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(37,99,235,0.28),transparent_55%),radial-gradient(900px_circle_at_80%_0%,rgba(34,197,94,0.18),transparent_55%),linear-gradient(to_bottom_right,#070A12,#0B1220,#070A12)]
function createBackgroundSvg(width, height) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Base Dark Background -->
      <linearGradient id="baseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#070A12"/>
        <stop offset="50%" stop-color="#0B1220"/>
        <stop offset="100%" stop-color="#070A12"/>
      </linearGradient>
      
      <!-- Blue Glow (Top Left) -->
      <radialGradient id="blueGlow" cx="20%" cy="10%" r="70%">
        <stop offset="0%" stop-color="rgba(37,99,235,0.28)"/>
        <stop offset="100%" stop-color="rgba(37,99,235,0)"/>
      </radialGradient>
      
      <!-- Green Glow (Top Right) -->
      <radialGradient id="greenGlow" cx="80%" cy="0%" r="70%">
        <stop offset="0%" stop-color="rgba(34,197,94,0.18)"/>
        <stop offset="100%" stop-color="rgba(34,197,94,0)"/>
      </radialGradient>
    </defs>
    
    <rect width="${width}" height="${height}" fill="url(#baseGrad)"/>
    <rect width="${width}" height="${height}" fill="url(#blueGlow)"/>
    <rect width="${width}" height="${height}" fill="url(#greenGlow)"/>
  </svg>`;
}

function createTextSvg(width, height, lines) {
  const fontSize = 100;
  const lineHeight = 120;
  const startY = 220;
  const fontFamily = "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";

  const textLines = lines.map((line, i) => 
    `<text x="50%" y="${startY + (i * lineHeight)}" text-anchor="middle" font-family="${fontFamily}" font-weight="800" font-size="${fontSize}" fill="${CONFIG.textColor}" letter-spacing="-2">${line}</text>`
  ).join("\n");

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <filter id="textShadow">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.5"/>
    </filter>
    <g filter="url(#textShadow)">
      ${textLines}
    </g>
  </svg>`;
}

function createRoundedMask(width, height, radius) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="black"/>
    </svg>
  `);
}

async function processImage(item) {
  console.log(`Processing ${item.id}...`);
  const srcPath = path.join(publicDir, item.file);
  const outPath = path.join(outDir, `${item.id}.png`);

  try {
    const backgroundSvg = createBackgroundSvg(CONFIG.width, CONFIG.height);
    const textSvg = createTextSvg(CONFIG.width, CONFIG.height, item.title);

    const phoneWidth = CONFIG.width - (CONFIG.padding * 2);
    const screenshotTargetWidth = phoneWidth - (CONFIG.frameBorder * 2);
    
    const screenshot = sharp(srcPath);
    const metadata = await screenshot.metadata();
    
    // Crop status bar
    let processingBuffer = await screenshot.toBuffer();
    if (CONFIG.statusBarCrop > 0) {
      processingBuffer = await sharp(processingBuffer)
        .extract({ 
          left: 0, 
          top: CONFIG.statusBarCrop, 
          width: metadata.width, 
          height: metadata.height - CONFIG.statusBarCrop 
        })
        .toBuffer();
    }
    
    const resizedScreenshotBuffer = await sharp(processingBuffer)
      .resize({ width: screenshotTargetWidth })
      .toBuffer();
      
    const resizedMeta = await sharp(resizedScreenshotBuffer).metadata();
    const scWidth = resizedMeta.width;
    const scHeight = resizedMeta.height;
    
    const frameWidth = scWidth + (CONFIG.frameBorder * 2);
    const frameHeight = scHeight + (CONFIG.frameBorder * 2);
    
    // Create frame with subtle glow/shadow to separate from dark bg
    const frameSvg = `
    <svg width="${frameWidth}" height="${frameHeight}" viewBox="0 0 ${frameWidth} ${frameHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="frameShadow" x="-20%" y="-20%" width="140%" height="140%">
           <feDropShadow dx="0" dy="10" stdDeviation="20" flood-color="#000000" flood-opacity="0.8"/>
           <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="#ffffff" flood-opacity="0.1"/>
        </filter>
      </defs>
      <rect x="0" y="0" width="${frameWidth}" height="${frameHeight}" rx="${CONFIG.cornerRadius}" ry="${CONFIG.cornerRadius}" fill="${CONFIG.frameColor}" stroke="rgba(255,255,255,0.1)" stroke-width="2" filter="url(#frameShadow)"/>
    </svg>`;
    
    const innerRadius = Math.max(0, CONFIG.cornerRadius - CONFIG.frameBorder);
    const mask = createRoundedMask(scWidth, scHeight, innerRadius);
    
    const maskedScreenshot = await sharp(resizedScreenshotBuffer)
      .composite([{ input: mask, blend: 'dest-in' }])
      .toBuffer();

    const phoneX = (CONFIG.width - frameWidth) / 2;
    const phoneY = CONFIG.phoneTopMargin + 50;
    
    await sharp(Buffer.from(backgroundSvg))
      .composite([
        { input: Buffer.from(textSvg), top: 0, left: 0 },
        { input: Buffer.from(frameSvg), top: phoneY, left: phoneX },
        { input: maskedScreenshot, top: phoneY + CONFIG.frameBorder, left: phoneX + CONFIG.frameBorder }
      ])
      .toFile(outPath);
      
    console.log(`Saved ${item.id}.png`);
  } catch (error) {
    console.error(`Error processing ${item.id}:`, error);
  }
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  for (const item of IMAGES) {
    await processImage(item);
  }
  console.log("Done! Check public/app-store-bold/");
}

main();

