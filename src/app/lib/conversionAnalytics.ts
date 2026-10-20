// Records conversion telemetry without letting an SDK failure interrupt the user's action.
// Callers supply bounded event properties; this helper neither submits inquiries nor opens destinations.
import { track } from '@vercel/analytics';

export function trackConversion(...args: Parameters<typeof track>): void {
  try {
    track(...args);
  } catch {
    // Downloads, navigation and email draft handoff must still proceed.
  }
}
