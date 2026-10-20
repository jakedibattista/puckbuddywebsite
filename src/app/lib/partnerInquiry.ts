// Encodes partner inquiry fields into an email draft URL without sending mail.
import { CONTACT_EMAIL } from './constants';
export type Tier = 'api' | 'custom' | 'partner';
export const tierLabels: Record<Tier, string> = { api: 'API Integration', custom: 'Custom Development', partner: 'Partner Program' };
/** Create a draft URL; submitting this form never claims the email was sent. */
export function buildPartnerInquiry({ tier, name, email, org, message }: { tier: Tier; name: string; email: string; org: string; message: string }) {
  const subject = encodeURIComponent(`[${tierLabels[tier]}] Inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nOrganization: ${org}\nInterest: ${tierLabels[tier]}\n\n${message}`);
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}
