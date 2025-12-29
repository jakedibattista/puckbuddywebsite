# Codebase Cleanup Summary

## Completed Cleanup Tasks

### ✅ Scripts Organization
- Created `scripts/` directory to organize all utility scripts
- Moved all resize and asset generation scripts to `scripts/`
- Updated all script paths to work from the new location
- Created `scripts/README.md` documenting all scripts

### ✅ Folder Cleanup
- Removed empty `src/app/demo/` directory
- Removed duplicate demo images from `presentation/` folder (kept in `public/`)

## Potential Future Cleanup

### Public Folder Organization
The `public/` folder contains:
- **Original source images** (`.PNG` files) - These are used as source files for resizing
- **Resized images** (`-iphone.png`, `-ipad.png`, `-android.png`) - Generated from source files
- **Demo images** (`demo-*.png`) - Used by InteractiveDemo component
- **Feature graphics** - Generated composite images

**Note**: Original `.PNG` files are kept as source files for the resize scripts. If you want to remove them after resizing, you can do so, but you'll need to update the resize scripts to point to different source locations.

### Image Naming Consistency
Some images have inconsistent naming:
- Some use spaces: `Coach report.PNG`, `Stats .PNG`
- Some use dashes: `coach-report-iphone.png`
- Some use mixed case: `.PNG` vs `.png`

Consider standardizing to lowercase with dashes for all new images.

### Unused Files
Consider reviewing:
- `instagram-posts/` folder - Are these still needed?
- `presentation/` folder - Now empty, can be removed if not needed
- Original `.PNG` files in public if they're no longer needed as sources

## Scripts Location
All scripts are now in `scripts/` directory. Run them with:
```bash
node scripts/[script-name].js
```


