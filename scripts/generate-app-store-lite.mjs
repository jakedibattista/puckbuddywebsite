// Generates the established Lite Apple drafts and reports only acknowledged output paths.
import { generateLiteScreenshots } from "./lib/lite-screenshots.mjs";

generateLiteScreenshots().then(outputs => {
  console.log("Generated Lite Apple artwork drafts:");
  for (const output of outputs) console.log(output);
}).catch(error => { console.error(error); process.exitCode = 1; });
