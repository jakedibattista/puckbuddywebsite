/**
 * One-off: compose iPhone screen recordings into 16:9 YouTube/Loom slides.
 * Run from puckbuddy-website: node scripts/build-v2-walkthrough.mjs
 */
import { execSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const repoRoot = path.resolve(process.cwd(), "..");
const publicDir = path.join(process.cwd(), "public");
const sourceDir = path.join(repoRoot, "videos", "v2-walkthrough", "source");
const outDir = path.join(repoRoot, "videos", "v2-walkthrough", "slides");
const assetsDir = path.join(repoRoot, "videos", "v2-walkthrough", ".build-assets");

const SLIDE = { width: 1920, height: 1080 };
const CROP_TOP = 140;
const PHONE = { frameBorder: 20, cornerRadius: 70, frameColor: "#000000", innerHeight: 780 };

const RECORDINGS = [
  "ScreenRecording_06-01-2026 15-43-48_1.mov",
  "ScreenRecording_06-01-2026 15-47-27_1.mov",
  "ScreenRecording_06-01-2026 16-04-28_1.mp4",
  "ScreenRecording_06-01-2026 16-05-02_1.mov",
  "ScreenRecording_06-01-2026 16-06-11_1.mov",
  "ScreenRecording_06-01-2026 16-07-27_1.mp4",
];

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
  </svg>`;
}

function createHeaderTextSvg(width) {
  const fontFamily =
    "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";
  return `
  <svg width="${width}" height="120" viewBox="0 0 ${width} 120" xmlns="http://www.w3.org/2000/svg">
    <filter id="textShadow">
      <feDropShadow dx="0" dy="3" stdDeviation="6" flood-opacity="0.45"/>
    </filter>
    <text x="50%" y="88" text-anchor="middle"
      font-family="${fontFamily}" font-weight="700" font-size="42" fill="#FFFFFF"
      letter-spacing="-1" filter="url(#textShadow)">Version 2.0 Walkthrough</text>
  </svg>`;
}

function createRoundedMask(width, height, radius) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="white"/>
    </svg>
  `);
}

function createPhoneFrameSvg(frameWidth, frameHeight, config) {
  const { cornerRadius, frameColor, frameBorder } = config;
  const innerW = frameWidth - frameBorder * 2;
  const innerH = frameHeight - frameBorder * 2;
  const innerR = Math.max(0, cornerRadius - frameBorder);
  return `
    <svg width="${frameWidth}" height="${frameHeight}" viewBox="0 0 ${frameWidth} ${frameHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="phoneShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="24" stdDeviation="32" flood-color="#000000" flood-opacity="0.55"/>
        </filter>
      </defs>
      <rect x="0" y="0" width="${frameWidth}" height="${frameHeight}" rx="${cornerRadius}" ry="${cornerRadius}"
        fill="${frameColor}" filter="url(#phoneShadow)"/>
      <rect x="${frameBorder}" y="${frameBorder}" width="${innerW}" height="${innerH}" rx="${innerR}" ry="${innerR}" fill="#050505"/>
      <rect x="0" y="0" width="${frameWidth}" height="${frameHeight}" rx="${cornerRadius}" ry="${cornerRadius}"
        fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="3"/>
    </svg>`;
}

async function computePhoneLayout() {
  const croppedAspect = 1170 / (2532 - CROP_TOP);
  const innerHeight = PHONE.innerHeight;
  const innerWidth = Math.round(innerHeight * croppedAspect);
  const frameWidth = innerWidth + PHONE.frameBorder * 2;
  const frameHeight = innerHeight + PHONE.frameBorder * 2;
  const innerRadius = Math.max(0, PHONE.cornerRadius - PHONE.frameBorder);

  const headerBlock = 200;
  const phoneX = Math.round((SLIDE.width - frameWidth) / 2);
  const phoneY = Math.round(
    headerBlock + (SLIDE.height - headerBlock - frameHeight) / 2
  );
  const videoX = phoneX + PHONE.frameBorder;
  const videoY = phoneY + PHONE.frameBorder;

  return {
    innerWidth,
    innerHeight,
    innerRadius,
    frameWidth,
    frameHeight,
    phoneX,
    phoneY,
    videoX,
    videoY,
  };
}

async function buildSlideTemplate(layout) {
  const bg = await sharp(Buffer.from(createBackground(SLIDE.width, SLIDE.height)))
    .png()
    .toBuffer();

  const logo = await sharp(path.join(publicDir, "BlackLogo.svg"))
    .resize({ width: 200 })
    .png()
    .toBuffer();

  const header = await sharp(Buffer.from(createHeaderTextSvg(SLIDE.width)))
    .png()
    .toBuffer();

  const frame = await sharp(
    Buffer.from(
      createPhoneFrameSvg(layout.frameWidth, layout.frameHeight, PHONE)
    )
  )
    .png()
    .toBuffer();

  const logoMeta = await sharp(logo).metadata();
  const logoLeft = Math.round((SLIDE.width - logoMeta.width) / 2);

  await sharp(bg)
    .composite([
      { input: logo, top: 36, left: logoLeft },
      { input: header, top: 150, left: 0 },
      { input: frame, top: layout.phoneY, left: layout.phoneX },
    ])
    .png()
    .toFile(path.join(assetsDir, "slide-template.png"));
}

function runFfmpeg(inputPath, outputPath, layout) {
  const template = path.join(assetsDir, "slide-template.png");
  const cropH = 2532 - CROP_TOP;

  // Rectangular overlay only — alphamerge was ~100x slower (hours per clip).
  // The phone bezel already has rounded inner corners visually.
  const filter = [
    `[0:v]crop=1170:${cropH}:0:${CROP_TOP},scale=${layout.innerWidth}:${layout.innerHeight}:flags=lanczos,setsar=1[vid]`,
    `[1:v]scale=${SLIDE.width}:${SLIDE.height}[bg]`,
    `[bg][vid]overlay=${layout.videoX}:${layout.videoY}:shortest=1[out]`,
  ].join(";");

  const cmd = [
    "ffmpeg -y -hide_banner -loglevel warning",
    `-i "${inputPath}"`,
    `-loop 1 -framerate 30 -i "${template}"`,
    `-filter_complex "${filter}"`,
    '-map "[out]"',
    "-an",
    "-c:v libx264",
    "-preset veryfast",
    "-crf 22",
    "-pix_fmt yuv420p",
    "-movflags +faststart",
    "-shortest",
    `"${outputPath}"`,
  ].join(" ");

  execSync(cmd, { stdio: "inherit", shell: true });
}

async function concatAll(slidePaths, outputPath) {
  const listPath = path.join(assetsDir, "concat.txt");
  const list = slidePaths.map((p) => `file '${p.replace(/'/g, "'\\''")}'`).join("\n");
  await fs.writeFile(listPath, list);
  execSync(
    `ffmpeg -y -hide_banner -loglevel error -f concat -safe 0 -i "${listPath}" -c copy -movflags +faststart "${outputPath}"`,
    { stdio: "inherit", shell: true }
  );
}

async function moveSourcesFromRoot() {
  await fs.mkdir(sourceDir, { recursive: true });
  for (const name of RECORDINGS) {
    const from = path.join(repoRoot, name);
    const to = path.join(sourceDir, name);
    try {
      await fs.access(from);
      await fs.rename(from, to);
      console.log(`Moved ${name} -> videos/v2-walkthrough/source/`);
    } catch {
      try {
        await fs.access(to);
      } catch {
        throw new Error(`Missing recording: ${name}`);
      }
    }
  }
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  await fs.mkdir(assetsDir, { recursive: true });

  await moveSourcesFromRoot();
  const layout = await computePhoneLayout();
  await buildSlideTemplate(layout);

  const slidePaths = [];
  for (let i = 0; i < RECORDINGS.length; i++) {
    const id = String(i + 1).padStart(2, "0");
    const input = path.join(sourceDir, RECORDINGS[i]);
    const output = path.join(outDir, `${id}-walkthrough.mp4`);
    console.log(`\nRendering slide ${id}...`);
    runFfmpeg(input, output, layout);
    slidePaths.push(output);
  }

  const fullPath = path.join(repoRoot, "videos", "v2-walkthrough", "v2-walkthrough-full.mp4");
  console.log("\nConcatenating full walkthrough...");
  await concatAll(slidePaths, fullPath);

  await fs.rm(assetsDir, { recursive: true, force: true });

  console.log("\nDone.");
  console.log(`Slides: ${outDir}`);
  console.log(`Full:   ${fullPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
