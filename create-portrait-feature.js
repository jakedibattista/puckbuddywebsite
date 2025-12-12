const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createPortraitFeature() {
  const outputWidth = 1080;
  const outputHeight = 1920;
  
  // Define the screenshots to use (2-3 key screens)
  const screenshots = [
    { file: 'home-iphone.png', label: 'Home' },
    { file: 'chat-iphone.png', label: 'Chat' },
    { file: 'scorecard-iphone.png', label: 'Scorecard' },
  ];
  
  // Create a base canvas with gradient background
  const base = sharp({
    create: {
      width: outputWidth,
      height: outputHeight,
      channels: 3,
      background: { r: 15, g: 23, b: 42 } // Dark blue-gray background
    }
  });
  
  // Calculate dimensions for each screenshot
  const numScreens = screenshots.length;
  const padding = 40;
  const spacing = 30;
  const availableHeight = outputHeight - (padding * 2) - (spacing * (numScreens - 1));
  const screenHeight = Math.floor(availableHeight / numScreens);
  const screenWidth = Math.floor(screenHeight * (9 / 19)); // iPhone aspect ratio
  
  // Center the screens horizontally
  const startX = Math.floor((outputWidth - screenWidth) / 2);
  
  const composites = [];
  let currentY = padding;
  
  // Process each screenshot
  for (let i = 0; i < screenshots.length; i++) {
    const screenshot = screenshots[i];
    const filePath = path.join(__dirname, 'public', screenshot.file);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`Warning: ${screenshot.file} not found, skipping...`);
      continue;
    }
    
    // Resize and process the screenshot
    const processedImage = await sharp(filePath)
      .resize(screenWidth, screenHeight, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toBuffer();
    
    composites.push({
      input: processedImage,
      top: currentY,
      left: startX
    });
    
    currentY += screenHeight + spacing;
  }
  
  // Composite all images
  const output = await base
    .composite(composites)
    .png()
    .toFile(path.join(__dirname, 'public', 'portrait-feature-1080x1920.png'));
  
  console.log(`✅ Created portrait feature image: public/portrait-feature-1080x1920.png`);
  console.log(`   Dimensions: ${outputWidth}x${outputHeight}px (9:16 ratio)`);
  console.log(`   Screenshots used: ${screenshots.map(s => s.label).join(', ')}`);
}

createPortraitFeature().catch(console.error);

