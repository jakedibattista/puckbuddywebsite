# Scripts Directory

This directory contains utility scripts for image processing and asset generation for the Puck Buddy website.

## Image Resizing Scripts

### `resize-images.js`
Resizes images from the root/public directories to iPhone and iPad formats for App Store Connect.
- **iPhone dimensions**: 1284x2778
- **iPad dimensions**: 2048x2732
- **Usage**: `node scripts/resize-images.js`

### `resize-new-images.js`
Resizes specific images from the public folder to iPhone and iPad formats.
- **iPhone dimensions**: 1284x2778
- **iPad dimensions**: 2064x2752
- **Usage**: `node scripts/resize-new-images.js`

### `resize-nov25.js`
Resizes November 2025 images from `IMAGES/Nov2025/` to iPhone format.
- **Dimensions**: 1242x2688
- **Usage**: `node scripts/resize-nov25.js`

### `resize-nov25-ipad.js`
Resizes November 2025 images from `IMAGES/Nov2025/` to iPad format.
- **Dimensions**: 2064x2752
- **Usage**: `node scripts/resize-nov25-ipad.js`

### `resize-prototype-dec10.js`
Resizes prototype images from `prototype/` directory to iPhone and iPad formats.
- **iPhone dimensions**: 1242x2688
- **iPad dimensions**: 2064x2752
- **Usage**: `node scripts/resize-prototype-dec10.js`

### `resize-1.3-images.js`
Resizes version 1.3 images from `IMAGES/1.3/` directory to iPhone and iPad formats.
- **iPhone dimensions**: 1242x2688
- **iPad dimensions**: 2064x2752
- **Usage**: `node scripts/resize-1.3-images.js`

### `resize-to-916.js`
Resizes iPhone screenshots to Android format (9:16 aspect ratio).
- **Dimensions**: 1080x1920
- **Usage**: `node scripts/resize-to-916.js`

## Asset Generation Scripts

### `create-feature-graphics.js`
Creates feature graphics for app stores by compositing multiple screenshots.
- **Output dimensions**: 1024x500
- **Usage**: `node scripts/create-feature-graphics.js`

### `create-portrait-feature.js`
Creates portrait-oriented feature graphics (9:16 aspect ratio).
- **Output dimensions**: 1080x1920
- **Usage**: `node scripts/create-portrait-feature.js`

## Requirements

All scripts require the `sharp` package, which is already included in the project dependencies.

## Notes

- All scripts output to the `public/` directory
- Scripts automatically handle path resolution from the `scripts/` directory
- Original images are preserved; scripts create new resized versions

