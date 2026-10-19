// Checks visibility and destination behavior of the mobile download controls.
import React from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { track } from '@vercel/analytics';
import MobileStickyCTA from '../src/app/components/MobileStickyCTA';
import { PLAY_STORE_URL } from '../src/app/hooks/useAppStoreUrl';
import { renderToString } from 'react-dom/server';

vi.mock('@vercel/analytics', () => ({ track: vi.fn() }));
// Animation timing is irrelevant to routing and scroll visibility contracts.
vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  motion: { div: ({ children, className }: React.PropsWithChildren<{ className?: string }>) => <div className={className}>{children}</div> },
  useReducedMotion: () => true,
}));
function scroll(y: number) { Object.defineProperty(window, 'scrollY', { configurable: true, value: y }); fireEvent.scroll(window); }
beforeEach(() => { scroll(0); vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Android'); });
afterEach(cleanup);

it('shows only above the threshold and hides again when scrolling back', () => {
  render(<MobileStickyCTA scrollThreshold={100} />);
  expect(screen.queryByRole('link')).toBeNull();
  scroll(100); expect(screen.queryByRole('link')).toBeNull();
  scroll(101); expect(screen.getByRole('link').getAttribute('href')).toBe(PLAY_STORE_URL);
  scroll(99); expect(screen.queryByRole('link')).toBeNull();
});
it('reflects an already restored scroll position on mount', () => {
  scroll(700); render(<MobileStickyCTA />);
  expect(screen.getByRole('link', { name: 'Get the app' }).getAttribute('href')).toBe(PLAY_STORE_URL);
});
it('keeps the sticky button out of server HTML until browser scroll state is known', () => {
  expect(renderToString(<MobileStickyCTA />)).not.toContain('<a');
});
it('identifies an explicit destination as a chooser click', () => {
  render(<MobileStickyCTA href="/partner" />); scroll(601);
  const link = screen.getByRole('link');
  link.addEventListener('click', event => event.preventDefault());
  fireEvent.click(link);
  expect(track).toHaveBeenCalledExactlyOnceWith('store_badge_click', { store: 'chooser', location: 'mobile_sticky_cta' });
});
it('recomputes visibility when the threshold changes', () => {
  scroll(150); const view = render(<MobileStickyCTA scrollThreshold={200} />);
  expect(screen.queryByRole('link')).toBeNull();
  view.rerender(<MobileStickyCTA scrollThreshold={100} />);
  expect(screen.getByRole('link')).toBeTruthy();
});
it('records the selected platform and safely opens the external store', () => {
  render(<MobileStickyCTA />); scroll(601);
  const link = screen.getByRole('link');
  link.addEventListener('click', event => event.preventDefault());
  fireEvent.click(link);
  expect(link.getAttribute('target')).toBe('_blank');
  expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  expect(track).toHaveBeenCalledExactlyOnceWith('store_badge_click', { store: 'android', location: 'mobile_sticky_cta' });
});
it.each([
  ['/partner', undefined, null], ['https://example.test/download', undefined, '_blank'],
  ['https://example.test/download', false, null], ['/partner', true, '_blank'],
])('respects an explicit destination %s and external override %s', (href, external, target) => {
  render(<MobileStickyCTA href={href} external={external} label="Partner with us" />); scroll(601);
  const link = screen.getByRole('link', { name: 'Partner with us' });
  expect(link.getAttribute('href')).toBe(href);
  expect(link.getAttribute('target')).toBe(target);
});
it('removes the scroll listener on unmount', () => {
  const add = vi.spyOn(window, 'addEventListener'); const remove = vi.spyOn(window, 'removeEventListener');
  const view = render(<MobileStickyCTA />);
  const listener = add.mock.calls.find(([event]) => event === 'scroll')![1];
  view.unmount(); expect(remove).toHaveBeenCalledWith('scroll', listener);
});
