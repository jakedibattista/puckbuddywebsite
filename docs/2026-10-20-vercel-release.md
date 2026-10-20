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

## Later preview accessibility audit

The later playback/preference changes have their own local receipt; the deployment
IDs above describe the earlier release. Homepage and carousel previews now share
one playback owner, which pauses replaced or detached videos and removes their end
listeners. Rejected autoplay leaves the poster available. A late play completion
cannot restart a detached preview or stop a newer effect on the same element.

A Chrome regression exposed that the installed animation hook did not update
components when the operating-system motion preference changed. The shared
`useReducedMotionPreference` hook now subscribes to that preference for the eight
existing reduced-motion-hook call sites. Server rendering uses static content, followed by the
browser preference after hydration. Browsers without media-query support remain
static. Tests check subscription cleanup, both preference transitions and the
server snapshot, in addition to playback replacement and React StrictMode behavior.

The updated local suite passes 104 tests and seven Chrome browser cases, including
live homepage preference changes with no page/hydration errors. Whole-site coverage
is 29.78% executable lines and 50.43% branches. HomeHeroVisual, HeroVideoCarousel,
StoreBadges, RatingBadge and ScrollAnimation have 100% line/branch/function/statement
coverage; the preference hook also has 100%. The playback hook has 100% lines,
functions and statements, with 92.3% branches. Global uncovered ceilings tighten
from 883/925/175/271 lines/statements/functions/branches to 851/890/164/228, with
new component-specific floors; no previous floor is lowered.

The same dashboard analyzer described above now finds 12 high-CRAP functions
(272 measured functions, no analyzer errors); the four newly covered visual
components no longer exceed 30. This remains a one-off measurement rather than a
new website CI gate. Most page bodies and asset-generation tools remain coverage
debt. The rating test checks consistent use of the configured value; it does not
independently verify the current App Store rating. Browser inquiry responses are
local fixtures and external requests are blocked; this audit creates no customer
inquiry, store purchase or backend acceptance evidence.


## Later asset-audit review

The read-only media audit now inventories nested images and videos, honors the
selected source scope and fails explicitly on unreadable inputs. Its CLI delegates
to `scripts/lib/public-asset-audit.mjs`; the [tool guide](../scripts/README.md)
defines supported file types, reference heuristics and exit codes. No media was
removed or added. Three CLI regressions failed against the earlier command.

The updated local suite passes 121 tests. The audit core reaches 100% executable
line/statement/function/branch coverage; actual child-process CLI checks also
verify exit codes and file preservation. Whole-site executable-line coverage is
33.97% and branch coverage is 58.45%. Global uncovered ceilings tighten to
787/821/155/194 lines/statements/functions/branches, and the core has a new 100%
per-file floor. The same one-off analyzer now finds ten high-CRAP functions among
280 measured functions, with no analyzer errors. This remains separate from a
website complexity CI gate.

The physical local inventory has 40 supported media files with references; 34 are
tracked and six are ignored local walkthrough recordings. Those recordings stay
local. A clean checkout has the tracked inventory; a reference scan does not prove
that local recordings exist on a deployment. The result does not authorize
cleanup or establish artwork/store-publication acceptance. The earlier deployment
receipts above remain bound to their stated sources.


## Later artwork-generator lifecycle audit

The five HTML-based capture commands now share a plan catalog, server owner and
capture engine. Routes, final output names, viewports and pixel dimensions remain
as configured before the split. Missing selectors, failed/absent PNG writes and
capture errors no longer print success or bypass browser cleanup. Fifteen new
entrypoint regressions fail against the earlier scripts. The tablet command now
reports its actual `marketing-assets/` destinations rather than `public/`.

The [tool guide](../scripts/README.md#artwork-captures) owns setup, staging,
per-file rename limits and cleanup semantics. Each plan captures into unique
staging, validates saved PNG headers and dimensions, and reports completion only
after cleanup. Existing servers remain outside its ownership. Readiness requests
and startup/cleanup waits are bounded; probe bodies are released. No consumer
marketing copy, team-access behavior or existing artwork draft was changed.

Local acceptance passes 166 unit tests, types, zero-warning lint and repository/
documentation checks. The three new helper modules have complete executable-line,
statement, function and branch coverage. Whole-site line coverage is 47.24% and
branch coverage 69.72%; global uncovered ceilings tighten to 555/563/129/142
lines/statements/functions/branches with new 100% helper floors. The one-off
analyzer records five remaining high-CRAP functions among 280 measured functions,
with no analyzer errors. The remaining five are public page bodies; this does not
establish complete website coverage or a new complexity CI gate.

Real local Chrome runs exercised all five plans on port 3418 and produced 18 PNGs
in a temporary output directory. Independent decoding checked every PNG and its
pixel dimensions, and the manifest retains their hashes. Browser instrumentation
blocked 12 external requests during this verification. The owned server was no
longer reachable after each plan. Representative Apple and feature-graphic
captures were visually inspected. An initial missing-browser attempt failed
cleanly and released its server; retry used the installed Chrome executable.
Those runtime observations are separate from the unit-test coverage figures.
The existing local drafts remain untouched. These captures are verification
artifacts, not saved store submissions or public releases.


## Later public-page composition audit

The page suite renders Home, About, PuckBuddy, Partner and Lacrosse with their real
shared components. It checks platform-aware downloads, retained pricing/team
inquiry destinations, scheduling links, bounded telemetry and selection-to-receipt
routing. Requests and external navigation are controlled fixtures; no inquiry,
booking or purchase is sent to a real provider.

Nine initial regressions fail against the prior source: the partner page promises
planned completion webhooks, pending inquiry scrolls ignore reduced motion or
survive replacement/unmount, About hero animation ignores the preference, and
rating literals diverge from an injected shared configuration. The API capability
text now agrees with the backend's
[documented polling contract](https://github.com/jakedibattista/modelforpuckbuddy/blob/38e70f5/docs/API_REFERENCE.md).
Inquiry scrolls follow the latest tier/preference and unmount cleanup. A separate
failing control exposed the inquiry-type group's missing accessible selection
state; its fieldset/legend and pressed buttons now expose that state. Two further
page controls caught lacrosse navigation being counted as a store click. Custom
mobile navigation now uses its own event without changing actual store events.

The shared rating remains 4.7 and the analyzed-video label remains 5,000+; page,
metadata and social-image consumers use their shared owner. The
[US Apple listing](https://apps.apple.com/us/app/puck-buddy/id6752230304) returned
4.7 when checked on October 20. These tests inject alternate fixture values to
expose duplication; they do not continuously verify provider data. On October 20,
the owner identified manual tracking of Firebase video jobs as the source of the
5,000+ lifetime estimate. Older jobs are deleted, so a read-only retained-job
aggregate cannot reproduce, establish or disprove that lifetime figure. The shared
constant remains an owner-maintained estimate rather than a live counter; no
exported lifetime ledger was supplied for independent reconciliation. Advertised
customer-sandbox availability remains unconfirmed.
Processing-time, experience and testimonial claims also need their own evidence;
this batch does not certify every marketing statement.

Local acceptance passes 195 unit tests and eight Chrome cases, including a new
controlled inquiry case that verifies immediate reduced-motion scrolling,
accessible tier selection and the final submitted tier after a user override.
All five measured page bodies, product metadata/layout, social-image renderer,
ContactForm and MobileStickyCTA reach complete line/statement/function/branch
coverage with new 100% floors. Whole-site executable-line coverage is 54.04% and
branch coverage is 87.93%; global uncovered ceilings tighten to
488/495/95/59 lines/statements/functions/branches. The same one-off analyzer finds
no high-CRAP functions among 282 measured functions, with no analyzer errors.
Uncovered source remains; this score does not certify complete coverage,
accessibility conformance, external product health or release acceptance.
