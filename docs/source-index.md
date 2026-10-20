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
| [scripts/audit-public-assets.mjs](<../scripts/audit-public-assets.mjs>) | Runs the read-only public-media reference audit from the current project directory. Collection and report policy live in scripts/lib/public-asset-audit.mjs. |
| [scripts/build-v2-walkthrough.mjs](<../scripts/build-v2-walkthrough.mjs>) | One-off: compose iPhone screen recordings into 16:9 YouTube/Loom slides. Run from puckbuddy-website: node scripts/build-v2-walkthrough.mjs / |
| [scripts/check-repository.py](<../scripts/check-repository.py>) | Check file introductions and the generated source navigation index. Only source-controlled or new non-ignored files participate. Generated output, assets and formats that cannot carry comments are described in the guide instead. |
| [scripts/generate-app-store-bold.mjs](<../scripts/generate-app-store-bold.mjs>) | Renders bold Apple store artwork from the configured product image inputs. |
| [scripts/generate-app-store-images.mjs](<../scripts/generate-app-store-images.mjs>) | Builds Apple store image assets from the maintained local marketing inputs. |
| [scripts/generate-app-store-lite.mjs](<../scripts/generate-app-store-lite.mjs>) | Renders the lightweight Apple store screenshot composition variant. |
| [scripts/generate-app-store-v2.mjs](<../scripts/generate-app-store-v2.mjs>) | Runs the app-store-v2 local artwork capture plan with shared validation and cleanup. Output names and dimensions live in scripts/lib/artwork-plans.mjs. |
| [scripts/generate-ipad-pano.mjs](<../scripts/generate-ipad-pano.mjs>) | Builds the iPad panoramic marketing composition from local image inputs. |
| [scripts/generate-large-logo.mjs](<../scripts/generate-large-logo.mjs>) | Resizes the maintained logo image for large marketing exports. |
| [scripts/generate-play-store-feature.mjs](<../scripts/generate-play-store-feature.mjs>) | Runs the play-store-feature local artwork capture plan with shared validation and cleanup. Output names and dimensions live in scripts/lib/artwork-plans.mjs. |
| [scripts/generate-play-store-refresh.mjs](<../scripts/generate-play-store-refresh.mjs>) | Renders store artwork around unchanged, verified Android captures without inventing app screens. |
| [scripts/generate-play-store-screenshots.mjs](<../scripts/generate-play-store-screenshots.mjs>) | Runs the play-store-screenshots local artwork capture plan with shared validation and cleanup. Output names and dimensions live in scripts/lib/artwork-plans.mjs. |
| [scripts/generate-play-store-tablets.mjs](<../scripts/generate-play-store-tablets.mjs>) | Runs the play-store-tablets local artwork capture plan with shared validation and cleanup. Output names and dimensions live in scripts/lib/artwork-plans.mjs. |
| [scripts/generate-social-banners.mjs](<../scripts/generate-social-banners.mjs>) | Composes social profile banners from maintained logo and product inputs. |
| [scripts/generate-youtube-banner.mjs](<../scripts/generate-youtube-banner.mjs>) | Runs the youtube-banner local artwork capture plan with shared validation and cleanup. Output names and dimensions live in scripts/lib/artwork-plans.mjs. |
| [scripts/lib/artwork-capture.mjs](<../scripts/lib/artwork-capture.mjs>) | Captures configured artwork into staging, verifies saved PNG dimensions and publishes only completed captures. Browser, staging and owned-server cleanup run on both success and failure; generated files are local drafts. |
| [scripts/lib/artwork-plans.mjs](<../scripts/lib/artwork-plans.mjs>) | Defines export routes, filenames and pixel dimensions for the existing artwork commands. This catalog describes local captures; it does not certify current store submission requirements. |
| [scripts/lib/artwork-server.mjs](<../scripts/lib/artwork-server.mjs>) | Owns only the temporary Next.js process group started by an artwork capture. Probes are bounded; an existing server is reused and never terminated by this owner. |
| [scripts/lib/public-asset-audit.mjs](<../scripts/lib/public-asset-audit.mjs>) | Inventories regular public image/video files and their conservative literal references. Collection, report formatting and CLI policy stay separate; no operation writes or removes assets. |
| [scripts/test_repository_conventions.py](<../scripts/test_repository_conventions.py>) | Prove the navigation checker rejects missing explanations and preserves directives. |
| [src/app/(marketing-exports)/layout.tsx](<../src/app/(marketing-exports)/layout.tsx>) | Keeps publicly routable artwork utilities out of search results without changing their URLs. |
| [src/app/(marketing-exports)/play-store-feature/page.tsx](<../src/app/(marketing-exports)/play-store-feature/page.tsx>) | Renders the play store feature artwork capture surface; this is an export utility, not an app screen. |
| [src/app/(marketing-exports)/play-store-screenshots-export/page.tsx](<../src/app/(marketing-exports)/play-store-screenshots-export/page.tsx>) | Renders the play store screenshots export artwork capture surface; this is an export utility, not an app screen. |
| [src/app/(marketing-exports)/screenshots-export/page.tsx](<../src/app/(marketing-exports)/screenshots-export/page.tsx>) | Renders the screenshots export artwork capture surface; this is an export utility, not an app screen. |
| [src/app/(marketing-exports)/screenshots/page.tsx](<../src/app/(marketing-exports)/screenshots/page.tsx>) | Renders the screenshots artwork capture surface; this is an export utility, not an app screen. |
| [src/app/(marketing-exports)/youtube-banner/page.tsx](<../src/app/(marketing-exports)/youtube-banner/page.tsx>) | Renders the youtube banner artwork capture surface; this is an export utility, not an app screen. |
| [src/app/about/layout.tsx](<../src/app/about/layout.tsx>) | Sets about page metadata while leaving shared navigation to the root layout. |
| [src/app/about/page.tsx](<../src/app/about/page.tsx>) | Explains the company and its hockey product with current cross-store download guidance. |
| [src/app/api/partner-inquiries/retry/route.ts](<../src/app/api/partner-inquiries/retry/route.ts>) | Retries stored inquiry notifications only for the authenticated Vercel cron caller. |
| [src/app/api/partner-inquiries/route.ts](<../src/app/api/partner-inquiries/route.ts>) | Accepts same-origin validated inquiries and confirms receipt only after private durable storage. |
| [src/app/components/ContactForm.tsx](<../src/app/components/ContactForm.tsx>) | Collects required partner contact details and confirms server receipt while preserving inquiry details on errors. |
| [src/app/components/ExternalProductLink.tsx](<../src/app/components/ExternalProductLink.tsx>) | Renders external product links with a clear new-tab cue. |
| [src/app/components/HeroVideoCarousel.tsx](<../src/app/components/HeroVideoCarousel.tsx>) | Cycles hero previews while respecting the latest manual selection and reduced-motion preferences. Playback and the end listener share one video-element lifecycle. |
| [src/app/components/HomeHeroVisual.tsx](<../src/app/components/HomeHeroVisual.tsx>) | Shows the homepage scorecard video with a static reduced-motion fallback. |
| [src/app/components/HowItWorks.tsx](<../src/app/components/HowItWorks.tsx>) | Explains the three-step analysis workflow and presents the shared download choices. |
| [src/app/components/InteractiveDemo.tsx](<../src/app/components/InteractiveDemo.tsx>) | Renders screenshot-demo navigation and hints using the separate asset/hotspot catalog. |
| [src/app/components/MobileStickyCTA.tsx](<../src/app/components/MobileStickyCTA.tsx>) | Shows platform-aware downloads or caller-supplied navigation with separate bounded tracking. |
| [src/app/components/Navigation.tsx](<../src/app/components/Navigation.tsx>) | Provides shared desktop and mobile navigation between public product pages. |
| [src/app/components/RatingBadge.tsx](<../src/app/components/RatingBadge.tsx>) | Displays the configured App Store rating as a shared marketing badge. |
| [src/app/components/ScrollAnimation.tsx](<../src/app/components/ScrollAnimation.tsx>) | Applies reusable viewport-entry animation to marketing sections. |
| [src/app/components/SmartAppLink.tsx](<../src/app/components/SmartAppLink.tsx>) | Builds platform-aware download links while keeping click analytics in one component. |
| [src/app/components/StoreBadges.tsx](<../src/app/components/StoreBadges.tsx>) | Displays the Apple and Google store badges using shared destination constants. |
| [src/app/delete-account/layout.tsx](<../src/app/delete-account/layout.tsx>) | Gives the delete-account page its canonical public URL without changing the shared shell. |
| [src/app/delete-account/page.tsx](<../src/app/delete-account/page.tsx>) | Explains Puck Buddy account deletion from the app or through a verified support request. |
| [src/app/demo/layout.tsx](<../src/app/demo/layout.tsx>) | Gives the demo page its canonical public URL without changing the shared shell. |
| [src/app/demo/page.tsx](<../src/app/demo/page.tsx>) | Presents the interactive hockey product demonstration. |
| [src/app/globals.css](<../src/app/globals.css>) | Defines the shared website palette, typography and utility styles. |
| [src/app/hooks/useAppStoreUrl.ts](<../src/app/hooks/useAppStoreUrl.ts>) | Resolves the store destination after hydration while preserving a stable initial link. |
| [src/app/hooks/usePreviewPlayback.ts](<../src/app/hooks/usePreviewPlayback.ts>) | Owns preview playback and end listeners for the lifetime of one rendered video. Detached previews stop even when an earlier autoplay request resolves after cleanup. |
| [src/app/hooks/useReducedMotionPreference.ts](<../src/app/hooks/useReducedMotionPreference.ts>) | Subscribes marketing animations and previews to live accessibility preferences. Server rendering starts with static content so hydration never starts an unwanted video. |
| [src/app/lacrosse/layout.tsx](<../src/app/lacrosse/layout.tsx>) | Sets lacrosse page metadata while leaving shared navigation to the root layout. |
| [src/app/lacrosse/page.tsx](<../src/app/lacrosse/page.tsx>) | Lists external lacrosse products with their existing beta labels and destination links. |
| [src/app/layout.tsx](<../src/app/layout.tsx>) | Owns shared metadata, site navigation, footer and the single analytics installation. |
| [src/app/lib/constants.ts](<../src/app/lib/constants.ts>) | Owns shared product links, contact destinations and displayed marketing constants. |
| [src/app/lib/conversionAnalytics.ts](<../src/app/lib/conversionAnalytics.ts>) | Records conversion telemetry without letting an SDK failure interrupt the user's action. Callers supply bounded event properties; this helper neither submits inquiries nor opens destinations. |
| [src/app/lib/interactiveDemoCatalog.ts](<../src/app/lib/interactiveDemoCatalog.ts>) | Defines screenshot assets and navigation hotspots for the illustrative product demo. The demo uses fixed examples and does not upload media or run live analysis. |
| [src/app/lib/partnerInquiry.ts](<../src/app/lib/partnerInquiry.ts>) | Encodes partner inquiry fields into an email draft URL without sending mail. |
| [src/app/lib/partnerReceipt.ts](<../src/app/lib/partnerReceipt.ts>) | Stores immutable private inquiry receipts and a retryable notification outbox in Vercel Blob. Contact details stay in private storage and the configured inbox, never analytics or logs. |
| [src/app/lib/partnerSubmission.ts](<../src/app/lib/partnerSubmission.ts>) | Validates bounded partner inquiry payloads before storage or email delivery. |
| [src/app/opengraph-image.tsx](<../src/app/opengraph-image.tsx>) | Renders the social preview image used when the public website is shared. |
| [src/app/page.tsx](<../src/app/page.tsx>) | Presents the Buddy Sports homepage and routes visitors to its supported products. |
| [src/app/partner/layout.tsx](<../src/app/partner/layout.tsx>) | Sets partner page metadata while leaving shared navigation to the root layout. |
| [src/app/partner/page.tsx](<../src/app/partner/page.tsx>) | Presents team partnership options and the confirmed inquiry flow within the viewport. |
| [src/app/privacy/layout.tsx](<../src/app/privacy/layout.tsx>) | Gives the privacy page its canonical public URL without changing the shared shell. |
| [src/app/privacy/page.tsx](<../src/app/privacy/page.tsx>) | Describes Puck Buddy data collection, service providers, retention and deletion choices. |
| [src/app/puckbuddy/layout.tsx](<../src/app/puckbuddy/layout.tsx>) | Sets puckbuddy page metadata while leaving shared navigation to the root layout. |
| [src/app/puckbuddy/page.tsx](<../src/app/puckbuddy/page.tsx>) | Presents hockey analysis features, pricing and Apple/Google download choices. |
| [src/app/refund/layout.tsx](<../src/app/refund/layout.tsx>) | Gives the refund page its canonical public URL without changing the shared shell. |
| [src/app/refund/page.tsx](<../src/app/refund/page.tsx>) | Publishes the refund policy page and its page metadata. |
| [src/app/sitemap.ts](<../src/app/sitemap.ts>) | Lists canonical public pages for crawlers; export utilities are maintained separately. |
| [src/app/sms-terms/layout.tsx](<../src/app/sms-terms/layout.tsx>) | Gives the sms-terms page its canonical public URL without changing the shared shell. |
| [src/app/sms-terms/page.tsx](<../src/app/sms-terms/page.tsx>) | Publishes the terms governing the existing SMS messaging program. |
| [src/app/support/layout.tsx](<../src/app/support/layout.tsx>) | Gives the support page its canonical public URL without changing the shared shell. |
| [src/app/support/page.tsx](<../src/app/support/page.tsx>) | Explains upload help, store billing, restore purchases and verified account deletion support. |
| [src/app/terms/layout.tsx](<../src/app/terms/layout.tsx>) | Gives the terms page its canonical public URL without changing the shared shell. |
| [src/app/terms/page.tsx](<../src/app/terms/page.tsx>) | Publishes the terms of service and page metadata. |
| [src/app/v2-walkthrough/layout.tsx](<../src/app/v2-walkthrough/layout.tsx>) | Gives the v2-walkthrough page its canonical public URL without changing the shared shell. |
| [src/app/v2-walkthrough/page.tsx](<../src/app/v2-walkthrough/page.tsx>) | Presents the video walkthrough with local playback and slide controls. |
| [test/artwork-generators.test.ts](<../test/artwork-generators.test.ts>) | Exercises all artwork entrypoints with fake browser/provider boundaries and no real filesystem writes. Missing targets, failed capture and absent output must fail the command and release its browser. |
| [test/artwork-server.test.ts](<../test/artwork-server.test.ts>) | Checks temporary-server ownership, bounded startup and process-group cleanup with fake children. |
| [test/browser/conversion.spec.ts](<../test/browser/conversion.spec.ts>) | Verifies download and inquiry navigation in a local browser without sending external requests. |
| [test/canonical-pages.test.tsx](<../test/canonical-pages.test.tsx>) | Checks that public pages name their own canonical route and preserve the shared site shell. |
| [test/conversion-analytics.test.ts](<../test/conversion-analytics.test.ts>) | Checks best-effort telemetry forwarding and synchronous SDK failures without external delivery. |
| [test/demo-catalog.test.ts](<../test/demo-catalog.test.ts>) | Checks the demo graph has unique, usable hotspots and complete routes through its fixed examples. |
| [test/download.test.tsx](<../test/download.test.tsx>) | Checks store destinations, hydration-safe links and download analytics behavior. |
| [test/hero-carousel.test.tsx](<../test/hero-carousel.test.tsx>) | Checks video selection, cancellation and reduced-motion behavior with controlled playback and timers. |
| [test/home-hero-visual.test.tsx](<../test/home-hero-visual.test.tsx>) | Checks homepage preview ownership, autoplay failure and reduced-motion transitions. |
| [test/interactive-demo.test.tsx](<../test/interactive-demo.test.tsx>) | Exercises the screenshot demo's navigation graph through its public controls. |
| [test/marketing-primitives.test.tsx](<../test/marketing-primitives.test.tsx>) | Checks store-link behavior, configured rating display and accessible animation preferences. |
| [test/partner-receipt.test.ts](<../test/partner-receipt.test.ts>) | @vitest-environment node Exercises private receipt persistence, ambiguous-write retries, inbox delivery and authenticated retries. |
| [test/partner.test.tsx](<../test/partner.test.tsx>) | Checks receipt confirmation, retry behavior and the retained manual email draft encoder. |
| [test/public-asset-audit.test.ts](<../test/public-asset-audit.test.ts>) | Exercises the asset audit against temporary projects and its real read-only CLI. |
| [test/public-pages.test.tsx](<../test/public-pages.test.tsx>) | Exercises real marketing-page composition and inquiry routing with external navigation and submission mocked. Page tests verify destinations and user actions; child motion/media visuals are simulated. |
| [test/reduced-motion-preference.test.tsx](<../test/reduced-motion-preference.test.tsx>) | Checks live media-query updates, listener cleanup and stable static server rendering. |
| [test/sticky-cta.test.tsx](<../test/sticky-cta.test.tsx>) | Checks visibility and destination behavior of the mobile download controls. |
| [test/walkthrough.test.tsx](<../test/walkthrough.test.tsx>) | Exercises walkthrough playback and navigation through the public controls. |
| [vitest.config.mjs](<../vitest.config.mjs>) | Configures DOM behavior tests and coverage budgets for all configured JavaScript/TypeScript source. Existing uncovered counts are ceilings, not a claim that the retained debt is complete. |
