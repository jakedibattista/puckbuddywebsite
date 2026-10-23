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
| Live reduced-motion preference | hooks/useReducedMotionPreference.ts selects complete modern or legacy listener pairs, with static server/unsupported snapshots; shared by motion consumers. The animation dependency's separate browser requirements still apply. |
| Preview playback lifetime and autoplay failure | hooks/usePreviewPlayback.ts; HomeHeroVisual and HeroVideoCarousel keep their own content/selection state |
| Walkthrough catalog, local text and playback | lib/walkthroughSlides.ts owns configured slides and text recovery; hooks/useWalkthroughSlides.ts owns browser storage, notices and acknowledged saves; hooks/useWalkthroughPlayback.ts owns media/source attempts. v2-walkthrough/page.tsx composes editing, selection and keyboard/fullscreen controls. |
| Shared public navigation | components/Navigation.tsx owns desktop links, the named mobile region, Escape/focus restoration and live reduced-motion transitions. Download telemetry stays in SmartAppLink. |
| Artwork capture surfaces | src/app/(marketing-exports)/; publicly routable utility pages, separate from consumer navigation |
| Public-media reference audit | scripts/audit-public-assets.mjs and scripts/lib/public-asset-audit.mjs; see [tool instructions](../scripts/README.md) |
| Unit and browser behavior | test/ and root Vitest/Playwright configuration |

The [source index](source-index.md) maps each supported first-party source/test/tool/config file to its purpose introduction. PascalCase component filenames, use* hooks and existing script names stay established here. Next.js page/layout/metadata names are framework entrypoints; parent folders identify the feature. Do not rename URLs, asset inputs or store destinations for cosmetic consistency.

Use one Analytics component in the root layout. The [marketing claims record](marketing-claims.md) owns attribution and evidence rules. Public marketing values live in lib/constants.ts; HTTP contracts live in the model repository. Update the shared owner rather than copying data into every page. Legal text and dated store artwork have their own review/history; saving an asset is not submitting it to a store.

Run python3 scripts/check-repository.py and python3 -m unittest discover -s scripts -p test_repository_conventions.py. After reviewing a file addition or changed introduction, regenerate with --write-index. The checker validates navigation, not semantic truth; review the explanation against source. Run npm test, npm run lint and npm run build for integration, plus the local browser suite for conversion changes.

Generated Next.js types belong under .next and are rebuilt by Next. Local Python environments, node_modules, test output and captured build artifacts are not source. The formerly tracked venv tree was removed from the Git index while preserving local files; local environments are not committed source.

Preview playback belongs to the currently rendered video. The shared hook pauses it and removes its end listener on replacement, reduced-motion changes or unmount. A late autoplay completion must not restart a detached element or stop a newer playback effect on the same element. Autoplay rejection leaves the poster visible. Component tests cover these transitions; the local Chrome suite also switches the homepage motion preference while the page stays open. These checks do not call app/backend services, redeem codes or submit real inquiries.

Public page composition is checked in `test/public-pages.test.tsx` with real inquiry,
download and navigation components behind mocked external boundaries. Inquiry
selection owns one pending scroll; tier/motion changes replace it and unmount
cancels it. The inquiry type is an accessible pressed choice, not an access grant.

`lib/constants.ts` owns the configured rating and analyzed-video display label for
pages and metadata. They are not live database reads. Dated audit receipts record
verification and unresolved evidence rather than presenting these strings as live
telemetry. API capability copy must agree with the model repository's
[API reference](https://github.com/jakedibattista/modelforpuckbuddy/blob/main/docs/API_REFERENCE.md).

Automatic store destinations keep `store_badge_click` tracking. A caller-supplied
mobile destination uses `navigation_cta_click` with bounded `target` and `location`
properties. Its target means `new_tab` or `same_tab`, not a store or hostname;
raw URLs and labels are not sent by that handler. Historical custom-link events
remain in their old category; the source change does not rewrite analytics data.

Walkthrough text keeps the existing `puckbuddy_v2_slides_v3` browser key and full
legacy cache shape. Restoration admits valid title/description strings by catalog
position/ID, independently preserves valid companion text and keeps configured
media authoritative. Missing/invalid rows use defaults; malformed raw bytes are
not deleted on read. Only an explicit successful Save/Reset adopts edited slides.
Storage failure leaves the editor/draft open with a notice. The catalog guarantees
the page's fixed slide/media bounds; selection resets clip indices and repeated
end events cannot advance one clip twice. Shortcuts leave modified keys and
interactive/editable controls alone. Fullscreen failure is reported, not thrown.

Walkthrough videos use a separate element for each source. Source cleanup pauses
it; late play failures cannot change newer playback and late completion cannot
restart detached media. Pause/resume retains the playhead. The
[October 22 receipt](2026-10-22-walkthrough-navigation.md) records local unit,
browser and selected-fault acceptance. `test/fixtures/walkthrough-media.json`
contains a tiny generated black-video fixture, with provenance/hash, used only to
fulfill local browser requests. It is not a customer recording or a replacement
for acceptance with the actual walkthrough recordings.

Local coverage, fault controls and captures remain in ignored `quality-results/`.
Keep raw failure receipts separate from accepted checks. None of those outputs
belongs in the source index or TypeScript source inventory.

The motion-preference hook registers only when both registration and removal
methods are available, preferring the modern pair. The same captured query and
listener are released on cleanup. Without an observable query it keeps static
content. Its legacy API controls cover that hook boundary. The pinned Framer
Motion code separately calls modern `addEventListener`; a global legacy-only
browser fixture fails in that library. Framework-wide legacy browser acceptance
remains open. The browser regression isolates the hook's exact query while
framework queries retain native methods; it does not certify an older browser.

Build/development/browser processes share Next output within a checkout. Follow
the README's sequential validation commands, stop a running dev server first and
use separate checkouts for parallel runs. The browser fixture's dedicated port
isolates HTTP traffic, not `.next/`, generated route types or `next-env.d.ts`.

## Retired export tools

Standalone artwork and video generators, their private libraries and generator-only
tests were removed on October 23, 2026. The original captures, listing manifests,
walkthrough recordings, public routes and current website regression tests remain.
Puppeteer, direct Sharp tooling and the unused Pillow manifest are no longer
website development requirements; Next.js retains its own image dependencies.
Historical generator measurements remain scoped to their original revisions.

Six images used only by the retired generators were removed from `public/` after
byte-for-byte comparison with the retained originals in the local parent workspace
`cross-store-support/public/`. Their committed originals also remain in Git history.
The website asset audit now covers the retained consumer pages and export routes.
