# Light and bold Apple export ownership — October 22, 2026

This records the candidate after website `44a2249`. [Tool instructions](../scripts/README.md)
own commands and local publication limits; [marketing claims](marketing-claims.md)
own copy evidence. New source and generated review files do not submit store assets.

## Reproduced failure and responsibility

Two original-source controls reproduce the light/bold commands swallowing per-image
render failures, printing “Done” and leaving the exit status successful. They operate
with controlled Sharp/filesystem boundaries and create no real output. The original
source/logs remain retained; these expected failing controls are not accepted healthy
runs or mutation detections.

The commands now report only acknowledged saved paths or return failure.
`store-screenshot-designs.mjs` owns one source catalog, shared dimensions/text layout
and two style-specific SVG templates. `store-screenshot-render.mjs` owns the existing
crop/resize/mask/frame/text ordering and returns PNG bytes without writes.
`store-screenshots.mjs` reads all five source buffers before output acquisition.
`image-exports.mjs` owns staged validation/publication for raster jobs and existing
SVG/PNG pairs. No competing screenshot lifecycle is introduced.

The established five input/output names, 1284×2778 dimensions, status-bar crop,
frame geometry, colors, masks, typography and composition order are preserved.
Only the unsupported “Get Instant” scorecard heading becomes “Review Your.” Sources
stay in place. All saved PNGs are header/dimension checked and pixel decoded before
any final rename. Per-file publication can still leave a partial batch on later
failure; the command reports that failure. Cleanup errors preserve an earlier error.
No abrupt-termination cleanup or transaction across the batch is claimed.

## Independent checks

Twenty-seven added tests cover both command outcomes, catalog/geometry/copy,
independent configuration, pixel crop and frame/image positions, invalid captures,
all-input preflight, source/config bindings, output roots and shared raster
publication. All 343 unit cases pass. Six changed runtime owners have complete
measured line/branch/function/statement coverage. Whole-site coverage is 878/1,122
executable lines (78.25%), 604/630 branches (95.87%), 263/309 functions (85.11%) and
1,060/1,308 statements (81.03%). Uncovered ceilings tighten to 244 lines,
248 statements, 46 functions and 26 branches; existing owner floors remain strict.

A real-image integration check uses five generated color captures, not customer
screens. Both original sources are checked against Git `44a2249`; only the intended
title replacement is applied to the comparison. Ten complete 1284×2778 PNGs match
the old pipelines byte for byte, and input bytes survive unchanged. A second run
rechecks all three social SVG/PNG pairs against their earlier exact-layout/encoding
contract after the shared publisher change. Local generated images remain in ignored
review directories. The synthetic light scorecard was visually inspected for
readable heading/layout; real inputs still require separate visual/content approval.

Twenty-eight selected source faults produce assertion failures between healthy
full 343-case baseline/restoration runs. Controls protect inherited SVG/capture behavior plus
raster admission, source/config/crop/mask/placement bindings, catalog fields and
command/publisher errors. Errors, timeouts, survivors and unexecuted source never
count as detections. Raw originals, diagnostic controls, coverage, parity, logs,
fault reports and source hashes remain in ignored `quality-results/apple-exports/`.

Types, zero-warning lint, asset audit, production build, repository/documentation
checks and thirteen Chrome cases accompany acceptance. Fresh source-specific CI,
merge/deployment, genuine screenshot review and store submission remain separate.
Legacy lite/iPad/Play generators and remaining uncovered pages/layout/export source
remain debt; this does not complete the full audit or app release.
