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

// We will use one main image for the split view
const MAIN_IMAGE = { file: "v2-scorecard.png", id: "split_view" };

function createPanoramaBackground(width, height) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="baseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#070A12"/>
        <stop offset="50%" stop-color="#0B1220"/>
        <stop offset="100%" stop-color="#070A12"/>
      </linearGradient>
      <radialGradient id="blueGlow" cx="20%" cy="20%" r="60%">
        <stop offset="0%" stop-color="rgba(37,99,235,0.2)"/>
        <stop offset="100%" stop-color="rgba(37,99,235,0)"/>
      </radialGradient>
      <radialGradient id="greenGlow" cx="80%" cy="80%" r="60%">
        <stop offset="0%" stop-color="rgba(34,197,94,0.15)"/>
        <stop offset="100%" stop-color="rgba(34,197,94,0)"/>
      </radialGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#baseGrad)"/>
    <rect width="${width}" height="${height}" fill="url(#blueGlow)"/>
    <rect width="${width}" height="${height}" fill="url(#greenGlow)"/>
    
    <!-- Connecting Element: Subtle Wave or Line behind phone -->
    <path d="M0,${height/2} Q${width/4},${height/2 - 200} ${width/2},${height/2} T${width},${height/2}" 
          fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="4" />
  </svg>`;
}

function createSpanningText(width, height) {
  // Text spans across the two screens
  // Left Screen Center: width * 0.25
  // Right Screen Center: width * 0.75
  const fontSize = 160;
  const yPos = 400;
  const fontFamily = "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <filter id="textShadow">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.5"/>
    </filter>
    <g filter="url(#textShadow)" font-family="${fontFamily}" font-weight="900" font-size="${fontSize}" fill="${CONFIG.textColor}" text-anchor="middle" letter-spacing="-4">
      <!-- Left side text -->
      <text x="${width * 0.25}" y="${yPos}">MEET YOUR NEW</text>
      
      <!-- Right side text -->
      <text x="${width * 0.75}" y="${yPos}">AI HOCKEY COACH</text>
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

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  console.log("Generating iPad Panorama...");

  // 1. Prepare Background & Text for full width
  const bgSvg = createPanoramaBackground(CONFIG.totalWidth, CONFIG.height);
  const textSvg = createSpanningText(CONFIG.totalWidth, CONFIG.height);
  
  // 2. Prepare the Phone (Large, Centered)
  // We want the phone to be impressively large, maybe 70% of the total width?
  // Actually, standard screenshot ratio is tall. 
  // Let's make the phone ~1600px wide (it's usually ~1200px wide on iPhone).
  // We'll scale it up.
  
  const srcPath = path.join(publicDir, MAIN_IMAGE.file);
  const screenshot = sharp(srcPath);
  const meta = await screenshot.metadata();
  
  // Crop status bar first (140px from source)
  const cropAmount = 140;
  const croppedBuffer = await screenshot
    .extract({ left: 0, top: cropAmount, width: meta.width, height: meta.height - cropAmount })
    .toBuffer();
    
  // Resize to be BIG. Let's say height = 1800px.
  // Aspect ratio is approx 1:2.16
  const targetPhoneHeight = 1800;
  const resizedBuffer = await sharp(croppedBuffer)
    .resize({ height: targetPhoneHeight })
    .toBuffer();
    
  const phoneMeta = await sharp(resizedBuffer).metadata();
  const scWidth = phoneMeta.width;
  const scHeight = phoneMeta.height;
  
  const frameWidth = scWidth + (CONFIG.frameBorder * 2);
  const frameHeight = scHeight + (CONFIG.frameBorder * 2);
  
  // Create Phone Frame
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

  // Create Masked Screenshot
  const innerRadius = Math.max(0, CONFIG.cornerRadius - CONFIG.frameBorder);
  const mask = createRoundedMask(scWidth, scHeight, innerRadius);
  const maskedScreenshot = await sharp(resizedBuffer)
    .composite([{ input: mask, blend: 'dest-in' }])
    .toBuffer();

  // 3. Composite everything onto large canvas
  // Phone Position: Centered
  const phoneX = (CONFIG.totalWidth - frameWidth) / 2;
  const phoneY = (CONFIG.height - frameHeight) / 2 + 100; // Slightly lower to clear text
  
  // Create rotated/tilted effect? 
  // Sharp rotation rotates the image box, increasing size.
  // For simplicity and crispness, let's keep it upright but huge.
  // Or rotate -10 deg.
  
  // Let's Composite the phone components first into one "Phone Asset"
  const phoneComposite = await sharp(Buffer.from(frameSvg))
    .composite([
      { input: maskedScreenshot, top: CONFIG.frameBorder, left: CONFIG.frameBorder }
    ])
    .toBuffer();
    
  // Now Rotate the phone asset
  const rotatedPhone = await sharp(phoneComposite)
    .rotate(-10, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
    
  const rotatedMeta = await sharp(rotatedPhone).metadata();
  
  // Recalculate center for rotated phone
  const rotX = (CONFIG.totalWidth - rotatedMeta.width) / 2;
  const rotY = (CONFIG.height - rotatedMeta.height) / 2 + 150;

  console.log("Compositing full panorama...");
  const fullPano = await sharp(Buffer.from(bgSvg))
    .composite([
      { input: Buffer.from(textSvg), top: 0, left: 0 },
      { input: rotatedPhone, top: Math.round(rotY), left: Math.round(rotX) }
    ])
    .toBuffer();

  // 4. Slice and Save
  console.log("Slicing into 2 images...");
  
  // Left Image
  await sharp(fullPano)
    .extract({ left: 0, top: 0, width: CONFIG.width, height: CONFIG.height })
    .toFile(path.join(outDir, "ipad_01_split_left.png"));
    
  // Right Image
  await sharp(fullPano)
    .extract({ left: CONFIG.width, top: 0, width: CONFIG.width, height: CONFIG.height })
    .toFile(path.join(outDir, "ipad_02_split_right.png"));
    
  console.log("Done! Created ipad_01 and ipad_02 in public/app-store-ipad/");
}

main();

