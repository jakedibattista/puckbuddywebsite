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
