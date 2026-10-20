# Vercel operations

BuddySports is a public marketing and inquiry site. Keep Firebase athlete data and
mobile entitlement provisioning outside this project.

## Partner receipt and notification contract

`POST /api/partner-inquiries` accepts same-origin JSON with a version-4 UUID,
`api`, `custom` or `partner` tier, name, email, organization and message. Required
fields and lengths are checked on both sides. The server caps the entire body at
16 KiB. A Vercel Firewall rule limits this exact POST path to five requests per IP
per 60 seconds. It does not rate-limit browsing or the authenticated retry route.

The private store `buddy-sports-partner-inquiries` in `iad1` is connected only to
production. `BLOB_STORE_ID` and Vercel OIDC provide short-lived server credentials;
no private-store credential or record URL is returned to the browser. Production
uses `partner-inquiries/receipts/{uuid}.json`, `pending/{uuid}.json` and
`notified/{uuid}.json`. Use the Vercel storage console to inspect receipts.
There is no public receipt-list or receipt-read API.

A successful response means a receipt and notification outbox item were stored.
It does not mean inbox delivery. Notification starts after the response and uses
the existing owner-approved SMTP sender with fixed recipient `jake@buddyllc.app`.
The validated inquiry email is Reply-To; the message is plain text. The server
requires TLS. Credentials are sensitive production-only Vercel variables:
`PARTNER_SMTP_HOST`, `PARTNER_SMTP_PORT`, `PARTNER_SMTP_USER` and
`PARTNER_SMTP_PASSWORD`. Replacing the sender requires owner authorization.

An hourly Vercel cron (`17 * * * *`, UTC) calls `/api/partner-inquiries/retry`.
Its bearer credential must exactly match the sensitive production `CRON_SECRET`.
Each run retries at most ten pending records. Successful SMTP acceptance is
recorded before removing the outbox item. The queue is at-least-once: if SMTP
accepts mail but writing its marker fails, a later retry can send a duplicate.
Use the UUID reference to identify duplicates. Failed attempts retain the receipt
and outbox; logs contain only an operational label and UUID, never contact fields,
messages or mail-provider errors. SMTP acceptance does not prove final inbox placement.

No production credentials or production store are connected to preview. Local
browser tests mock the receipt endpoint and never send mail. Missing storage
configuration returns 503 and leaves the form details available for retry or email.

## Domains and search

`buddysports.app` is the primary origin. `buddyllc.app` has a Vercel-managed 308
redirect, which preserves paths and queries, including action-link parameters.
Public page layouts declare their own canonical routes. Artwork export routes
remain reachable but use `noindex,nofollow` and do not inherit the home canonical.

## Release checks

The Vercel project requires the GitHub Actions `quality` check on the deployed
commit before production alias assignment. The workflow includes repository
conventions, lint, type checking, coverage budgets, asset auditing, build and
local browser behavior. A ready build is not proof of promotion. Do not force
promotion past a failed, missing, queued or timed-out check. Check the deployment
commit and production alias after promotion; manual administrator overrides remain
possible in Vercel.
