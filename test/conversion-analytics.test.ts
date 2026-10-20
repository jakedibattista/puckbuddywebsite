// Checks best-effort telemetry forwarding and synchronous SDK failures without external delivery.
import { expect, it, vi } from 'vitest';
import { track } from '@vercel/analytics';
vi.mock('@vercel/analytics', () => ({ track: vi.fn() }));
import { trackConversion } from '../src/app/lib/conversionAnalytics';

it('preserves the event name, properties and SDK options', () => {
  const properties = { store: 'android', location: 'hero' };
  const options = {};
  trackConversion('store_badge_click', properties, options);
  expect(track).toHaveBeenCalledExactlyOnceWith('store_badge_click', properties, options);
});
it('supports an event without properties', () => {
  trackConversion('fixture_event');
  expect(track).toHaveBeenCalledExactlyOnceWith('fixture_event');
});
it('contains an SDK exception so the caller can continue', () => {
  vi.mocked(track).mockImplementationOnce(() => { throw new Error('SDK unavailable'); });
  expect(() => trackConversion('fixture_event')).not.toThrow();
  expect(track).toHaveBeenCalledOnce();
});
