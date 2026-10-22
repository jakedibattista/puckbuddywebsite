// Renders local social-banner drafts through shared staging and PNG validation.
// Completion reports actual saved paths after the whole render and cleanup succeed.
import path from "node:path";
import { socialBannerDesigns } from "./lib/social-banner-designs.mjs";
import { writeSvgExports } from "./lib/image-exports.mjs";

writeSvgExports(socialBannerDesigns(), path.join(process.cwd(), "marketing-assets", "social"))
  .then(outputs => {
    console.log("Generated social-banner drafts:");
    for (const file of outputs) console.log(file);
  }).catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
