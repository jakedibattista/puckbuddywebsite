import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = path.resolve(process.cwd());
const publicDir = path.join(projectRoot, "public");
const outDir = path.join(projectRoot, "marketing-assets", "app-store");

// Configuration
const CONFIG = {
  width: 1284,
  height: 2778,
  padding: 80, // Padding around the phone
  phoneTopMargin: 400, // Space for text at top
  frameColor: "#1a1a1a", // Dark frame color
  frameBorder: 20, // Thickness of bezel
  cornerRadius: 80, // Roundness of phone corners
  textColor: "#111827", // gray-900
  accentColor: "#3b82f6", // Blue-500
  statusBarCrop: 140, // Height of status bar to remove
};

// Screenshots to process
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

// Helper to generate background SVG
function createBackgroundSvg(width, height) {
  // Matching website "bg-gradient-to-br from-gray-50 to-blue-50"
  // gray-50: #f9fafb, blue-50: #eff6ff
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f9fafb"/> <!-- gray-50 -->
        <stop offset="100%" stop-color="#eff6ff"/> <!-- blue-50 -->
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
  </svg>`;
}

// Helper to generate text SVG
function createTextSvg(width, height, lines) {
  // Simple centered text
  const fontSize = 100;
  const lineHeight = 120;
  const startY = 220; // Distance from top

  // Font stack matching website
  const fontFamily = "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";

  const textLines = lines.map((line, i) => 
    `<text x="50%" y="${startY + (i * lineHeight)}" text-anchor="middle" font-family="${fontFamily}" font-weight="800" font-size="${fontSize}" fill="${CONFIG.textColor}" letter-spacing="-2">${line}</text>`
  ).join("\n");

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    ${textLines}
  </svg>`;
}

// Helper to create a rounded mask for the screenshot
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
    // 1. Prepare base canvas with background
    const backgroundSvg = createBackgroundSvg(CONFIG.width, CONFIG.height);
    const textSvg = createTextSvg(CONFIG.width, CONFIG.height, item.title);

    // 2. Load and resize screenshot
    // We want the screenshot to fill the width minus padding, preserving aspect ratio
    // But we also need to account for the frame border.
    
    // Target width for the PHONE (including frame)
    const phoneWidth = CONFIG.width - (CONFIG.padding * 2);
    
    // Calculate screenshot target dimensions
    // Screenshot width = Phone Width - (Frame Border * 2)
    const screenshotTargetWidth = phoneWidth - (CONFIG.frameBorder * 2);
    
    const screenshot = sharp(srcPath);
    const metadata = await screenshot.metadata();
    
    // Crop status bar if configured
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
    
    // Resize screenshot to target width
    const resizedScreenshotBuffer = await sharp(processingBuffer)
      .resize({ width: screenshotTargetWidth })
      .toBuffer();
      
    // Get new dimensions
    const resizedMeta = await sharp(resizedScreenshotBuffer).metadata();
    const scWidth = resizedMeta.width;
    const scHeight = resizedMeta.height;
    
    // 3. Create Phone Frame
    // Frame size is screenshot size + borders
    const frameWidth = scWidth + (CONFIG.frameBorder * 2);
    const frameHeight = scHeight + (CONFIG.frameBorder * 2);
    
    // Create frame background (black rounded rect)
    const frameSvg = `
    <svg width="${frameWidth}" height="${frameHeight}" viewBox="0 0 ${frameWidth} ${frameHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${frameWidth}" height="${frameHeight}" rx="${CONFIG.cornerRadius}" ry="${CONFIG.cornerRadius}" fill="${CONFIG.frameColor}"/>
    </svg>`;
    
    // 4. Create Masked Screenshot
    // We need to round the corners of the screenshot so it fits in the frame
    // Inner radius is slightly less than outer radius to look concentric
    const innerRadius = Math.max(0, CONFIG.cornerRadius - CONFIG.frameBorder);
    const mask = createRoundedMask(scWidth, scHeight, innerRadius);
    
    const maskedScreenshot = await sharp(resizedScreenshotBuffer)
      .composite([{ input: mask, blend: 'dest-in' }])
      .toBuffer();

    // 5. Composite everything
    // Order: Background -> Text -> Frame -> Screenshot
    
    // Calculate Y position for phone to anchor it to bottom or start after text
    // Let's anchor it to bottom minus some padding, or just place it at phoneTopMargin?
    // Let's place it at phoneTopMargin to ensure header is visible.
    const phoneX = (CONFIG.width - frameWidth) / 2;
    const phoneY = CONFIG.phoneTopMargin + 50; // Text area + spacing
    
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
  
  console.log("Done! Check public/app-store/");
}

main();

