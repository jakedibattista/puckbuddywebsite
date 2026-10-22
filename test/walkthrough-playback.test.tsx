// Checks absent media, replacement ownership and StrictMode replay for the walkthrough playback hook.
import React, { StrictMode, useRef } from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { useWalkthroughPlayback } from '../src/app/hooks/useWalkthroughPlayback';
import WalkthroughPage from '../src/app/v2-walkthrough/page';
vi.mock('framer-motion', () => ({ AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>, motion: { div: ({ children }: React.PropsWithChildren) => <div>{children}</div> } }));
const blocked = vi.fn();
function MissingMedia({ playing }: { playing: boolean }) { const ref = useRef<HTMLVideoElement>(null); useWalkthroughPlayback(ref, 'fixture', playing, blocked); return null; }
beforeEach(() => { localStorage.clear(); blocked.mockReset(); vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(); vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {}); vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {}); });
afterEach(cleanup);
it.each([true, false])('does not touch unavailable media when playing is %s', playing => {
  render(<MissingMedia playing={playing} />); expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled(); expect(HTMLMediaElement.prototype.load).not.toHaveBeenCalled(); expect(HTMLMediaElement.prototype.pause).not.toHaveBeenCalled(); expect(blocked).not.toHaveBeenCalled();
});
it('does not pause a newer attempt when a StrictMode replay resolves late', async () => {
  let finish!: () => void; vi.mocked(HTMLMediaElement.prototype.play).mockReturnValueOnce(new Promise<void>(resolve => { finish = resolve; }));
  render(<StrictMode><WalkthroughPage /></StrictMode>); expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledOnce();
  await act(async () => finish()); expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledOnce(); expect(screen.getByRole('button', { name: 'Pause' })).toBeTruthy();
});
it('pauses a replaced source again on late resolution without stopping its replacement', async () => {
  let finish!: () => void; vi.mocked(HTMLMediaElement.prototype.play).mockReturnValueOnce(new Promise<void>(resolve => { finish = resolve; }));
  const view = render(<WalkthroughPage />); const old = view.container.querySelector('video')!; const pause = vi.mocked(HTMLMediaElement.prototype.pause);
  const callsFor = (video: HTMLVideoElement) => pause.mock.contexts.filter(receiver => receiver === video).length;
  fireEvent.click(screen.getByRole('button', { name: 'Next' })); const current = view.container.querySelector('video')!; 
  expect(old).not.toBe(current); expect(callsFor(old)).toBe(1);
  await act(async () => finish()); expect(callsFor(old)).toBe(2); expect(callsFor(current)).toBe(0);
});
