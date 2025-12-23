const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Target dimensions
const iPhoneWidth = 1242;
const iPhoneHeight = 2688;
const iPadWidth = 2064;
const iPadHeight = 2752;

async function resize13Images() {
  const rootDir = path.resolve(__dirname, '..');
  const imagesDir = path.join(rootDir, 'IMAGES', '1.3');
  const publicDir = path.join(__dirname, 'public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Check if images directory exists
  if (!fs.existsSync(imagesDir)) {
    console.error(`❌ Images directory not found: ${imagesDir}`);
    return;
  }
  
  // Get all PNG files from 1.3 directory
  const files = fs.readdirSync(imagesDir).filter(file => 
    file.toLowerCase().endsWith('.png')
  );
  
  if (files.length === 0) {
    console.log('⚠️  No PNG files found in IMAGES/1.3 directory');
    return;
  }
  
  console.log(`🔍 Found ${files.length} image(s) to resize...\n`);
  
  for (const imageName of files) {
    const inputPath = path.join(imagesDir, imageName);
    
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
  
  console.log('✨ Done! All 1.3 images resized for iPhone and iPad.');
}

resize13Images().catch(console.error);

