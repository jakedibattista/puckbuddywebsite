// Checks literal ffmpeg arguments and strict output admission without shell execution or real recordings.
// Real image composition uses the maintained SVG logo; subprocess responses are controlled here.
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
const io = vi.hoisted(() => ({ execFileSync: vi.fn() }));
vi.mock('node:child_process', () => ({ execFileSync: io.execFileSync, default: { execFileSync: io.execFileSync } }));
import { execFileSync } from 'node:child_process';
import { computePhoneLayout, buildSlideTemplate, renderSlide, concatSlides, validateVideo } from '../scripts/lib/walkthrough-render.mjs';
let root: string;
const report = () => ({ streams: [{ codec_type: 'video', codec_name: 'h264', pix_fmt: 'yuv420p', width: 1920, height: 1080 }], format: { duration: '1.25' } });
beforeEach(async () => { root = await fs.mkdtemp(path.join(os.tmpdir(), "render '$()-")); vi.mocked(execFileSync).mockReset(); });
afterEach(async () => { await fs.rm(root, { recursive: true, force: true }); });
it('preserves phone geometry and produces a complete 1920 by 1080 template', async () => {
  const layout = await computePhoneLayout();
  expect(layout).toEqual({ innerWidth: 382, innerHeight: 780, innerRadius: 50, frameWidth: 422, frameHeight: 820, phoneX: 749, phoneY: 230, videoX: 769, videoY: 250 });
  await buildSlideTemplate(layout, path.join(process.cwd(), 'public'), root);
  expect(await sharp(path.join(root, 'slide-template.png')).metadata()).toMatchObject({ format: 'png', width: 1920, height: 1080 });
});
it('keeps paths literal and preserves crop, overlay, silent encoding and fast-start arguments', async () => {
  const input = path.join(root, 'clip "$(touch nope)`.mov'), output = path.join(root, 'out.mp4');
  renderSlide(input, output, await computePhoneLayout(), root);
  expect(execFileSync).toHaveBeenCalledExactlyOnceWith('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'warning', '-i', input, '-loop', '1', '-framerate', '30', '-i', path.join(root, 'slide-template.png'), '-filter_complex', '[0:v]crop=1170:2392:0:140,scale=382:780:flags=lanczos,setsar=1[vid];[1:v]scale=1920:1080[bg];[bg][vid]overlay=769:250:shortest=1[out]', '-map', '[out]', '-an', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '22', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-shortest', output], { stdio: 'inherit' });
});
it('escapes concat-file apostrophes and preserves slide order without invoking a shell', async () => {
  const slides = [path.join(root, "01 'quoted'.mp4"), path.join(root, '02 $(literal).mp4')], output = path.join(root, 'full.mp4');
  await concatSlides(slides, output, root);
  expect(await fs.readFile(path.join(root, 'concat.txt'), 'utf8')).toBe(slides.map(file => "file '" + file.replace(/'/g, "'\\''") + "'").join('\n'));
  expect(execFileSync).toHaveBeenCalledExactlyOnceWith('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(root, 'concat.txt'), '-c', 'copy', '-movflags', '+faststart', output], { stdio: 'inherit' });
});
it('accepts a nonempty silent H.264 video only after probing the actual staged file', async () => {
  const file = path.join(root, 'video.mp4'); await fs.writeFile(file, 'new output'); vi.mocked(execFileSync).mockReturnValue(JSON.stringify(report()));
  await expect(validateVideo(file)).resolves.toBeUndefined();
  expect(execFileSync).toHaveBeenCalledWith('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', file], { encoding: 'utf8' });
});
it.each(['empty', 'directory', 'width', 'height', 'codec', 'pixels', 'audio', 'missing video', 'duplicate video', 'duration zero', 'duration invalid', 'json', 'probe failure'])('rejects %s output', async fault => {
  const file = path.join(root, 'video.mp4'), data = report();
  if (fault === 'directory') await fs.mkdir(file); else await fs.writeFile(file, fault === 'empty' ? '' : 'new output');
  if (fault === 'width') data.streams[0].width = 100;
  if (fault === 'height') data.streams[0].height = 100;
  if (fault === 'codec') data.streams[0].codec_name = 'vp9';
  if (fault === 'pixels') data.streams[0].pix_fmt = 'yuv444p';
  if (fault === 'audio') data.streams.push({ ...data.streams[0], codec_type: 'audio' });
  if (fault === 'missing video') data.streams = [];
  if (fault === 'duplicate video') data.streams.push({ ...data.streams[0] });
  if (fault === 'duration zero') data.format.duration = '0';
  if (fault === 'duration invalid') data.format.duration = 'NaN';
  vi.mocked(execFileSync).mockReturnValue(fault === 'json' ? 'broken' : JSON.stringify(data));
  if (fault === 'probe failure') vi.mocked(execFileSync).mockImplementation(() => { throw Error('probe unavailable'); });
  const outcome = await validateVideo(file).catch((error: Error) => error);
  expect(outcome).toBeInstanceOf(Error);
});
