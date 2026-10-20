// Retries stored inquiry notifications only for the authenticated Vercel cron caller.
import { timingSafeEqual } from "node:crypto";
import { retryPartnerNotifications } from "../../../lib/partnerReceipt";
export const runtime = "nodejs";
export const maxDuration = 300;
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const supplied = request.headers.get("authorization") || "";
  const expected = `Bearer ${secret}`;
  const actualBytes = Buffer.from(supplied), expectedBytes = Buffer.from(expected);
  if (!secret || actualBytes.length !== expectedBytes.length || !timingSafeEqual(actualBytes, expectedBytes)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json(await retryPartnerNotifications(), { headers: { "Cache-Control": "no-store" } });
}
