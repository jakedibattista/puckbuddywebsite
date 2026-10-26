Puck Buddy marketing website (Next.js App Router).

See the [Puck Buddy engineering map](https://github.com/jakedibattista/puck-buddy/blob/main/docs/ecosystem.md) for repository ownership, naming and the complete analysis lifecycle. Source integration and production deployment are separate states.

**Live site:** [buddysports.app](https://buddysports.app) · **Repo:** [github.com/jakedibattista/puckbuddywebsite](https://github.com/jakedibattista/puckbuddywebsite) · **Vercel:** `buddy-tech/puckbuddy-website`

Start with [documentation navigation](docs/README.md) and [file responsibilities](docs/source-index.md) when changing code.

## Site structure

| Path | File | Notes |
|------|------|-------|
| `/` | `src/app/page.tsx` | Homepage — two-column hero with `HomeHeroVisual`, product CTAs |
| `/puckbuddy` | `src/app/puckbuddy/page.tsx` | Hero video carousel, `HowItWorks`, pricing, download strip |
| `/lacrosse` | `src/app/lacrosse/page.tsx` | External Lax Buddy / Scout links with Beta labels |
| `/support` | `src/app/support/page.tsx` | Upload help, store subscription links, restore purchases and account deletion requests |
| OG image | `src/app/opengraph-image.tsx` | Generated 1200×630 social preview at `/opengraph-image` |

**Shared components** (`src/app/components/`):

- `SmartAppLink` / `useAppStoreUrl` — routes Android → Play Store, iOS/Mac → App Store, other desktop → `/puckbuddy` chooser
- `MobileStickyCTA` — mobile-only sticky download bar
- `HomeHeroVisual` — homepage phone preview (single scorecard video; static poster when reduced motion)
- `HowItWorks` — Puck Buddy 3-step walkthrough + `#get-app` strip
- `ExternalProductLink` — external web app links with “Opens in new tab” cue

**Typography:** Geist Sans + Geist Mono via the `geist` package (`layout.tsx`). Display serif accents use Instrument Serif on the homepage only.

## Getting Started

Install the locked dependencies, then run the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the homepage in `src/app/page.tsx`. The page auto-updates as you edit the file.

## Local validation and shared build output

Use the committed npm lockfile. Stop any development server before running the
production build or browser suite in this checkout. Next development, production
builds and the browser fixture share `.next/`, generated route types and
`next-env.d.ts`; different HTTP ports do not isolate those files.

Run these commands one at a time, after lint, type checks and unit tests:

```bash
npm run build
npm run test:browser
```

The browser suite starts its own server on `127.0.0.1:3417` and refuses to reuse
an existing server. The Quality workflow runs build and browser steps sequentially.
Use separate checkouts for parallel Next processes. Browser success verifies the
local website fixture, not deployed app/backend behavior or submitted store assets.

## Environment variables (Vercel)

- `NEXT_PUBLIC_SITE_URL`: canonical site URL (e.g. `https://buddysports.app`). Used for OpenGraph/Twitter URL resolution and `metadataBase` in `layout.tsx`.

## Deploy

Production deploys from the `main` branch. `buddysports.app` is canonical. Vercel redirects `buddyllc.app` to matching primary-domain paths with HTTP 308, preserving query parameters. Production aliases wait for the `quality` GitHub check.

```bash
vercel --prod
```

Or push to `main` — Vercel auto-deploys when GitHub is connected.

## Asset hygiene (what images are actually used?)

All runtime assets live in `public/`.

To see which `public/` files are referenced by code:

```bash
npm run assets:audit
```

To fail if any unused assets exist (useful for CI):

```bash
npm run assets:audit:fail
```

## Regression tests

- `npm test`: store routing/hydration, telemetry failure isolation, partner receipt and notification retry handling, demo graph/navigation, walkthrough playback, and carousel selection/cancellation/reduced motion.
- `npm run test:coverage`: coverage and regression budgets across all `src/**/*.{ts,tsx}` and `scripts/**/*.mjs`, including unexecuted files. Python tools are outside this JavaScript metric.
- `npm run test:browser`: browser checks for download choices, partner form navigation and Android hydration. macOS uses installed Google Chrome; Linux CI uses Playwright Chromium (`npx playwright install --with-deps chromium`). The runner starts its own server on port 3417 and blocks external network requests; it does not submit or send inquiries.

The partner form POSTs to `/api/partner-inquiries`. It confirms receipt only after
an immutable private Vercel Blob receipt and notification outbox item are stored.
Retries reuse a UUID while the fields stay unchanged. Contact details are sent
only to private storage and `jake@buddyllc.app`; the `partner_lead_received` event
contains tier and delivery mode only. It means durable receipt, not inbox delivery.
The historical `partner_lead_submit` event meant an email draft request and must
not be combined with received leads. The manual email link remains available on
failure. See [Vercel operations](docs/vercel-operations.md) for SMTP, cron, storage,
rate limits, delivery evidence and deployment gates.

`lib/interactiveDemoCatalog.ts` owns the demo's 10 fixed screenshot examples and
25 navigation hotspots. `components/InteractiveDemo.tsx` renders them. The demo
runs no uploads or model requests. Catalog extraction preserved all assets,
coordinates and destinations from `8fc2444`, apart from correcting the
Journal-to-Scoreboard hotspot's owning screen. Graph and mounted-component tests
cover those routes. `HeroVideoCarousel` cancels superseded/unmounted transitions
and permits returning to the current clip before an animation finishes.

The October 26 recheck of source `349380a` passes 209 unit tests, all thirteen
browser cases, type checking, zero-warning lint, production build, asset audit and
repository conventions. Coverage is 92.07% of configured lines and 98.97% of
branches. The shared function-complexity measurement finds 213 functions and zero
at CRAP ≥30. CRAP combines complexity and uncovered code; it is not a defect count.
These are fresh local checks, separate from hosted CI and production deployment.

The retained maximum-uncovered-item budgets in [Vitest configuration](vitest.config.mjs)
and stricter feature floors remain unchanged. Remaining unexecuted behavior is
still visible in coverage; browser checks do not send real inquiries. No exhaustive
mutation-test claim is made for this website. Earlier counts in the
[October 20 receipt](docs/2026-10-20-vercel-release.md) remain dated evidence for its
source and scope, including the since-retired standalone artwork tooling.

## Workspace layout and maintenance

This Git repository starts at `puckbuddy-website/` inside the local `Puckbuddy-Vercel/` workspace. The parent directory is not a Git repository and is not Vercel's source root. Parent folders such as `IMAGES/`, `prototype/`, `videos/` and `Download-on-the-App-Store/` are local marketing source archives. They are not published by pushing this repository.

- `src/app/`: routes, components, hooks and library code.
- `public/`: website assets and captures used by retained public export routes.
- `scripts/`: read-only asset audit and repository-convention checks. One-off artwork/video generators and their dedicated tests have been retired; original captures and listing evidence remain.
- `test/`: unit and browser tests.
- Root configuration: Next.js, TypeScript, ESLint, PostCSS, Vitest and Playwright. Keep these discoverable by their tools.

[Codebase navigation](docs/codebase-navigation.md) records current ownership and retained compatibility boundaries.
