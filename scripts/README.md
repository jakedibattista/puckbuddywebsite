# Website asset tools

Keep tools repeatable and keep generated artwork separate from source.

## Public-media reference audit

`audit-public-assets.mjs` is the CLI entrypoint. Collection, report formatting and
exit-code policy live in `lib/public-asset-audit.mjs`. The audit reads files and
never deletes, renames or writes an asset.

```bash
npm run assets:audit
npm run assets:audit:runtime
npm run assets:audit:scripts
node scripts/audit-public-assets.mjs --json --fail-on-unused
```

The inventory recursively includes regular images (`png`, `jpg`, `jpeg`, `webp`,
`gif`, `svg`, `heic`) and videos (`mp4`, `webm`, `mov`, `m4v`) under `public/`,
case-insensitively. Names are relative to `public/`, including nested directories.
It excludes other file types, symlink entries and generated directories named
`node_modules`, `.next` or `.git`.

- `--scope=runtime` reads supported text files under `src/`, plus `next.config.ts`.
- `--scope=scripts` reads supported text files under `scripts/`, plus `package.json`
  and the root `README.md`.
- `--scope=all` is the default and combines those sources. Historical `docs/` text
  does not count as evidence of a current consumer.

A selected source tree must exist. Optional root configuration/README files may
be absent. Unreadable inputs fail the scan with exit code 2; they never become an
apparently successful empty reference list. Invalid or ambiguous options also
return 2. A completed scan returns 1 only when `--fail-on-unused` is set and the
inventory contains unused media; otherwise it returns 0.

Reference matching is deliberately conservative: a literal public-relative name
or its URI-encoded spelling counts, including a name in comments. This can
produce false positives. Computed filenames and external consumers can be missed.
The report is advisory and cannot authorize deletion. It inventories the current
filesystem, including ignored local media; it does not prove that assets are
tracked, deployed, accessible or permitted for store publication. JSON retains all
references; the human report shows the first five per used asset in sorted order.

Unit tests use temporary projects and controlled filesystem failures. CLI tests
launch the actual command and verify exit codes and preservation of unused files.
Run `npm run test:coverage`, `npm run lint -- --max-warnings 0`, `npm run build` and
`npm run assets:audit:fail` after changing the tool. Existing artwork generators
keep their own inputs and browser-capture behavior.

## Artwork captures

The five `generate-app-store-v2.mjs`, `generate-play-store-screenshots.mjs`,
`generate-play-store-tablets.mjs`, `generate-play-store-feature.mjs` and
`generate-youtube-banner.mjs` commands share three owners:

- `lib/artwork-plans.mjs` defines the existing routes, selectors, output names,
  viewports and expected PNG dimensions.
- `lib/artwork-server.mjs` probes the local export route, releases probe response
  bodies and starts a temporary Next server only when needed. Requests time out
  after two seconds; startup retries and process-group cleanup are bounded. It
  never terminates a server it reused. Server ownership uses POSIX process groups;
  these commands target macOS and Linux.
- `lib/artwork-capture.mjs` waits for fonts/images, captures into a unique staging
  directory, checks saved PNG headers/dimensions through `lib/image-exports.mjs` and moves verified captures to
  their configured destination under `marketing-assets/`.

Run a command from the repository root, for example:

```bash
node scripts/generate-play-store-feature.mjs
```

Puppeteer needs its installed browser. If its cache is unavailable, set
`PUPPETEER_EXECUTABLE_PATH` to an installed Chrome executable; on macOS this can be
`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. No personal browser
profile is used. The commands retain port 3000 and the established output paths.
Programmatic callers can use `captureArtwork(plan, { root, outputRoot, port })` to
verify into a separate temporary directory and port.

Missing selectors, unsuccessful navigation, unloaded images, absent/malformed
PNG files and dimension mismatches fail the command. Browser, owned-server and
staging cleanup also run after failure. Capture and cleanup failures are retained
together; a cleanup failure prevents the success message. Staging avoids accepting
an older draft as a new result. Publication to final local filenames uses a rename
per file; a failure during those renames may leave a partial batch and returns an
error. The commands do not promise a transaction across all output files.

Saved PNGs remain drafts. Capturing, reviewing, submitting and publicly releasing
store artwork are separate states; the catalog's retained dimensions are not a
claim about current store eligibility. The previous tablet command's incorrect
`public/` success message is replaced by the actual saved paths.

## Walkthrough video builder

Run `node scripts/build-v2-walkthrough.mjs` from this repository with ffmpeg and
ffprobe on PATH. The command keeps the six established recording filenames and
`../videos/v2-walkthrough/slides/01-walkthrough.mp4` through `06-walkthrough.mp4`,
plus `../videos/v2-walkthrough/v2-walkthrough-full.mp4`. It accepts each recording
in the parent directory or the established `videos/v2-walkthrough/source/`
folder. Both copies being present is ambiguous and stops preflight. Missing,
unreadable and non-file inputs also stop before rendering. Sources stay in place;
the builder no longer organizes or overwrites recordings as a side effect.

`lib/walkthrough-build.mjs` owns input preflight, unique staging, publication and
cleanup. `lib/walkthrough-render.mjs` owns the established template, crop/overlay,
silent H.264 encoding, concat list and output probing. Subprocess arguments are
passed directly without a shell. The crop still expects the original 1170×2532
portrait capture format; arbitrary input-video compatibility remains outside
this command's contract.

All six clips and their concatenation must pass nonempty-file, 1920×1080,
H.264/yuv420p, no-audio and positive-duration checks before any existing export is
replaced. Each final output uses an individual rename; a publication failure can
leave a partial batch and fails the command. Cleanup failures also fail completion,
with both errors retained if rendering already failed. This is not an atomic
transaction across all seven outputs. Generated videos remain local drafts.

Tests use disposable files and controlled renderer/process responses. A separate
local synthetic-media check verifies real ffmpeg/ffprobe execution and byte-for-byte
template parity; it does not inspect or certify the original owner recordings.


## Social-banner drafts

Run `node scripts/generate-social-banners.mjs` from the repository root. The command
reports six actual saved paths in `marketing-assets/social/`: SVG and PNG pairs for
`youtube-banner` (2560×1440), `facebook-cover` (1640×624) and `og-image` (1200×630).
It no longer reports the unrelated `public/social/` directory.

`lib/social-banner-designs.mjs` owns the established layouts and shared copy. The
source no longer promises instant results or describes unverified rink testing.
The rest of each SVG layout remains unchanged. Existing exported artwork is dated
material; updating generator source does not retroactively replace those files or
publish anything to a social account.

`lib/image-exports.mjs` owns shared PNG header/dimension validation, also used by the
browser artwork capture owner. Its `writeSvgExports(designs, outputRoot)` validates
plan names/dimensions before file acquisition, writes each SVG/PNG to unique staging,
checks PNG headers/dimensions and decodes pixel data before any final file changes.
Sharp retains the existing density, resize and PNG-encoding options. Programmatic
callers can choose a disposable output directory for review.

A render, write, read, decode or validation failure preserves previous final files.
Publication uses individual renames and can leave a partial batch if a later rename
fails. Cleanup failures prevent completion, retaining earlier failures when present.
An abruptly killed process is not guaranteed to clean staging. These local drafts
require content review before upload; saved files are not publication evidence.

## Light and bold Apple screenshot drafts

`node scripts/generate-app-store-images.mjs` and
`node scripts/generate-app-store-bold.mjs` keep their existing five `public/v2-*`
inputs and PNG names. Outputs belong in `marketing-assets/app-store/` and
`marketing-assets/app-store-bold/`, respectively. Completion prints actual saved
paths. A missing input, failed render, invalid PNG or publication/cleanup failure
returns command failure; per-image exceptions are no longer swallowed.

`lib/store-screenshot-designs.mjs` owns one source catalog, shared 1284×2778 geometry,
shared text layout and the two existing style templates. The scorecard heading uses
“Review Your / AI Feedback” instead of the unsupported instant-result promise.
`lib/store-screenshot-render.mjs` preserves crop/resize/mask/frame/text composition
and returns PNG bytes without file writes. `lib/store-screenshots.mjs` captures all
five input buffers before output acquisition. `lib/image-exports.mjs` publishes
raster-only jobs through the same staged validation/lifecycle as SVG/PNG pairs.

Programmatic `generateStoreScreenshots(style, {root, outputRoot})` supports an
explicit review directory; styles are `light` and `bold`. Sources stay in place.
All PNGs must pass saved-header/dimension checks and pixel decoding before any
final rename. Publication remains per file and can leave a partial batch if a
later rename fails. The outputs remain local drafts; dimensions are established
project values, not a claim of current store eligibility. Other legacy generators
and previously uploaded artwork retain separate review and acceptance.
