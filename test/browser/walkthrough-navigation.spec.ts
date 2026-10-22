// Exercises mobile navigation and walkthrough recovery in Chrome with synthetic local media.
// External requests are blocked; the playable fixture contains no customer recording or provider data.
import { test, expect } from '@playwright/test';
import media from '../fixtures/walkthrough-media.json';
const origin = 'http://127.0.0.1:3417';
test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => route.request().url().startsWith(origin + '/') ? route.continue() : route.abort());
  await page.route('**/v2-walkthrough/**', route => route.fulfill({ status: 200, contentType: 'video/mp4', body: Buffer.from(media.base64, 'base64') }));
});
test('mobile navigation exposes its controlled region and returns focus after Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/about'); const toggle = page.getByRole('button', { name: 'Toggle mobile menu' });
  await toggle.click(); const menu = page.getByRole('navigation', { name: 'Mobile navigation' });
  await expect(menu).toBeVisible(); await expect(toggle).toHaveAttribute('aria-controls', await menu.getAttribute('id') as string);
  await menu.getByRole('link', { name: 'About Us' }).focus(); await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false'); await expect(toggle).toBeFocused(); await expect(menu).toBeHidden();
  await toggle.click(); await menu.getByRole('link', { name: 'Pricing' }).click(); await expect(page).toHaveURL(/\/puckbuddy#pricing$/); await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
test('real synthetic playback retains its playhead and retires media during local navigation', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    const load = HTMLMediaElement.prototype.load;
    HTMLMediaElement.prototype.load = function () {
      const state = window as unknown as { walkthroughLoads: number }; state.walkthroughLoads = (state.walkthroughLoads ?? 0) + 1; load.call(this);
    };
  });
  await page.goto('/v2-walkthrough'); const video = page.locator('video');
  await expect.poll(() => video.evaluate(node => (node as HTMLVideoElement).currentTime)).toBeGreaterThan(0.1);
  const loads = await page.evaluate(() => (window as unknown as { walkthroughLoads: number }).walkthroughLoads);
  await page.getByRole('button', { name: 'Pause', exact: true }).click(); expect(await video.evaluate(node => (node as HTMLVideoElement).paused)).toBe(true);
  const time = await video.evaluate(node => (node as HTMLVideoElement).currentTime);
  await page.getByRole('button', { name: 'Play', exact: true }).click();
  await expect.poll(() => video.evaluate(node => (node as HTMLVideoElement).paused)).toBe(false);
  expect(await video.evaluate(node => (node as HTMLVideoElement).currentTime)).toBeGreaterThanOrEqual(time);
  expect(await page.evaluate(() => (window as unknown as { walkthroughLoads: number }).walkthroughLoads)).toBe(loads);
  const retired = await video.elementHandle(); await page.getByRole('link', { name: 'About Us', exact: true }).first().click(); await expect(page).toHaveURL(/\/about$/);
  expect(await retired!.evaluate(node => (node as HTMLVideoElement).paused)).toBe(true); expect(errors).toEqual([]);
});
test('storage quota failure leaves the current text draft open and reports the failure', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    const set = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) { if (key === 'puckbuddy_v2_slides_v3') throw new DOMException('Fixture quota exhausted', 'QuotaExceededError'); set.call(this, key, value); };
  });
  await page.goto('/v2-walkthrough'); await page.getByRole('button', { name: 'Edit Slide Text' }).click();
  await page.getByLabel('Slide Title').fill('Retain this browser draft'); await page.getByRole('button', { name: 'Save Changes' }).click();
  await expect(page.getByRole('alert').filter({ hasText: 'draft is still open' })).toContainText('draft is still open'); await expect(page.getByLabel('Slide Title')).toHaveValue('Retain this browser draft');
  expect(await page.evaluate(() => localStorage.getItem('puckbuddy_v2_slides_v3'))).toBeNull(); expect(errors).toEqual([]);
});
test('partial cache recovery preserves text and never requests cached foreign media', async ({ page }) => {
  const errors: string[] = []; const foreign: string[] = []; page.on('pageerror', error => errors.push(error.message)); page.on('request', request => { if (request.url().includes('fixture.invalid')) foreign.push(request.url()); });
  await page.addInitScript(() => localStorage.setItem('puckbuddy_v2_slides_v3', JSON.stringify([
    { id: 1, title: 'Recovered browser title', description: 'Recovered browser description', videoSrcs: ['https://fixture.invalid/stale.mp4'] },
    { id: 2, title: { broken: true }, description: null }, null, {}, 'broken',
  ])));
  await page.goto('/v2-walkthrough'); await expect(page.getByRole('heading', { name: 'Recovered browser title' })).toBeVisible();
  await expect(page.getByRole('alert').filter({ hasText: 'could not be loaded' })).toContainText('could not be loaded'); await expect(page.locator('video source')).toHaveAttribute('src', '/v2-walkthrough/ScreenRecording_06-01-2026 15-43-48_1.mov');
  await page.getByRole('button', { name: 'Next', exact: true }).click(); await expect(page.getByRole('heading', { name: 'Master Coach Report Card' })).toBeVisible();
  expect(foreign).toEqual([]); expect(errors).toEqual([]);
});
