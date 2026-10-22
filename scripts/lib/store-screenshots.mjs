// Reads all configured screenshot bytes before output acquisition and delegates complete PNG publication.
// Input/read/render failures propagate to callers; captured source files are never moved or changed.
import fs from "node:fs/promises";
import path from "node:path";
import { storeScreenshotDesigns } from "./store-screenshot-designs.mjs";
import { renderStoreScreenshot } from "./store-screenshot-render.mjs";
import { writeRasterExports } from "./image-exports.mjs";

/** @param {"light"|"bold"} variant @param {{root?:string,outputRoot?:string}} options */
export async function generateStoreScreenshots(variant, options = {}) {
  const design = storeScreenshotDesigns(variant);
  const root = path.resolve(options.root ?? process.cwd());
  const sources = [];
  for (const item of design.images) sources.push(await fs.readFile(path.join(root, "public", item.file)));
  return writeRasterExports(design.images.map((item, index) => ({
    name: item.id, width: design.config.width, height: design.config.height,
    render: () => renderStoreScreenshot(sources[index], item, design),
  })), path.resolve(options.outputRoot ?? path.join(root, "marketing-assets", design.directory)));
}
