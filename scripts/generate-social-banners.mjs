import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = path.resolve(process.cwd());
const outDir = path.join(projectRoot, "public", "social");

function heroBackgroundSvg(width, height) {
  // Background inspired by the homepage hero.
  return `
  <defs>
    <radialGradient id="rg1" cx="20%" cy="10%" r="70%">
      <stop offset="0%" stop-color="rgba(37,99,235,0.38)"/>
      <stop offset="60%" stop-color="rgba(37,99,235,0)"/>
    </radialGradient>
    <radialGradient id="rg2" cx="80%" cy="0%" r="70%">
      <stop offset="0%" stop-color="rgba(34,197,94,0.22)"/>
      <stop offset="60%" stop-color="rgba(34,197,94,0)"/>
    </radialGradient>
    <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070A12"/>
      <stop offset="50%" stop-color="#0B1220"/>
      <stop offset="100%" stop-color="#070A12"/>
    </linearGradient>
    <linearGradient id="headline" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="55%" stop-color="#dbeafe"/>
      <stop offset="100%" stop-color="#d1fae5"/>
    </linearGradient>
    <filter id="blurGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="28" result="blur"/>
      <feColorMatrix in="blur" type="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.55 0" result="glow"/>
      <feMerge>
        <feMergeNode in="glow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#lg)"/>
  <rect width="${width}" height="${height}" fill="url(#rg1)"/>
  <rect width="${width}" height="${height}" fill="url(#rg2)"/>
  `;
}

function badgeSvg(x, y, text) {
  // Glassy badge + green dot.
  return `
  <g>
    <rect x="${x}" y="${y}" rx="999" ry="999" width="520" height="56"
      fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.18)"/>
    <circle cx="${x + 28}" cy="${y + 28}" r="7" fill="#34d399"/>
    <circle cx="${x + 28}" cy="${y + 28}" r="18" fill="rgba(52,211,153,0.14)"/>
    <text x="${x + 52}" y="${y + 36}"
      fill="rgba(255,255,255,0.92)"
      font-size="18"
      font-weight="700"
      font-family="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
      letter-spacing="0.2px">${text}</text>
  </g>`;
}

function smallBrandSvg(x, y) {
  // Minimal brand mark + name (keeps it crisp and safe across platforms).
  return `
  <g>
    <circle cx="${x + 16}" cy="${y + 16}" r="16" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.18)"/>
    <circle cx="${x + 16}" cy="${y + 16}" r="7" fill="rgba(255,255,255,0.75)"/>
    <text x="${x + 44}" y="${y + 22}"
      fill="rgba(255,255,255,0.92)"
      font-size="18"
      font-weight="800"
      font-family="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
      letter-spacing="1.2px">PUCK BUDDY</text>
  </g>`;
}

function makeYoutubeSvg() {
  const width = 2560;
  const height = 1440;
  // Safe area: 1546x423, centered.
  const safeX = Math.round((width - 1546) / 2);
  const safeY = Math.round((height - 423) / 2);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${heroBackgroundSvg(width, height)}
  <g filter="url(#blurGlow)">
    <circle cx="${width * 0.18}" cy="${height * 0.28}" r="180" fill="rgba(37,99,235,0.18)"/>
    <circle cx="${width * 0.82}" cy="${height * 0.22}" r="220" fill="rgba(34,197,94,0.12)"/>
  </g>

  ${smallBrandSvg(safeX, safeY - 66)}
  ${badgeSvg(safeX, safeY + 6, "Rink-tested coaching inside")}

  <text x="${safeX}" y="${safeY + 150}"
    fill="url(#headline)"
    font-size="92"
    font-weight="900"
    font-family="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    letter-spacing="-1.2px">Meet Your New</text>

  <text x="${safeX}" y="${safeY + 252}"
    fill="url(#headline)"
    font-size="112"
    font-weight="900"
    font-family="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    letter-spacing="-1.8px">Private Hockey Coach</text>

  <text x="${safeX}" y="${safeY + 336}"
    fill="rgba(255,255,255,0.78)"
    font-size="34"
    font-weight="600"
    font-family="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif">
    Upload a shot. Get instant scorecards + coaching feedback.
  </text>
</svg>`;
}

function makeFacebookSvg() {
  const width = 1640;
  const height = 624;
  // Keep key content centered-ish; FB crops differently on mobile.
  const left = 96;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${heroBackgroundSvg(width, height)}
  <g filter="url(#blurGlow)">
    <circle cx="${width * 0.2}" cy="${height * 0.35}" r="120" fill="rgba(37,99,235,0.18)"/>
    <circle cx="${width * 0.86}" cy="${height * 0.25}" r="160" fill="rgba(34,197,94,0.12)"/>
  </g>

  ${smallBrandSvg(left, 84)}
  ${badgeSvg(left, 150, "Rink-tested coaching inside")}

  <text x="${left}" y="300"
    fill="url(#headline)"
    font-size="74"
    font-weight="900"
    font-family="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    letter-spacing="-1.0px">Meet Your New</text>

  <text x="${left}" y="390"
    fill="url(#headline)"
    font-size="88"
    font-weight="900"
    font-family="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    letter-spacing="-1.3px">Private Hockey Coach</text>

  <text x="${left}" y="468"
    fill="rgba(255,255,255,0.78)"
    font-size="26"
    font-weight="600"
    font-family="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif">
    Upload a shot. Get instant scorecards + coaching feedback.
  </text>
</svg>`;
}

function makeOpenGraphSvg() {
  const width = 1200;
  const height = 630;
  const left = 72;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${heroBackgroundSvg(width, height)}
  <g filter="url(#blurGlow)">
    <circle cx="${width * 0.18}" cy="${height * 0.42}" r="120" fill="rgba(37,99,235,0.18)"/>
    <circle cx="${width * 0.88}" cy="${height * 0.24}" r="160" fill="rgba(34,197,94,0.12)"/>
  </g>

  ${smallBrandSvg(left, 84)}
  ${badgeSvg(left, 150, "Rink-tested coaching inside")}

  <text x="${left}" y="298"
    fill="url(#headline)"
    font-size="60"
    font-weight="900"
    font-family="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    letter-spacing="-0.9px">Meet Your New</text>

  <text x="${left}" y="374"
    fill="url(#headline)"
    font-size="74"
    font-weight="900"
    font-family="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    letter-spacing="-1.2px">Private Hockey Coach</text>

  <text x="${left}" y="440"
    fill="rgba(255,255,255,0.78)"
    font-size="24"
    font-weight="600"
    font-family="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif">
    Upload a shot. Get instant scorecards + coaching feedback.
  </text>
</svg>`;
}

async function renderSvgToPng(svgString, outPath, width, height) {
  await sharp(Buffer.from(svgString), { density: 300 })
    .resize(width, height)
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outPath);
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  const youtubeSvg = makeYoutubeSvg();
  const fbSvg = makeFacebookSvg();
  const ogSvg = makeOpenGraphSvg();

  await fs.writeFile(path.join(outDir, "youtube-banner.svg"), youtubeSvg, "utf8");
  await fs.writeFile(path.join(outDir, "facebook-cover.svg"), fbSvg, "utf8");
  await fs.writeFile(path.join(outDir, "og-image.svg"), ogSvg, "utf8");

  await renderSvgToPng(youtubeSvg, path.join(outDir, "youtube-banner.png"), 2560, 1440);
  await renderSvgToPng(fbSvg, path.join(outDir, "facebook-cover.png"), 1640, 624);
  await renderSvgToPng(ogSvg, path.join(outDir, "og-image.png"), 1200, 630);

  console.log("Generated social banners in public/social/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});



