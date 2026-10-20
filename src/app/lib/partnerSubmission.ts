// Validates bounded partner inquiry payloads before storage or email delivery.
export const partnerTiers = ["api", "custom", "partner"] as const;
export type PartnerSubmission = { id: string; tier: typeof partnerTiers[number]; name: string; email: string; org: string; message: string };

export function parsePartnerSubmission(value: unknown): PartnerSubmission | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  if (typeof raw.id !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(raw.id)) return null;
  if (!partnerTiers.includes(raw.tier as PartnerSubmission["tier"])) return null;
  const fields = ["name", "email", "org", "message"] as const;
  if (fields.some(key => typeof raw[key] !== "string")) return null;
  const name = (raw.name as string).trim(), email = (raw.email as string).trim();
  const org = (raw.org as string).trim(), message = (raw.message as string).trim();
  if (!name || name.length > 120 || org.length > 200 || !message || message.length > 4000) return null;
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(email)) return null;
  return { id: raw.id.toLowerCase(), tier: raw.tier as PartnerSubmission["tier"], name, email, org, message };
}
