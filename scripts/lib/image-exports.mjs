// Shares PNG validation and complete staged publication for rendered screenshots and SVG exports.
// Rendering and cleanup failures propagate; individual renames do not form an atomic batch transaction.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/** @param {Buffer} bytes @param {{width:number,height:number}} image */
export function verifyPng(bytes, image) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (bytes.length < 24 || !bytes.subarray(0, 8).equals(signature) || bytes.toString('ascii', 12, 16) !== 'IHDR') throw new Error('Capture did not produce a PNG header.');
  if (bytes.readUInt32BE(16) !== image.width || bytes.readUInt32BE(20) !== image.height) throw new Error(`Artwork dimensions do not match ${image.width}x${image.height}.`);
}


/** @typedef {{name:string,directory?:string,width:number,height:number,render:()=>Promise<Buffer>,svg?:string}} RasterExport */
/** @param {RasterExport[]} designs @param {string} outputRoot */
export async function writeRasterExports(designs, outputRoot) {
  const names = new Set();
  if (!designs.length) throw new Error("No image designs supplied.");
  for (const design of designs) {
    if (typeof design.name !== "string" || !/^[a-z0-9][a-z0-9_-]*$/i.test(design.name) || names.has(design.name) ||
        typeof design.render !== "function" ||
        (design.directory !== undefined && (typeof design.directory !== "string" || !/^[a-z0-9][a-z0-9_-]*$/i.test(design.directory))) ||
        (design.svg !== undefined && (typeof design.svg !== "string" || !design.svg.trim())) ||
        !Number.isInteger(design.width) || design.width <= 0 ||
        !Number.isInteger(design.height) || design.height <= 0) {
      throw new Error("Invalid or duplicate image design.");
    }
    names.add(design.name);
  }
  await fs.mkdir(outputRoot, { recursive: true });
  const staging = await fs.mkdtemp(path.join(outputRoot, ".image-exports-"));
  let failure;
  try {
    const files = [];
    for (const design of designs) {
      if (design.svg !== undefined) {
        const svgFile = path.join(staging, `${design.name}.svg`);
        await fs.writeFile(svgFile, design.svg, "utf8");
        files.push({ staged: svgFile, directory: design.directory });
      }
      const pngFile = path.join(staging, `${design.name}.png`);
      await fs.writeFile(pngFile, await design.render());
      const bytes = await fs.readFile(pngFile);
      verifyPng(bytes, design);
      await sharp(bytes).stats();
      files.push({ staged: pngFile, directory: design.directory });
    }
    const outputs = files.map(file => path.join(outputRoot, file.directory ?? "", path.basename(file.staged)));
    for (const directory of new Set(files.map(file => file.directory).filter(Boolean))) {
      await fs.mkdir(path.join(outputRoot, directory), { recursive: true });
    }
    for (const [index, file] of files.entries()) await fs.rename(file.staged, outputs[index]);
    return outputs;
  } catch (error) { failure = error; throw error; }
  finally {
    try { await fs.rm(staging, { recursive: true, force: true }); }
    catch (cleanup) {
      if (failure) throw new AggregateError([failure, cleanup], "Image export and cleanup failed");
      throw cleanup;
    }
  }
}

/** @param {{name:string,svg:string,width:number,height:number}[]} designs @param {string} outputRoot */
export async function writeSvgExports(designs, outputRoot) {
  if (designs.some(design => typeof design.svg !== "string" || !design.svg.trim())) {
    throw new Error("Invalid SVG design.");
  }
  return writeRasterExports(designs.map(design => ({
    ...design,
    render: async () => sharp(Buffer.from(design.svg), { density: 300 })
      .resize(design.width, design.height)
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toBuffer(),
  })), outputRoot);
}
