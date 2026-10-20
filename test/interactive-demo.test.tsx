// Exercises the screenshot demo's navigation graph through its public controls.
import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  motion: { div: ({ children, className }: React.PropsWithChildren<{ className?: string }>) => <div className={className}>{children}</div> },
}));
vi.mock('next/image', () => ({ default: ({ src, alt }: { src: string; alt: string }) => React.createElement('img', { src, alt }) }));
import InteractiveDemo from '../src/app/components/InteractiveDemo';
afterEach(cleanup);

it('lets Journal navigate to Scoreboard through its bottom navigation hotspot', () => {
  render(<InteractiveDemo />);
  fireEvent.click(screen.getByRole('button', { name: 'Journal' }));
  fireEvent.click(screen.getByRole('button', { name: 'Navigate to Scoreboard' }));
  expect(screen.getByRole('img', { name: 'Scoreboard' })).toBeTruthy();
});
it('does not show an extra self-navigation hotspot on Scoreboard', () => {
  render(<InteractiveDemo />);
  fireEvent.click(screen.getByRole('button', { name: 'Scoreboard' }));
  expect(screen.queryByRole('button', { name: 'Navigate to Scoreboard' })).toBeNull();
});
it('walks from Practice Mode through the example analysis to coach feedback and back', () => {
  render(<InteractiveDemo />);
  for (const label of ['Practice Mode', 'Continue', 'Analyze Snapshot', "Coach's Feedback", 'ScoreCard', 'Back to Home']) {
    fireEvent.click(screen.getByRole('button', { name: `Navigate to ${label}` }));
  }
  expect(screen.getByRole('img', { name: 'Home' })).toBeTruthy();
});
it.each(['Stats', 'Journal', 'Scoreboard'])('returns home from the %s bottom navigation', title => {
  render(<InteractiveDemo />);
  fireEvent.click(screen.getByRole('button', { name: title }));
  fireEvent.click(screen.getByRole('button', { name: 'Navigate to Home' }));
  expect(screen.getByRole('img', { name: 'Home' })).toBeTruthy();
});

it.each(['Chat', 'Past Results'])('returns home from the %s example', title => {
  render(<InteractiveDemo />);
  fireEvent.click(screen.getByRole('button', { name: title }));
  expect(screen.getByRole('img', { name: title })).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Navigate to Back to Home' }));
  expect(screen.getByRole('img', { name: 'Home' })).toBeTruthy();
});
