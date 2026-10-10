# Website security review — October 10, 2026

The source scan at `c7b5eec2928fc5ad23eb2684f8f80cd088b928dd` is sealed as Codex Security scan `12efda9e-6703-42d0-ae34-c646c4b31338`. All 74 product source, test, configuration and tooling paths were reviewed. The 1,130 excluded tracked paths were 1,097 vendored Python environment files, 32 binary media assets and one lockfile. No application-specific vulnerability was confirmed. This static result did not assess installed dependency advisories or deployed configuration.

## Dependency remediation

The subsequent dependency check found an applicable Next App Router denial-of-service advisory. Next and its ESLint configuration now use 15.5.27; React and React DOM use 19.2.8. Sharp uses 0.35.5, source-map-js uses 1.2.2, and Next's PostCSS is scoped to 8.5.29. Compatible development-tool transitive updates also remove the reported tar critical advisory. No routes or product UI changed.

`npm audit --omit=dev` reports zero vulnerabilities for this lockfile. The complete tree still reports 19 package flags (18 high, one moderate), concentrated in development-only Puppeteer download/proxy and lint/glob dependencies. These are not 19 independently confirmed application vulnerabilities. They are not cleared by this patch: do not feed untrusted proxy/download configuration or arbitrary attacker-controlled patterns to development tooling. A major Puppeteer migration and unresolved upstream glob fixes are separate work; no forced framework downgrade was applied to suppress audit output.

## Validation and compatibility

- Clean `npm ci --ignore-scripts` with Puppeteer browser download disabled passes.
- All 25 unit tests, lint and the production Turbopack build pass. Lint retains two pre-existing walkthrough hook dependency warnings.
- Both browser tests pass. Production requests to the home, app, partner, Open Graph image and image optimizer routes return 200 with the expected content types.
- Actual Sharp SVG-to-PNG resize and WebP conversion pass. Independent source review found no concrete dependency API regression. Sharp requires Node 20.9 or newer; local validation used Node 24.4.1.
- The final development-only transitive refresh was followed by a clean install, unit tests, lint and build. Browser and production-route checks ran on the same runtime dependency versions before that refresh.

No hosted deployment or production visual acceptance is claimed. Merge and hosted release checks must use this lockfile and a supported Node runtime.

## Hosted preview receipt

Vercel successfully built source `ffd7bad` as preview deployment `9KECHVpRuKga4haVFXsZ13L24kHz` for PR #2. Anonymous requests redirect to Vercel login, so that readback is not a hosted-page smoke pass. Local production-route/browser evidence above remains the application acceptance evidence. Subsequent documentation-only commits do not change the tested runtime source. No production promotion occurred.
