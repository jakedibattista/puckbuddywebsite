Puck Buddy marketing website (Next.js App Router).

**Live site:** [buddysports.app](https://buddysports.app) · **Repo:** [github.com/jakedibattista/puckbuddywebsite](https://github.com/jakedibattista/puckbuddywebsite) · **Vercel:** `buddy-tech/puckbuddy-website`

## Site structure

| Path | File | Notes |
|------|------|-------|
| `/` | `src/app/page.tsx` | Homepage — two-column hero with `HomeHeroVisual`, product CTAs |
| `/puckbuddy` | `src/app/puckbuddy/page.tsx` | Hero video carousel, `HowItWorks`, pricing, download strip |
| `/lacrosse` | `src/app/lacrosse/page.tsx` | External Lax Buddy / Scout links with Beta labels |
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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
