# Scripts Directory

Production repo policy: keep scripts **minimal** and **repeatable**.

## Asset audit

### `audit-public-assets.mjs`
Reports which files in `public/` are referenced by:
- **runtime code** (`src/`)
- **scripts/docs** (`scripts/`, docs)

Usage:

```bash
npm run assets:audit
npm run assets:audit:runtime
npm run assets:audit:scripts
```




