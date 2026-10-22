// Composes a captured screenshot using the established crop, resize, mask, frame and text ordering.
// It returns PNG bytes and performs no file writes; staged publication belongs to image-exports.
import sharp from "sharp";

function createRoundedMask(width, height, radius) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="black"/>
    </svg>
  `);
}

/** @param {Buffer} bytes @param {{title:string[]}} item @param {ReturnType<typeof import("./store-screenshot-designs.mjs").storeScreenshotDesigns>} design */
export async function renderStoreScreenshot(bytes, item, design) {
  const { config } = design;
  const backgroundSvg = design.background(config.width, config.height);
  const textSvg = design.text(config.width, config.height, item.title, config);
  const phoneWidth = config.width - config.padding * 2;
  const screenshotTargetWidth = phoneWidth - config.frameBorder * 2;
  const screenshot = sharp(bytes);
  const metadata = await screenshot.metadata();
  let processingBuffer = await screenshot.toBuffer();
  if (config.statusBarCrop > 0) {
    processingBuffer = await sharp(processingBuffer)
      .extract({ left: 0, top: config.statusBarCrop, width: metadata.width, height: metadata.height - config.statusBarCrop })
      .toBuffer();
  }
  const resizedScreenshotBuffer = await sharp(processingBuffer)
    .resize({ width: screenshotTargetWidth }).toBuffer();
  const resizedMeta = await sharp(resizedScreenshotBuffer).metadata();
  const scWidth = resizedMeta.width, scHeight = resizedMeta.height;
  const frameWidth = scWidth + config.frameBorder * 2;
  const frameHeight = scHeight + config.frameBorder * 2;
  const frameSvg = design.frame(frameWidth, frameHeight, config);
  const mask = createRoundedMask(scWidth, scHeight, Math.max(0, config.cornerRadius - config.frameBorder));
  const maskedScreenshot = await sharp(resizedScreenshotBuffer)
    .composite([{ input: mask, blend: "dest-in" }]).toBuffer();
  const phoneX = (config.width - frameWidth) / 2;
  const phoneY = config.phoneTopMargin + 50;
  return sharp(Buffer.from(backgroundSvg)).composite([
    { input: Buffer.from(textSvg), top: 0, left: 0 },
    { input: Buffer.from(frameSvg), top: phoneY, left: phoneX },
    { input: maskedScreenshot, top: phoneY + config.frameBorder, left: phoneX + config.frameBorder },
  ]).png().toBuffer();
}
