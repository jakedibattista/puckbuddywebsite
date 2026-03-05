"use client";

import { useState, useRef } from "react";
import ScrollAnimation from "../components/ScrollAnimation";
import { motion, useReducedMotion } from "framer-motion";

type Tier = "api" | "custom" | "partner";

const CALENDLY_URL = "https://calendly.com/jake-buddyllc/30min";
const CONTACT_EMAIL = "jake@buddyllc.app";

const tierLabels: Record<Tier, string> = {
  api: "API Integration",
  custom: "Custom Development",
  partner: "Partner Program",
};

function ContactForm({ tier, setTier }: { tier: Tier; setTier: (t: Tier) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`[${tierLabels[tier]}] Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nOrganization: ${org}\nInterest: ${tierLabels[tier]}\n\n${message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
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
          Send another message
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
        Send message
      </button>
    </form>
  );
}

export default function PartnerPage() {
  const shouldReduceMotion = useReducedMotion();
  const [contactTier, setContactTier] = useState<Tier>("api");
  const contactRef = useRef<HTMLElement>(null);

  function openContact(tier: Tier) {
    setContactTier(tier);
    setTimeout(() => {
      contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(37,99,235,0.28),transparent_55%),radial-gradient(900px_circle_at_80%_0%,rgba(139,92,246,0.18),transparent_55%),linear-gradient(to_bottom_right,#070A12,#0B1220,#070A12)] text-white py-20 sm:py-24 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-soft-light"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.05, ease: [0.21, 1.11, 0.81, 0.99] }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight max-w-4xl mx-auto"
          >
            Bring AI coaching to{" "}
            <span className="bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              your platform or program
            </span>
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.12, ease: [0.21, 1.11, 0.81, 0.99] }}
            className="mt-5 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto"
          >
            Whether you&apos;re a tech company wanting our analysis API, a coach ready to build
            your own branded app, or a program looking for group access. We have a path for you.
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.2, ease: [0.21, 1.11, 0.81, 0.99] }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#offerings"
              className="inline-flex items-center justify-center rounded-full bg-white text-gray-900 px-7 py-3 text-sm font-semibold shadow-sm transition-all hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              See our offerings
            </a>
            <button
              onClick={() => openContact("api")}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white/90 backdrop-blur transition-all hover:bg-white/10"
            >
              Contact us
            </button>
          </motion.div>
        </div>
      </section>

      {/* Offerings */}
      <section id="offerings" className="py-16 sm:py-20 lg:py-28 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="max-w-2xl mx-auto text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.22em] text-gray-500 uppercase mb-3">
                Our offerings
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Three ways to partner
              </h2>
              <p className="text-lg text-gray-600">
                From API access to fully custom-built apps to group promo codes. Pick the
                path that fits your situation.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
            {/* API Card */}
            <ScrollAnimation delay={0}>
              <div className="flex flex-col h-full rounded-3xl border border-black/5 bg-gradient-to-b from-white to-gray-50 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 mb-5">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase mb-2">For Platforms &amp; Tech Companies</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">API Integration</h3>
                <p className="text-sm font-semibold text-gray-500 italic mb-4">Plug our AI analysis engine into your existing product.</p>
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  Our backend exposes a clean REST API for video ingestion, multi-agent AI analysis, and structured coaching output. Add AI video coaching without building the model stack from scratch.
                </p>
                <ul className="space-y-2.5 mb-8 flex-grow">
                  {[
                    "Video upload & processing endpoints",
                    "Structured JSON scorecards & coaching feedback",
                    "Multi-shot detection and rep counting",
                    "Sport-specific analysis agents (hockey, lacrosse, more coming)",
                    "Webhooks for async result delivery",
                    "Sandbox environment for testing",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 text-xs font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openContact("api")}
                  className="mt-auto inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-700 focus:outline-none"
                >
                  Get API access
                </button>
              </div>
            </ScrollAnimation>

            {/* Custom Dev Card */}
            <ScrollAnimation delay={0.1}>
              <div className="flex flex-col h-full rounded-3xl border border-black/5 bg-gradient-to-b from-white to-gray-50 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 mb-5">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase mb-2">For Coaches &amp; Influencers</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Custom Development</h3>
                <p className="text-sm font-semibold text-gray-500 italic mb-4">We build your branded AI coaching experience.</p>
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  Have an audience and a sport you love? We partner with coaches and creators to build custom AI coaching apps under your brand. You bring the expertise and we build the tech.
                </p>
                <ul className="space-y-2.5 mb-8 flex-grow">
                  {[
                    "White-label AI coaching app built for your brand",
                    "Your coaching philosophy baked into every rep",
                    "Video analysis tailored to your sport and drills",
                    "iOS app with your name on it",
                    "Ongoing model tuning as you grow",
                    "Revenue share model available",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 text-xs font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {/* Calendly — opens external booking, no form needed */}
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-700 focus:outline-none"
                >
                  Book a discovery call
                </a>
              </div>
            </ScrollAnimation>

            {/* Partner Card */}
            <ScrollAnimation delay={0.2}>
              <div className="flex flex-col h-full rounded-3xl border border-black/5 bg-gradient-to-b from-white to-gray-50 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 mb-5">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase mb-2">For Teams, Leagues &amp; Programs</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Partner Program</h3>
                <p className="text-sm font-semibold text-gray-500 italic mb-4">Give your athletes access to their own AI coach.</p>
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  Get a custom promo code for your team, league, or training program. Every athlete gets full Puck Buddy access at a group rate with no per-seat setup required.
                </p>
                <ul className="space-y-2.5 mb-8 flex-grow">
                  {[
                    "Custom promo code for your organization",
                    "Group discounts for teams of any size",
                    "Works with existing Puck Buddy iOS app",
                    "Track team-wide progress and usage",
                    "White-glove onboarding support",
                    "Flexible billing: pay per athlete or team-wide",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 text-xs font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openContact("partner")}
                  className="mt-auto inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-700 focus:outline-none"
                >
                  Get your promo code
                </button>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* API Deep Dive */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <ScrollAnimation direction="left">
                <div>
                  <p className="text-xs font-semibold tracking-[0.22em] text-gray-500 uppercase mb-3">
                    API integration
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Production-ready AI analysis in your app in days, not months.
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Our backend handles the hard parts: video ingestion, frame extraction,
                    multi-agent Gemini analysis, and structured output delivery. You send
                    us a video URL and we return scorecards, coaching notes, and rep metrics.
                  </p>
                  <button
                    onClick={() => openContact("api")}
                    className="inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-700 focus:outline-none"
                  >
                    Request API access
                  </button>
                </div>
              </ScrollAnimation>

              <ScrollAnimation direction="right">
                <div className="rounded-2xl bg-gray-900 p-6 shadow-2xl ring-1 ring-white/10 font-mono text-sm overflow-x-auto">
                  <div className="flex items-center gap-1.5 mb-4">
                    <span className="h-3 w-3 rounded-full bg-red-500/70" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                    <span className="h-3 w-3 rounded-full bg-green-500/70" />
                    <span className="ml-2 text-xs text-white/30">response.json</span>
                  </div>
                  <pre className="text-green-300 leading-relaxed whitespace-pre-wrap text-xs">{`{
  "shot_id": "abc123",
  "sport": "hockey",
  "drill": "wrist_shot",
  "scorecard": {
    "overall": 78,
    "power": 82,
    "accuracy": 74,
    "mechanics": 80
  },
  "coaching": {
    "summary": "Strong weight transfer with
      room to improve follow-through.",
    "strengths": ["Hip rotation", "Puck control"],
    "improvements": ["Follow-through height"],
    "next_drill": "snapshot_from_left_circle"
  },
  "reps_detected": 3,
  "processing_ms": 4200
}`}</pre>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Dev Deep Dive */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <ScrollAnimation direction="left" className="order-2 lg:order-1">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { step: "01", title: "Discovery call", desc: "We learn about your sport, audience, and coaching philosophy." },
                    { step: "02", title: "Model design", desc: "We define the drills, metrics, and AI agents specific to your use case." },
                    { step: "03", title: "Build & test", desc: "We build the app and analysis pipeline with your brand, your voice." },
                    { step: "04", title: "Launch & grow", desc: "We handle the tech. You focus on your athletes and your audience." },
                  ].map((s) => (
                    <div key={s.step} className="rounded-2xl border border-black/5 bg-gray-50 p-5">
                      <p className="text-2xl font-black text-gray-900 mb-2">{s.step}</p>
                      <p className="text-sm font-bold text-gray-900 mb-1">{s.title}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </ScrollAnimation>

              <ScrollAnimation direction="right" className="order-1 lg:order-2">
                <div>
                  <p className="text-xs font-semibold tracking-[0.22em] text-gray-500 uppercase mb-3">
                    Custom development
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Your name. Your coaching. Your app.
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We built Puck Buddy with Coach Seth, and we can do the same for you.
                    If you have an audience that trusts you, we can turn your expertise
                    into an AI-powered app that scales your coaching to thousands of athletes.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    No technical background required. You bring the knowledge. We build the tech.
                    Revenue share models available.
                  </p>
                  {/* Calendly — direct booking, bypasses contact form */}
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-700 focus:outline-none"
                  >
                    Book a discovery call
                  </a>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Program Deep Dive */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollAnimation>
              <div className="max-w-2xl mb-12">
                <p className="text-xs font-semibold tracking-[0.22em] text-gray-500 uppercase mb-3">
                  Partner program
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  One promo code. Every athlete on your roster.
                </h2>
                <p className="text-lg text-gray-600">
                  We issue you a custom code. Your athletes redeem it in the Puck Buddy app and get
                  instant access to video analysis, scorecards, and AI coaching chat.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {[
                { label: "Teams & clubs", sub: "Any roster size" },
                { label: "Leagues", sub: "Season-long access" },
                { label: "Training programs", sub: "Alongside your coaching" },
                { label: "College programs", sub: "D1 through club" },
              ].map((item, i) => (
                <ScrollAnimation key={item.label} delay={i * 0.07}>
                  <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                    <p className="text-base font-bold text-gray-900 mb-1">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.sub}</p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>

            <ScrollAnimation delay={0.2}>
              <button
                onClick={() => openContact("partner")}
                className="inline-flex items-center justify-center rounded-full bg-gray-900 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-700 focus:outline-none"
              >
                Request a promo code
              </button>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        id="contact"
        ref={contactRef}
        className="py-16 sm:py-20 lg:py-28 bg-white scroll-mt-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <ScrollAnimation>
              <div className="text-center mb-10">
                <p className="text-xs font-semibold tracking-[0.22em] text-gray-500 uppercase mb-3">
                  Get in touch
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Let&apos;s talk.
                </h2>
                <p className="text-lg text-gray-600">
                  Tell us what you&apos;re building or what you need. We respond within one business day.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.1}>
              <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
                <ContactForm tier={contactTier} setTier={setContactTier} />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </div>
  );
}
