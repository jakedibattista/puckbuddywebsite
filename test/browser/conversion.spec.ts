// Verifies download and inquiry navigation in a local browser without sending external requests.
import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
  // Exercise local pages without sending telemetry or opening external services.
  await page.route('**/*', route => route.request().url().startsWith('http://127.0.0.1:3417') ? route.continue() : route.abort());
});
test('download chooser and partner inquiry are reachable', async ({ page }) => {
  await page.goto('/puckbuddy');
  await expect(page.locator('a[href*="apps.apple.com"]').first()).toBeVisible();
  await expect(page.locator('a[href*="play.google.com"]').first()).toBeVisible();
  await page.goto('/partner');
  await page.getByRole('button', { name: 'Request a promo code' }).first().click();
  await expect(page.locator('#contact form')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Partner Program', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Send inquiry', exact: true })).toBeVisible();
  expect(await page.locator('form').evaluate(form => (form as HTMLFormElement).checkValidity())).toBe(false);
});
test('Android home links hydrate to Google Play without hydration errors', async ({ browser }) => {
  const context = await browser.newContext({ userAgent: 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/130 Mobile Safari/537.36', viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.route('**/*', route => route.request().url().startsWith('http://127.0.0.1:3417') ? route.continue() : route.abort());
  const errors: string[] = [];
  page.on('console', message => { if (message.type() === 'error' && /hydrat/i.test(message.text())) errors.push(message.text()); });
  await page.goto('/');
  await expect(page.locator('a[aria-label*="Google Play"]').first()).toHaveAttribute('href', /play.google.com/);
  expect(errors).toEqual([]);
  await context.close();
});
test('reduced-motion product previews hydrate as a static poster', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.route('**/*', route => route.request().url().startsWith('http://127.0.0.1:3417') ? route.continue() : route.abort());
  const errors: string[] = [];
  page.on('console', message => { if (message.type() === 'error' && /hydrat/i.test(message.text())) errors.push(message.text()); });
  await page.goto('/puckbuddy');
  await expect(page.getByRole('img', { name: 'Scorecard feature showcase' })).toBeVisible();
  await expect(page.locator('video')).toHaveCount(0);
  expect(errors).toEqual([]);
  await context.close();
});
test('the screenshot demo navigates from Journal to Scoreboard', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Journal', exact: true }).click();
  await page.getByRole('button', { name: 'Navigate to Scoreboard', exact: true }).click();
  await expect(page.getByRole('img', { name: 'Scoreboard', exact: true })).toBeVisible();
});

test('partner receipt confirms only after the server acknowledges storage', async ({ page }) => {
  await page.route('**/api/partner-inquiries', async route => {
    const payload = route.request().postDataJSON();
    await route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({ received: true, reference: payload.id }) });
  });
  await page.goto('/partner#contact');
  await page.getByLabel('Name', { exact: false }).fill('Browser Fixture');
  await page.getByLabel('Email', { exact: false }).fill('fixture@example.test');
  await page.getByLabel('Tell us more', { exact: false }).fill('Local browser receipt check');
  await page.getByRole('button', { name: 'Send inquiry', exact: true }).click();
  await expect(page.getByText('Your inquiry has been received.')).toBeVisible();
});

test('partner entrance animations stay inside the mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/partner');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('#offerings').scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('#contact').scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('homepage preview follows live reduced-motion changes without hydration errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error' && /hydrat/i.test(message.text())) errors.push(message.text()); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('img', { name: 'Puck Buddy scorecard showing AI shot analysis on a phone' })).toBeVisible();
  await expect(page.getByLabel('Puck Buddy app scorecard preview')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const preview = page.getByLabel('Puck Buddy app scorecard preview');
  await expect(preview).toBeVisible();
  const detached = await preview.elementHandle();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(preview).toHaveCount(0);
  expect(await detached!.evaluate(video => (video as HTMLVideoElement).paused)).toBe(true);
  expect(errors).toEqual([]);
});

test('partner inquiry selection exposes its state and honors reduced-motion scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    const original = HTMLElement.prototype.scrollIntoView;
    HTMLElement.prototype.scrollIntoView = function (options) {
      (window as unknown as { inquiryScrolls: unknown[] }).inquiryScrolls ??= [];
      (window as unknown as { inquiryScrolls: unknown[] }).inquiryScrolls.push(options);
      original.call(this, options);
    };
  });
  await page.route('**/api/partner-inquiries', async route => {
    const body = route.request().postDataJSON(); expect(body.tier).toBe('custom');
    await route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({ received: true, reference: body.id }) });
  });
  await page.goto('/partner'); await page.getByRole('button', { name: 'Request a promo code' }).click();
  const group = page.getByRole('group', { name: /interested in/ });
  await expect(group.getByRole('button', { name: 'Partner Program' })).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(() => page.evaluate(() => (window as unknown as { inquiryScrolls?: unknown[] }).inquiryScrolls)).toContainEqual({ behavior: 'auto', block: 'start' });
  await group.getByRole('button', { name: 'Custom Development' }).click();
  await expect(group.getByRole('button', { name: 'Custom Development' })).toHaveAttribute('aria-pressed', 'true');
  await expect(group.getByRole('button', { name: 'Partner Program' })).toHaveAttribute('aria-pressed', 'false');
  await page.getByLabel('Name', { exact: false }).fill('Browser Fixture');
  await page.getByLabel('Email', { exact: false }).fill('fixture@example.test');
  await page.getByLabel('Tell us more', { exact: false }).fill('Controlled tier override');
  await page.getByRole('button', { name: 'Send inquiry' }).click();
  await expect(page.getByText('Your inquiry has been received.')).toBeVisible();
});

test('the shared hook updates through its legacy-query boundary while framework queries keep native APIs', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    const matchMedia = window.matchMedia.bind(window);
    window.matchMedia = (query: string) => {
      const media = matchMedia(query);
      // Framer Motion has a separate query and requires modern EventTarget methods.
      // This fixture isolates our hook's legacy boundary, not a full legacy browser.
      if (query === '(prefers-reduced-motion: reduce)') Object.defineProperties(media, { addEventListener: { value: undefined }, removeEventListener: { value: undefined } });
      return media;
    };
  });
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto('/');
  await expect(page.getByRole('img', { name: 'Puck Buddy scorecard showing AI shot analysis on a phone' })).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'no-preference' }); const video = page.getByLabel('Puck Buddy app scorecard preview'); await expect(video).toBeVisible(); const previous = await video.elementHandle();
  await page.emulateMedia({ reducedMotion: 'reduce' }); await expect(video).toHaveCount(0); expect(await previous!.evaluate(element => (element as HTMLVideoElement).paused)).toBe(true); expect(errors).toEqual([]);
});
