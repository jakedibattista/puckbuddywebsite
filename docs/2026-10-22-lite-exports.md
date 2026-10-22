# Lite screenshot lifecycle — October 22, 2026

This records the local candidate after website `5908170`. The [tool guide](../scripts/README.md)
owns maintained commands; [navigation](codebase-navigation.md) owns responsibilities.
Local tests and synthetic artwork do not certify genuine captures, deployment or
store publication.

## Reproduced failure and ownership

The original command exits zero after a missing screenshot prints an error because
its final handler only calls `console.error`. A real disposable command run retains
that reproduction. The new command reports failure with exit one and prints saved
paths only after the complete lifecycle succeeds. All seven unique source buffers
are read before output acquisition. Inputs remain untouched.

One catalog preserves existing iPhone/iPad dimensions, crops, headings and sixteen
output names. One renderer preserves the background/text/frame, rotation and
panorama slice boundary. One planner binds input buffers and renders each device
panorama once. The shared raster publisher accepts optional validated destination
directories, stages all sixteen PNGs, checks saved dimensions and decodes pixels
before final changes. It prepares both destinations before any publication.
Existing flat SVG/raster plans retain their output bindings and checks.

Individual final renames do not provide an atomic transaction across files. A
later rename failure can leave a partial batch and returns failure. Cleanup
failures remain failures, retaining an earlier error when present. Abrupt process
termination is not claimed to run cleanup.

## Local acceptance

The full suite passes 362 unit cases, nineteen more than its predecessor. The
Lite CLI/catalog/renderer/planner and changed shared publisher have complete
line, statement, function and branch coverage. Whole-source coverage is 943/1,089
lines (86.59%), 622/638 branches (97.49%), 283/316 functions (89.55%) and
1,131/1,281 statements (88.29%). Uncovered ceilings tighten from 244/248/46/26
to 146/150/33/16 lines/statements/functions/branches; existing owner floors remain
unchanged and the new Lite owners require complete coverage.

Disposable tests cover preflight, one source read per unique file, captured buffers,
both device plans, shared panorama rendering, crop/frame pixels, both slices,
publication errors, invalid destination paths and all-destination preparation.
A separate real Sharp run generates every original and new full-size PNG from
synthetic 1170×2532 color captures. All sixteen pairs match byte for byte, all
seven input hashes remain unchanged and staging is clean. Paths include spaces,
an apostrophe and shell metacharacters. The actual new command fails without
creating output directories when sources are missing. One synthetic panorama
was visually inspected; these colors are test inputs, not store screenshots.

The initial focused run failed two pixel expectations: the original frame's
translucent edge stroke is RGB 51,51,51 rather than black at the selected row.
The corrected controls preserve that established appearance. This fixture
correction is not a discovered product bug or a successful fault detection.

A first shared-publisher fault run is rejected: bypassing staging also caused an
incidental missing-file read in the new grouped-output control. Explicit file
presence assertions replace that incidental error. No runtime error counts as a
successful fault detection. The initial production build also failed while the
browser suite ran a development server against the same `.next` directory;
that overlapping run is not accepted. Build and browser checks must run serially
until their output directories are isolated.

Forty-four selected source faults are caught by assertions between healthy
362-case full-suite baseline/restoration runs. They include the preceding
twenty-eight image/Apple/capture controls and sixteen directory/Lite controls.
All source/test/config/dependency fingerprints remain unchanged throughout the
accepted run; no error, timeout or unexecuted fault is a detection. This is a
selected catalog, not whole-website mutation coverage.

Raw original source/failure, coverage, integration inputs/comparisons and logs
remain in ignored `quality-results/lite-exports/`. Fresh source-specific CI and
merge/deployment acceptance remain separate. Other legacy generators, genuine
capture review and remaining uncovered runtime source keep their own debt.
