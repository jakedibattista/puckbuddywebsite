const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Target dimensions
const targetWidth = 1242;
const targetHeight = 2688;

// Images to resize
const imagesToResize = [
  'Coach Nov25.PNG',
  'Home Nov25.PNG',
  'Scores Nov25.PNG',
  'Video Nov25.PNG'
];

async function resizeNov25Images() {
  const rootDir = path.resolve(__dirname, '..');
  const imagesDir = path.join(rootDir, 'IMAGES');
  const publicDir = path.join(__dirname, 'public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  console.log('🔍 Resizing Nov25 images...\n');
  
  for (const imageName of imagesToResize) {
    const inputPath = path.join(imagesDir, imageName);
    
    // Check if file exists
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  File not found: ${imageName}`);
      continue;
    }
    
    // Create output filename (lowercase, replace spaces with hyphens)
    const outputFilename = imageName.toLowerCase().replace(/\s+/g, '-').replace('.png', '.png');
    const outputPath = path.join(publicDir, outputFilename);
    
    try {
      console.log(`📱 Resizing ${imageName} to ${targetWidth}x${targetHeight}...`);
      await sharp(inputPath)
        .resize(targetWidth, targetHeight, {
          fit: 'cover',
          position: 'center'
        })
        .png({ quality: 100 })
        .toFile(outputPath);
      console.log(`✅ Saved: ${outputFilename}\n`);
    } catch (error) {
      console.error(`❌ Error resizing ${imageName}:`, error.message);
    }
  }
  
  console.log('✨ Done! All Nov25 images resized.');
}

resizeNov25Images().catch(console.error);

