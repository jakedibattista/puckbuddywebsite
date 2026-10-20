// Checks store destinations, hydration-safe links and download analytics behavior.
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { track } from '@vercel/analytics';
import SmartAppLink from '../src/app/components/SmartAppLink';
import { resolveAppStoreDestination, appStoreLinkProps, appStoreAriaLabel, APP_STORE_URL, PLAY_STORE_URL } from '../src/app/hooks/useAppStoreUrl';
vi.mock('@vercel/analytics', () => ({ track: vi.fn() }));
afterEach(cleanup);
describe('download destination contract', () => {
  it.each([
    ['Android 14', 0, 'android', PLAY_STORE_URL], ['iPhone', 0, 'ios', APP_STORE_URL], ['iPad', 1, 'ios', APP_STORE_URL],
    ['Macintosh; Intel Mac OS X', 5, 'ios', APP_STORE_URL], ['Macintosh', 0, 'ios', APP_STORE_URL],
    ['Windows NT', 0, 'chooser', '/puckbuddy'], ['Linux x86_64', 0, 'chooser', '/puckbuddy'], ['', 0, 'chooser', '/puckbuddy'],
  ])('routes %s safely', (ua, touch, platform, href) => {
    const destination = resolveAppStoreDestination(ua, touch);
    expect(destination).toEqual({ platform, href, external: platform !== 'chooser' });
    expect(appStoreLinkProps(destination)).toEqual(platform === 'chooser' ? {} : { target: '_blank', rel: 'noopener noreferrer' });
    expect(appStoreAriaLabel(destination, 'hero')).toContain('(hero)');
  });
  it('server renders a stable chooser before browser detection', () => {
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Android');
    expect(renderToString(<SmartAppLink>Download</SmartAppLink>)).toContain('href="/puckbuddy"');
  });
  it('updates the rendered link for Android and records the clicked store', async () => {
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Android');
    const click = vi.fn((event: React.MouseEvent) => event.preventDefault());
    render(<SmartAppLink context="hero" onClick={click}>Download</SmartAppLink>);
    await waitFor(() => expect(screen.getByRole('link').getAttribute('href')).toBe(PLAY_STORE_URL));
    fireEvent.click(screen.getByRole('link'));
    expect(click).toHaveBeenCalledOnce();
    expect(track).toHaveBeenCalledWith('store_badge_click', { store: 'android', location: 'hero' });
  });
});
it('keeps the consumer click handler working when conversion telemetry fails', () => {
  vi.mocked(track).mockImplementationOnce(() => { throw new Error('Telemetry unavailable'); });
  const click = vi.fn((event: React.MouseEvent) => event.preventDefault());
  render(<SmartAppLink onClick={click}>Download</SmartAppLink>);
  fireEvent.click(screen.getByRole('link'));
  expect(click).toHaveBeenCalledOnce();
});
