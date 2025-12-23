const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Target dimensions
const iPhoneWidth = 1242;
const iPhoneHeight = 2688;
const iPadWidth = 2064;
const iPadHeight = 2752;

async function resizePrototypeImages() {
  const rootDir = path.resolve(__dirname, '..');
  const prototypeDir = path.join(rootDir, 'prototype');
  const publicDir = path.join(__dirname, 'public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Check if prototype directory exists
  if (!fs.existsSync(prototypeDir)) {
    console.error(`❌ Prototype directory not found: ${prototypeDir}`);
    return;
  }
  
  // Get all PNG files from prototype directory
  const files = fs.readdirSync(prototypeDir).filter(file => 
    file.toLowerCase().endsWith('.png')
  );
  
  if (files.length === 0) {
    console.log('⚠️  No PNG files found in prototype directory');
    return;
  }
  
  console.log(`🔍 Found ${files.length} image(s) to resize...\n`);
  
  for (const imageName of files) {
    const inputPath = path.join(prototypeDir, imageName);
    
    // Create base name (remove .png extension, lowercase, replace spaces with hyphens)
    const baseName = imageName
      .replace(/\.png$/i, '')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .trim();
    
    // Resize for iPhone
    const iPhoneOutputFilename = `${baseName}-iphone.png`;
    const iPhoneOutputPath = path.join(publicDir, iPhoneOutputFilename);
    
    try {
      console.log(`📱 Resizing ${imageName} for iPhone to ${iPhoneWidth}x${iPhoneHeight}...`);
      await sharp(inputPath)
        .resize(iPhoneWidth, iPhoneHeight, {
          fit: 'cover',
          position: 'center'
        })
        .png({ quality: 100 })
        .toFile(iPhoneOutputPath);
      console.log(`✅ Saved iPhone version: ${iPhoneOutputFilename}`);
    } catch (error) {
      console.error(`❌ Error resizing iPhone ${imageName}:`, error.message);
    }
    
    // Resize for iPad
    const iPadOutputFilename = `${baseName}-ipad.png`;
    const iPadOutputPath = path.join(publicDir, iPadOutputFilename);
    
    try {
      console.log(`📱 Resizing ${imageName} for iPad to ${iPadWidth}x${iPadHeight}...`);
      await sharp(inputPath)
        .resize(iPadWidth, iPadHeight, {
          fit: 'cover',
          position: 'center'
        })
        .png({ quality: 100 })
        .toFile(iPadOutputPath);
      console.log(`✅ Saved iPad version: ${iPadOutputFilename}\n`);
    } catch (error) {
      console.error(`❌ Error resizing iPad ${imageName}:`, error.message);
    }
  }
  
  console.log('✨ Done! All prototype images resized for iPhone and iPad.');
}

resizePrototypeImages().catch(console.error);


