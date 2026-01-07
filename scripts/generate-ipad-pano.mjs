import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = path.resolve(process.cwd());
const publicDir = path.join(projectRoot, "public");
const outDir = path.join(publicDir, "app-store-ipad");

// Configuration for iPad Pro 12.9"
const CONFIG = {
  width: 2048,
  height: 2732,
  totalWidth: 4096, // 2 screens wide
  frameColor: "#000000",
  frameBorder: 30,
  cornerRadius: 100,
  textColor: "#FFFFFF",
};

// Main split view image
const MAIN_IMAGE = { file: "v2-scorecard.png", id: "split_view" };

// Additional standalone images
const STANDALONE_IMAGES = [
  { file: "v2-chat.png", id: "ipad_03_chat", title: ["CHAT WITH", "YOUR COACH"] },
  { file: "v2-stats.png", id: "ipad_04_stats", title: ["TRACK YOUR", "PROGRESS"] },
  { file: "v2-coach-feedback.png", id: "ipad_05_feedback", title: ["DETAILED", "FEEDBACK"] }
];

function createBackground(width, height) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Lighter Dark Background -->
      <linearGradient id="baseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/> <!-- slate-800 -->
        <stop offset="50%" stop-color="#0f172a"/> <!-- slate-900 -->
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
      
      <!-- Blue Glow -->
      <radialGradient id="blueGlow" cx="20%" cy="20%" r="60%">
        <stop offset="0%" stop-color="rgba(59,130,246,0.15)"/> <!-- lighter blue -->
        <stop offset="100%" stop-color="rgba(59,130,246,0)"/>
      </radialGradient>
      
      <!-- Green Glow -->
      <radialGradient id="greenGlow" cx="80%" cy="80%" r="60%">
        <stop offset="0%" stop-color="rgba(34,197,94,0.1)"/>
        <stop offset="100%" stop-color="rgba(34,197,94,0)"/>
      </radialGradient>
    </defs>
    
    <rect width="${width}" height="${height}" fill="url(#baseGrad)"/>
    <rect width="${width}" height="${height}" fill="url(#blueGlow)"/>
    <rect width="${width}" height="${height}" fill="url(#greenGlow)"/>
    
    <!-- Background Texture/Line -->
    <path d="M0,${height/2} Q${width/4},${height/2 - 200} ${width/2},${height/2} T${width},${height/2}" 
          fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="4" />
  </svg>`;
}

function createTextSvg(width, height, lines, isSplit = false) {
  const fontSize = 160;
  const yPos = 400;
  const fontFamily = "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";

  let content = "";
  
  if (isSplit) {
    // Spanning text for split view
    content = `
      <text x="${width * 0.25}" y="${yPos}">MEET YOUR NEW</text>
      <text x="${width * 0.75}" y="${yPos}">AI HOCKEY COACH</text>
    `;
  } else {
    // Centered text for standalone
    const lineHeight = 180;
    content = lines.map((line, i) => 
      `<text x="50%" y="${yPos + (i * lineHeight)}" text-anchor="middle">${line}</text>`
    ).join("\n");
  }

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <filter id="textShadow">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.5"/>
    </filter>
    <g filter="url(#textShadow)" font-family="${fontFamily}" font-weight="900" font-size="${fontSize}" fill="${CONFIG.textColor}" letter-spacing="-4">
      ${content}
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

async function preparePhone(filePath, targetHeight) {
  const srcPath = path.join(publicDir, filePath);
  const screenshot = sharp(srcPath);
  const meta = await screenshot.metadata();
  
  // Crop status bar (140px)
  const cropAmount = 140;
  const croppedBuffer = await screenshot
    .extract({ left: 0, top: cropAmount, width: meta.width, height: meta.height - cropAmount })
    .toBuffer();
    
  // Resize
  const resizedBuffer = await sharp(croppedBuffer)
    .resize({ height: targetHeight })
    .toBuffer();
    
  const phoneMeta = await sharp(resizedBuffer).metadata();
  const scWidth = phoneMeta.width;
  const scHeight = phoneMeta.height;
  
  const frameWidth = scWidth + (CONFIG.frameBorder * 2);
  const frameHeight = scHeight + (CONFIG.frameBorder * 2);
  
  // Frame
  const frameSvg = `
    <svg width="${frameWidth}" height="${frameHeight}" viewBox="0 0 ${frameWidth} ${frameHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="phoneShadow" x="-50%" y="-50%" width="200%" height="200%">
           <feDropShadow dx="0" dy="30" stdDeviation="40" flood-color="#000000" flood-opacity="0.6"/>
        </filter>
      </defs>
      <rect x="0" y="0" width="${frameWidth}" height="${frameHeight}" rx="${CONFIG.cornerRadius}" ry="${CONFIG.cornerRadius}" fill="${CONFIG.frameColor}" filter="url(#phoneShadow)"/>
      <rect x="0" y="0" width="${frameWidth}" height="${frameHeight}" rx="${CONFIG.cornerRadius}" ry="${CONFIG.cornerRadius}" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="4"/>
    </svg>`;

  // Mask
  const innerRadius = Math.max(0, CONFIG.cornerRadius - CONFIG.frameBorder);
  const mask = createRoundedMask(scWidth, scHeight, innerRadius);
  const maskedScreenshot = await sharp(resizedBuffer)
    .composite([{ input: mask, blend: 'dest-in' }])
    .toBuffer();

  // Composite Phone
  return sharp(Buffer.from(frameSvg))
    .composite([
      { input: maskedScreenshot, top: CONFIG.frameBorder, left: CONFIG.frameBorder }
    ])
    .toBuffer();
}

async function generatePanorama() {
  console.log("Generating Panorama...");
  const bgSvg = createBackground(CONFIG.totalWidth, CONFIG.height);
  const textSvg = createTextSvg(CONFIG.totalWidth, CONFIG.height, [], true);
  
  // Large Phone for Panorama
  const phoneAsset = await preparePhone(MAIN_IMAGE.file, 1800);
  
  // Rotate Phone
  const rotatedPhone = await sharp(phoneAsset)
    .rotate(-10, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
    
  const rotatedMeta = await sharp(rotatedPhone).metadata();
  const rotX = (CONFIG.totalWidth - rotatedMeta.width) / 2;
  const rotY = (CONFIG.height - rotatedMeta.height) / 2 + 150;

  const fullPano = await sharp(Buffer.from(bgSvg))
    .composite([
      { input: Buffer.from(textSvg), top: 0, left: 0 },
      { input: rotatedPhone, top: Math.round(rotY), left: Math.round(rotX) }
    ])
    .toBuffer();

  // Slice
  await sharp(fullPano)
    .extract({ left: 0, top: 0, width: CONFIG.width, height: CONFIG.height })
    .toFile(path.join(outDir, "ipad_01_split_left.png"));
    
  await sharp(fullPano)
    .extract({ left: CONFIG.width, top: 0, width: CONFIG.width, height: CONFIG.height })
    .toFile(path.join(outDir, "ipad_02_split_right.png"));
    
  console.log("Saved ipad_01 and ipad_02");
}

async function generateStandalone(item) {
  console.log(`Generating ${item.id}...`);
  const bgSvg = createBackground(CONFIG.width, CONFIG.height);
  const textSvg = createTextSvg(CONFIG.width, CONFIG.height, item.title, false);
  
  // Slightly smaller phone for standalone
  const phoneAsset = await preparePhone(item.file, 1600);
  
  const phoneMeta = await sharp(phoneAsset).metadata();
  const phoneX = (CONFIG.width - phoneMeta.width) / 2;
  const phoneY = (CONFIG.height - phoneMeta.height) / 2 + 200;

  await sharp(Buffer.from(bgSvg))
    .composite([
      { input: Buffer.from(textSvg), top: 0, left: 0 },
      { input: phoneAsset, top: Math.round(phoneY), left: Math.round(phoneX) }
    ])
    .toFile(path.join(outDir, `${item.id}.png`));
    
  console.log(`Saved ${item.id}.png`);
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  
  await generatePanorama();
  
  for (const item of STANDALONE_IMAGES) {
    await generateStandalone(item);
  }
}

main();
