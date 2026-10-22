# Motion subscription boundaries — October 22, 2026

This records the candidate after `2510ce1`. [Navigation](codebase-navigation.md)
owns maintained responsibilities; this receipt distinguishes hook API controls
from whole-browser support, source CI and production deployment.

The shared preference hook previously called modern media-query registration and
removal methods unconditionally. Six new controls fail against that source for
legacy-only and incomplete listener pairs. The hook now discovers a complete
modern pair, otherwise a complete legacy pair, otherwise a static fallback.
Modern APIs take precedence; each registered listener is removed from its captured
query. Server snapshots remain static and access no browser APIs. Public exports,
query text, routes, media, marketing copy and telemetry remain unchanged.

Eight additional unit cases cover legacy changes in both directions, exact
cleanup, incomplete modern/legacy pairs, unsupported static behavior, modern
precedence and server isolation. The full 254-case suite passes. The hook retains
complete line/statement/function/branch coverage; whole-site coverage is 59.87%
lines and 94.72% branches. Existing uncovered ceilings and owner floors are
unchanged; the additional covered compatibility code changes the denominator.
This does not remove unrelated uncovered source. TypeScript, zero-warning lint,
production build and thirteen Chrome browser cases pass.

Nine selected faults are assertion detections between healthy full 254-case
baseline/restoration runs in disposable, source-bound copies. They protect pair
selection, registration/removal ownership, static fallback and server rendering.
No error, timeout or unexecuted behavior counts as a detection. These are selected
controls, not a whole-site mutation sweep.

An initial global legacy-only browser fixture still fails in the pinned animation
dependency: Framer Motion's separate query calls modern `addEventListener` itself.
That failed run remains a failure and framework-wide legacy browser acceptance
remains open. The passing new browser case explicitly shadows methods only for
this hook's exact query, while framework queries retain native APIs. It verifies
the hook's boundary with real legacy callbacks and live preference changes; it
does not certify a globally legacy browser or modify a dependency/global API to
force support. Modern-browser page composition remains covered by the other
twelve cases.

Raw original controls, diagnostic failure, accepted browser/build/type/lint logs,
coverage and selected-fault reports remain in ignored
`quality-results/motion-compatibility/`. Fresh source-specific CI and production
acceptance remain separate. No customer record, inquiry, app publication or backend
cutover changes in this follow-up.
