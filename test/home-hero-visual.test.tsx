// Checks homepage preview ownership, autoplay failure and reduced-motion transitions.
import React, { StrictMode, useRef } from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
const motion = vi.hoisted(() => ({ reduced: false }));
vi.mock('framer-motion', () => ({
  motion: { div: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div> },
}));
vi.mock('next/image', () => ({ default: ({ src, alt }: { src: string; alt: string }) => React.createElement('img', { src, alt }) }));
vi.mock('../src/app/hooks/useReducedMotionPreference', () => ({ useReducedMotionPreference: () => motion.reduced }));
import HomeHeroVisual from '../src/app/components/HomeHeroVisual';
import { usePreviewPlayback } from '../src/app/hooks/usePreviewPlayback';
beforeEach(() => {
  motion.reduced = false;
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
});
afterEach(cleanup);
it('starts a muted looping inline preview and pauses it on unmount', () => {
  const view = render(<HomeHeroVisual />);
  const video = screen.getByLabelText('Puck Buddy app scorecard preview') as HTMLVideoElement;
  expect(video.muted).toBe(true); expect(video.loop).toBe(true); expect(video.playsInline).toBe(true);
  expect(video.poster).toContain('/v2-scorecard.png');
  expect(video.querySelector('source')?.getAttribute('src')).toBe('/scorecard header.mp4');
  expect(video.play).toHaveBeenCalledOnce(); view.unmount();
  expect(video.pause).toHaveBeenCalledOnce();
});
it('uses a static image without requesting playback for reduced motion', () => {
  motion.reduced = true;
  const view = render(<HomeHeroVisual />);
  expect(view.container.querySelector('video')).toBeNull();
  expect(screen.getByRole('img').getAttribute('src')).toBe('/v2-scorecard.png');
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
});
it('stops the detached video and starts a new preview when motion is re-enabled', () => {
  const view = render(<HomeHeroVisual />);
  const previous = screen.getByLabelText('Puck Buddy app scorecard preview');
  motion.reduced = true; view.rerender(<HomeHeroVisual />);
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledOnce();
  motion.reduced = false; view.rerender(<HomeHeroVisual />);
  expect(screen.getByLabelText('Puck Buddy app scorecard preview')).not.toBe(previous);
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
});
it('pauses a detached preview again if its pending play request resolves late', async () => {
  let finish!: () => void;
  vi.mocked(HTMLMediaElement.prototype.play).mockReturnValueOnce(new Promise<void>(resolve => { finish = resolve; }));
  const view = render(<HomeHeroVisual />); view.unmount();
  await act(async () => { finish(); });
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(2);
});
it('does not let an old StrictMode play request stop the active preview', async () => {
  let finish!: () => void;
  vi.mocked(HTMLMediaElement.prototype.play).mockReturnValueOnce(new Promise<void>(resolve => { finish = resolve; }));
  render(<StrictMode><HomeHeroVisual /></StrictMode>);
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledOnce();
  await act(async () => { finish(); });
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledOnce();
});
it.each(['rejection', 'throw'])('retains the preview poster after autoplay %s', async failure => {
  if (failure === 'throw') vi.mocked(HTMLMediaElement.prototype.play).mockImplementationOnce(() => { throw new Error('blocked'); });
  else vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValueOnce(new Error('blocked'));
  await act(async () => { render(<HomeHeroVisual />); });
  expect((screen.getByLabelText('Puck Buddy app scorecard preview') as HTMLVideoElement).poster).toContain('/v2-scorecard.png');
});

it('does nothing when enabled before a video element is available', () => {
  function MissingVideo() { const ref = useRef<HTMLVideoElement>(null); usePreviewPlayback(ref, true); return null; }
  render(<MissingVideo />);
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
});
