# Next.js security update checkpoint

This candidate updates Next.js and its matching ESLint configuration from 15.5.27 to 15.5.28. Source verification, required PR/main CI and Production deployment remain separate states.

## Reason and scope

The October 22 production audit flags the earlier framework version for the upstream [SVG image advisory](https://github.com/advisories/GHSA-2464-fhr4-w9xw) and [Server Actions denial-of-service advisory](https://github.com/advisories/GHSA-p3m5-59mp-jv5r). The advisories identify 15.5.28 as the patched 15.x version.

The old lock already contains Sharp 0.35.5, which meets the image advisory's documented workaround. An affected framework version is not proof that this installation was exploitable. The update moves the framework itself to the patched release; no production exploit test was performed.

Only the Next.js family and ESLint package records change. React, Sharp, application source, assets, routes and API contracts remain unchanged. No forced audit downgrade or dependency override is introduced.

## Local verification

- Production npm audit: one critical package flag before, zero findings afterward.
- All 362 unit/component cases and thirteen real browser cases pass.
- Zero-warning lint, TypeScript, production build, asset audit and source-navigation/convention checks pass.
- Browser and build checks run sequentially because they share Next output in this checkout.

Ignored original locks, package audit JSON, exact dependency diff and check logs live under `quality-results/framework-update/`. Required protected-branch CI must pass before merging. Successful build, source-specific Production deployment and canonical public routes are verified separately after merge.
