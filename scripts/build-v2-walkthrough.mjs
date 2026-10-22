// Builds local walkthrough exports through preflight, staged rendering and media validation.
// Source recordings stay in place; completion is reported only after publication and staging cleanup.
import { buildWalkthrough } from "./lib/walkthrough-build.mjs";

buildWalkthrough().then(paths => {
  console.log("Walkthrough build complete:");
  for (const file of paths) console.log(file);
}).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
