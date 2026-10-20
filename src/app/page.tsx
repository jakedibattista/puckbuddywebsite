"use client";
// Presents the Buddy Sports homepage and routes visitors to its supported products.

import { useReducedMotionPreference } from "./hooks/useReducedMotionPreference";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { trackConversion } from "./lib/conversionAnalytics";
import { Instrument_Serif } from "next/font/google";
import ScrollAnimation from "./components/ScrollAnimation";
import MobileStickyCTA from "./components/MobileStickyCTA";
import HomeHeroVisual from "./components/HomeHeroVisual";
import HowItWorks from "./components/HowItWorks";
import StoreBadges from "./components/StoreBadges";
import RatingBadge from "./components/RatingBadge";
import { CALENDLY_URL, APP_STORE_RATING, ANALYZED_VIDEO_COUNT_LABEL } from "./lib/constants";

const editorialSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const PROOF_POINTS = [
  { value: `${APP_STORE_RATING}★`, label: "App Store rating" },
  { value: ANALYZED_VIDEO_COUNT_LABEL, label: "Videos analyzed" },
  { value: "~60 sec", label: "From upload to feedback" },
  { value: "iOS + Android", label: "Works on any phone" },
] as const;

const PARTNER_OFFERS = [
  {
    title: "Team promo codes",
    desc: "One code puts your whole roster on Puck Buddy at a group rate. No per-seat setup.",
  },
  {
    title: "White-label apps",
    desc: "Your brand, your coaching philosophy, our AI engine. We build it for you.",
  },
  {
    title: "Analysis API",
    desc: "Send us video, get back scorecards and coaching feedback as structured JSON.",
  },
] as const;

export default function Home() {
  const shouldReduceMotion = useReducedMotionPreference();

  return (
    <div className="min-h-screen bg-white">
      <MobileStickyCTA scrollThreshold={480} />

      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(37,99,235,0.30),transparent_55%),radial-gradient(900px_circle_at_80%_0%,rgba(34,197,94,0.20),transparent_55%),linear-gradient(to_bottom_right,#070A12,#0B1220,#070A12)] text-white pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-soft-light"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_minmax(280px,400px)] lg:gap-16 xl:grid-cols-2">
            <div className="text-center lg:text-left">
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.21, 1.11, 0.81, 0.99] }}
                className="mb-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
              >
                <RatingBadge theme="dark" />
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-white/55">
                  Puck Buddy
                </span>
              </motion.div>

              <motion.h1
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.05, ease: [0.21, 1.11, 0.81, 0.99] }}
                className="text-5xl font-bold leading-[1.02] tracking-[-0.035em] text-balance sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[5rem]"
              >
                Film the shot. Get pro-level coaching{" "}
                <span className="text-emerald-200">in 60 seconds.</span>
              </motion.h1>

              <motion.p
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.12, ease: [0.21, 1.11, 0.81, 0.99] }}
                className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl lg:mx-0"
              >
                Puck Buddy turns your phone into an AI hockey coach. Scored
                mechanics, clear feedback, and progress you can see — from the
                rink or the driveway.
              </motion.p>

              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.2, ease: [0.21, 1.11, 0.81, 0.99] }}
                className="mt-9 sm:mt-10"
              >
                <StoreBadges location="home_hero" theme="dark" priority className="lg:justify-start" />
              </motion.div>

              <motion.p
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.3 }}
                className="mt-6 text-sm text-white/55"
              >
                <a
                  href="#how-it-works"
                  className="font-medium text-white/80 underline underline-offset-2 transition-colors hover:text-white"
                >
                  See how it works
                </a>
                <span className="mx-3 text-white/25" aria-hidden>
                  |
                </span>
                Teams, leagues &amp; brands —{" "}
                <Link
                  href="/partner"
                  className="font-medium text-white/80 underline underline-offset-2 transition-colors hover:text-white"
                >
                  partner with us
                </Link>
              </motion.p>
            </div>

            <HomeHeroVisual />
          </div>

          {/* Proof strip */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.35, ease: [0.21, 1.11, 0.81, 0.99] }}
            className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:mt-20 md:grid-cols-4"
          >
            {PROOF_POINTS.map((point) => (
              <div key={point.label} className="bg-[#0B1220]/90 px-5 py-5 text-center">
                <p className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {point.value}
                </p>
                <p className="mt-1 text-xs text-white/55 sm:text-sm">{point.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──────────────── How it works ──────────────── */}
      <HowItWorks />

      {/* ──────────────── Coaches + testimonial ──────────────── */}
      <section className="relative overflow-hidden bg-[radial-gradient(1100px_circle_at_10%_10%,rgba(37,99,235,0.22),transparent_55%),radial-gradient(900px_circle_at_90%_20%,rgba(34,197,94,0.16),transparent_55%),linear-gradient(to_bottom_right,#070A12,#0B1220,#070A12)] py-16 text-white sm:py-24 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-soft-light"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
            <ScrollAnimation direction="left">
              <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
                <Image
                  src="/puckbuddyclinic2.jpeg"
                  alt="Puck Buddy coaches working with players at a clinic."
                  width={768}
                  height={1133}
                  className="h-full w-full object-cover"
                />
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="right">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
                  The coaching behind the AI
                </p>
                <h2 className="mt-4 text-3xl font-bold leading-[1.08] tracking-[-0.03em] sm:text-4xl md:text-5xl">
                  Built with real coaches,{" "}
                  <span className={`${editorialSerif.className} font-normal italic text-white/70`}>
                    not just a model.
                  </span>
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-white/75">
                  Coach Seth Michelson brings 20+ years of rink-tested youth
                  coaching. Cofounder Andrew Rowe played 15+ years of pro hockey
                  after starting his career with the Philadelphia Flyers. Their
                  expertise shaped what the AI looks for in every rep — and how
                  it turns analysis into feedback players actually use.
                </p>

                <figure className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                  <blockquote className="text-lg font-medium leading-snug text-white sm:text-xl">
                    &ldquo;I&apos;ve been using Puck Buddy with my son and
                    it&apos;s been a great addition to his hockey
                    education.&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-sm text-white/55">
                    — Michael P., hockey parent
                  </figcaption>
                </figure>

                <Link
                  href="/puckbuddy"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12]"
                >
                  Explore Puck Buddy
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* ──────────────── Teams, leagues & brands ──────────────── */}
      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <ScrollAnimation>
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
                  For teams, leagues &amp; brands
                </p>
                <h2 className="mt-4 text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-4xl md:text-5xl">
                  Give your whole roster{" "}
                  <span className={`${editorialSerif.className} font-normal italic text-gray-500`}>
                    an AI coach.
                  </span>
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-gray-600">
                  The same engine behind Puck Buddy powers team programs,
                  white-label apps, and API integrations. If you can dream it,
                  we can build it.
                </p>
              </div>
            </ScrollAnimation>

            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
              {PARTNER_OFFERS.map((offer, index) => (
                <ScrollAnimation key={offer.title} delay={index * 0.08}>
                  <div className="h-full rounded-2xl border border-black/5 bg-gradient-to-b from-white to-gray-50 p-7 shadow-sm transition-shadow hover:shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900">{offer.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{offer.desc}</p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>

            <ScrollAnimation delay={0.25}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversion("partner_cta_click", { cta: "calendly", location: "home_b2b" })}
                  className="inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                >
                  Book a 30-min call
                </a>
                <Link
                  href="/partner"
                  onClick={() => trackConversion("partner_cta_click", { cta: "partner_page", location: "home_b2b" })}
                  className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                >
                  Explore partnerships
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* ──────────────── More sports ──────────────── */}
      <section className="relative overflow-hidden bg-[radial-gradient(1100px_circle_at_10%_10%,rgba(37,99,235,0.22),transparent_55%),radial-gradient(900px_circle_at_90%_20%,rgba(34,197,94,0.16),transparent_55%),linear-gradient(to_bottom_right,#070A12,#0B1220,#070A12)] py-16 text-white sm:py-24 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-soft-light"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
                From Buddy Tech
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-4xl md:text-5xl">
                Custom models and agents,{" "}
                <span className={`${editorialSerif.className} font-normal italic text-white/70`}>
                  for every sport.
                </span>
              </h2>
            </div>
          </ScrollAnimation>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:mt-16 md:grid-cols-2">
            {/* ── Lacrosse ── */}
            <ScrollAnimation>
              <Link
                href="/lacrosse"
                className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/5 transition-all duration-500 hover:border-white/25 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/4]">
                  <Image
                    src="/gunnar.webp"
                    alt="Gunnar — Lax Buddy lacrosse."
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-white/70">
                      Lacrosse · Beta
                    </p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-[1.65rem]">
                      Explore Lax Buddy
                    </h3>
                    <p className="mt-3 inline-flex items-center gap-2 text-sm text-white/70 transition-colors group-hover:text-white">
                      Free to try
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                </div>
              </Link>
            </ScrollAnimation>

            {/* ── Partner ── */}
            <ScrollAnimation delay={0.08}>
              <Link
                href="/partner"
                className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/5 transition-all duration-500 hover:border-white/25 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/4]">
                  <Image
                    src="/fog.webp"
                    alt="Misty stadium lights — partner with Buddy Tech for any sport."
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/50 to-black/92"
                  />
                  <div className="absolute inset-x-0 top-[42%] z-10 -translate-y-1/2 px-7">
                    <p
                      className={`${editorialSerif.className} text-center text-2xl italic leading-tight text-white/90 sm:text-[1.75rem]`}
                    >
                      &ldquo;If you can dream it,
                      <br />
                      we can build it.&rdquo;
                    </p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-7">
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-white/70">
                      Your sport
                    </p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-[1.65rem]">
                      Partner with us
                    </h3>
                    <p className="mt-3 inline-flex items-center gap-2 text-sm text-white/70 transition-colors group-hover:text-white">
                      Start a conversation
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                </div>
              </Link>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* ──────────────── Final CTA ──────────────── */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollAnimation>
              <h2 className="text-3xl font-bold tracking-[-0.03em] text-gray-900 sm:text-4xl md:text-5xl">
                Your player&apos;s next rep deserves a coach.
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.1}>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                Download Puck Buddy and see the first scorecard in about a minute.
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <StoreBadges location="home_final_cta" theme="light" className="mt-8" />
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </div>
  );
}
