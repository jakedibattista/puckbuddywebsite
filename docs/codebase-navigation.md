# Finding your way around the Puck Buddy website

Start with [the README](../README.md) for setup, production routes and deploy commands. The [engineering map](https://github.com/jakedibattista/puck-buddy/blob/main/docs/ecosystem.md) owns cross-repository naming and boundaries. This repository owns public marketing/support content, not the app, analysis worker or coach dashboard.

| Work | Owner |
| --- | --- |
| Public pages and shared shell | src/app/page.tsx, route folders, layout.tsx |
| Download routing and conversion tracking | components/SmartAppLink.tsx, hooks/useAppStoreUrl.ts, lib/constants.ts |
| Partner inquiries and private receipts | components/ContactForm.tsx, api/partner-inquiries/, lib/partnerSubmission.ts, lib/partnerReceipt.ts |
| Retained manual email draft encoder | lib/partnerInquiry.ts |
| Screenshot demo catalog and navigation | lib/interactiveDemoCatalog.ts, components/InteractiveDemo.tsx |
| Best-effort conversion telemetry | lib/conversionAnalytics.ts |
| Shared visual behavior | components/, globals.css |
| Live reduced-motion preference | hooks/useReducedMotionPreference.ts; shared by motion consumers, with static server rendering |
| Preview playback lifetime and autoplay failure | hooks/usePreviewPlayback.ts; HomeHeroVisual and HeroVideoCarousel keep their own content/selection state |
| Artwork capture surfaces | src/app/(marketing-exports)/; publicly routable utility pages, separate from consumer navigation |
| Asset generation and reference audits | scripts/ and [tool instructions](../scripts/README.md) |
| Unit and browser behavior | test/ and root Vitest/Playwright configuration |

The [source index](source-index.md) maps each supported first-party source/test/tool/config file to its purpose introduction. PascalCase component filenames, use* hooks and existing script names stay established here. Next.js page/layout/metadata names are framework entrypoints; parent folders identify the feature. Do not rename URLs, asset inputs or store destinations for cosmetic consistency.

Use one Analytics component in the root layout. Public marketing values live in lib/constants.ts; HTTP contracts live in the model repository. Update the shared owner rather than copying data into every page. Legal text and dated store artwork have their own review/history; saving an asset is not submitting it to a store.

Run python3 scripts/check-repository.py and python3 -m unittest discover -s scripts -p test_repository_conventions.py. After reviewing a file addition or changed introduction, regenerate with --write-index. The checker validates navigation, not semantic truth; review the explanation against source. Run npm test, npm run lint and npm run build for integration, plus the local browser suite for conversion changes.

Generated Next.js types belong under .next and are rebuilt by Next. Local Python environments, node_modules, test output and captured build artifacts are not source. The formerly tracked venv tree was removed from the Git index while preserving local files; recreate Python tooling from requirements.txt as documented rather than committing an installation.

Preview playback belongs to the currently rendered video. The shared hook pauses it and removes its end listener on replacement, reduced-motion changes or unmount. A late autoplay completion must not restart a detached element or stop a newer playback effect on the same element. Autoplay rejection leaves the poster visible. Component tests cover these transitions; the local Chrome suite also switches the homepage motion preference while the page stays open. These checks do not call app/backend services, redeem codes or submit real inquiries.
