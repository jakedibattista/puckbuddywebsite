// Stores immutable private inquiry receipts and a retryable notification outbox in Vercel Blob.
// Contact details stay in private storage and the configured inbox, never analytics or logs.
import { put, get, del, list } from "@vercel/blob";
import { createTransport } from "nodemailer";
import { CONTACT_EMAIL } from "./constants";
import type { PartnerSubmission } from "./partnerSubmission";

const receiptPath = (id: string) => `partner-inquiries/receipts/${id}.json`;
const pendingPath = (id: string) => `partner-inquiries/pending/${id}.json`;
const sentPath = (id: string) => `partner-inquiries/notified/${id}.json`;
const options = { access: "private" as const, addRandomSuffix: false, contentType: "application/json", cacheControlMaxAge: 0 };

async function readJson(path: string) {
  const result = await get(path, { access: "private", useCache: false });
  return result && result.statusCode === 200 ? new Response(result.stream).json() : null;
}

export async function savePartnerReceipt(submission: PartnerSubmission): Promise<void> {
  try {
    await put(receiptPath(submission.id), JSON.stringify({ ...submission, receivedAt: new Date().toISOString() }), options);
  } catch (error) {
    const existing = await readJson(receiptPath(submission.id));
    if (!existing || Object.entries(submission).some(([key, value]) => existing[key] !== value)) {
      throw error;
    }
  }
  try {
    await put(pendingPath(submission.id), JSON.stringify({ id: submission.id }), options);
  } catch (error) {
    const existing = await readJson(pendingPath(submission.id));
    if (existing?.id !== submission.id) throw error;
  }
}

export async function notifyPartnerReceipt(id: string): Promise<boolean> {
  if (await readJson(sentPath(id))) {
    await del(pendingPath(id));
    return true;
  }
  const host = process.env.PARTNER_SMTP_HOST;
  const user = process.env.PARTNER_SMTP_USER;
  const pass = process.env.PARTNER_SMTP_PASSWORD;
  if (!host || !user || !pass) return false;
  const receipt = await readJson(receiptPath(id));
  if (!receipt) return false;
  const port = Number(process.env.PARTNER_SMTP_PORT || 587);
  const transport = createTransport({ host, port, secure: port === 465, requireTLS: port !== 465,
    auth: { user, pass }, connectionTimeout: 10000, socketTimeout: 15000 });
  const sent = await transport.sendMail({ from: user, to: CONTACT_EMAIL, replyTo: receipt.email,
    subject: `Buddy Tech partner inquiry: ${receipt.tier} (${id})`,
    text: `Reference: ${id}\nReceived: ${receipt.receivedAt}\nName: ${receipt.name}\nEmail: ${receipt.email}\nOrganization: ${receipt.org}\n\n${receipt.message}` });
  if (!sent.accepted?.length) throw new Error("Notification not accepted");
  await put(sentPath(id), JSON.stringify({ id, notifiedAt: new Date().toISOString() }), options);
  await del(pendingPath(id));
  return true;
}

export async function retryPartnerNotifications(): Promise<{ attempted: number; notified: number }> {
  const pending = await list({ prefix: "partner-inquiries/pending/", limit: 10 });
  let notified = 0;
  for (const blob of pending.blobs) {
    const id = blob.pathname.split("/").pop()!.replace(/\.json$/, "");
    try { if (await notifyPartnerReceipt(id)) notified++; }
    catch { console.error("partner_notification_retry_failed", { reference: id }); }
  }
  return { attempted: pending.blobs.length, notified };
}
