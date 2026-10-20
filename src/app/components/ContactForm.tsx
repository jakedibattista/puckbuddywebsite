"use client";
// Collects required partner contact details and opens an email draft after browser form validation.
import { useState } from "react";
import { trackConversion } from "../lib/conversionAnalytics";
import { CONTACT_EMAIL } from "../lib/constants";
import { buildPartnerInquiry, type Tier, tierLabels } from "../lib/partnerInquiry";

export default function ContactForm({ tier, setTier }: { tier: Tier; setTier: (t: Tier) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackConversion("partner_lead_submit", { tier, delivery: "email_draft" });
    window.location.href = buildPartnerInquiry({ tier, name, email, org, message });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Your email client should open!</h3>
        <p className="text-gray-600 max-w-sm mx-auto">
          If it didn&apos;t, email us directly at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 font-medium hover:underline">
            {CONTACT_EMAIL}
          </a>
          . We typically respond within one business day.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Prepare another draft
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          I&apos;m interested in&hellip;
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(["api", "custom", "partner"] as Tier[]).map((t) => (
            <button
              key={t}
              type="button"
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
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
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
            id="email"
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
          id="org"
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
          id="message"
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

      <button
        type="submit"
        className="w-full rounded-full bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
      >
        Open email draft
      </button>
    </form>
  );
}
