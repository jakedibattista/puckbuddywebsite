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
