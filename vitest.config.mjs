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
        lines: -146, statements: -150, functions: -33, branches: -16,
        'src/app/components/Navigation.tsx': { 100: true },
        'src/app/v2-walkthrough/page.tsx': { 100: true },
        'src/app/lib/walkthroughSlides.ts': { 100: true },
        'src/app/hooks/useWalkthroughSlides.ts': { 100: true },
        'src/app/hooks/useWalkthroughPlayback.ts': { 100: true },
        'src/app/page.tsx': { 100: true },
        'src/app/about/page.tsx': { 100: true },
        'src/app/puckbuddy/page.tsx': { 100: true },
        'src/app/partner/page.tsx': { 100: true },
        'src/app/lacrosse/page.tsx': { 100: true },
        'src/app/opengraph-image.tsx': { 100: true },
        'src/app/puckbuddy/layout.tsx': { 100: true },
        'src/app/components/ContactForm.tsx': { 100: true },
        'src/app/components/MobileStickyCTA.tsx': { 100: true },
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
