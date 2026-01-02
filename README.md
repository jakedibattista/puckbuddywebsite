Puck Buddy marketing website (Next.js App Router).

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

- `NEXT_PUBLIC_SITE_URL`: canonical site URL (e.g. `https://buddyllc.app`). Used for correct OpenGraph/Twitter URL resolution.

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
