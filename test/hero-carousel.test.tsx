// Checks video selection, cancellation and reduced-motion behavior with controlled playback and timers.
import React from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
const motion = vi.hoisted(() => ({ reduced: false }));
vi.mock('framer-motion', () => ({ useReducedMotion: () => motion.reduced }));
vi.mock('next/image', () => ({ default: ({ src, alt }: { src: string; alt: string }) => React.createElement('img', { src, alt }) }));
import HeroVideoCarousel from '../src/app/components/HeroVideoCarousel';
const first = 'Scorecard feature showcase';
const second = 'Coach feedback feature showcase';
const third = 'Past shots history feature showcase';
const fourth = 'AI chat feature showcase';
beforeEach(() => {
  vi.useFakeTimers(); motion.reduced = false;
  vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
});
afterEach(() => { cleanup(); vi.clearAllTimers(); vi.useRealTimers(); });
function choose(label: string) { fireEvent.click(screen.getByRole('button', { name: `Show ${label}` })); }
function transition() { act(() => vi.advanceTimersByTime(300)); }

it('starts playback and advances after the active clip ends', () => {
  render(<HeroVideoCarousel />);
  expect(HTMLMediaElement.prototype.load).toHaveBeenCalledOnce();
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledOnce();
  fireEvent.ended(screen.getByLabelText(first)); transition();
  expect(screen.getByLabelText(second)).toBeTruthy();
  expect(HTMLMediaElement.prototype.load).toHaveBeenCalledTimes(2);
});
it('cancels an in-flight selection when the user returns to the current clip', () => {
  render(<HeroVideoCarousel />);
  choose(fourth); choose(first); transition();
  expect(screen.getByLabelText(first)).toBeTruthy();
  expect(screen.queryByLabelText(fourth)).toBeNull();
  expect(HTMLMediaElement.prototype.load).toHaveBeenCalledOnce();
});
it('keeps only the latest pending selection', () => {
  render(<HeroVideoCarousel />);
  choose(second); choose(third);
  expect(vi.getTimerCount()).toBe(1);
  expect(screen.getByLabelText(first)).toBeTruthy();
  transition(); expect(screen.getByLabelText(third)).toBeTruthy();
});
it('cancels a pending transition when the carousel unmounts', () => {
  const view = render(<HeroVideoCarousel />); choose(second);
  expect(vi.getTimerCount()).toBe(1);
  view.unmount(); expect(vi.getTimerCount()).toBe(0);
});
it('shows a static poster and starts no video for reduced motion', () => {
  motion.reduced = true;
  const view = render(<HeroVideoCarousel />);
  expect(view.container.querySelector('video')).toBeNull();
  expect(screen.getByRole('img', { name: first })).toBeTruthy();
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  expect(vi.getTimerCount()).toBe(0);
});
it('keeps manual navigation available when autoplay is rejected', async () => {
  vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValueOnce(new Error('Autoplay blocked'));
  await act(async () => { render(<HeroVideoCarousel />); });
  choose(second); transition();
  expect(screen.getByLabelText(second)).toBeTruthy();
});
it('keeps a manual selection when the old clip ends during its fade', () => {
  render(<HeroVideoCarousel />); choose(fourth);
  fireEvent.ended(screen.getByLabelText(first)); transition();
  expect(screen.getByLabelText(fourth)).toBeTruthy();
});
it('wraps automatic playback from the last preview to the first', () => {
  render(<HeroVideoCarousel />); choose(fourth); transition();
  fireEvent.ended(screen.getByLabelText(fourth)); transition();
  expect(screen.getByLabelText(first)).toBeTruthy();
});
