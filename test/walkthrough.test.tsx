// Exercises walkthrough playback and navigation through the public controls.
import React from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import WalkthroughPage from '../src/app/v2-walkthrough/page';

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  motion: { div: ({ children, className }: React.PropsWithChildren<{ className?: string }>) => <div className={className}>{children}</div> },
}));
beforeEach(() => {
  localStorage.clear();
  vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
});
afterEach(cleanup);

it('pauses and resumes without reloading or resetting the playhead', () => {
  const { container } = render(<WalkthroughPage />);
  const video = container.querySelector('video')!;
  video.currentTime = 17;
  fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
  expect(video.pause).toHaveBeenCalledOnce();
  expect(video.currentTime).toBe(17);
  fireEvent.click(screen.getByRole('button', { name: 'Play' }));
  expect(video.play).toHaveBeenCalledTimes(2);
  expect(video.load).toHaveBeenCalledOnce();
  expect(video.currentTime).toBe(17);
});
it('uses the latest slide when keyboard navigation wraps in both directions', () => {
  render(<WalkthroughPage />);
  fireEvent.keyDown(window, { key: 'ArrowLeft' });
  expect(screen.getByRole('heading', { name: 'Leaderboard & Community' })).toBeTruthy();
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(screen.getByRole('heading', { name: 'AI Coaching & Drill Selection' })).toBeTruthy();
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(screen.getByRole('heading', { name: 'Master Coach Report Card' })).toBeTruthy();
});
it('plays the next clip on a slide, then stops at the end of its final clip', () => {
  const { container } = render(<WalkthroughPage />);
  const video = container.querySelector('video')!;
  const source = () => container.querySelector('source')!.getAttribute('src');
  const first = source();
  fireEvent.ended(video);
  expect(source()).not.toBe(first);
  expect(screen.getByRole('button', { name: 'Pause' })).toBeTruthy();
  fireEvent.ended(video);
  expect(screen.getByRole('button', { name: 'Play' })).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Next' }));
  fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
  expect(source()).toBe(first);
});
it('ignores shortcuts during editing and persists the edited text', () => {
  render(<WalkthroughPage />);
  fireEvent.click(screen.getByRole('button', { name: 'Edit Slide Text' }));
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.change(screen.getByLabelText('Slide Title'), { target: { value: 'My coaching walkthrough' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));
  expect(screen.getByRole('heading', { name: 'My coaching walkthrough' })).toBeTruthy();
  const saved = JSON.parse(localStorage.getItem('puckbuddy_v2_slides_v3')!);
  expect(saved[0].title).toBe('My coaching walkthrough');
  expect(saved[1].title).toBe('Master Coach Report Card');
});
it('shows Play when the browser refuses autoplay', async () => {
  vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValue(new Error('Autoplay blocked'));
  render(<WalkthroughPage />);
  await waitFor(() => expect(screen.getByRole('button', { name: 'Play' })).toBeTruthy());
  await waitFor(() => expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledOnce());
});
