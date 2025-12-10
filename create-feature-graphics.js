const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const width = 1024;
const height = 500;

async function createOption1() {
  console.log('Creating Option 1: App Screenshots Showcase...');
  
  // Create gradient background (gray-900 to blue-900)
  const gradient = sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: { r: 17, g: 24, b: 39, alpha: 1 } // gray-900
    }
  });

  // Load app screenshots
  const homeImg = sharp(path.join(publicDir, 'home-iphone.png'));
  const scorecardImg = sharp(path.join(publicDir, 'scorecard-iphone.png'));
  const coachReportImg = sharp(path.join(publicDir, 'coach-report-iphone.png'));

  // Resize screenshots to fit (each will be about 280px wide, maintaining aspect ratio)
  const screenshotHeight = 400;
  const screenshotWidth = Math.round((screenshotHeight * 9) / 19); // iPhone aspect ratio
  
  const homeResized = await homeImg.resize(screenshotWidth, screenshotHeight, {
    fit: 'cover',
    position: 'center'
  }).toBuffer();
  
  const scorecardResized = await scorecardImg.resize(screenshotWidth, screenshotHeight, {
    fit: 'cover',
    position: 'center'
  }).toBuffer();
  
  const coachReportResized = await coachReportImg.resize(screenshotWidth, screenshotHeight, {
    fit: 'cover',
    position: 'center'
  }).toBuffer();

  // Calculate positions (centered vertically, spaced horizontally)
  const spacing = 30;
  const totalWidth = (screenshotWidth * 3) + (spacing * 2);
  const startX = (width - totalWidth) / 2;
  const yPos = (height - screenshotHeight) / 2;

  // Create composite
  const output = await gradient
    .composite([
      {
        input: homeResized,
        left: Math.round(startX),
        top: Math.round(yPos)
      },
      {
        input: scorecardResized,
        left: Math.round(startX + screenshotWidth + spacing),
        top: Math.round(yPos)
      },
      {
        input: coachReportResized,
        left: Math.round(startX + (screenshotWidth + spacing) * 2),
        top: Math.round(yPos)
      }
    ])
    .png()
    .toFile(path.join(publicDir, 'feature-graphic-option1.png'));

  console.log('✅ Option 1 created: feature-graphic-option1.png');
}

async function createOption2() {
  console.log('Creating Option 2: Hero-Style Banner...');
  
  // Create gradient background (gray-900 to blue-900)
  const gradient = sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: { r: 17, g: 24, b: 39, alpha: 1 } // gray-900
    }
  });

  // Load app screenshots for right side
  const homeImg = sharp(path.join(publicDir, 'home-iphone.png'));
  const scorecardImg = sharp(path.join(publicDir, 'scorecard-iphone.png'));

  // Resize screenshots smaller for right side
  const screenshotHeight = 350;
  const screenshotWidth = Math.round((screenshotHeight * 9) / 19);
  
  const homeResized = await homeImg.resize(screenshotWidth, screenshotHeight, {
    fit: 'cover',
    position: 'center'
  }).toBuffer();
  
  const scorecardResized = await scorecardImg.resize(screenshotWidth, screenshotHeight, {
    fit: 'cover',
    position: 'center'
  }).toBuffer();

  // Position screenshots on right side
  const rightMargin = 40;
  const spacing = 20;
  const rightX = width - screenshotWidth - rightMargin;
  const topY = (height - (screenshotHeight * 2 + spacing)) / 2;

  // Create SVG text overlay
  const textSvg = `
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <text x="60" y="180" font-family="Arial, sans-serif" font-size="56" font-weight="bold" fill="url(#textGradient)">
        Your Personal AI
      </text>
      <text x="60" y="240" font-family="Arial, sans-serif" font-size="56" font-weight="bold" fill="url(#textGradient)">
        Hockey Coach
      </text>
      <text x="60" y="300" font-family="Arial, sans-serif" font-size="24" fill="#9ca3af">
        AI-Powered Video Analysis
      </text>
    </svg>
  `;

  const textBuffer = Buffer.from(textSvg);

  // Create composite
  const output = await gradient
    .composite([
      {
        input: textBuffer,
        left: 0,
        top: 0
      },
      {
        input: homeResized,
        left: rightX,
        top: Math.round(topY)
      },
      {
        input: scorecardResized,
        left: rightX,
        top: Math.round(topY + screenshotHeight + spacing)
      }
    ])
    .png()
    .toFile(path.join(publicDir, 'feature-graphic-option2.png'));

  console.log('✅ Option 2 created: feature-graphic-option2.png');
}

async function main() {
  try {
    await createOption1();
    await createOption2();
    console.log('\n✨ Both feature graphics created successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main();




