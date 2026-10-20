// Runs the read-only public-media reference audit from the current project directory.
// Collection and report policy live in scripts/lib/public-asset-audit.mjs.
import { runAssetAudit } from './lib/public-asset-audit.mjs';
process.exitCode = runAssetAudit(process.argv.slice(2), process.cwd(), text => process.stdout.write(text), text => process.stderr.write(text));
