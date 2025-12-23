const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Target dimensions
const iPhoneWidth = 1284;
const iPhoneHeight = 2778;
const iPadWidth = 2064;
const iPadHeight = 2752;

// Images to resize (matching the exact filenames in public folder)
const imagesToResize = [
  'Chat.PNG',
  'Coach report.PNG',
  'Coach select .PNG',
  'Home.PNG',
  'Scorecard.PNG',
  'Stats .PNG',
  'Upload video.PNG'
];

async function resizeNewImages() {
  const rootDir = path.resolve(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    console.error('❌ Public directory not found!');
    return;
  }
  
  console.log('🔍 Resizing new images for iPhone and iPad...\n');
  
  for (const imageName of imagesToResize) {
    const inputPath = path.join(publicDir, imageName);
    
    // Check if file exists
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  File not found: ${imageName}`);
      continue;
    }
    
    // Create base filename (lowercase, trim spaces, replace spaces with hyphens, remove multiple hyphens)
    const baseName = imageName.toLowerCase().trim().replace(/\s+/g, '-').replace('.png', '').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
    
    // Resize for iPhone
    const iPhoneOutputFilename = `${baseName}-iphone.png`;
    const iPhoneOutputPath = path.join(publicDir, iPhoneOutputFilename);
    
    try {
      console.log(`📱 Resizing ${imageName} to ${iPhoneWidth}x${iPhoneHeight} (iPhone)...`);
      await sharp(inputPath)
        .resize(iPhoneWidth, iPhoneHeight, {
          fit: 'cover',
          position: 'center'
        })
        .png({ quality: 100 })
        .toFile(iPhoneOutputPath);
      console.log(`✅ Saved iPhone: ${iPhoneOutputFilename}`);
    } catch (error) {
      console.error(`❌ Error resizing iPhone ${imageName}:`, error.message);
    }
    
    // Resize for iPad
    const iPadOutputFilename = `${baseName}-ipad.png`;
    const iPadOutputPath = path.join(publicDir, iPadOutputFilename);
    
    try {
      console.log(`📱 Resizing ${imageName} to ${iPadWidth}x${iPadHeight} (iPad)...`);
      await sharp(inputPath)
        .resize(iPadWidth, iPadHeight, {
          fit: 'cover',
          position: 'center'
        })
        .png({ quality: 100 })
        .toFile(iPadOutputPath);
      console.log(`✅ Saved iPad: ${iPadOutputFilename}\n`);
    } catch (error) {
      console.error(`❌ Error resizing iPad ${imageName}:`, error.message);
    }
  }
  
  console.log('✨ Done! All new images resized for iPhone and iPad.');
}

resizeNewImages().catch(console.error);

