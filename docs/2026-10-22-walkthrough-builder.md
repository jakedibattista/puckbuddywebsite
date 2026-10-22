# Walkthrough builder ownership — October 22, 2026

This records the candidate after website `057ba96`. The [tool guide](../scripts/README.md)
owns maintained commands and publication limits. These checks use synthetic media;
original-recording review, deployment and store submission remain separate.

## Runtime changes

The former command combined template rendering, shell commands, source relocation
and direct final-output writes. It relocated recordings while discovering inputs,
so a later missing recording could leave earlier inputs moved. A duplicate legacy
source could be overwritten. Rendering failure could replace an earlier final
clip before the remaining clips or concatenation succeeded.

The CLI now delegates input preflight/staging/publication to
`scripts/lib/walkthrough-build.mjs` and the established template, ffmpeg encoding
and output admission to `scripts/lib/walkthrough-render.mjs`. Every recording must
exist in exactly one supported location and be a file before staging begins.
Recordings stay in place. Subprocess argument arrays preserve literal paths without
a shell. Established input/output names, geometry, crop, overlay and encoding
settings are retained. Ambiguous duplicate inputs now fail rather than overwrite.

A unique staging directory holds all six clips and the concatenation. Every output
must be nonempty, 1920×1080 silent H.264/yuv420p with positive finite duration before
publication. Existing exports survive preflight/render/probe/concat failures.
Publication still uses one rename per file: a later rename failure can leave a
partial batch and reports failure. Cleanup failure prevents success; an earlier
failure is retained alongside cleanup failure. Abrupt process termination is not
claimed to run cleanup. The tool retains its original portrait-format assumption.

## Local verification

Thirty-three new cases cover source preservation, both supported input locations,
ambiguity/missing/non-file/unreadable inputs, template/render/probe/concat failures,
publication failure, cleanup failure, literal process arguments, media admission
and CLI outcomes. All 287 website unit cases pass. The CLI and both new runtime
owners have complete measured line/function/statement/branch coverage.

Whole-site coverage is 761/1,132 executable lines (67.22%), 572/602 branches
(95.01%), 229/296 functions (77.36%) and 927/1,302 statements (71.19%). Uncovered
ceilings tighten from 451 to 371 lines, 457 to 375 statements and 78 to 67 functions;
the branch ceiling stays thirty. New owners receive complete-coverage floors;
existing owner floors are unchanged. Types, zero-warning lint, production build,
repository/documentation checks and thirteen Chrome cases accompany acceptance.

Eleven selected source faults produce assertion failures between healthy full
287-case baseline/restoration runs. They protect ambiguity rejection, both probe
stages, cleanup, ordering, width/height/audio/duration admission, literal process
arguments and visible command failure. The initial diagnostic used a Vitest
promise-rejection wrapper reported as `Error`; it is not accepted as an assertion
detection. Controls now compare explicit outcomes, and the accepted rerun has no
errors/timeouts. This selected catalog is not a whole-site mutation sweep.

A separate real-media run uses only generated black 1170×2532 video in a disposable
path containing spaces, an apostrophe and shell metacharacters. The original and
new template PNGs match byte for byte, as does layout geometry. All seven real
ffmpeg outputs pass ffprobe admission, every synthetic source byte is preserved,
and staging is removed. The original template source is retained from `057ba96`.
This proves local tool integration within that synthetic scope, not actual owner
recording content, visual approval or store eligibility.

Reports, rejected diagnostics, source/input hashes, integration receipts and logs
remain in ignored `quality-results/walkthrough-builder/`. Fresh source-specific CI
and merge acceptance must be checked independently. No original recording, customer
record, inquiry, app release or backend cutover is performed by this change.
