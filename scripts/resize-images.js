const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration: Image dimensions
// iPhone dimensions
const iPhoneConfigs = {
  'chat': { width: 1284, height: 2778 },
  'chat2': { width: 1284, height: 2778 },
  'home': { width: 1284, height: 2778 },
  'loading screen': { width: 1284, height: 2778 },
  'score card': { width: 1284, height: 2778 },
  'scorecard2': { width: 1284, height: 2778 },
  'coach seth': { width: 1284, height: 2778 },
};

// iPad Pro 12.9"/13" dimensions
const iPadConfigs = {
  'chat': { width: 2048, height: 2732 },
  'chat2': { width: 2048, height: 2732 },
  'home': { width: 2048, height: 2732 },
  'loading screen': { width: 2048, height: 2732 },
  'score card': { width: 2048, height: 2732 },
  'scorecard2': { width: 2048, height: 2732 },
  'coach seth': { width: 2048, height: 2732 },
};

// Combine all configs
const imageConfigs = {
  // iPhone versions
  ...Object.fromEntries(Object.entries(iPhoneConfigs).map(([k, v]) => [`${k}-iphone`, v])),
  // iPad versions
  ...Object.fromEntries(Object.entries(iPadConfigs).map(([k, v]) => [`${k}-ipad`, v])),
};

function findImageFile(dir, baseName) {
  const files = fs.readdirSync(dir);
  const lowerBaseName = baseName.toLowerCase();
  
  // Try exact match first (with .png and .PNG)
  if (files.includes(baseName + '.png')) {
    return path.join(dir, baseName + '.png');
  }
  if (files.includes(baseName + '.PNG')) {
    return path.join(dir, baseName + '.PNG');
  }
  
  // Try capitalized version
  const capitalized = baseName.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
  
  if (files.includes(capitalized + '.PNG')) {
    return path.join(dir, capitalized + '.PNG');
  }
  
  // Try case-insensitive match
  for (const file of files) {
    const fileLower = file.toLowerCase();
    if (fileLower === lowerBaseName + '.png' || fileLower === lowerBaseName + '.png') {
      return path.join(dir, file);
    }
  }
  
  // Try variations (without spaces, with underscores, etc.)
  const variations = [
    baseName.replace(/\s+/g, ''),
    baseName.replace(/\s+/g, '_'),
    baseName.replace(/\s+/g, '-'),
    capitalized.replace(/\s+/g, ''),
    capitalized.replace(/\s+/g, '_'),
    capitalized.replace(/\s+/g, '-'),
  ];
  
  for (const variation of variations) {
    for (const ext of ['.png', '.PNG']) {
      if (files.includes(variation + ext)) {
        return path.join(dir, variation + ext);
      }
    }
    for (const file of files) {
      const fileLower = file.toLowerCase();
      if (fileLower === variation.toLowerCase() + '.png') {
        return path.join(dir, file);
      }
    }
  }
  
  return null;
}

async function resizeImages() {
  const rootDir = path.resolve(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Check both root and public directories
  const searchDirs = [rootDir, publicDir];
  
  console.log('🔍 Searching for images...\n');
  
  // First, find all original images
  const originalImageNames = ['chat', 'chat2', 'home', 'loading screen', 'score card', 'scorecard2', 'coach seth'];
  const foundImages = {};
  
  for (const baseName of originalImageNames) {
    for (const dir of searchDirs) {
      if (!fs.existsSync(dir)) continue;
      const found = findImageFile(dir, baseName);
      if (found) {
        foundImages[baseName] = found;
        break;
      }
    }
  }
  
  // Now resize each found image for both iPhone and iPad
  for (const [baseName, imagePath] of Object.entries(foundImages)) {
    // Resize for iPhone
    if (iPhoneConfigs[baseName]) {
      const config = iPhoneConfigs[baseName];
      const outputFilename = baseName.toLowerCase().replace(/\s+/g, '-') + '-iphone.png';
      const outputPath = path.join(publicDir, outputFilename);
      
      try {
        console.log(`📱 Resizing ${path.basename(imagePath)} for iPhone to ${config.width}x${config.height}...`);
        await sharp(imagePath)
          .resize(config.width, config.height, {
            fit: 'cover',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .png({ quality: 100 })
          .toFile(outputPath);
        console.log(`✅ Saved iPhone version: ${outputFilename}\n`);
      } catch (error) {
        console.error(`❌ Error resizing iPhone ${baseName}:`, error.message);
      }
    }
    
    // Resize for iPad
    if (iPadConfigs[baseName]) {
      const config = iPadConfigs[baseName];
      const outputFilename = baseName.toLowerCase().replace(/\s+/g, '-') + '-ipad.png';
      const outputPath = path.join(publicDir, outputFilename);
      
      try {
        console.log(`📱 Resizing ${path.basename(imagePath)} for iPad to ${config.width}x${config.height}...`);
        await sharp(imagePath)
          .resize(config.width, config.height, {
            fit: 'cover',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .png({ quality: 100 })
          .toFile(outputPath);
        console.log(`✅ Saved iPad version: ${outputFilename}\n`);
      } catch (error) {
        console.error(`❌ Error resizing iPad ${baseName}:`, error.message);
      }
    }
  }
  
  console.log('✨ Done! All images resized for both iPhone and iPad.');
}

resizeImages().catch(console.error);

