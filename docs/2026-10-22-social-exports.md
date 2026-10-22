# Social-banner export ownership — October 22, 2026

This records the candidate after website `de6d06d`. [Tool instructions](../scripts/README.md)
own commands and local publication limits; [marketing claims](marketing-claims.md)
own evidence requirements. New generator source does not replace old uploaded artwork.

## Changes and preservation

The old command mixed layouts, file writes and PNG rendering, overwrote final files
before all renders succeeded, and reported `public/social/` despite saving under
`marketing-assets/social/`. Its designs also repeated unsupported instant-result
and rink-testing copy. The command now delegates established layouts/shared copy
to `scripts/lib/social-banner-designs.mjs` and file lifecycle to
`scripts/lib/image-exports.mjs`. It reports the six actual acknowledged paths.

The export owner validates names, duplicates and dimensions before file acquisition,
stages all SVG/PNG pairs, checks PNG headers/dimensions and decodes pixels before
publication. Rendering or validation failure preserves existing final drafts.
The header/dimension validator moves unchanged from `artwork-capture.mjs` into the
shared owner; browser captures retain their existing admission behavior. Individual
publication renames can still leave a partial batch on later failure. Cleanup
failure blocks success and retains an earlier failure. Abrupt termination does not
promise cleanup. The command does not upload, send inquiries or publish assets.

The three output names and sizes, SVG layouts, density/resize/PNG settings remain
unchanged. Caption copy becomes “Upload a shot. Review scorecards + coaching feedback.”
and the badge becomes “AI hockey feedback.” No pricing, team access or sales channel
changes. Existing saved exports remain dated drafts requiring their own review.

## Local checks

Twenty-nine new tests cover actual small-image rendering/decoding, name/dimension
preflight, file/render/read/header/decode failures, old-draft preservation, individual
publication failure, cleanup, shared validator boundaries, CLI acknowledgement and
supported copy/layout invariants. All 316 unit cases pass, including existing
browser-capture command controls. Types, zero-warning lint, production build,
repository/documentation gates, asset reference audit and thirteen Chrome cases
accompany acceptance.

The command, design owner, export owner and changed browser-capture owner have
complete measured line/branch/function/statement coverage. Whole-site coverage is
811/1,149 executable lines (70.58%), 587/617 branches (95.13%), 240/298 functions
(80.53%) and 984/1,326 statements (74.20%). Uncovered ceilings tighten from
371/375/67 to 338 lines/342 statements/58 functions; the branch ceiling stays thirty.
Existing owner floors remain unchanged and the new owners receive 100% floors.

A separate real render checks original source against Git `de6d06d`. All three
SVGs match the original byte for byte after only the two intended phrase replacements.
All six files are saved in an ignored review directory; three complete PNGs decode
at 2560×1440, 1640×624 and 1200×630. Their encoded bytes match the original encoding
sequence applied to the corrected SVGs. The rendered social preview was visually
inspected for visible copy and layout. This is local synthetic/static artwork
acceptance, not social-account or store publication.

Thirteen selected source faults produce assertion failures between healthy full
316-case baseline/restoration runs. They protect dimensions, names, duplicate
admission, decoding, staging/cleanup, copy, CLI outcomes and the shared browser
capture validator binding. Survivors, errors, timeouts and unexecuted source are not
successful detections. Raw diagnostics, coverage, integration/visual outputs,
source hashes and fault evidence remain in ignored `quality-results/social-exports/`.
Fresh source-specific CI, merge and deployment acceptance remain separate. Remaining
store generators, page/layout/export coverage and original store/social artwork
review remain open; this change does not complete the full audit.
