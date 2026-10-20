# BuddySports Vercel release — October 20, 2026

This is dated release evidence. [Vercel operations](vercel-operations.md) owns
the current contract; the [shared platform guide](https://github.com/jakedibattista/puck-buddy/blob/main/docs/vercel-platform.md)
connects both websites and the account review. No credentials or inquiry contents
are included here.

## Source and deployment

- [PR 3](https://github.com/jakedibattista/puckbuddywebsite/pull/3) merged as `5d1dc411b956623df7ce3f56688449d52007fd0f`: receipt storage, notification/retry, metadata and operations.
- [PR 4](https://github.com/jakedibattista/puckbuddywebsite/pull/4) merged as `61db017ff058cac92d6b2b809b7c5bf947e67e78`: partner-page mobile overflow fix and browser regression coverage.
- Final deployment: `dpl_C1mtPSoptzDHbwk2rArrbxnp2ZxB`, assigned to `buddysports.app`. Vercel held domain assignment until its required `quality` check succeeded; no override was used.
- Provider configuration includes the private production-only inquiry Blob store, sensitive production SMTP/cron variables, exact-path POST rate limit and the `buddyllc.app` redirect. Source alone does not recreate those account settings.

## Verified behavior

The live test returned HTTP 201 with a durable submission reference. The
notification was independently found in the destination Gmail inbox, rather
than inferred from SMTP acceptance. Repeating the same ID and payload returned
the same reference with one matching inbox message. An unauthenticated private
receipt read returned 403; the retry route returned 401 without authorization.
The sixth inquiry POST in a 60-second rate-limit probe returned 429.

The 308 redirect preserved paths and queries, including `mode`, `oobCode`,
`apiKey`, `continueUrl` and `lang`. Public canonical routes and artwork
`noindex,nofollow` were verified. At 390px, the partner page remained within the
viewport after the animation overflow fix.

The final PR quality run passed 79 unit tests and six browser tests, plus
repository, lint, type, coverage, asset and build checks. New inquiry validation,
receipt and API paths reached 100% line/branch coverage; this is not whole-site
coverage. Existing uncovered-code budgets were preserved. The post-release
runtime-error query returned no errors in the checked window.

## Limits

### Documentation publication quality review

A fresh 79-test coverage run passed before publishing these documentation updates.
Whole-site executable-line coverage was 26.75%; the inquiry and conversion-telemetry
functions measured here had no CRAP score at or above 30 (24 measured functions,
maximum 15). CRAP combines cyclomatic complexity and uncovered executable lines;
the shared dashboard analyzer `quality/crap.cjs` was run against the website's
fresh `coverage/coverage-final.json`. No analyzer errors occurred. This one-off
measurement does not add or relax a website CI gate.

The same measurement found 16 existing high-CRAP functions across the website
inventory. These are dated findings, not a claim that the whole site is clean or
a second backlog. The [engineering debt checkpoint](https://github.com/jakedibattista/puck-buddy/blob/main/docs/quality/engineering-debt.md)
owns broader prioritization. Add behavioral coverage before extracting these
responsibilities; cosmetic splitting alone does not establish correctness.

| File / function | CRAP |
| --- | ---: |
| `scripts/audit-public-assets.mjs` / `walk` | 30 |
| `scripts/audit-public-assets.mjs` / `main` | 342 |
| `scripts/generate-app-store-v2.mjs` / `main` | 42 |
| `scripts/generate-play-store-feature.mjs` / `main` | 30 |
| `scripts/generate-play-store-screenshots.mjs` / `main` | 42 |
| `scripts/generate-play-store-tablets.mjs` / `main` | 72 |
| `scripts/generate-youtube-banner.mjs` / `main` | 30 |
| `src/app/page.tsx` / `Home` | 182 |
| `src/app/about/page.tsx` / `About` | 30 |
| `src/app/components/HomeHeroVisual.tsx` / `HomeHeroVisual` | 42 |
| `src/app/components/RatingBadge.tsx` / `RatingBadge` | 42 |
| `src/app/components/ScrollAnimation.tsx` / `ScrollAnimation` | 72 |
| `src/app/components/StoreBadges.tsx` / `StoreBadges` | 42 |
| `src/app/lacrosse/page.tsx` / `LacrossePage` | 56 |
| `src/app/partner/page.tsx` / `PartnerPage` | 90 |
| `src/app/puckbuddy/page.tsx` / `PuckBuddyPage` | 90 |

### Delivery and acceptance limits

An accepted submission proves stored receipt/outbox state, not future email
delivery. Notifications are at-least-once; an SMTP success followed by a failed
marker write can produce a duplicate. The hourly cron is configured, but this
receipt does not claim a separately observed scheduled retry execution.
Preview has no production storage or mail credentials. Credentials were reused
with explicit owner approval and were not printed or committed.
