// Accepts same-origin validated inquiries and confirms receipt only after private durable storage.
import { after } from "next/server";
import { parsePartnerSubmission } from "../../lib/partnerSubmission";
import { notifyPartnerReceipt, savePartnerReceipt } from "../../lib/partnerReceipt";

export const runtime = "nodejs";
export const maxDuration = 30;
const json = (body: unknown, status: number) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return json({ error: "Invalid request origin" }, 403);
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json") return json({ error: "JSON required" }, 415);
  if (!process.env.BLOB_STORE_ID && !process.env.BLOB_READ_WRITE_TOKEN) return json({ error: "Please email us while the inquiry service is unavailable." }, 503);
  let value: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json({ error: "Missing inquiry" }, 400);
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 16384) { await reader.cancel(); return json({ error: "Inquiry too large" }, 413); }
      chunks.push(chunk.value);
    }
    value = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return json({ error: "Invalid inquiry" }, 400); }
  const submission = parsePartnerSubmission(value);
  if (!submission) return json({ error: "Check your contact details and message." }, 400);
  try {
    await savePartnerReceipt(submission);
  } catch {
    console.error("partner_receipt_failed");
    return json({ error: "We could not confirm receipt. Please retry or email us." }, 503);
  }
  after(async () => {
    try {
      if (!await notifyPartnerReceipt(submission.id)) console.warn("partner_notification_pending", { reference: submission.id });
    } catch { console.error("partner_notification_pending", { reference: submission.id }); }
  });
  return json({ received: true, reference: submission.id }, 201);
}
