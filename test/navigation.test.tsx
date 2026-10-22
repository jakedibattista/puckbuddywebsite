// Verifies real navigation destinations, mobile dismissal and live reduced-motion behavior.
// External navigation and telemetry are controlled; no store or provider request is sent.
import React from 'react';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
const state = vi.hoisted(() => ({ reduced: false, motion: [] as Array<{ initial?: unknown; transition?: { duration?: number; delay?: number } }>, track: vi.fn() }));
vi.mock('../src/app/hooks/useReducedMotionPreference', () => ({ useReducedMotionPreference: () => state.reduced }));
vi.mock('@vercel/analytics', () => ({ track: state.track }));
vi.mock('next/image', () => ({ default: ({ src, alt }: { src: string; alt: string }) => React.createElement('img', { src, alt }) }));
vi.mock('next/link', () => ({ default: ({ children, ...props }: React.ComponentProps<'a'>) => <a {...props}>{children}</a> }));
vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  motion: Object.fromEntries(['div', 'nav'].map(tag => [tag, ({ children, initial, transition, ...props }: React.PropsWithChildren<{ initial?: unknown; animate?: unknown; exit?: unknown; transition?: { duration?: number; delay?: number } }>) => {
    state.motion.push({ initial, transition }); return React.createElement(tag, Object.fromEntries(Object.entries(props).filter(([key]) => key !== 'animate' && key !== 'exit')), children);
  }])),
}));
import Navigation from '../src/app/components/Navigation';
const blockNavigation = (event: Event) => { if ((event.target as Element).closest('a')) event.preventDefault(); };
beforeEach(() => { state.reduced = false; state.motion = []; state.track.mockReset(); document.addEventListener('click', blockNavigation, true); vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('desktop fixture'); });
afterEach(() => { cleanup(); document.removeEventListener('click', blockNavigation, true); });
function toggle() { return screen.getByRole('button', { name: 'Toggle mobile menu' }); }
function open() { fireEvent.click(toggle()); return screen.getByRole('navigation', { name: 'Mobile navigation' }); }
it('keeps public desktop destinations and submenu sections', () => {
  render(<Navigation />);
  for (const [label, href] of [[/Buddy Tech$/, '/'], ['Puck Buddy', '/puckbuddy'], ['Clinics', '/puckbuddy#clinics'], ['Pricing', '/puckbuddy#pricing'], ['Lax BuddyNew', '/lacrosse'], ['Partner with Us', '/partner'], ['About Us', '/about']]) {
    expect(screen.getByRole('link', { name: label }).getAttribute('href')).toBe(href);
  }
  expect(toggle().getAttribute('aria-expanded')).toBe('false');
});
it('connects the toggle to the named mobile navigation and closes on repeated activation', () => {
  render(<Navigation />); const menu = open();
  expect(toggle().getAttribute('aria-controls')).toBe(menu.id);
  expect(toggle().getAttribute('aria-expanded')).toBe('true');
  fireEvent.click(toggle()); expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).toBeNull();
  expect(toggle().getAttribute('aria-expanded')).toBe('false');
});
it('dismisses with Escape and returns focus to the toggle', () => {
  render(<Navigation />); fireEvent.click(toggle());
  screen.getAllByRole('link', { name: 'About Us' })[1].focus();
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(toggle().getAttribute('aria-expanded')).toBe('false'); expect(document.activeElement).toBe(toggle());
});
it.each([['Puck Buddy', '/puckbuddy'], ['Clinics', '/puckbuddy#clinics'], ['Pricing', '/puckbuddy#pricing'], ['Lax BuddyNew', '/lacrosse'], ['Partner with Us', '/partner'], ['About Us', '/about']])('closes the mobile menu after choosing %s without changing its destination', (label, href) => {
  render(<Navigation />); const menu = open(); const link = within(menu).getByRole('link', { name: label });
  expect(link.getAttribute('href')).toBe(href); fireEvent.click(link);
  expect(toggle().getAttribute('aria-expanded')).toBe('false');
});
it('keeps the mobile download destination, telemetry context and close callback', () => {
  vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Android');
  render(<Navigation />); const link = within(open()).getByRole('link', { name: /Google Play/ });
  expect(link.getAttribute('href')).toContain('play.google.com'); fireEvent.click(link);
  expect(state.track).toHaveBeenCalledWith('store_badge_click', { store: 'android', location: 'mobile navigation' });
  expect(toggle().getAttribute('aria-expanded')).toBe('false');
});
it('honors reduced motion even when it changes while the menu is open', () => {
  const view = render(<Navigation />); fireEvent.click(toggle());
  expect(state.motion.some(props => (props.transition?.delay ?? 0) > 0)).toBe(true);
  state.reduced = true; state.motion = []; view.rerender(<Navigation />);
  expect(state.motion.length).toBeGreaterThan(0);
  for (const props of state.motion) { expect(props.initial).toBe(false); expect(props.transition?.duration).toBe(0); expect(props.transition?.delay ?? 0).toBe(0); }
});
it('ignores unrelated keys and retires its Escape listener on unmount', () => {
  const add = vi.spyOn(window, 'addEventListener'); const remove = vi.spyOn(window, 'removeEventListener');
  const view = render(<Navigation />); fireEvent.click(toggle()); fireEvent.keyDown(window, { key: 'q' });
  expect(toggle().getAttribute('aria-expanded')).toBe('true');
  const registration = add.mock.calls.find(call => call[0] === 'keydown'); expect(registration).toBeDefined();
  const handler = registration![1]; view.unmount();
  expect(remove).toHaveBeenCalledWith('keydown', handler);
});
