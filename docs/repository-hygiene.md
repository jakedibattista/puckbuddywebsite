# Repository hygiene review — 2026-09-15

TypeScript module resolution followed imports/exports and literal dynamic imports from Next.js route entrypoints and operational scripts. Of 57 non-test source/config/script files, 36 roots reached 51 files; no `src/` module was unreachable. The remaining files were tool configuration. This establishes no whole-file deletion candidate, not proof that every exported symbol or branch is used.

`npm run assets:audit` found 26 public assets, all referenced by runtime code or generation scripts, zero unused. Script-only assets are not dead files. The mixed historical image names identify source assets consumed by those scripts; renaming without updating those consumers would break generation.

The root has 11 tracked/new non-ignored files, primarily required framework/test configuration. The local `Puckbuddy-Vercel/` parent is an asset workspace, not a fourth Git repository. This repository's README now documents that boundary and no longer includes duplicate Next.js deployment tutorial boilerplate.

No whole source-file or asset deletion was justified. ESLint also identified a private uncalled `createRoundedMask` helper, an unused config import, unused script constants/catch bindings, and an unused state setter; those unused symbols were removed after reference checks. Dependencies were checked before making that decision. Five generation scripts imported Puppeteer through the local parent workspace rather than their own package manifest; Puppeteer is now declared in this repository so clean checkouts can resolve those imports. Static reachability does not cover remote consumers or every possible computed filename.

Validation commands: `npm test`, `npm run lint`, `npm run build`, `npm run test:browser`, `npm run assets:audit`. Browser tests block external requests and do not send partner inquiries; the form opens a mail draft. A Git push and a successful Vercel deployment are separate evidence; verify the deployment state and production alias after publication.
