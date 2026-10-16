Puck Buddy marketing website (Next.js App Router).

**Live site:** [buddysports.app](https://buddysports.app) · **Repo:** [github.com/jakedibattista/puckbuddywebsite](https://github.com/jakedibattista/puckbuddywebsite) · **Vercel:** `buddy-tech/puckbuddy-website`

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

First, run the development server:

```bash
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

- `npm test`: store destination routing, hydration-safe initial links, click analytics, partner inquiry encoding and required fields.
- `npm run test:coverage`: whole-source coverage, including currently untested scripts.
- `npm run test:browser`: local Chrome smoke tests for download choices, partner form navigation and Android hydration. Requires installed Google Chrome. The runner starts its own server on port 3417 and blocks external network requests; it does not submit or send inquiries.

The partner form opens an email draft; it does not send email or confirm delivery.

## Workspace layout and maintenance

This Git repository starts at `puckbuddy-website/` inside the local `Puckbuddy-Vercel/` workspace. The parent directory is not a Git repository and is not Vercel's source root. Parent folders such as `IMAGES/`, `prototype/`, `videos/` and `Download-on-the-App-Store/` are local marketing source archives. They are not published by pushing this repository.

- `src/app/`: routes, components, hooks and library code.
- `public/`: runtime assets plus inputs used by the marketing-generation scripts.
- `scripts/`: asset audits and marketing asset generation; `requirements.txt` supplies Pillow for Python scripts. Puppeteer is a dev dependency of this repository, so scripts no longer depend on parent-workspace packages. If browser download was skipped during install, run `npx puppeteer browsers install chrome` before generating assets.
- `test/`: unit and browser tests.
- Root configuration: Next.js, TypeScript, ESLint, PostCSS, Vitest and Playwright. Keep these discoverable by their tools.

[Repository hygiene review](docs/repository-hygiene.md) records dependency checks, retained assets and deployment boundaries.
