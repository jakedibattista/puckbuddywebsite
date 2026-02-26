import fs from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
const args = new Set(argv);
const isJson = args.has("--json");
const failOnUnused = args.has("--fail-on-unused");

const scopeArg = argv.find((a) => a.startsWith("--scope="));
/** @type {"all" | "runtime" | "scripts"} */
const scope = /** @type {any} */ (scopeArg?.split("=")[1] ?? "all");

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, "public");

const TEXT_FILE_RE = /\.(ts|tsx|js|jsx|mjs|cjs|md|css|json)$/i;
const ASSET_EXT_RE = /\.(png|jpg|jpeg|webp|gif|svg|heic)$/i;

function walk(dir) {
  /** @type {string[]} */
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === "node_modules" || ent.name === ".next") continue;
      out.push(...walk(p));
    } else {
      out.push(p);
    }
  }
  return out;
}

function readUtf8Safe(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function main() {
  if (!fs.existsSync(publicDir)) {
    console.error(`public/ not found at: ${publicDir}`);
    process.exit(2);
  }

  const publicFiles = fs
    .readdirSync(publicDir)
    .filter((f) => ASSET_EXT_RE.test(f));

  if (!["all", "runtime", "scripts"].includes(scope)) {
    console.error(`Invalid --scope. Use one of: all, runtime, scripts`);
    process.exit(2);
  }

  const runtimeFiles = [
    ...walk(path.join(projectRoot, "src")),
    path.join(projectRoot, "next.config.ts"),
  ];

  const scriptFiles = [
    ...walk(path.join(projectRoot, "scripts")),
    path.join(projectRoot, "package.json"),
    path.join(projectRoot, "README.md"),
  ];

  const candidateTextFiles = (scope === "runtime"
    ? runtimeFiles
    : scope === "scripts"
      ? scriptFiles
      : [...runtimeFiles, ...scriptFiles]
  ).filter((p) => fs.existsSync(p) && TEXT_FILE_RE.test(p));

  /** @type {Record<string, string[]>} */
  const refs = Object.fromEntries(publicFiles.map((f) => [f, []]));

  for (const filePath of candidateTextFiles) {
    const txt = readUtf8Safe(filePath);
    if (!txt) continue;

    for (const asset of publicFiles) {
      // Prefer strict "/asset" references first (typical Next usage).
      if (txt.includes(`/${asset}`) || txt.includes(asset)) {
        refs[asset].push(path.relative(projectRoot, filePath));
      }
    }
  }

  const used = Object.entries(refs)
    .filter(([, files]) => files.length > 0)
    .map(([asset]) => asset)
    .sort();

  const unused = Object.entries(refs)
    .filter(([, files]) => files.length === 0)
    .map(([asset]) => asset)
    .sort();

  const result = {
    scope,
    publicCount: publicFiles.length,
    usedCount: used.length,
    unusedCount: unused.length,
    used,
    unused,
    references: refs,
  };

  if (isJson) {
    process.stdout.write(JSON.stringify(result, null, 2) + "\n");
  } else {
    console.log(`scope:        ${scope}`);
    console.log(`public assets: ${result.publicCount}`);
    console.log(`used:         ${result.usedCount}`);
    console.log(`unused:       ${result.unusedCount}`);

    if (unused.length) {
      console.log("\nUNUSED ASSETS:");
      for (const a of unused) console.log(`- ${a}`);
    }

    console.log("\nTOP REFERENCES (first 5 per asset):");
    for (const asset of used) {
      const files = refs[asset].slice(0, 5);
      console.log(`- ${asset}`);
      for (const f of files) console.log(`  - ${f}`);
      if (refs[asset].length > 5) console.log(`  - ... (${refs[asset].length - 5} more)`);
    }
  }

  if (failOnUnused && unused.length) {
    process.exit(1);
  }
}

main();


