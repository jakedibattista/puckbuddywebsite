// Protects saved walkthrough text recovery without allowing cached IDs or media to replace the catalog.
import { expect, it } from 'vitest';
import { DEFAULT_SLIDES, restoreWalkthroughSlides } from '../src/app/lib/walkthroughSlides';
const cache = () => DEFAULT_SLIDES.map(slide => ({ ...slide, videoSrcs: [...slide.videoSrcs] }));
it('restores every valid saved title and description with the existing catalog media', () => {
  const saved = cache().map(slide => ({ ...slide, title: `Saved ${slide.id}`, description: `Description ${slide.id}`, videoSrcs: ['https://fixture.invalid/stale.mp4'] }));
  const before = structuredClone(saved); const result = restoreWalkthroughSlides(JSON.stringify(saved));
  expect(result.complete).toBe(true);
  for (const [index, slide] of result.slides.entries()) {
    expect(slide.title).toBe(`Saved ${slide.id}`); expect(slide.description).toBe(`Description ${slide.id}`);
    expect(slide.videoSrcs).toEqual(DEFAULT_SLIDES[index].videoSrcs);
  }
  expect(saved).toEqual(before);
});
it.each([null, {}, 0, 'bad', false])('returns defaults for a non-array cache: %j', value => {
  expect(restoreWalkthroughSlides(JSON.stringify(value))).toEqual({ slides: DEFAULT_SLIDES, complete: false });
});
it.each([null, [], {}, { id: 99, title: 'Wrong owner', description: 'Wrong owner' }].map(value => [value]))('recovers neighboring edits around an invalid row: %j', value => {
  const saved: unknown[] = cache(); saved[0] = value; saved[1] = { id: 2, title: 'Retain me', description: 'Retain this too' };
  const result = restoreWalkthroughSlides(JSON.stringify(saved));
  expect(result.complete).toBe(false); expect(result.slides[0]).toEqual(DEFAULT_SLIDES[0]);
  expect(result.slides[1]).toMatchObject({ title: 'Retain me', description: 'Retain this too' });
});
it.each([
  [{ id: 1, description: 'Keep description' }, 'AI Coaching & Drill Selection', 'Keep description'],
  [{ id: 1, title: null, description: 'Keep description' }, 'AI Coaching & Drill Selection', 'Keep description'],
  [{ id: 1, title: 'Keep title' }, 'Keep title', DEFAULT_SLIDES[0].description],
  [{ id: 1, title: 'Keep title', description: {} }, 'Keep title', DEFAULT_SLIDES[0].description],
] as const)('preserves valid text independently of a malformed companion: %j', (value, title, description) => {
  const saved: unknown[] = cache(); saved[0] = value;
  const result = restoreWalkthroughSlides(JSON.stringify(saved)); expect(result.complete).toBe(false);
  expect(result.slides[0]).toMatchObject({ title, description });
});
it.each([[], [...cache(), { id: 6 }]].map(value => [value]))('does not let a truncated or extended cache change slide count', value => {
  const result = restoreWalkthroughSlides(JSON.stringify(value)); expect(result.complete).toBe(false); expect(result.slides).toHaveLength(5);
});
it('preserves intentionally empty text and isolates returned objects from defaults', () => {
  const saved = cache(); saved[0].title = ''; saved[0].description = '';
  const result = restoreWalkthroughSlides(JSON.stringify(saved)); expect(result.complete).toBe(true);
  expect(result.slides[0].title).toBe(''); expect(result.slides[0].description).toBe('');
  result.slides[1].title = 'Changed result'; result.slides[1].videoSrcs.push('another.mp4');
  expect(DEFAULT_SLIDES[1].title).toBe('Master Coach Report Card'); expect(DEFAULT_SLIDES[1].videoSrcs).toHaveLength(1);
});
it('leaves invalid JSON classification to its storage owner', () => { expect(() => restoreWalkthroughSlides('{bad')).toThrow(SyntaxError); });
