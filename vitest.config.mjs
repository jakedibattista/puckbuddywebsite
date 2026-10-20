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
        lines: -555, statements: -563, functions: -129, branches: -142,
        'scripts/lib/artwork-*.mjs': { 100: true },
        'scripts/lib/public-asset-audit.mjs': { 100: true },
        'src/app/lib/conversionAnalytics.ts': { 100: true },
        'src/app/lib/partnerSubmission.ts': { 100: true },
        'src/app/lib/partnerReceipt.ts': { 100: true },
        'src/app/api/partner-inquiries/**/*.ts': { 100: true },
        'src/app/lib/interactiveDemoCatalog.ts': { 100: true },
        'src/app/components/SmartAppLink.tsx': { 100: true },
        'src/app/components/HomeHeroVisual.tsx': { 100: true },
        'src/app/components/StoreBadges.tsx': { 100: true },
        'src/app/components/RatingBadge.tsx': { 100: true },
        'src/app/components/ScrollAnimation.tsx': { 100: true },
        'src/app/hooks/useReducedMotionPreference.ts': { 100: true },
        'src/app/hooks/usePreviewPlayback.ts': { lines: 100, functions: 100, statements: 100, branches: 92.3 },
        'src/app/components/HeroVideoCarousel.tsx': { 100: true },
      },
    },
  },
});
