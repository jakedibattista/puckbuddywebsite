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
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the homepage in `src/app/page.tsx`. The page auto-updates as you edit the file.

## Environment variables (Vercel)

- `NEXT_PUBLIC_SITE_URL`: canonical site URL (e.g. `https://buddysports.app`). Used for OpenGraph/Twitter URL resolution and `metadataBase` in `layout.tsx`.

## Deploy

Production deploys from the `main` branch. Vercel aliases include `buddysports.app` and `buddyllc.app`.

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

- `npm test`: store routing/hydration, telemetry failure isolation, partner draft handoff, demo graph/navigation, walkthrough playback, and carousel selection/cancellation/reduced motion.
- `npm run test:coverage`: coverage and regression budgets across all `src/**/*.{ts,tsx}` and `scripts/**/*.mjs`, including unexecuted files. Python tools are outside this JavaScript metric.
- `npm run test:browser`: browser checks for download choices, partner form navigation and Android hydration. macOS uses installed Google Chrome; Linux CI uses Playwright Chromium (`npx playwright install --with-deps chromium`). The runner starts its own server on port 3417 and blocks external network requests; it does not submit or send inquiries.

The partner form opens an email draft; it does not send email or confirm delivery.
`lib/partnerInquiry.ts` only encodes the URL; native form constraints validate
required contact fields and email syntax. `lib/conversionAnalytics.ts` owns
best-effort telemetry so SDK failures cannot stop the user's action. The retained
`partner_lead_submit` event represents a draft request, with `delivery=email_draft`;
it is not evidence of sent or received mail. Its properties contain the selected
tier and delivery mode, not the user's contact fields or message.

`lib/interactiveDemoCatalog.ts` owns the demo's 10 fixed screenshot examples and
25 navigation hotspots. `components/InteractiveDemo.tsx` renders them. The demo
runs no uploads or model requests. Catalog extraction preserved all assets,
coordinates and destinations from `8fc2444`, apart from correcting the
Journal-to-Scoreboard hotspot's owning screen. Graph and mounted-component tests
cover those routes. `HeroVideoCarousel` cancels superseded/unmounted transitions
and permits returning to the current clip before an animation finishes.

Coverage currently measures 17.78% of configured lines and 25.54% of branches
(October 19 checkpoint; 53 unit tests). Combining duplicate video effects removed
covered code: the uncovered line count stayed at 883, while uncovered statements
and branches each fell by one. The large untested remainder still needs behavioral
coverage. CI runs `test:coverage`, with maximum uncovered-item counts
in [Vitest configuration](vitest.config.mjs) and stricter floors for conversion
telemetry, the demo catalog, store-link handling and the hero carousel. Review
measured evidence before changing these budgets; do not increase a ceiling or
lower a floor to hide a regression. A local negative control confirms that
skipping the behavior tests fails these coverage checks.

## Workspace layout and maintenance

This Git repository starts at `puckbuddy-website/` inside the local `Puckbuddy-Vercel/` workspace. The parent directory is not a Git repository and is not Vercel's source root. Parent folders such as `IMAGES/`, `prototype/`, `videos/` and `Download-on-the-App-Store/` are local marketing source archives. They are not published by pushing this repository.

- `src/app/`: routes, components, hooks and library code.
- `public/`: runtime assets plus inputs used by the marketing-generation scripts.
- `scripts/`: asset audits and marketing asset generation; `requirements.txt` supplies Pillow for Python scripts. Puppeteer is a dev dependency of this repository, so scripts no longer depend on parent-workspace packages. If browser download was skipped during install, run `npx puppeteer browsers install chrome` before generating assets.
- `test/`: unit and browser tests.
- Root configuration: Next.js, TypeScript, ESLint, PostCSS, Vitest and Playwright. Keep these discoverable by their tools.

[Repository hygiene review](docs/repository-hygiene.md) records dependency checks, retained assets and deployment boundaries.
