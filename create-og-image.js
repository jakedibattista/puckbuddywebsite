const sharp = require('sharp');
const path = require('path');

async function createOGImage() {
  const inputPath = path.join(__dirname, 'public', 'seth_logo.jpeg');
  const outputPath = path.join(__dirname, 'public', 'og-image.jpeg');
  
  // Target Open Graph dimensions
  const targetWidth = 1200;
  const targetHeight = 630;
  
  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`Original image: ${metadata.width}x${metadata.height}`);
    
    // Calculate resize dimensions to fit within 1200x630 while maintaining aspect ratio
    // Since original is square (1179x1179), we'll fit to height (630) and center horizontally
    const scale = targetHeight / metadata.height;
    const scaledWidth = Math.round(metadata.width * scale);
    
    console.log(`Scaled dimensions: ${scaledWidth}x${targetHeight}`);
    
    // Resize image to fit height, then center on 1200x630 canvas
    await sharp(inputPath)
      .resize(scaledWidth, targetHeight, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 } // White background
      })
      .extend({
        top: 0,
        bottom: 0,
        left: Math.floor((targetWidth - scaledWidth) / 2),
        right: Math.ceil((targetWidth - scaledWidth) / 2),
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .jpeg({ quality: 90 })
      .toFile(outputPath);
    
    console.log(`✅ Created optimized OG image: ${outputPath}`);
    console.log(`   Dimensions: ${targetWidth}x${targetHeight}`);
    console.log(`   Puck is centered horizontally`);
  } catch (error) {
    console.error('Error creating OG image:', error);
    process.exit(1);
  }
}

createOGImage();

