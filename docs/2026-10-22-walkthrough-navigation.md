# Walkthrough and public navigation — October 22, 2026

This records the local candidate after `fb4f4a4`. [Navigation](codebase-navigation.md)
owns responsibility and persistence contracts; [Vercel operations](vercel-operations.md)
owns deployment. Local checks do not establish main CI, production deployment,
store publication or playback of the owner's original recordings.

## Reproduced problems and changes

Ten initial walkthrough controls fail against original source with behavioral
assertions: blocked storage reads, rejected writes, partial cache/media restoration,
invalid-JSON recovery notice, stale playback rejection after resume/source change,
unmount cleanup, synchronous playback failure, intercepted browser Find and
unavailable fullscreen. Separate original-navigation controls reproduce Escape
dismissal/focus and reduced-motion failures. Existing destinations, routes, badge
text and telemetry values remain compatible.

The walkthrough catalog and typed text recovery move to `walkthroughSlides.ts`;
all original catalog bytes are preserved. Browser persistence owns read failure,
partial recovery and storage-before-adoption saves. Valid strings, including empty
text, survive malformed companion fields; default media replaces untrusted cached
media metadata. Original cache bytes are not deleted on read. Failed Save/Reset
keeps its draft and reports the failure. Successful saves retain the v3 key and
legacy full-slide shape, including configured videos.

Playback has its own source/attempt owner. Source replacement and unmount pause
old elements, retired failures cannot pause newer attempts and late success cannot
restart detached media. Pause/resume does not reload. Each source gets a distinct
element; repeated end events cannot double-advance. The normalized catalog now
owns slide/media invariants, replacing unreachable page fallbacks. Keyboard
shortcuts leave modified keys and interactive/editable targets alone; fullscreen
entry/exit/failure have explicit handling.

Shared navigation exposes the mobile region through its toggle, closes with
Escape and restores focus, and honors live reduced-motion changes. Desktop
submenu destinations use normal link semantics within a labeled group. The
unused alternate badge style is removed; the configured New badge stays unchanged.
All product/section/download destinations and telemetry contexts are tested.

## Local verification

The full suite passes 246 unit cases, 51 more than the preceding 195. Navigation,
walkthrough page, catalog, persistence and playback owners all have complete line,
statement, function and branch coverage. Whole-site coverage is 661/1,112 lines
(59.44%), 807/1,264 statements (63.84%), 212/290 functions (73.10%) and 527/557
branches (94.61%). The uncovered ceilings tighten from 488/495/95/59 to
451/457/78/30 lines/statements/functions/branches, with five new 100% owner floors.
No prior floor is relaxed and unexecuted source remains included.

The existing one-off dashboard complexity analyzer measures 292 functions with
zero high-CRAP functions and no errors against fresh website coverage. Its legacy
report label remains `coaches`; its paths/root are verified as this website. This
diagnostic does not add a website complexity CI gate or prove complete coverage.
TypeScript, zero-warning lint, production build and asset-reference audit pass.

All twelve Chrome cases pass, including four new cases for mobile Escape/focus
and section navigation, real synthetic-video pause/resume/unmount, rejected local
storage writes and partial cache recovery. All external browser requests are
blocked. Media requests receive a generated eight-second silent black H.264 video;
its 4,185 bytes, hash, codec and dimensions are checked independently. This proves
browser playback/controller behavior with that fixture, not the original MOV/MP4
recordings or native app/provider acceptance. The recorded fixture has no customer
data. No real inquiry, booking, store visit or backend operation is submitted.

Eighteen selected source faults are each caught by assertions between healthy
246-case baseline/restoration runs in disposable copies. They protect persistence
acknowledgement/order, stale media attempts, cleanup/source ownership, catalog
recovery, storage-key compatibility, Escape/motion/section dismissal, Find keys,
duplicate ended events and download telemetry. These selected controls are not a
whole-site mutation sweep. Raw survivors/errors/timeouts cannot count as detections.
Source/test/config/dependency inputs are frozen during the accepted execution.

## Retained failures and remaining acceptance

Ignored `quality-results/public-navigation-walkthrough/` retains original source,
comparison/control scripts, accepted coverage and browser/build/type/lint logs,
selected faults and tool/fixture provenance. An initial fault run is rejected:
changing the storage key also exposed two incidental TypeErrors in receipt-reading
tests. Explicit presence assertions fix those controls; the final complete run
has only assertion detections. Earlier navigation fixtures used incorrect label/
telemetry assumptions, and array-shaped parameter fixtures were corrected. Initial
browser alert assertions matched Next's route announcer too; final selectors scope
the intended notice. None of those fixture failures is a product finding or a
successful detection. A scratch-verifier JSON-field assumption was also corrected.

The actual unchanged recordings, broader script/layout/legal/export coverage,
fresh source-specific CI and production acceptance remain separate work. Local
checks neither publish store assets nor close the four-repository audit.
