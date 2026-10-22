// Preflights all walkthrough recordings without moving them, then stages and validates a complete render.
// Publishes local outputs by individual rename; a publication failure can leave a partial batch.
import fs from "node:fs/promises";
import path from "node:path";
import * as video from "./walkthrough-render.mjs";

export const RECORDINGS = [
  "ScreenRecording_06-01-2026 15-43-48_1.mov",
  "ScreenRecording_06-01-2026 15-47-27_1.mov",
  "ScreenRecording_06-01-2026 16-04-28_1.mp4",
  "ScreenRecording_06-01-2026 16-05-02_1.mov",
  "ScreenRecording_06-01-2026 16-06-11_1.mov",
  "ScreenRecording_06-01-2026 16-07-27_1.mp4",
];


async function exists(file) {
  try { await fs.access(file); return true; }
  catch (error) { if (error.code === "ENOENT") return false; throw error; }
}

export async function buildWalkthrough({ root = process.cwd(), renderer = video } = {}) {
  const repoRoot = path.resolve(root, "..");
  const mediaRoot = path.join(repoRoot, "videos", "v2-walkthrough");
  const inputs = [];
  for (const name of RECORDINGS) {
    const original = path.join(repoRoot, name);
    const stored = path.join(mediaRoot, "source", name);
    const [hasOriginal, hasStored] = await Promise.all([exists(original), exists(stored)]);
    if (hasOriginal && hasStored) throw new Error(`Ambiguous recording: ${name}`);
    if (!hasOriginal && !hasStored) throw new Error(`Missing recording: ${name}`);
    const selected = hasStored ? stored : original;
    if (!(await fs.stat(selected)).isFile()) throw new Error(`Recording is not a file: ${name}`);
    inputs.push(selected);
  }
  await fs.mkdir(mediaRoot, { recursive: true });
  const staging = await fs.mkdtemp(path.join(mediaRoot, ".build-"));
  let failure;
  try {
    const layout = await renderer.computePhoneLayout();
    await renderer.buildSlideTemplate(layout, path.join(root, "public"), staging);
    const slides = [];
    for (let index = 0; index < inputs.length; index++) {
      const output = path.join(staging, `${String(index + 1).padStart(2, "0")}-walkthrough.mp4`);
      await renderer.renderSlide(inputs[index], output, layout, staging);
      await renderer.validateVideo(output);
      slides.push(output);
    }
    const full = path.join(staging, "v2-walkthrough-full.mp4");
    await renderer.concatSlides(slides, full, staging);
    await renderer.validateVideo(full);
    const outDir = path.join(mediaRoot, "slides");
    await fs.mkdir(outDir, { recursive: true });
    const destinations = slides.map(file => path.join(outDir, path.basename(file)));
    destinations.push(path.join(mediaRoot, path.basename(full)));
    for (const [index, source] of [...slides, full].entries()) await fs.rename(source, destinations[index]);
    return destinations;
  } catch (error) { failure = error; throw error; }
  finally {
    try { await fs.rm(staging, { recursive: true, force: true }); }
    catch (cleanup) { if (failure) throw new AggregateError([failure, cleanup], "Walkthrough build and cleanup failed"); throw cleanup; }
  }
}
