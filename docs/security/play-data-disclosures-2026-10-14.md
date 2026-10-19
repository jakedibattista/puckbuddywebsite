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
v2-walkthrough page. The protected preview was checked and the operator approved publication, including
the previously tested security dependency updates. Existing refunds and billing terms
are unchanged.

The app's confirmed audience is players ages 6+ and adults. Google generative-AI
provider terms need written resolution before declaring youth-provider compliance;
this website change does not resolve that release gate.

## Approved production publication

On October 14, the approved source candidate 45fae62 was rebuilt using Vercel's
production environment and published as puckbuddy-website-cyrq4dm7j-buddy-tech.vercel.app
(deployment dpl_7BfjWpzyaWcXxeBnBro7i4RpUn2g). Vercel reports Ready and buddyllc.app
now aliases this deployment. Both /delete-account and /privacy return HTTP 200
without authentication. Public content checks confirm the deletion instructions,
October 14 privacy date, one-year results retention and roster aggregate disclosure.
The previous production deployment pz2onssv3 remains the rollback reference.

Play's deletion URL was changed to https://buddyllc.app/delete-account and saved
as a Data safety draft. Play confirmed that the changes were saved. This does not
submit the full Data safety form for review or publish the Android application.
