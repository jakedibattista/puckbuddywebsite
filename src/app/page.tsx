"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Instrument_Serif } from "next/font/google";
import ScrollAnimation from "./components/ScrollAnimation";

const editorialSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const ROTATING_PHRASES = [
  "But how we practice, train, and compete hasn't.",
  "The pros have used computer vision for over a decade.",
  "Now you can too.",
];

const PHRASE_INTERVAL_MS = 3500;

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % ROTATING_PHRASES.length);
    }, PHRASE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <div className="min-h-screen bg-white">
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(37,99,235,0.30),transparent_55%),radial-gradient(900px_circle_at_80%_0%,rgba(34,197,94,0.20),transparent_55%),linear-gradient(to_bottom_right,#070A12,#0B1220,#070A12)] text-white py-24 sm:py-32 lg:py-40">
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
          <div className="mx-auto max-w-5xl text-center">
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.21, 1.11, 0.81, 0.99] }}
              className="mb-8 text-xs font-semibold uppercase tracking-[0.32em] text-white/60 sm:text-sm"
            >
              Buddy Tech
            </motion.p>

            <motion.h1
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.05, ease: [0.21, 1.11, 0.81, 0.99] }}
              className="text-5xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
            >
              The business of youth sports is{" "}
              <span className="bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
                rapidly changing.
              </span>
            </motion.h1>

            <div className={`${editorialSerif.className} mt-10 flex h-[5rem] items-start justify-center sm:mt-12 sm:h-[5.5rem] md:h-[6rem]`}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={phraseIndex}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.21, 1.11, 0.81, 0.99] }}
                  className="text-2xl italic leading-snug text-white/80 sm:text-3xl md:text-4xl"
                >
                  {ROTATING_PHRASES[phraseIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────────── Why now — editorial ──────────────────── */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <ScrollAnimation>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.32em] text-blue-700 sm:text-sm">
                Why now
              </p>
              <h2 className="text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-4xl md:text-5xl lg:text-[2.75rem]">
                With AI, any phone now has the power to become a{" "}
                <span className={`${editorialSerif.className} font-normal italic text-gray-500`}>
                  world-class coach or scout.
                </span>
              </h2>
            </ScrollAnimation>

            <ScrollAnimation delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-gray-600 sm:text-xl">
                It used to take expensive cameras, sensors, and labs. We&apos;re building
                modern, affordable tools for the rinks, fields, and gyms where youth
                sports actually happen.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* ──────────────── What we're building — three cards ──────────────── */}
      <section className="relative overflow-hidden bg-[radial-gradient(1100px_circle_at_10%_10%,rgba(37,99,235,0.22),transparent_55%),radial-gradient(900px_circle_at_90%_20%,rgba(34,197,94,0.16),transparent_55%),linear-gradient(to_bottom_right,#070A12,#0B1220,#070A12)] py-20 text-white sm:py-28 lg:py-36">
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
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-white/60 sm:text-sm">
                What we&apos;re building
              </p>
              <h2 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-6xl">
                Custom models and agents,{" "}
                <span className={`${editorialSerif.className} font-normal italic text-white/70`}>
                  for every sport.
                </span>
              </h2>
            </div>
          </ScrollAnimation>

          <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:mt-16 md:grid-cols-3">
            {/* ── Hockey ── */}
            <ScrollAnimation>
              <Link
                href="/puckbuddy"
                className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/5 transition-all duration-500 hover:border-white/25 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src="/puckbuddyclinic1.jpeg"
                    alt="Puck Buddy coaches on the ice with players at a clinic."
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-white/70">
                      Hockey
                    </p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-[1.65rem]">
                      Explore Puck Buddy
                    </h3>
                    <p className="mt-3 inline-flex items-center gap-2 text-sm text-white/70 transition-colors group-hover:text-white">
                      Open product
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                </div>
              </Link>
            </ScrollAnimation>

            {/* ── Lacrosse ── */}
            <ScrollAnimation delay={0.08}>
              <Link
                href="/lacrosse"
                className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/5 transition-all duration-500 hover:border-white/25 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src="/gunnar.webp"
                    alt="Gunnar — Lax Buddy lacrosse."
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-white/70">
                      Lacrosse
                    </p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-[1.65rem]">
                      Explore Lax Buddy
                    </h3>
                    <p className="mt-3 inline-flex items-center gap-2 text-sm text-white/70 transition-colors group-hover:text-white">
                      Open product
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                </div>
              </Link>
            </ScrollAnimation>

            {/* ── Partner ── */}
            <ScrollAnimation delay={0.16}>
              <Link
                href="/partner"
                className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/5 transition-all duration-500 hover:border-white/25 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src="/fog.webp"
                    alt="Misty stadium lights — partner with Buddy Tech for any sport."
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/50 to-black/92"
                  />
                  <div className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-7">
                    <p
                      className={`${editorialSerif.className} text-center text-3xl italic leading-tight text-white/90 sm:text-[2rem]`}
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
    </div>
  );
}
