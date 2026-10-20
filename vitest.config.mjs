// Configures DOM behavior tests and coverage budgets for all configured JavaScript/TypeScript source.
// Existing uncovered counts are ceilings, not a claim that the retained debt is complete.
import { defineConfig } from 'vitest/config';
export default defineConfig({
  oxc: { jsx: { runtime: 'automatic' } },
  test: {
    include: ['test/**/*.test.ts', 'test/**/*.test.tsx'],
    environment: 'jsdom', clearMocks: true, restoreMocks: true,
    coverage: {
      provider: 'v8', include: ['src/**/*.{ts,tsx}', 'scripts/**/*.mjs'],
      reporter: ['text', 'json', 'json-summary'],
      thresholds: {
        // Negative thresholds cap uncovered items without hiding untested files.
        lines: -883, statements: -925, functions: -175, branches: -271,
        'src/app/lib/conversionAnalytics.ts': { 100: true },
        'src/app/lib/interactiveDemoCatalog.ts': { 100: true },
        'src/app/components/SmartAppLink.tsx': { 100: true },
        'src/app/components/HeroVideoCarousel.tsx': { lines: 100, functions: 100, statements: 96.1, branches: 92.8 },
      },
    },
  },
});
