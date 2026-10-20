# Source file index

This generated index maps source, tests and tooling to their opening explanations.
Read [the navigation guide](codebase-navigation.md) for ownership and naming rules.

Regenerate with `python3 scripts/check-repository.py --write-index` after adding or renaming files.

| File | Responsibility |
| --- | --- |
| [.github/workflows/quality.yml](<../.github/workflows/quality.yml>) | Validate this public website on free standard GitHub compute without artifact or cache storage. |
| [eslint.config.mjs](<../eslint.config.mjs>) | Configures source linting for the website and its Node-based asset tools. |
| [next.config.ts](<../next.config.ts>) | Sets the repository build root and allowed remote image host for Next.js. |
| [playwright.config.ts](<../playwright.config.ts>) | Starts the isolated local browser fixture used to verify download and partner navigation. |
| [postcss.config.mjs](<../postcss.config.mjs>) | Loads Tailwind through PostCSS when compiling the website stylesheet. |
| [scripts/audit-public-assets.mjs](<../scripts/audit-public-assets.mjs>) | Finds public assets referenced by runtime code and generation tools before proposing removal. |
| [scripts/build-v2-walkthrough.mjs](<../scripts/build-v2-walkthrough.mjs>) | One-off: compose iPhone screen recordings into 16:9 YouTube/Loom slides. Run from puckbuddy-website: node scripts/build-v2-walkthrough.mjs / |
| [scripts/check-repository.py](<../scripts/check-repository.py>) | Check file introductions and the generated source navigation index. Only source-controlled or new non-ignored files participate. Generated output, assets and formats that cannot carry comments are described in the guide instead. |
| [scripts/generate-app-store-bold.mjs](<../scripts/generate-app-store-bold.mjs>) | Renders bold Apple store artwork from the configured product image inputs. |
| [scripts/generate-app-store-images.mjs](<../scripts/generate-app-store-images.mjs>) | Builds Apple store image assets from the maintained local marketing inputs. |
| [scripts/generate-app-store-lite.mjs](<../scripts/generate-app-store-lite.mjs>) | Renders the lightweight Apple store screenshot composition variant. |
| [scripts/generate-app-store-v2.mjs](<../scripts/generate-app-store-v2.mjs>) | Captures the second-generation Apple screenshot export pages with Puppeteer. |
| [scripts/generate-ipad-pano.mjs](<../scripts/generate-ipad-pano.mjs>) | Builds the iPad panoramic marketing composition from local image inputs. |
| [scripts/generate-large-logo.mjs](<../scripts/generate-large-logo.mjs>) | Resizes the maintained logo image for large marketing exports. |
| [scripts/generate-play-store-feature.mjs](<../scripts/generate-play-store-feature.mjs>) | Captures the Google Play feature-graphic export page with Puppeteer. |
| [scripts/generate-play-store-refresh.mjs](<../scripts/generate-play-store-refresh.mjs>) | Renders store artwork around unchanged, verified Android captures without inventing app screens. |
| [scripts/generate-play-store-screenshots.mjs](<../scripts/generate-play-store-screenshots.mjs>) | Captures phone artwork from the Google Play screenshot export page. |
| [scripts/generate-play-store-tablets.mjs](<../scripts/generate-play-store-tablets.mjs>) | Captures tablet artwork using the configured Google Play export layout. |
| [scripts/generate-social-banners.mjs](<../scripts/generate-social-banners.mjs>) | Composes social profile banners from maintained logo and product inputs. |
| [scripts/generate-youtube-banner.mjs](<../scripts/generate-youtube-banner.mjs>) | Captures the YouTube banner export page at its configured output dimensions. |
| [scripts/test_repository_conventions.py](<../scripts/test_repository_conventions.py>) | Prove the navigation checker rejects missing explanations and preserves directives. |
| [src/app/(marketing-exports)/play-store-feature/page.tsx](<../src/app/(marketing-exports)/play-store-feature/page.tsx>) | Renders the play store feature artwork capture surface; this is an export utility, not an app screen. |
| [src/app/(marketing-exports)/play-store-screenshots-export/page.tsx](<../src/app/(marketing-exports)/play-store-screenshots-export/page.tsx>) | Renders the play store screenshots export artwork capture surface; this is an export utility, not an app screen. |
| [src/app/(marketing-exports)/screenshots-export/page.tsx](<../src/app/(marketing-exports)/screenshots-export/page.tsx>) | Renders the screenshots export artwork capture surface; this is an export utility, not an app screen. |
| [src/app/(marketing-exports)/screenshots/page.tsx](<../src/app/(marketing-exports)/screenshots/page.tsx>) | Renders the screenshots artwork capture surface; this is an export utility, not an app screen. |
| [src/app/(marketing-exports)/youtube-banner/page.tsx](<../src/app/(marketing-exports)/youtube-banner/page.tsx>) | Renders the youtube banner artwork capture surface; this is an export utility, not an app screen. |
| [src/app/about/layout.tsx](<../src/app/about/layout.tsx>) | Sets about page metadata while leaving shared navigation to the root layout. |
| [src/app/about/page.tsx](<../src/app/about/page.tsx>) | Explains the company and its hockey product with current cross-store download guidance. |
| [src/app/components/ContactForm.tsx](<../src/app/components/ContactForm.tsx>) | Collects required partner contact details and opens an email draft after browser form validation. |
| [src/app/components/ExternalProductLink.tsx](<../src/app/components/ExternalProductLink.tsx>) | Renders external product links with a clear new-tab cue. |
| [src/app/components/HeroVideoCarousel.tsx](<../src/app/components/HeroVideoCarousel.tsx>) | Cycles hero previews while respecting the latest manual selection and reduced-motion preferences. Playback and the end listener share one video-element lifecycle. |
| [src/app/components/HomeHeroVisual.tsx](<../src/app/components/HomeHeroVisual.tsx>) | Shows the homepage scorecard video with a static reduced-motion fallback. |
| [src/app/components/HowItWorks.tsx](<../src/app/components/HowItWorks.tsx>) | Explains the three-step analysis workflow and presents the shared download choices. |
| [src/app/components/InteractiveDemo.tsx](<../src/app/components/InteractiveDemo.tsx>) | Renders screenshot-demo navigation and hints using the separate asset/hotspot catalog. |
| [src/app/components/MobileStickyCTA.tsx](<../src/app/components/MobileStickyCTA.tsx>) | Shows mobile download controls with platform routing and conversion tracking. |
| [src/app/components/Navigation.tsx](<../src/app/components/Navigation.tsx>) | Provides shared desktop and mobile navigation between public product pages. |
| [src/app/components/RatingBadge.tsx](<../src/app/components/RatingBadge.tsx>) | Displays the configured App Store rating as a shared marketing badge. |
| [src/app/components/ScrollAnimation.tsx](<../src/app/components/ScrollAnimation.tsx>) | Applies reusable viewport-entry animation to marketing sections. |
| [src/app/components/SmartAppLink.tsx](<../src/app/components/SmartAppLink.tsx>) | Builds platform-aware download links while keeping click analytics in one component. |
| [src/app/components/StoreBadges.tsx](<../src/app/components/StoreBadges.tsx>) | Displays the Apple and Google store badges using shared destination constants. |
| [src/app/delete-account/page.tsx](<../src/app/delete-account/page.tsx>) | Explains Puck Buddy account deletion from the app or through a verified support request. |
| [src/app/demo/page.tsx](<../src/app/demo/page.tsx>) | Presents the interactive hockey product demonstration. |
| [src/app/globals.css](<../src/app/globals.css>) | Defines the shared website palette, typography and utility styles. |
| [src/app/hooks/useAppStoreUrl.ts](<../src/app/hooks/useAppStoreUrl.ts>) | Resolves the store destination after hydration while preserving a stable initial link. |
| [src/app/lacrosse/layout.tsx](<../src/app/lacrosse/layout.tsx>) | Sets lacrosse page metadata while leaving shared navigation to the root layout. |
| [src/app/lacrosse/page.tsx](<../src/app/lacrosse/page.tsx>) | Lists external lacrosse products with their existing beta labels and destination links. |
| [src/app/layout.tsx](<../src/app/layout.tsx>) | Owns shared metadata, site navigation, footer and the single analytics installation. |
| [src/app/lib/constants.ts](<../src/app/lib/constants.ts>) | Owns shared product links, contact destinations and displayed marketing constants. |
| [src/app/lib/conversionAnalytics.ts](<../src/app/lib/conversionAnalytics.ts>) | Records conversion telemetry without letting an SDK failure interrupt the user's action. Callers supply bounded event properties; this helper neither submits inquiries nor opens destinations. |
| [src/app/lib/interactiveDemoCatalog.ts](<../src/app/lib/interactiveDemoCatalog.ts>) | Defines screenshot assets and navigation hotspots for the illustrative product demo. The demo uses fixed examples and does not upload media or run live analysis. |
| [src/app/lib/partnerInquiry.ts](<../src/app/lib/partnerInquiry.ts>) | Encodes partner inquiry fields into an email draft URL without sending mail. |
| [src/app/opengraph-image.tsx](<../src/app/opengraph-image.tsx>) | Renders the social preview image used when the public website is shared. |
| [src/app/page.tsx](<../src/app/page.tsx>) | Presents the Buddy Sports homepage and routes visitors to its supported products. |
| [src/app/partner/layout.tsx](<../src/app/partner/layout.tsx>) | Sets partner page metadata while leaving shared navigation to the root layout. |
| [src/app/partner/page.tsx](<../src/app/partner/page.tsx>) | Presents the team partnership inquiry flow and opens an email draft. |
| [src/app/privacy/page.tsx](<../src/app/privacy/page.tsx>) | Describes Puck Buddy data collection, service providers, retention and deletion choices. |
| [src/app/puckbuddy/layout.tsx](<../src/app/puckbuddy/layout.tsx>) | Sets puckbuddy page metadata while leaving shared navigation to the root layout. |
| [src/app/puckbuddy/page.tsx](<../src/app/puckbuddy/page.tsx>) | Presents hockey analysis features, pricing and Apple/Google download choices. |
| [src/app/refund/page.tsx](<../src/app/refund/page.tsx>) | Publishes the refund policy page and its page metadata. |
| [src/app/sitemap.ts](<../src/app/sitemap.ts>) | Lists canonical public pages for crawlers; export utilities are maintained separately. |
| [src/app/sms-terms/page.tsx](<../src/app/sms-terms/page.tsx>) | Publishes the terms governing the existing SMS messaging program. |
| [src/app/support/page.tsx](<../src/app/support/page.tsx>) | Explains upload help, store billing, restore purchases and verified account deletion support. |
| [src/app/terms/page.tsx](<../src/app/terms/page.tsx>) | Publishes the terms of service and page metadata. |
| [src/app/v2-walkthrough/page.tsx](<../src/app/v2-walkthrough/page.tsx>) | Presents the video walkthrough with local playback and slide controls. |
| [test/browser/conversion.spec.ts](<../test/browser/conversion.spec.ts>) | Verifies download and inquiry navigation in a local browser without sending external requests. |
| [test/conversion-analytics.test.ts](<../test/conversion-analytics.test.ts>) | Checks best-effort telemetry forwarding and synchronous SDK failures without external delivery. |
| [test/demo-catalog.test.ts](<../test/demo-catalog.test.ts>) | Checks the demo graph has unique, usable hotspots and complete routes through its fixed examples. |
| [test/download.test.tsx](<../test/download.test.tsx>) | Checks store destinations, hydration-safe links and download analytics behavior. |
| [test/hero-carousel.test.tsx](<../test/hero-carousel.test.tsx>) | Checks video selection, cancellation and reduced-motion behavior with controlled playback and timers. |
| [test/interactive-demo.test.tsx](<../test/interactive-demo.test.tsx>) | Exercises the screenshot demo's navigation graph through its public controls. |
| [test/partner.test.tsx](<../test/partner.test.tsx>) | Checks required partner fields and email draft encoding without sending an inquiry. |
| [test/sticky-cta.test.tsx](<../test/sticky-cta.test.tsx>) | Checks visibility and destination behavior of the mobile download controls. |
| [test/walkthrough.test.tsx](<../test/walkthrough.test.tsx>) | Exercises walkthrough playback and navigation through the public controls. |
| [vitest.config.mjs](<../vitest.config.mjs>) | Configures DOM behavior tests and coverage budgets for all configured JavaScript/TypeScript source. Existing uncovered counts are ceilings, not a claim that the retained debt is complete. |
