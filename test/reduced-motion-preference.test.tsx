// Checks live media-query updates, listener cleanup and stable static server rendering.
import React from 'react';
import { act, cleanup, renderHook } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, expect, it, vi } from 'vitest';
import { useReducedMotionPreference } from '../src/app/hooks/useReducedMotionPreference';
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
it('updates in both directions and removes the media listener on unmount', () => {
  let matches = false;
  const listeners = new Set<() => void>();
  const remove = vi.fn((_: string, listener: () => void) => listeners.delete(listener));
  const matchMedia = vi.fn(() => ({ get matches() { return matches; },
    addEventListener: (_: string, listener: () => void) => listeners.add(listener), removeEventListener: remove,
  }));
  vi.stubGlobal('matchMedia', matchMedia);
  const view = renderHook(useReducedMotionPreference);
  expect(view.result.current).toBe(false);
  act(() => { matches = true; listeners.forEach(listener => listener()); }); expect(view.result.current).toBe(true);
  act(() => { matches = false; listeners.forEach(listener => listener()); }); expect(view.result.current).toBe(false);
  expect(matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
  view.unmount(); expect(remove).toHaveBeenCalledOnce(); expect(listeners.size).toBe(0);
});
it('keeps content static when media queries are unavailable', () => {
  vi.stubGlobal('matchMedia', undefined);
  const view = renderHook(useReducedMotionPreference); expect(view.result.current).toBe(true); view.unmount();
});
it('renders a static server snapshot even when the browser permits animation', () => {
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })));
  function Example() { return <span>{useReducedMotionPreference() ? 'static' : 'moving'}</span>; }
  expect(renderToString(<Example />)).toBe('<span>static</span>');
});
it('updates through the legacy listener pair and releases that exact listener', () => {
  let matches = false; const listeners = new Set<() => void>();
  const addListener = vi.fn((listener: () => void) => listeners.add(listener));
  const removeListener = vi.fn((listener: () => void) => listeners.delete(listener));
  vi.stubGlobal('matchMedia', vi.fn(() => ({ get matches() { return matches; }, addListener, removeListener })));
  let view: ReturnType<typeof renderHook<boolean, undefined>> | undefined;
  expect(() => { view = renderHook(useReducedMotionPreference); }).not.toThrow();
  expect(view!.result.current).toBe(false); expect(addListener).toHaveBeenCalledOnce();
  act(() => { matches = true; listeners.forEach(listener => listener()); }); expect(view!.result.current).toBe(true);
  act(() => { matches = false; listeners.forEach(listener => listener()); }); expect(view!.result.current).toBe(false);
  view!.unmount(); expect(removeListener).toHaveBeenCalledExactlyOnceWith(addListener.mock.calls[0][0]); expect(listeners.size).toBe(0);
});
it.each(['addEventListener', 'removeEventListener'])('uses legacy subscriptions when the modern pair lacks %s', missing => {
  const add = vi.fn(); const remove = vi.fn(); const legacyAdd = vi.fn(); const legacyRemove = vi.fn();
  const media = { matches: false, addEventListener: add, removeEventListener: remove, addListener: legacyAdd, removeListener: legacyRemove };
  Reflect.deleteProperty(media, missing); vi.stubGlobal('matchMedia', vi.fn(() => media));
  let view: ReturnType<typeof renderHook<boolean, undefined>> | undefined;
  expect(() => { view = renderHook(useReducedMotionPreference); }).not.toThrow();
  const current = view!.result.current; expect(() => view!.unmount()).not.toThrow();
  expect(current).toBe(false); expect(add).not.toHaveBeenCalled(); expect(legacyAdd).toHaveBeenCalledOnce();
  expect(remove).not.toHaveBeenCalled(); expect(legacyRemove).toHaveBeenCalledExactlyOnceWith(legacyAdd.mock.calls[0][0]);
});
it.each(['neither', 'add-only', 'remove-only'])('stays static without a complete event pair: %s', kind => {
  const add = vi.fn(); const remove = vi.fn();
  const media: Record<string, unknown> = { matches: false };
  if (kind === 'add-only') { media.addEventListener = add; media.addListener = add; }
  if (kind === 'remove-only') { media.removeEventListener = remove; media.removeListener = remove; }
  vi.stubGlobal('matchMedia', vi.fn(() => media));
  let view: ReturnType<typeof renderHook<boolean, undefined>> | undefined;
  expect(() => { view = renderHook(useReducedMotionPreference); }).not.toThrow();
  const current = view!.result.current; expect(() => view!.unmount()).not.toThrow();
  expect(current).toBe(true); expect(add).not.toHaveBeenCalled(); expect(remove).not.toHaveBeenCalled();
});
it('prefers the complete modern pair when both APIs are available', () => {
  const add = vi.fn(); const remove = vi.fn(); const legacyAdd = vi.fn(); const legacyRemove = vi.fn();
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true, addEventListener: add, removeEventListener: remove, addListener: legacyAdd, removeListener: legacyRemove })));
  const view = renderHook(useReducedMotionPreference); expect(view.result.current).toBe(true); view.unmount();
  expect(add).toHaveBeenCalledExactlyOnceWith('change', expect.any(Function)); expect(remove).toHaveBeenCalledExactlyOnceWith('change', add.mock.calls[0][1]); expect(legacyAdd).not.toHaveBeenCalled(); expect(legacyRemove).not.toHaveBeenCalled();
});
it('does not access browser APIs during server rendering', () => {
  const matchMedia = vi.fn(() => { throw Error('Browser access during SSR'); }); vi.stubGlobal('matchMedia', matchMedia);
  function ServerExample() { return <span>{useReducedMotionPreference() ? 'static' : 'moving'}</span>; }
  expect(renderToString(<ServerExample />)).toBe('<span>static</span>'); expect(matchMedia).not.toHaveBeenCalled();
});
