"use client";
// Collects required partner contact details and confirms server receipt while preserving inquiry details on errors.
import { useRef, useState } from "react";
import { trackConversion } from "../lib/conversionAnalytics";
import { CONTACT_EMAIL } from "../lib/constants";
import { type Tier, tierLabels } from "../lib/partnerInquiry";

export default function ContactForm({ tier, setTier }: { tier: Tier; setTier: (t: Tier) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const attempt = useRef({ payload: "", id: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    const payload = JSON.stringify({ tier, name, email, org, message });
    if (attempt.current.payload !== payload) attempt.current = { payload, id: crypto.randomUUID() };
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/partner-inquiries", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...JSON.parse(payload), id: attempt.current.id }),
      });
      const result = await response.json();
      if (!response.ok || result.received !== true || result.reference !== attempt.current.id) throw new Error("Receipt unavailable");
      setReference(result.reference);
      setSubmitted(true);
      trackConversion("partner_lead_received", { tier, delivery: "private_receipt" });
    } catch {
      setError("We could not confirm receipt. Your details are still here. Please retry or email us directly.");
    } finally { setSending(false); }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Your inquiry has been received.</h3>
        <p className="text-gray-600 max-w-sm mx-auto">
          Reference: {reference}. For follow-up, email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 font-medium hover:underline">
            {CONTACT_EMAIL}
          </a>
          . We typically respond within one business day.
        </p>
        <button
          onClick={() => { setSubmitted(false); attempt.current = { payload: "", id: "" }; }}
          className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form aria-busy={sending} onSubmit={handleSubmit} className="space-y-5">
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="block text-sm font-semibold text-gray-700 mb-2">
          I&apos;m interested in&hellip;
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {(["api", "custom", "partner"] as Tier[]).map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={tier === t}
              onClick={() => setTier(t)}
              className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all text-center ${
                tier === t
                  ? "border-gray-900 bg-gray-900 text-white shadow-sm"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900"
              }`}
            >
              {tierLabels[t]}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            id="name" maxLength={120}
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            id="email" maxLength={254}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition"
          />
        </div>
      </div>

      <div>
        <label htmlFor="org" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Organization / Platform
        </label>
        <input
          id="org" maxLength={200}
          type="text"
          value={org}
          onChange={(e) => setOrg(e.target.value)}
          placeholder="Team name, company, or channel"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Tell us more <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message" maxLength={4000}
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            tier === "api"
              ? "Tell us about your platform and what you'd like to integrate..."
              : tier === "custom"
              ? "Describe your audience, sport, and what kind of AI coaching experience you have in mind..."
              : "Tell us about your team, league, or program and how many athletes you're looking to onboard..."
          }
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition resize-none"
        />
      </div>

      {error && <p role="alert" className="text-sm text-red-700">{error} <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a></p>}
      <p className="text-xs text-gray-500">We use your contact details to respond to this inquiry. <a href="/privacy" className="underline">Privacy policy</a></p>
      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-full bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
      >
        {sending ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
