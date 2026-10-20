"use client";
// Presents team partnership options and the confirmed inquiry flow within the viewport.

import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";
import { useState, useRef } from "react";
import ContactForm from "../components/ContactForm";
import type { Tier } from "../lib/partnerInquiry";
import ScrollAnimation from "../components/ScrollAnimation";
import { motion } from "framer-motion";
import { trackConversion } from "../lib/conversionAnalytics";
import { CALENDLY_URL, APP_STORE_RATING } from "../lib/constants";

const PROOF_POINTS = [
  { value: "Live in both stores", label: "Puck Buddy ships on iOS and Android today" },
  { value: `${APP_STORE_RATING}★ rated`, label: "Real users, real App Store reviews" },
  { value: "5,000+ videos", label: "Analyzed by the same engine you'd build on" },
  { value: "Days, not months", label: "From kickoff to working integration" },
] as const;





export default function PartnerPage() {
  const shouldReduceMotion = useReducedMotionPreference();
  const [contactTier, setContactTier] = useState<Tier>("api");
  const contactRef = useRef<HTMLElement>(null);

  function openContact(tier: Tier) {
    setContactTier(tier);
    setTimeout(() => {
      contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
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
            <span className="text-blue-200">your platform or program</span>
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
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion("partner_cta_click", { cta: "calendly", location: "partner_hero" })}
              className="inline-flex items-center justify-center rounded-full bg-white text-gray-900 px-7 py-3 text-sm font-semibold shadow-sm transition-all hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Book a 30-min call
            </a>
            <a
              href="#offerings"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white/90 backdrop-blur transition-all hover:bg-white/10"
            >
              See our offerings
            </a>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.3, ease: [0.21, 1.11, 0.81, 0.99] }}
            className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4"
          >
            {PROOF_POINTS.map((point) => (
              <div key={point.value} className="bg-[#0B1220]/90 px-4 py-5 text-center">
                <p className="text-base font-bold tracking-tight text-white sm:text-lg">
                  {point.value}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/55">{point.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Offerings */}
      <section id="offerings" className="py-16 sm:py-20 lg:py-28 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="max-w-2xl mx-auto text-center mb-16">
              <p className="text-sm sm:text-base font-semibold tracking-[0.28em] text-gray-500 uppercase mb-3">
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
                <p className="text-sm font-semibold tracking-[0.28em] text-gray-400 uppercase mb-2">For Platforms &amp; Tech Companies</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">API Integration</h3>
                <p className="text-sm font-semibold text-gray-500 italic mb-4">Plug our AI analysis engine into your existing product.</p>
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  Our backend exposes a clean REST API for video ingestion, multi-agent AI analysis, and structured coaching output. Add AI video coaching without building the model stack from scratch.
                </p>
                <ul className="mb-8 flex-grow list-disc space-y-2.5 pl-5">
                  {[
                    "Video upload & processing endpoints",
                    "Structured JSON scorecards & coaching feedback",
                    "Multi-shot detection and rep counting",
                    "Sport-specific analysis agents (hockey, lacrosse, more coming)",
                    "Webhooks for async result delivery",
                    "Sandbox environment for testing",
                  ].map((f) => (
                    <li key={f} className="text-sm text-gray-700">
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
                <p className="text-sm font-semibold tracking-[0.28em] text-gray-400 uppercase mb-2">For Coaches &amp; Influencers</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Custom Development</h3>
                <p className="text-sm font-semibold text-gray-500 italic mb-4">We build your branded AI coaching experience.</p>
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  Have an audience and a sport you love? We partner with coaches and creators to build custom AI coaching apps under your brand. You bring the expertise and we build the tech.
                </p>
                <ul className="mb-8 flex-grow list-disc space-y-2.5 pl-5">
                  {[
                    "White-label AI coaching app built for your brand",
                    "Your coaching philosophy baked into every rep",
                    "Video analysis tailored to your sport and drills",
                    "iOS app with your name on it",
                    "Ongoing model tuning as you grow",
                    "Revenue share model available",
                  ].map((f) => (
                    <li key={f} className="text-sm text-gray-700">
                      {f}
                    </li>
                  ))}
                </ul>
                {/* Calendly — opens external booking, no form needed */}
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversion("partner_cta_click", { cta: "calendly", location: "custom_dev_card" })}
                  className="mt-auto inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-700 focus:outline-none"
                >
                  Book a discovery call
                </a>
              </div>
            </ScrollAnimation>

            {/* Partner Card */}
            <ScrollAnimation delay={0.2}>
              <div className="flex flex-col h-full rounded-3xl border border-black/5 bg-gradient-to-b from-white to-gray-50 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <p className="text-sm font-semibold tracking-[0.28em] text-gray-400 uppercase mb-2">For Teams, Leagues &amp; Programs</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Partner Program</h3>
                <p className="text-sm font-semibold text-gray-500 italic mb-4">Give your athletes access to their own AI coach.</p>
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  Get a custom promo code for your team, league, or training program. Every athlete gets full Puck Buddy access at a group rate with no per-seat setup required.
                </p>
                <ul className="mb-8 flex-grow list-disc space-y-2.5 pl-5">
                  {[
                    "Custom promo code for your organization",
                    "Group discounts for teams of any size",
                    "Works with existing Puck Buddy iOS app",
                    "Track team-wide progress and usage",
                    "White-glove onboarding support",
                    "Flexible billing: pay per athlete or team-wide",
                  ].map((f) => (
                    <li key={f} className="text-sm text-gray-700">
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
                  <p className="text-sm sm:text-base font-semibold tracking-[0.28em] text-gray-500 uppercase mb-3">
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

      {/* Partner Program Deep Dive */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollAnimation>
              <div className="max-w-2xl mb-12">
                <p className="text-sm sm:text-base font-semibold tracking-[0.28em] text-gray-500 uppercase mb-3">
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

            <ScrollAnimation delay={0.15}>
              <figure className="mb-10 rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
                <p className="text-amber-500" aria-hidden>
                  ★★★★★
                </p>
                <blockquote className="mt-4 text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
                  &ldquo;This tool has been great for our academy. It helps give
                  every kid personalized coaching and improve on and off the
                  ice.&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Ryan B.</span> · Hockey director
                </figcaption>
              </figure>
            </ScrollAnimation>

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
                <p className="text-sm sm:text-base font-semibold tracking-[0.28em] text-gray-500 uppercase mb-3">
                  Get in touch
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Let&apos;s talk.
                </h2>
                <p className="text-lg text-gray-600">
                  Tell us what you&apos;re building or what you need. We respond within one business day.
                </p>
                <p className="mt-3 text-sm text-gray-500">
                  Prefer to talk it through?{" "}
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackConversion("partner_cta_click", { cta: "calendly", location: "contact_section" })}
                    className="font-medium text-blue-700 underline underline-offset-2 hover:text-blue-800"
                  >
                    Book a 30-minute call
                  </a>{" "}
                  instead.
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
