import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = path.resolve(process.cwd());
const publicDir = path.join(projectRoot, "public");

// ============================================
// CONFIGURATION
// ============================================

// iPhone 6.7" dimensions
const IPHONE_CONFIG = {
  width: 1284,
  height: 2778,
  outDir: path.join(publicDir, "app-store-iphone-lite"),
  frameColor: "#000000",
  frameBorder: 20,
  cornerRadius: 70,
  textColor: "#FFFFFF",
};

// iPad Pro 12.9" dimensions
const IPAD_CONFIG = {
  width: 2048,
  height: 2732,
  totalWidth: 4096,
  outDir: path.join(publicDir, "app-store-ipad-lite"),
  frameColor: "#000000",
  frameBorder: 30,
  cornerRadius: 100,
  textColor: "#FFFFFF",
};

// Image mappings using jan-lite photos
const IMAGES = {
  home: "jan-lite-home.png",
  scorecard: "jan-lite-scorecard.png",
  feedback: "jan-lite-feedback.png",
  chat: "jan-lite-chat.png",
  stats: "jan-lite-stats.png",
  journal: "jan-lite-journal.png",
  select: "jan-lite-select.png",
};

// iPhone screens to generate
const IPHONE_SCREENS = [
  { file: IMAGES.home, id: "01_home", title: ["YOUR AI", "HOCKEY COACH"] },
  { file: IMAGES.scorecard, id: "02_scorecard", title: ["INSTANT", "SCORECARDS"] },
  { file: IMAGES.feedback, id: "03_feedback", title: ["DETAILED", "FEEDBACK"] },
  { file: IMAGES.chat, id: "04_chat", title: ["CHAT WITH", "YOUR COACH"] },
  { file: IMAGES.stats, id: "05_stats", title: ["TRACK YOUR", "PROGRESS"] },
  { file: IMAGES.journal, id: "06_journal", title: ["REVIEW YOUR", "SESSIONS"] },
];

// iPad screens - matching iPhone exactly
const IPAD_STANDALONE = [
  { file: IMAGES.home, id: "ipad_01_home", title: ["YOUR AI", "HOCKEY COACH"] },
  { file: IMAGES.scorecard, id: "ipad_02_scorecard", title: ["INSTANT", "SCORECARDS"] },
  { file: IMAGES.feedback, id: "ipad_03_feedback", title: ["DETAILED", "FEEDBACK"] },
  { file: IMAGES.chat, id: "ipad_04_chat", title: ["CHAT WITH", "YOUR COACH"] },
  { file: IMAGES.stats, id: "ipad_05_stats", title: ["TRACK YOUR", "PROGRESS"] },
  { file: IMAGES.journal, id: "ipad_06_journal", title: ["REVIEW YOUR", "SESSIONS"] },
];

// ============================================
// SVG GENERATORS
// ============================================

function createBackground(width, height) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="baseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="50%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
      <radialGradient id="blueGlow" cx="20%" cy="20%" r="60%">
        <stop offset="0%" stop-color="rgba(59,130,246,0.15)"/>
        <stop offset="100%" stop-color="rgba(59,130,246,0)"/>
      </radialGradient>
      <radialGradient id="greenGlow" cx="80%" cy="80%" r="60%">
        <stop offset="0%" stop-color="rgba(34,197,94,0.1)"/>
        <stop offset="100%" stop-color="rgba(34,197,94,0)"/>
      </radialGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#baseGrad)"/>
    <rect width="${width}" height="${height}" fill="url(#blueGlow)"/>
    <rect width="${width}" height="${height}" fill="url(#greenGlow)"/>
    <path d="M0,${height/2} Q${width/4},${height/2 - 200} ${width/2},${height/2} T${width},${height/2}" 
          fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="4" />
  </svg>`;
}

function createTextSvg(width, height, lines, fontSize, isSplit = false) {
  const yPos = isSplit ? 400 : Math.round(height * 0.12);
  const fontFamily = "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";

  let content = "";
  
  if (isSplit) {
    // Center text in each half of the panorama (width/4 = center of left, 3*width/4 = center of right)
    content = `
      <text x="${width * 0.25}" y="${yPos}" text-anchor="middle">MEET YOUR NEW</text>
      <text x="${width * 0.75}" y="${yPos}" text-anchor="middle">AI HOCKEY COACH</text>
    `;
  } else {
    const lineHeight = Math.round(fontSize * 1.15);
    content = lines.map((line, i) => 
      `<text x="50%" y="${yPos + (i * lineHeight)}" text-anchor="middle">${line}</text>`
    ).join("\n");
  }

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <filter id="textShadow">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.5"/>
    </filter>
    <g filter="url(#textShadow)" font-family="${fontFamily}" font-weight="900" font-size="${fontSize}" fill="#FFFFFF" letter-spacing="-4">
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

// ============================================
// PHONE FRAME GENERATOR
// ============================================

async function preparePhone(filePath, targetHeight, config) {
  const srcPath = path.join(publicDir, filePath);
  const screenshot = sharp(srcPath);
  const meta = await screenshot.metadata();
  
  // Crop status bar (140px from original)
  const cropAmount = 140;
  const croppedBuffer = await screenshot
    .extract({ left: 0, top: cropAmount, width: meta.width, height: meta.height - cropAmount })
    .toBuffer();
    
  // Resize to target height
  const resizedBuffer = await sharp(croppedBuffer)
    .resize({ height: targetHeight })
    .toBuffer();
    
  const phoneMeta = await sharp(resizedBuffer).metadata();
  const scWidth = phoneMeta.width;
  const scHeight = phoneMeta.height;
  
  const frameWidth = scWidth + (config.frameBorder * 2);
  const frameHeight = scHeight + (config.frameBorder * 2);
  
  // Frame with shadow
  const frameSvg = `
    <svg width="${frameWidth}" height="${frameHeight}" viewBox="0 0 ${frameWidth} ${frameHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="phoneShadow" x="-50%" y="-50%" width="200%" height="200%">
           <feDropShadow dx="0" dy="30" stdDeviation="40" flood-color="#000000" flood-opacity="0.6"/>
        </filter>
      </defs>
      <rect x="0" y="0" width="${frameWidth}" height="${frameHeight}" rx="${config.cornerRadius}" ry="${config.cornerRadius}" fill="${config.frameColor}" filter="url(#phoneShadow)"/>
      <rect x="0" y="0" width="${frameWidth}" height="${frameHeight}" rx="${config.cornerRadius}" ry="${config.cornerRadius}" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="4"/>
    </svg>`;

  // Rounded mask for screenshot
  const innerRadius = Math.max(0, config.cornerRadius - config.frameBorder);
  const mask = createRoundedMask(scWidth, scHeight, innerRadius);
  const maskedScreenshot = await sharp(resizedBuffer)
    .composite([{ input: mask, blend: 'dest-in' }])
    .toBuffer();

  // Composite frame + screenshot
  return sharp(Buffer.from(frameSvg))
    .composite([
      { input: maskedScreenshot, top: config.frameBorder, left: config.frameBorder }
    ])
    .toBuffer();
}

// ============================================
// IPHONE GENERATION
// ============================================

async function generateIPhoneScreen(item) {
  console.log(`Generating iPhone ${item.id}...`);
  
  const bgSvg = createBackground(IPHONE_CONFIG.width, IPHONE_CONFIG.height);
  const textSvg = createTextSvg(IPHONE_CONFIG.width, IPHONE_CONFIG.height, item.title, 100, false);
  
  // Phone at ~70% of canvas height
  const phoneHeight = Math.round(IPHONE_CONFIG.height * 0.68);
  const phoneAsset = await preparePhone(item.file, phoneHeight, IPHONE_CONFIG);
  
  const phoneMeta = await sharp(phoneAsset).metadata();
  const phoneX = (IPHONE_CONFIG.width - phoneMeta.width) / 2;
  const phoneY = IPHONE_CONFIG.height - phoneMeta.height - 80; // Near bottom

  await sharp(Buffer.from(bgSvg))
    .composite([
      { input: Buffer.from(textSvg), top: 0, left: 0 },
      { input: phoneAsset, top: Math.round(phoneY), left: Math.round(phoneX) }
    ])
    .toFile(path.join(IPHONE_CONFIG.outDir, `${item.id}.png`));
    
  console.log(`  ✓ Saved ${item.id}.png`);
}

async function generateAllIPhone() {
  console.log("\n📱 Generating iPhone App Store Images...\n");
  await fs.mkdir(IPHONE_CONFIG.outDir, { recursive: true });
  
  for (const item of IPHONE_SCREENS) {
    await generateIPhoneScreen(item);
  }
}

// ============================================
// IPAD GENERATION
// ============================================

async function generateIPadPanorama() {
  console.log("Generating iPad Panorama...");
  
  const bgSvg = createBackground(IPAD_CONFIG.totalWidth, IPAD_CONFIG.height);
  const textSvg = createTextSvg(IPAD_CONFIG.totalWidth, IPAD_CONFIG.height, [], 160, true);
  
  // Larger phone for panorama (increased from 1800 to 2200)
  const phoneAsset = await preparePhone(IPAD_MAIN.file, 2200, IPAD_CONFIG);
  
  // Rotate phone slightly
  const rotatedPhone = await sharp(phoneAsset)
    .rotate(-10, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
    
  const rotatedMeta = await sharp(rotatedPhone).metadata();
  const rotX = (IPAD_CONFIG.totalWidth - rotatedMeta.width) / 2;
  const rotY = (IPAD_CONFIG.height - rotatedMeta.height) / 2 + 300;

  const fullPano = await sharp(Buffer.from(bgSvg))
    .composite([
      { input: Buffer.from(textSvg), top: 0, left: 0 },
      { input: rotatedPhone, top: Math.round(rotY), left: Math.round(rotX) }
    ])
    .toBuffer();

  // Slice into two images
  await sharp(fullPano)
    .extract({ left: 0, top: 0, width: IPAD_CONFIG.width, height: IPAD_CONFIG.height })
    .toFile(path.join(IPAD_CONFIG.outDir, "ipad_01_split_left.png"));
    
  await sharp(fullPano)
    .extract({ left: IPAD_CONFIG.width, top: 0, width: IPAD_CONFIG.width, height: IPAD_CONFIG.height })
    .toFile(path.join(IPAD_CONFIG.outDir, "ipad_02_split_right.png"));
    
  console.log("  ✓ Saved ipad_01_split_left.png");
  console.log("  ✓ Saved ipad_02_split_right.png");
}

async function generateIPadStandalone(item) {
  console.log(`Generating iPad ${item.id}...`);
  
  const bgSvg = createBackground(IPAD_CONFIG.width, IPAD_CONFIG.height);
  const textSvg = createTextSvg(IPAD_CONFIG.width, IPAD_CONFIG.height, item.title, 160, false);
  
  const phoneAsset = await preparePhone(item.file, 1600, IPAD_CONFIG);
  
  const phoneMeta = await sharp(phoneAsset).metadata();
  const phoneX = (IPAD_CONFIG.width - phoneMeta.width) / 2;
  const phoneY = (IPAD_CONFIG.height - phoneMeta.height) / 2 + 200;

  await sharp(Buffer.from(bgSvg))
    .composite([
      { input: Buffer.from(textSvg), top: 0, left: 0 },
      { input: phoneAsset, top: Math.round(phoneY), left: Math.round(phoneX) }
    ])
    .toFile(path.join(IPAD_CONFIG.outDir, `${item.id}.png`));
    
  console.log(`  ✓ Saved ${item.id}.png`);
}

async function generateAllIPad() {
  console.log("\n📱 Generating iPad App Store Images...\n");
  await fs.mkdir(IPAD_CONFIG.outDir, { recursive: true });
  
  // Generate standalone images matching iPhone
  for (const item of IPAD_STANDALONE) {
    await generateIPadStandalone(item);
  }
}

// ============================================
// MAIN
// ============================================

async function main() {
  console.log("🏒 Puck Buddy App Store Image Generator (Lite Version)\n");
  console.log("Using jan-lite screenshots for light-mode appearance on dark backgrounds\n");
  
  await generateAllIPhone();
  await generateAllIPad();
  
  console.log("\n✅ All images generated successfully!");
  console.log(`\n📁 iPhone images: ${IPHONE_CONFIG.outDir}`);
  console.log(`📁 iPad images: ${IPAD_CONFIG.outDir}`);
}

main().catch(console.error);

