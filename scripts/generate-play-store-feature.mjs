// Runs the play-store-feature local artwork capture plan with shared validation and cleanup.
// Output names and dimensions live in scripts/lib/artwork-plans.mjs.
import { runArtworkCommand } from './lib/artwork-capture.mjs';
void runArtworkCommand('play-store-feature');
