// Captures every Lite source before rendering and publishes both device sets through one validated staging lifecycle.
// Source bytes stay in place; per-file publication failures remain visible and do not promise an atomic batch.
import fs from "node:fs/promises";
import path from "node:path";
import { liteScreenshotDesigns } from "./lite-screenshot-designs.mjs";
import { renderLitePanorama, renderLiteScreen } from "./lite-screenshot-render.mjs";
import { writeRasterExports } from "./image-exports.mjs";

/** @param {{root?:string,outputRoot?:string}} options */
export async function generateLiteScreenshots(options = {}) {
  const root = path.resolve(options.root ?? process.cwd());
  const devices = liteScreenshotDesigns();
  const inputs = new Map();
  for (const device of devices) for (const item of [device.panorama, ...device.images]) {
    if (!inputs.has(item.file)) inputs.set(item.file, await fs.readFile(path.join(root, "public", item.file)));
  }
  const jobs = devices.flatMap(device => {
    let panorama;
    const base = { directory: device.directory, width: device.config.width, height: device.config.height };
    return [
      ...["01_split_left", "02_split_right"].map((name, side) => ({ ...base, name: device.prefix + name,
        render: async () => (await (panorama ??= renderLitePanorama(inputs.get(device.panorama.file), device.panorama.cropTop, device.config)))[side],
      })),
      ...device.images.map(item => ({ ...base, name: item.id,
        render: () => renderLiteScreen(inputs.get(item.file), item, device.config),
      })),
    ];
  });
  return writeRasterExports(jobs, path.resolve(options.outputRoot ?? path.join(root, "marketing-assets")));
}
