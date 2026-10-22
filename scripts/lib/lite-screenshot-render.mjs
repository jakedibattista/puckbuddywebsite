// Renders the established Lite phone frames, standalone images and two-part panoramas from captured bytes.
// This owner returns PNG buffers and never reads, moves or publishes source files.
import sharp from "sharp";

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

function createTextSvg(width, height, lines, fontSize, isSplit) {
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

async function preparePhone(bytes, cropTop, targetHeight, config) {
  const screenshot = sharp(bytes);
  const meta = await screenshot.metadata();
  
  const croppedBuffer = cropTop > 0
    ? await screenshot
      .extract({ left: 0, top: cropTop, width: meta.width, height: meta.height - cropTop })
      .toBuffer()
    : await screenshot.toBuffer();
    
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

export async function renderLitePanorama(bytes, cropTop, config) {
  
  const totalWidth = config.width * 2;
  const bgSvg = createBackground(totalWidth, config.height);
  const textSvg = createTextSvg(totalWidth, config.height, [], config.panoramaFontSize, true);
  
  // Large tilted phone for panorama
  const phoneAsset = await preparePhone(bytes, cropTop, config.panoramaHeight, config);
  
  // Rotate phone slightly
  const rotatedPhone = await sharp(phoneAsset)
    .rotate(-10, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
    
  const rotatedMeta = await sharp(rotatedPhone).metadata();
  const rotX = (totalWidth - rotatedMeta.width) / 2;
  const rotY = (config.height - rotatedMeta.height) / 2 + config.panoramaOffset;

  const fullPano = await sharp(Buffer.from(bgSvg))
    .composite([
      { input: Buffer.from(textSvg), top: 0, left: 0 },
      { input: rotatedPhone, top: Math.round(rotY), left: Math.round(rotX) }
    ])
    .toBuffer();

  // Preserve the established left/right panorama boundary and PNG encoding.
  return Promise.all([0, 1].map(side => sharp(fullPano)
    .extract({ left: side * config.width, top: 0, width: config.width, height: config.height })
    .toBuffer()));
}

export async function renderLiteScreen(bytes, item, config) {
  
  const bgSvg = createBackground(config.width, config.height);
  const textSvg = createTextSvg(config.width, config.height, item.title, config.fontSize, false);
  
  // Match iPad style: larger centered phone
  const phoneAsset = await preparePhone(bytes, item.cropTop, config.screenHeight, config);
  
  const phoneMeta = await sharp(phoneAsset).metadata();
  const phoneX = (config.width - phoneMeta.width) / 2;
  const phoneY = (config.height - phoneMeta.height) / 2 + config.screenOffset;

  return sharp(Buffer.from(bgSvg))
    .composite([
      { input: Buffer.from(textSvg), top: 0, left: 0 },
      { input: phoneAsset, top: Math.round(phoneY), left: Math.round(phoneX) }
    ])
    .toBuffer();
    
}
