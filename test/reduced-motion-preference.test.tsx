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
