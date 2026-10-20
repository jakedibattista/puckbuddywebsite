// Checks the demo graph has unique, usable hotspots and complete routes through its fixed examples.
import { expect, it } from 'vitest';
import { demoHotspots, demoScreens, type DemoScreen } from '../src/app/lib/interactiveDemoCatalog';

it('keeps hotspot IDs unique and targets in the screen catalog', () => {
  expect(new Set(demoHotspots.map(hotspot => hotspot.id)).size).toBe(demoHotspots.length);
  for (const hotspot of demoHotspots) {
    expect(demoScreens).toHaveProperty(hotspot.screen);
    expect(demoScreens).toHaveProperty(hotspot.target);
    expect(hotspot.target).not.toBe(hotspot.screen);
    expect(hotspot.label.trim()).not.toBe('');
    expect(hotspot.top).toBeGreaterThanOrEqual(0);
    expect(hotspot.left).toBeGreaterThanOrEqual(0);
    expect(hotspot.width).toBeGreaterThan(0);
    expect(hotspot.height).toBeGreaterThan(0);
    expect(hotspot.left + hotspot.width).toBeLessThanOrEqual(100);
    expect(hotspot.top + hotspot.height).toBeLessThanOrEqual(100);
  }
});
it('can reach every example from Home and return without using the shortcut pills', () => {
  function reachable(start: DemoScreen) {
    const seen = new Set<DemoScreen>([start]);
    const pending = [start];
    while (pending.length) {
      const next = pending.pop()!;
      for (const hotspot of demoHotspots.filter(hotspot => hotspot.screen === next)) {
        if (!seen.has(hotspot.target)) { seen.add(hotspot.target); pending.push(hotspot.target); }
      }
    }
    return seen;
  }
  expect(reachable('home')).toEqual(new Set(Object.keys(demoScreens)));
  for (const screen of Object.keys(demoScreens) as DemoScreen[]) {
    expect(reachable(screen).has('home')).toBe(true);
  }
});
