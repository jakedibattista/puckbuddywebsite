// Exercises walkthrough playback, browser text persistence and keyboard controls through the public UI.
import React from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
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
function savedSlides() {
  const raw = localStorage.getItem('puckbuddy_v2_slides_v3'); expect(raw).not.toBeNull();
  return JSON.parse(raw!);
}


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
  fireEvent.ended(container.querySelector('video')!);
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
  const saved = savedSlides();
  expect(saved[0].title).toBe('My coaching walkthrough');
  expect(saved[1].title).toBe('Master Coach Report Card');
});
it('shows Play when the browser refuses autoplay', async () => {
  vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValue(new Error('Autoplay blocked'));
  render(<WalkthroughPage />);
  await waitFor(() => expect(screen.getByRole('button', { name: 'Play' })).toBeTruthy());
  await waitFor(() => expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledOnce());
});

class WalkthroughBoundary extends React.Component<React.PropsWithChildren, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <p>Walkthrough crashed</p> : this.props.children; }
}
function protectErrors() {
  const errors: string[] = [];
  const capture = (event: ErrorEvent) => { errors.push(event.message); event.preventDefault(); };
  window.addEventListener('error', capture);
  return { errors, close: () => window.removeEventListener('error', capture) };
}
it('keeps the page usable when browser storage reads are denied', () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new DOMException('denied', 'SecurityError'); });
  vi.spyOn(console, 'error').mockImplementation(() => {});
  render(<WalkthroughBoundary><WalkthroughPage /></WalkthroughBoundary>);
  expect(screen.queryByText('Walkthrough crashed')).toBeNull();
  expect(screen.getByRole('heading', { name: 'AI Coaching & Drill Selection' })).toBeTruthy();
  expect(screen.getByRole('alert').textContent).toContain('could not be loaded');
});
it('preserves an unsaved draft and explains a rejected storage write', () => {
  render(<WalkthroughPage />);
  fireEvent.click(screen.getByRole('button', { name: 'Edit Slide Text' }));
  fireEvent.change(screen.getByLabelText('Slide Title'), { target: { value: 'Keep this draft' } });
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new DOMException('full', 'QuotaExceededError'); });
  const caught = protectErrors();
  try {
    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));
    expect(caught.errors).toEqual([]);
    expect(screen.getByRole('alert').textContent).toContain('draft is still open');
    expect((screen.getByLabelText('Slide Title') as HTMLInputElement).value).toBe('Keep this draft');
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.getByRole('heading', { name: 'AI Coaching & Drill Selection' })).toBeTruthy();
  } finally { caught.close(); }
});
it('recovers valid saved text while keeping configured media and defaults for broken rows', () => {
  localStorage.setItem('puckbuddy_v2_slides_v3', JSON.stringify([
    { id: 1, title: 'Saved first title', description: 'Saved first description', videoSrcs: ['https://fixture.invalid/old.mp4'] },
    { id: 2, title: { broken: true }, description: null }, null, {}, 'broken',
  ]));
  vi.spyOn(console, 'error').mockImplementation(() => {});
  const view = render(<WalkthroughBoundary><WalkthroughPage /></WalkthroughBoundary>);
  expect(screen.getByRole('heading', { name: 'Saved first title' })).toBeTruthy();
  expect(view.container.querySelector('source')?.getAttribute('src')).toBe('/v2-walkthrough/ScreenRecording_06-01-2026 15-43-48_1.mov');
  fireEvent.click(screen.getByRole('button', { name: 'Next' }));
  expect(screen.getByRole('heading', { name: 'Master Coach Report Card' })).toBeTruthy();
  expect(screen.queryByText('Walkthrough crashed')).toBeNull();
});
it('retains malformed saved bytes and reports fallback instead of deleting user evidence', () => {
  localStorage.setItem('puckbuddy_v2_slides_v3', '{broken');
  vi.spyOn(console, 'error').mockImplementation(() => {});
  render(<WalkthroughPage />);
  expect(screen.getByRole('alert').textContent).toContain('could not be loaded');
  expect(localStorage.getItem('puckbuddy_v2_slides_v3')).toBe('{broken');
});
it('does not let an earlier playback rejection pause a resumed attempt', async () => {
  let reject!: (reason: Error) => void;
  vi.mocked(HTMLMediaElement.prototype.play).mockReturnValueOnce(new Promise<void>((_, fail) => { reject = fail; }));
  render(<WalkthroughPage />);
  fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
  fireEvent.click(screen.getByRole('button', { name: 'Play' }));
  await act(async () => reject(new Error('Earlier attempt interrupted')));
  expect(screen.getByRole('button', { name: 'Pause' })).toBeTruthy();
});
it('does not let an earlier source rejection pause the next slide', async () => {
  let reject!: (reason: Error) => void;
  vi.mocked(HTMLMediaElement.prototype.play).mockReturnValueOnce(new Promise<void>((_, fail) => { reject = fail; }));
  render(<WalkthroughPage />); fireEvent.click(screen.getByRole('button', { name: 'Next' }));
  await act(async () => reject(new Error('Old source interrupted')));
  expect(screen.getByRole('heading', { name: 'Master Coach Report Card' })).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Pause' })).toBeTruthy();
});
it('pauses detached media even if a pending play request resolves after unmount', async () => {
  let resolve!: () => void;
  vi.mocked(HTMLMediaElement.prototype.play).mockReturnValueOnce(new Promise<void>(finish => { resolve = finish; }));
  const view = render(<WalkthroughPage />); view.unmount();
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledOnce();
  await act(async () => resolve());
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(2);
});
it('handles synchronous playback failure without crashing the page', async () => {
  vi.mocked(HTMLMediaElement.prototype.play).mockImplementationOnce(() => { throw Error('Native media unavailable'); });
  vi.spyOn(console, 'error').mockImplementation(() => {});
  await act(async () => { render(<WalkthroughBoundary><WalkthroughPage /></WalkthroughBoundary>); });
  expect(screen.queryByText('Walkthrough crashed')).toBeNull();
  expect(screen.getByRole('button', { name: 'Play' })).toBeTruthy();
});
it('leaves browser find shortcuts alone', () => {
  const request = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(document.documentElement, 'requestFullscreen', { configurable: true, value: request });
  try {
    render(<WalkthroughPage />);
    const key = new KeyboardEvent('keydown', { key: 'f', ctrlKey: true, cancelable: true });
    window.dispatchEvent(key);
    expect(key.defaultPrevented).toBe(false); expect(request).not.toHaveBeenCalled();
  } finally { Reflect.deleteProperty(document.documentElement, 'requestFullscreen'); }
});
it('explains unavailable fullscreen without throwing', () => {
  render(<WalkthroughPage />); const caught = protectErrors();
  try {
    fireEvent.keyDown(window, { key: 'f' });
    expect(caught.errors).toEqual([]);
    expect(screen.getByRole('status').textContent).toContain('Fullscreen is unavailable');
  } finally { caught.close(); }
});

it('restores both edited fields after remount and resets only the selected slide', () => {
  const view = render(<WalkthroughPage />);
  fireEvent.click(screen.getByRole('button', { name: 'Edit Slide Text' }));
  fireEvent.change(screen.getByLabelText('Slide Title'), { target: { value: 'Retain first title' } });
  fireEvent.change(screen.getByLabelText('Slide Description'), { target: { value: 'Retain first description' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save Changes' })); view.unmount();
  render(<WalkthroughPage />);
  expect(screen.getByRole('heading', { name: 'Retain first title' })).toBeTruthy(); expect(screen.getByText('Retain first description')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Next' })); fireEvent.click(screen.getByRole('button', { name: 'Edit Slide Text' }));
  fireEvent.change(screen.getByLabelText('Slide Title'), { target: { value: 'Replace this second title' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save Changes' })); fireEvent.click(screen.getByRole('button', { name: 'Edit Slide Text' }));
  vi.spyOn(window, 'confirm').mockReturnValue(true); fireEvent.click(screen.getByRole('button', { name: 'Reset Default' }));
  expect(screen.getByRole('heading', { name: 'Master Coach Report Card' })).toBeTruthy();
  const saved = savedSlides();
  expect(saved[0].title).toBe('Retain first title'); expect(saved[0].description).toBe('Retain first description');
  expect(saved[1].title).toBe('Master Coach Report Card'); expect(saved[0].videoSrcs).toHaveLength(2);
});
it('keeps a cancelled reset draft and discards it only when the editor is cancelled', () => {
  render(<WalkthroughPage />); fireEvent.click(screen.getByRole('button', { name: 'Edit Slide Text' }));
  fireEvent.change(screen.getByLabelText('Slide Title'), { target: { value: 'Unsaved reset draft' } });
  vi.spyOn(window, 'confirm').mockReturnValue(false); fireEvent.click(screen.getByRole('button', { name: 'Reset Default' }));
  expect((screen.getByLabelText('Slide Title') as HTMLInputElement).value).toBe('Unsaved reset draft');
  fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
  expect(screen.getByRole('heading', { name: 'AI Coaching & Drill Selection' })).toBeTruthy(); expect(localStorage.getItem('puckbuddy_v2_slides_v3')).toBeNull();
});
it('retains a draft after reset storage fails and clears the notice on cancel', () => {
  render(<WalkthroughPage />); fireEvent.click(screen.getByRole('button', { name: 'Edit Slide Text' }));
  vi.spyOn(window, 'confirm').mockReturnValue(true);
  vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => { throw Error('Storage unavailable'); });
  fireEvent.click(screen.getByRole('button', { name: 'Reset Default' }));
  expect(screen.getByRole('alert')).toBeTruthy(); expect(screen.getByLabelText('Slide Title')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Cancel' })); expect(screen.queryByRole('alert')).toBeNull();
});
it('uses Space on the canvas while leaving interactive controls and modified keys alone', () => {
  render(<WalkthroughPage />);
  fireEvent.keyDown(screen.getByRole('heading', { name: 'AI Coaching & Drill Selection' }), { key: ' ' });
  const play = screen.getByRole('button', { name: 'Play' });
  const buttonKey = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }); play.dispatchEvent(buttonKey);
  expect(buttonKey.defaultPrevented).toBe(false); expect(screen.getByRole('button', { name: 'Play' })).toBeTruthy();
  for (const modifiers of [{ metaKey: true }, { altKey: true }]) {
    const key = new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true, ...modifiers }); window.dispatchEvent(key); expect(key.defaultPrevented).toBe(false);
  }
  const prevented = new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }); prevented.preventDefault(); window.dispatchEvent(prevented);
  expect(screen.getByRole('heading', { name: 'AI Coaching & Drill Selection' })).toBeTruthy();
});
it('enters and exits fullscreen with the correct receiver and reports a rejected request', async () => {
  const request = vi.fn().mockResolvedValue(undefined); const exit = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(document.documentElement, 'requestFullscreen', { configurable: true, value: request });
  Object.defineProperty(document, 'exitFullscreen', { configurable: true, value: exit });
  Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: null });
  try {
    render(<WalkthroughPage />); await act(async () => fireEvent.keyDown(window, { key: 'f' }));
    expect(request).toHaveBeenCalledOnce(); expect(request.mock.contexts[0]).toBe(document.documentElement);
    Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: document.documentElement });
    await act(async () => fireEvent.keyDown(window, { key: 'F' })); expect(exit).toHaveBeenCalledOnce(); expect(exit.mock.contexts[0]).toBe(document);
    Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: null }); request.mockRejectedValueOnce(Error('Denied'));
    await act(async () => fireEvent.keyDown(window, { key: 'f' })); expect(screen.getByRole('status').textContent).toContain('Fullscreen could not change');
  } finally { Reflect.deleteProperty(document.documentElement, 'requestFullscreen'); Reflect.deleteProperty(document, 'exitFullscreen'); Reflect.deleteProperty(document, 'fullscreenElement'); }
});
it('does not accept an end event from a retired source or double-advance one clip', () => {
  const view = render(<WalkthroughPage />); const old = view.container.querySelector('video')!;
  act(() => { fireEvent.ended(old); fireEvent.ended(old); });
  expect(view.container.querySelector('source')?.getAttribute('src')).toBe('/v2-walkthrough/ScreenRecording_06-01-2026 15-47-27_1.mov');
  fireEvent.click(screen.getByRole('button', { name: 'Next' })); fireEvent.ended(old);
  expect(screen.getByRole('heading', { name: 'Master Coach Report Card' })).toBeTruthy(); expect(screen.getByRole('button', { name: 'Pause' })).toBeTruthy();
});

it('retries a rejected save without losing either field', () => {
  render(<WalkthroughPage />); fireEvent.click(screen.getByRole('button', { name: 'Edit Slide Text' }));
  fireEvent.change(screen.getByLabelText('Slide Title'), { target: { value: 'Retry title' } });
  fireEvent.change(screen.getByLabelText('Slide Description'), { target: { value: 'Retry description' } });
  vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => { throw Error('Temporary storage failure'); });
  fireEvent.click(screen.getByRole('button', { name: 'Save Changes' })); expect(screen.getByRole('alert')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Save Changes' })); expect(screen.queryByRole('alert')).toBeNull();
  expect(screen.getByRole('heading', { name: 'Retry title' })).toBeTruthy(); expect(screen.getByText('Retry description')).toBeTruthy();
  expect(savedSlides()[0]).toMatchObject({ title: 'Retry title', description: 'Retry description' });
});
