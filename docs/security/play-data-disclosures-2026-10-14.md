# Play disclosure preparation — October 14, 2026

The account-deletion URL currently entered in Play points to /refund, which does
not give account-deletion instructions. Added /delete-account with in-app steps,
a support-request route, ownership verification and subscription-cancellation guidance.
The route is informational and does not accept anonymous deletion commands.

Privacy copy now describes current-video playback retention, one-year scheduled
Past Results retention and working-job cleanup. It removes the outdated promise
that all raw video is deleted shortly after analysis. Updated telemetry descriptions
remove intentional email/screenshot collection claims for the updated app, while
acknowledging older releases/provider logs. Limited retained billing/promo/security
records are distinguished from app-account data deletion. No new retention period,
legal certification or processing-provider approval is claimed.

Build passed. Lint has zero errors and two pre-existing hook warnings in the unrelated
v2-walkthrough page. Publication is pending a protected preview check and review of
these factual disclosures. Do not update Play's public deletion URL until the route
exists at the production hostname. Existing refunds and billing terms are unchanged.

The app's confirmed audience is players ages 6+ and adults. Google generative-AI
provider terms need written resolution before declaring youth-provider compliance;
this website change does not resolve that release gate.
