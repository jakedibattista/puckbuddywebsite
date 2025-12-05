const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

// Target dimensions for 9:16 aspect ratio
// Using 1080x1920 as a good standard size (maintains quality, common for app stores)
const targetWidth = 1080;
const targetHeight = 1920;

const screenshots = [
  'home-iphone.png',
  'scorecard-iphone.png',
  'coach-report-iphone.png',
  'chat-iphone.png',
  'stats-iphone.png',
  'upload-video-iphone.png',
  'coach-select-iphone.png'
];

async function resizeTo916() {
  console.log('Resizing screenshots to 9:16 aspect ratio (1080x1920) for Android...\n');
  
  for (const file of screenshots) {
    const inputPath = path.join(publicDir, file);
    // Replace -iphone.png with -android.png
    const outputPath = path.join(publicDir, file.replace('-iphone.png', '-android.png'));
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  File not found: ${file}`);
      continue;
    }
    
    try {
      console.log(`📱 Resizing ${file} to ${targetWidth}x${targetHeight} (9:16)...`);
      await sharp(inputPath)
        .resize(targetWidth, targetHeight, {
          fit: 'cover',
          position: 'center'
        })
        .png({ quality: 100 })
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`✅ Saved: ${path.basename(outputPath)} (${fileSizeMB} MB)\n`);
    } catch (error) {
      console.error(`❌ Error resizing ${file}:`, error.message);
    }
  }
  
  console.log('✨ Done! All screenshots resized to 9:16 aspect ratio.');
  console.log('\nNew files created with -android suffix (e.g., home-android.png)');
}

resizeTo916().catch(console.error);

