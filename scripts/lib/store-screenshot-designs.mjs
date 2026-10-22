// Owns the established light/bold Apple screenshot layouts, source catalog and output dimensions.
// Template copy avoids a processing-time promise; rendering and file publication have separate owners.
const BASE_CONFIG = {
  width: 1284, height: 2778, padding: 80, phoneTopMargin: 400,
  frameBorder: 20, cornerRadius: 80, statusBarCrop: 140,
};
const LIGHT_CONFIG = { ...BASE_CONFIG, frameColor: "#1a1a1a", textColor: "#111827", accentColor: "#3b82f6" };
const BOLD_CONFIG = { ...BASE_CONFIG, frameColor: "#000000", textColor: "#FFFFFF" };

const IMAGES = [
  { 
    id: "01_home",
    file: "v2-home.png", 
    title: ["Your Personal", "AI Hockey Coach"] 
  },
  { 
    id: "03_scorecard",
    file: "v2-scorecard.png", 
    title: ["Review Your", "AI Feedback"] 
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

function lightBackground(width, height) {
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

function screenshotTextLines(lines, config) {
  // Simple centered text
  const fontSize = 100;
  const lineHeight = 120;
  const startY = 220; // Distance from top

  // Font stack matching website
  const fontFamily = "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";

  const textLines = lines.map((line, i) => 
    `<text x="50%" y="${startY + (i * lineHeight)}" text-anchor="middle" font-family="${fontFamily}" font-weight="800" font-size="${fontSize}" fill="${config.textColor}" letter-spacing="-2">${line}</text>`
  ).join("\n");

  return textLines;
}

function lightText(width, height, lines, config) {
  const textLines = screenshotTextLines(lines, config);

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    ${textLines}
  </svg>`;
}

// Helper to create a rounded mask for the screenshot

function lightFrame(frameWidth, frameHeight, config) {
  return `
    <svg width="${frameWidth}" height="${frameHeight}" viewBox="0 0 ${frameWidth} ${frameHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${frameWidth}" height="${frameHeight}" rx="${config.cornerRadius}" ry="${config.cornerRadius}" fill="${config.frameColor}"/>
    </svg>`;
}

function boldBackground(width, height) {
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

function boldText(width, height, lines, config) {
  const textLines = screenshotTextLines(lines, config);

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

function boldFrame(frameWidth, frameHeight, config) {
  return `
    <svg width="${frameWidth}" height="${frameHeight}" viewBox="0 0 ${frameWidth} ${frameHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="frameShadow" x="-20%" y="-20%" width="140%" height="140%">
           <feDropShadow dx="0" dy="10" stdDeviation="20" flood-color="#000000" flood-opacity="0.8"/>
           <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="#ffffff" flood-opacity="0.1"/>
        </filter>
      </defs>
      <rect x="0" y="0" width="${frameWidth}" height="${frameHeight}" rx="${config.cornerRadius}" ry="${config.cornerRadius}" fill="${config.frameColor}" stroke="rgba(255,255,255,0.1)" stroke-width="2" filter="url(#frameShadow)"/>
    </svg>`;
}

const STYLES = {
  light: { directory: "app-store", config: LIGHT_CONFIG, background: lightBackground, text: lightText, frame: lightFrame },
  bold: { directory: "app-store-bold", config: BOLD_CONFIG, background: boldBackground, text: boldText, frame: boldFrame },
};

/** @param {"light"|"bold"} variant */
export function storeScreenshotDesigns(variant) {
  if (!Object.hasOwn(STYLES, variant)) throw new Error("Unknown store screenshot style.");
  const style = STYLES[variant];
  return { ...style, config: { ...style.config }, images: IMAGES.map(item => ({ ...item, title: [...item.title] })) };
}
