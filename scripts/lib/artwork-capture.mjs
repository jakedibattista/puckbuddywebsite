// Captures configured artwork into staging, verifies saved PNG dimensions and publishes only completed captures.
// Browser, staging and owned-server cleanup run on both success and failure; generated files are local drafts.
import puppeteer from 'puppeteer';
import path from 'node:path';
import fs from 'node:fs/promises';
import { artworkPlans } from './artwork-plans.mjs';
import { createArtworkServer } from './artwork-server.mjs';

/** @param {Buffer} bytes @param {{width:number,height:number}} image */
function verifyPng(bytes, image) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (bytes.length < 24 || !bytes.subarray(0, 8).equals(signature) || bytes.toString('ascii', 12, 16) !== 'IHDR') throw new Error('Capture did not produce a PNG header.');
  if (bytes.readUInt32BE(16) !== image.width || bytes.readUInt32BE(20) !== image.height) throw new Error(`Artwork dimensions do not match ${image.width}x${image.height}.`);
}

async function captureJob(browser, job, base, staging, index) {
  const page = await browser.newPage();
  await page.setViewport(job.viewport);
  const response = await page.goto(base + job.route, { waitUntil: 'networkidle0' });
  if (!response?.ok()) throw new Error(`Artwork page unavailable: ${job.route}`);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(async image => {
      if (!image.complete) await image.decode();
      if (!image.naturalWidth) throw new Error('Artwork image did not load.');
    }));
  });
  const directory = path.join(staging, String(index));
  await fs.mkdir(directory, { recursive: true });
  const captures = [];
  for (const image of job.images) {
    const element = await page.$(`#${image.id}`);
    if (!element) throw new Error(`Required artwork element #${image.id} not found.`);
    const temporary = path.join(directory, image.file);
    await element.screenshot({ path: temporary, type: 'png' });
    verifyPng(await fs.readFile(temporary), image);
    captures.push({ temporary, directory: job.directory, file: image.file, width: image.width, height: image.height });
  }
  return captures;
}

/** @param {keyof typeof artworkPlans} name @param {{root?:string,outputRoot?:string,port?:number}} options */
export async function captureArtwork(name, options = {}) {
  const jobs = artworkPlans[name];
  if (!jobs) throw new Error(`Unknown artwork plan: ${name}`);
  const root = path.resolve(options.root ?? process.cwd());
  const outputRoot = path.resolve(options.outputRoot ?? path.join(root, 'marketing-assets'));
  const server = createArtworkServer(root, options.port ?? 3000);
  let staging;
  let browser;
  let captures = [];
  const errors = [];
  try {
    await fs.mkdir(outputRoot, { recursive: true });
    staging = await fs.mkdtemp(path.join(outputRoot, '.puckbuddy-artwork-'));
    await server.ready(jobs[0].route);
    browser = await puppeteer.launch({ headless: true });
    for (const [index, job] of jobs.entries()) captures.push(...await captureJob(browser, job, server.base, staging, index));
    for (const capture of captures) {
      const directory = path.join(outputRoot, capture.directory);
      await fs.mkdir(directory, { recursive: true });
      await fs.rename(capture.temporary, path.join(directory, capture.file));
    }
  } catch (error) { errors.push(error); }
  for (const cleanup of [async () => { if (browser) await browser.close(); }, () => server.close(), async () => { if (staging) await fs.rm(staging, { recursive: true, force: true }); }]) {
    try { await cleanup(); } catch (error) { errors.push(error); }
  }
  if (errors.length === 1) throw errors[0];
  if (errors.length > 1) throw new AggregateError(errors, 'Artwork capture or cleanup failed.');
  return captures.map(({ directory, file, width, height }) => ({ path: path.join(outputRoot, directory, file), width, height }));
}

/** @param {keyof typeof artworkPlans} name */
export async function runArtworkCommand(name) {
  try {
    const captures = await captureArtwork(name);
    for (const capture of captures) console.log(`Saved ${capture.path} (${capture.width}x${capture.height})`);
    console.log(`Artwork capture complete: ${captures.length} local PNG files.`);
  } catch (error) { console.error(error); process.exitCode = 1; }
}
