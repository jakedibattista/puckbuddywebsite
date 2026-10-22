// Renders bold Apple artwork drafts and reports acknowledged paths only after validated publication.
// The shared owner preserves source captures and propagates failures through the command exit status.
import { generateStoreScreenshots } from "./lib/store-screenshots.mjs";

generateStoreScreenshots("bold").then(outputs => {
  console.log("Generated Apple artwork drafts:");
  for (const file of outputs) console.log(file);
}).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
