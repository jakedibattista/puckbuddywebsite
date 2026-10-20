// Checks store-link behavior, configured rating display and accessible animation preferences.
import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
const state = vi.hoisted(() => ({ reduced: false, props: {} as Record<string, unknown>, track: vi.fn() }));
vi.mock('@vercel/analytics', () => ({ track: state.track }));
vi.mock('framer-motion', () => ({ motion: {
  div: ({ children, ...props }: { children: React.ReactNode }) => { state.props = props; return <div>{children}</div>; },
} }));
vi.mock('next/image', () => ({ default: ({ src, alt }: { src: string; alt: string }) => React.createElement('img', { src, alt }) }));
vi.mock('../src/app/hooks/useReducedMotionPreference', () => ({ useReducedMotionPreference: () => state.reduced }));
import StoreBadges from '../src/app/components/StoreBadges';
import RatingBadge from '../src/app/components/RatingBadge';
import ScrollAnimation from '../src/app/components/ScrollAnimation';
import { APP_STORE_URL, PLAY_STORE_URL } from '../src/app/hooks/useAppStoreUrl';
import { APP_STORE_RATING } from '../src/app/lib/constants';
beforeEach(() => { state.reduced = false; state.track.mockReset(); });
afterEach(cleanup);
it.each(['dark', 'light'] as const)('keeps both store destinations and tracks their locations in the %s theme', theme => {
  const view = render(<StoreBadges location="home_hero" theme={theme} className="caller-style" priority />);
  expect(view.container.firstElementChild?.className).toContain('caller-style');
  for (const [name, url, store] of [
    ['Download on the App Store', APP_STORE_URL, 'app_store'],
    ['Get it on Google Play', PLAY_STORE_URL, 'play_store'],
  ]) {
    const link = screen.getByRole('link', { name });
    expect(link.getAttribute('href')).toBe(url); expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    link.addEventListener('click', event => event.preventDefault()); fireEvent.click(link);
    expect(state.track).toHaveBeenCalledWith('store_badge_click', { store, location: 'home_hero' });
  }
});
it('keeps the store link usable when telemetry fails', () => {
  state.track.mockImplementation(() => { throw new Error('telemetry unavailable'); });
  render(<StoreBadges location="footer" />);
  const link = screen.getByRole('link', { name: 'Download on the App Store' });
  link.addEventListener('click', event => event.preventDefault());
  expect(() => fireEvent.click(link)).not.toThrow(); expect(link.getAttribute('href')).toBe(APP_STORE_URL);
});
it.each(['dark', 'light'] as const)('renders the configured rating and hides decorative stars in the %s theme', theme => {
  const view = render(<RatingBadge theme={theme} className="caller-rating" />);
  expect(screen.getByText(APP_STORE_RATING)).toBeTruthy();
  expect(screen.getByText('on the App Store')).toBeTruthy();
  expect(screen.getByText('★★★★★').getAttribute('aria-hidden')).toBe('true');
  expect(view.container.firstElementChild?.className).toContain('caller-rating');
});
it('supports default badge props', () => { render(<RatingBadge />); expect(screen.getByText(APP_STORE_RATING)).toBeTruthy(); });
it.each([
  ['up', { y: 60, opacity: 0 }], ['down', { y: -60, opacity: 0 }],
  ['left', { x: 60, opacity: 0 }], ['right', { x: -60, opacity: 0 }],
] as const)('reveals content from %s once it enters the viewport', (direction, initial) => {
  render(<ScrollAnimation direction={direction} delay={0.3} className="section">Content</ScrollAnimation>);
  expect(screen.getByText('Content')).toBeTruthy(); expect(state.props.initial).toEqual(initial);
  expect(state.props.whileInView).toEqual({ x: 0, y: 0, opacity: 1 });
  expect(state.props.viewport).toEqual({ once: true, margin: '-100px' });
  expect(state.props.transition).toMatchObject({ duration: 0.6, delay: 0.3 }); expect(state.props.className).toBe('section');
});
it('renders immediately without delay when reduced motion is enabled', () => {
  state.reduced = true; render(<ScrollAnimation delay={5}>Static</ScrollAnimation>);
  expect(state.props.initial).toEqual({ opacity: 1 }); expect(state.props.whileInView).toEqual({ opacity: 1 });
  expect(state.props.transition).toMatchObject({ duration: 0, delay: 0 });
});
it('uses the default entrance direction and no delay', () => {
  render(<ScrollAnimation>Default</ScrollAnimation>);
  expect(state.props.initial).toEqual({ y: 60, opacity: 0 }); expect(state.props.transition).toMatchObject({ delay: 0 });
});
