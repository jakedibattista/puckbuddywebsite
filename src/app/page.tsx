"use client";

import Image from "next/image";
import ScrollAnimation from "./components/ScrollAnimation";
import InteractiveDemo from "./components/InteractiveDemo";
import MobileStickyCTA from "./components/MobileStickyCTA";
import HeroVideoCarousel from "./components/HeroVideoCarousel";
import { motion, useReducedMotion } from "framer-motion";

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-white">
      <MobileStickyCTA />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(37,99,235,0.28),transparent_55%),radial-gradient(900px_circle_at_80%_0%,rgba(34,197,94,0.18),transparent_55%),linear-gradient(to_bottom_right,#070A12,#0B1220,#070A12)] text-white py-16 sm:py-20 lg:py-24">
        {/* Background texture */}
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
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="max-w-3xl">
              <motion.h1
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.05, ease: [0.21, 1.11, 0.81, 0.99] }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight"
              >
                Meet Your New{" "}
                <span className="bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
                  Private Hockey Coach
                </span>
              </motion.h1>

              <motion.p
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.12, ease: [0.21, 1.11, 0.81, 0.99] }}
                className="mt-5 text-lg md:text-xl text-white/80 leading-relaxed"
              >
                Upload a shooting video and get{" "}
                <span className="text-white font-medium">AI-powered video analysis</span>{" "}
                using computer vision to break down mechanics, score key parts of your
                shot, and deliver clear coaching feedback to improve power, accuracy,
                and consistency.
              </motion.p>
            </div>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1, ease: [0.21, 1.11, 0.81, 0.99] }}
              className="relative mt-8 flex w-full max-w-[430px] flex-col items-center sm:mt-10"
            >
              <a
                href="#video"
                className="mb-5 inline-flex h-[56px] w-[220px] items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition-all hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12] sm:mb-6 sm:h-[60px] sm:w-[240px]"
              >
                Watch the demo
                <span className="ml-2 text-white/60">→</span>
              </a>
              <div className="absolute -inset-6 rounded-[2.25rem] bg-gradient-to-br from-blue-500/10 via-white/0 to-emerald-400/10 blur-2xl" />
              <div className="relative z-10 w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur">
                <div className="p-3 sm:p-4">
                  <HeroVideoCarousel />
                </div>
              </div>
              <div className="mt-5 flex flex-col items-center justify-center gap-4 sm:mt-6 sm:flex-row">
                <a
                  href="https://apps.apple.com/us/app/puck-buddy/id6752230304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[54px] w-[180px] items-center justify-center transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12] sm:h-[60px] sm:w-[200px]"
                >
                  <Image
                    src="/app-store-badge.svg"
                    alt="Download on the App Store"
                    width={1200}
                    height={402}
                    className="h-full w-full object-contain"
                    unoptimized
                    priority
                  />
                </a>
                <div className="relative inline-flex h-[54px] w-[180px] items-center justify-center overflow-hidden rounded-[10px] border border-white/20 bg-black shadow-[0_6px_18px_rgba(0,0,0,0.25)] sm:h-[60px] sm:w-[200px]">
                  <div className="flex items-center gap-2 px-3 sm:px-4">
                    <svg className="h-7 w-7 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3 2.6a1 1 0 0 1 1.5-.86l10.74 6.14L12.2 10.9 3 2.6Z" fill="#34A853" />
                      <path d="M3 2.6v18.8a1 1 0 0 0 1.5.86l10.74-6.14-3.04-3.03L3 21.4Z" fill="#4285F4" />
                      <path d="m21 10.82-3.77-2.15-3.67 3.66 3.67 3.66L21 13.84c1.33-.76 1.33-2.26 0-3.02Z" fill="#FBBC04" />
                      <path d="m13.56 12.33-1.36 1.36 3.04 3.03 1.99-1.13-3.67-3.26Z" fill="#EA4335" />
                    </svg>
                    <div className="text-left leading-none text-white">
                      <div className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/80 sm:text-[10px]">
                        Get it on
                      </div>
                      <div className="mt-1 text-lg font-semibold sm:text-[20px]">
                        Google Play
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/58 backdrop-blur-[2px]">
                    <span className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
                      Coming soon
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section - Moved to Top */}
      <section id="video" className="py-12 sm:py-16 lg:py-24 bg-white scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-black/5 bg-gradient-to-br from-gray-50 to-white px-5 py-8 shadow-xl sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <ScrollAnimation>
              <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
                <p className="text-sm sm:text-base font-semibold tracking-[0.28em] text-blue-700 uppercase mb-3">
                  Product demo
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  What is Puck Buddy
                </h2>
              </div>
            </ScrollAnimation>

            {/* Single Comprehensive Video */}
            <div className="max-w-4xl mx-auto">
              <ScrollAnimation delay={0.1}>
                <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10 hover:shadow-3xl transition-shadow">
                  <iframe
                    src="https://www.youtube.com/embed/opgk_89J5XM"
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    title="What is Puck Buddy"
                  />
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <ScrollAnimation direction="left">
              <div className="max-w-xl">
                <p className="text-sm sm:text-base font-semibold tracking-[0.28em] text-blue-700 uppercase mb-3">
                  Interactive
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Try it now
                </h2>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                  Tap the phone screen to move through the app, open new screens, and use the menu under the phone to jump anywhere you want to go.
                </p>
              </div>
            </ScrollAnimation>

            <div className="mx-auto w-full max-w-[390px]">
              <ScrollAnimation delay={0.1} direction="right">
                <InteractiveDemo />
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Coach Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-[radial-gradient(1100px_circle_at_10%_10%,rgba(37,99,235,0.22),transparent_55%),radial-gradient(900px_circle_at_90%_20%,rgba(34,197,94,0.14),transparent_55%),linear-gradient(to_bottom_right,#070A12,#0B1220,#070A12)] text-white">
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation direction="left">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
                <Image
                  src="/coach-seth-point.png"
                  alt="Coach Seth leading a training session on the ice."
                  width={768}
                  height={1133}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="right">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Built with Real Coaches and Players</h2>
                <p className="text-lg text-white/75 leading-relaxed">
                  Puck Buddy is built with the expertise of Coach Seth Michelson, Charleston, SC&apos;s go-to youth
                  hockey coach, and cofounder Andrew Rowe, who brings 15+ years of professional hockey experience.
                  Their combined experience shaped how the model was trained, what it looks for in a rep, and how it
                  turns analysis into feedback that players can actually use.
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  The result is feedback that feels clear, practical, and grounded in real coaching.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Proof / Trust Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollAnimation>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <p className="text-sm sm:text-base font-semibold tracking-[0.28em] text-blue-700 uppercase mb-3">
                  Proof
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Built for performance, tested in the real world
                </h2>
                <p className="text-lg text-gray-600">
                  We’re early, but we’re not guessing. The product is grounded in real coaching and validated by real reps.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  value: "5,000+",
                  label: "Videos analyzed",
                  desc: "Feedback generated from real player reps, not generic advice.",
                },
                {
                  value: "20 years",
                  label: "Coaching + AI experience",
                  desc: "Rink-tested coaching meets smart AI and an app that is easy to use.",
                },
                {
                  value: "~60 sec",
                  label: "Turnaround",
                  desc: "Fast enough to stay in the flow between reps.",
                },
              ].map((stat, index) => (
                <ScrollAnimation key={stat.label} delay={index * 0.08}>
                  <div className="rounded-2xl border border-black/5 bg-gradient-to-b from-white to-gray-50 p-7 shadow-sm hover:shadow-lg transition-shadow">
                    <p className="text-3xl font-bold tracking-tight text-gray-900">{stat.value}</p>
                    <p className="mt-2 text-sm font-semibold text-gray-900">{stat.label}</p>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{stat.desc}</p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>

            <ScrollAnimation delay={0.35}>
              <div className="mt-10 rounded-3xl border border-black/5 bg-gradient-to-br from-gray-50 to-white p-8 shadow-sm">
                <p className="text-sm sm:text-base font-semibold tracking-[0.28em] text-blue-700 uppercase">
                  Testimonial
                </p>
                <p className="mt-4 text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
                  &ldquo;After an afternoon using PuckBuddy my son is already talking about adding 10 mph to his snapshot&rdquo;
                </p>
                <p className="mt-4 text-sm text-gray-600">
                  - Current user
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Clinics Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation direction="left">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <Image
                  src="/coach-seth-point.png"
                  alt="Coaches and kids learning hockey at a Puck Buddy Clinic."
                  width={768}
                  height={1133}
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="right">
              <div className="space-y-6">
                <div>
                  <p className="text-sm sm:text-base font-semibold tracking-[0.28em] text-blue-700 uppercase mb-3">
                    Puck Buddy Clinics
                  </p>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    Bring the power of AI to your clinic
                  </h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We partner with coaches and events to run Puck Buddy shooting and stride clinics,
                  teaching players and coaches how to use AI in practice to drive real improvement.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="https://events.puckbuddy.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-blue-700 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-800"
                  >
                    Join our next clinic
                  </a>
                  <a
                    href="https://calendly.com/jake-buddyllc/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-50"
                  >
                    Contact the team
                  </a>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <ScrollAnimation>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-sm sm:text-base font-semibold tracking-[0.28em] text-blue-700 uppercase mb-3">
                Pricing
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Simple pricing, real coaching value
              </h2>
            </div>
          </ScrollAnimation>

          {/* Pricing Plans */}
          <div className="max-w-6xl mx-auto">
            <ScrollAnimation delay={0.1}>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {/* Monthly Plan */}
                <a
                  href="https://apps.apple.com/us/app/puck-buddy/id6752230304"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Puck Buddy on the App Store (Monthly subscription)"
                  className="block h-full bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
                >
                  <div className="flex h-full flex-col justify-center text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Puck Buddy Monthly
                    </h3>
                    <p className="text-gray-600 mb-4">Monthly subscription</p>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      $8.99
                    </div>
                    <p className="text-sm text-gray-500">per month</p>
                  </div>
                </a>

                {/* Annual Plan */}
                <a
                  href="https://apps.apple.com/us/app/puck-buddy/id6752230304"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Puck Buddy on the App Store (Annual subscription)"
                  className="block h-full rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-xl transition-all duration-300 hover:border-blue-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
                >
                  <div className="flex h-full flex-col justify-center text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Puck Buddy Annual
                    </h3>
                    <p className="text-gray-600 mb-2">Annual subscription</p>
                    <div className="mb-2">
                      <span className="inline-block bg-yellow-400 text-gray-900 text-sm font-bold px-3 py-1 rounded-full mb-2">
                        SAVE 25%
                      </span>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      $79.99
                    </div>
                    <p className="text-gray-500 text-sm">
                      Just $6.67/mo
                    </p>
                  </div>
                </a>

                <a
                  href="/partner#contact"
                  aria-label="Open the contact form for team pricing"
                  className="block h-full rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-xl transition-all duration-300 hover:border-blue-500 hover:shadow-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 md:col-span-2 md:mx-auto md:w-full md:max-w-[420px] xl:col-span-1 xl:max-w-none"
                >
                  <div className="flex h-full flex-col justify-center text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Team Plan
                    </h3>
                    <p className="text-gray-600 mb-4">For clubs, teams, and organizations</p>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      Custom
                    </div>
                    <p className="text-sm text-gray-500">Contact us for pricing</p>
                  </div>
                </a>
              </div>
            </ScrollAnimation>
          </div>

        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(37,99,235,0.25),transparent_55%),radial-gradient(900px_circle_at_80%_0%,rgba(34,197,94,0.16),transparent_55%),linear-gradient(to_bottom_right,#070A12,#0B1220,#070A12)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-soft-light"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollAnimation>
              <p className="text-sm sm:text-base font-semibold tracking-[0.28em] text-white/70 uppercase mb-3">
                Get started
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Start training with your AI coach.
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.1}>
              <p className="text-lg md:text-xl mb-8 text-white/75 leading-relaxed">
                Download Puck Buddy and turn reps into measurable improvement: power, accuracy, and consistency.
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://apps.apple.com/us/app/puck-buddy/id6752230304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[54px] w-[180px] items-center justify-center transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12] sm:h-[60px] sm:w-[200px]"
                >
                  <Image
                    src="/app-store-badge.svg"
                    alt="Download on the App Store"
                    width={1200}
                    height={402}
                    className="h-full w-full object-contain"
                    unoptimized
                  />
                </a>
                <div className="relative inline-flex h-[54px] w-[180px] items-center justify-center overflow-hidden rounded-[10px] border border-white/20 bg-black shadow-[0_6px_18px_rgba(0,0,0,0.25)] sm:h-[60px] sm:w-[200px]">
                  <div className="flex items-center gap-2 px-3 sm:px-4">
                    <svg className="h-7 w-7 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3 2.6a1 1 0 0 1 1.5-.86l10.74 6.14L12.2 10.9 3 2.6Z" fill="#34A853" />
                      <path d="M3 2.6v18.8a1 1 0 0 0 1.5.86l10.74-6.14-3.04-3.03L3 21.4Z" fill="#4285F4" />
                      <path d="m21 10.82-3.77-2.15-3.67 3.66 3.67 3.66L21 13.84c1.33-.76 1.33-2.26 0-3.02Z" fill="#FBBC04" />
                      <path d="m13.56 12.33-1.36 1.36 3.04 3.03 1.99-1.13-3.67-3.26Z" fill="#EA4335" />
                    </svg>
                    <div className="text-left leading-none text-white">
                      <div className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/80 sm:text-[10px]">
                        Get it on
                      </div>
                      <div className="mt-1 text-lg font-semibold sm:text-[20px]">
                        Google Play
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/58 backdrop-blur-[2px]">
                    <span className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
                      Coming soon
                    </span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
        </div>
      </div>
      </section>
    </div>
  );
}
