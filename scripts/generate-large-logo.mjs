import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, '../public/BlackLogo.svg');
const outputPath = path.join(__dirname, '../public/logo-1024.png');

async function generateLogo() {
  try {
    await sharp(inputPath)
      .resize(1024, 1024, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(outputPath);
    console.log(`Successfully generated 1024x1024 PNG at: ${outputPath}`);
  } catch (error) {
    console.error('Error generating logo:', error);
    process.exit(1);
  }
}

generateLogo();
