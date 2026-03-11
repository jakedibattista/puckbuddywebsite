"use client";

import Image from "next/image";
import ScrollAnimation from "./components/ScrollAnimation";
import InteractiveDemo from "./components/InteractiveDemo";
import MobileStickyCTA from "./components/MobileStickyCTA";
import HeroVideoCarousel from "./components/HeroVideoCarousel";
import { motion, useReducedMotion } from "framer-motion";
import playStoreBadge from "../../play store.png";

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-white">
      <MobileStickyCTA />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(37,99,235,0.28),transparent_55%),radial-gradient(900px_circle_at_80%_0%,rgba(34,197,94,0.18),transparent_55%),linear-gradient(to_bottom_right,#070A12,#0B1220,#070A12)] text-white py-16 sm:py-20 lg:py-28">
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
          <div className="grid gap-10 sm:gap-12 lg:grid-cols-2 items-center">
            <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">
              <motion.h1
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.05, ease: [0.21, 1.11, 0.81, 0.99] }}
                className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight"
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
                className="mt-5 text-lg md:text-xl text-white/80 leading-relaxed max-w-lg"
              >
                Upload a shot video from your iPhone.{" "}
                <span className="text-white/90 font-medium">Get instant analysis</span>: scorecards, coaching feedback, and a clear plan to improve power, accuracy, and consistency.
              </motion.p>

              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.2, ease: [0.21, 1.11, 0.81, 0.99] }}
                className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 items-center lg:items-start"
              >
                <a
                  href="https://apps.apple.com/us/app/puck-buddy/id6752230304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[64px] w-[220px] items-center justify-center transition-transform hover:scale-[1.02] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12] sm:h-[72px] sm:w-[240px]"
                >
                  <Image
                    src="/app-store-badge.svg"
                    alt="Download on the App Store"
                    width={900}
                    height={300}
                    className="h-full w-full object-contain"
                    unoptimized
                    priority
                  />
                </a>
                <a
                  href="#video"
                  className="inline-flex h-[64px] w-[220px] items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition-all hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12] sm:h-[72px] sm:w-[240px]"
                >
                  Watch the demo
                  <span className="ml-2 text-white/60">→</span>
                </a>
              </motion.div>

            </div>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1, ease: [0.21, 1.11, 0.81, 0.99] }}
              className="relative mx-auto w-full max-w-[390px]"
            >
              <div className="absolute -inset-6 rounded-[2.25rem] bg-gradient-to-br from-blue-500/10 via-white/0 to-emerald-400/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur">
                <div className="p-3 sm:p-4">
                  <HeroVideoCarousel />
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
                  Tap the phone screen to move through the app and see what happens next
                </p>
                <p className="mt-3 text-lg text-gray-600 leading-relaxed">
                  Tap buttons and cards inside the phone to open new screens, or use the menu under the phone to jump anywhere you want to go
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

      {/* Unique Features Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <p className="text-sm sm:text-base font-semibold tracking-[0.28em] text-blue-700 uppercase mb-3">
                  Why it works
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Built to create real improvement
                </h2>
              </div>
            </ScrollAnimation>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[
                {
                  title: "Multi-Agent AI Pipeline",
                  desc: "A purpose-built pipeline that turns video into scorecards and coaching feedback with clear next steps.",
                },
                {
                  title: "60-Second Turnaround",
                  desc: "Quick feedback keeps players in the flow. Review, adjust, and take the next rep with intent.",
                },
                {
                  title: "Multi-Shot Detection",
                  desc: "Compare attempts over time and spot trends. Consistency is a skill you can actually track.",
                },
                {
                  title: "Real-Time AI Coach Chat",
                  desc: "Ask questions right after a rep and get guidance that’s tied to what your player just did.",
                },
                {
                  title: "Safety Guardrails",
                  desc: "Family-first guardrails so parents can feel confident about how the experience behaves.",
                },
                {
                  title: "Built on Real Coaching Expertise",
                  desc: "Grounded in real rink teaching, so feedback stays practical, not theoretical.",
                },
              ].map((feature, index) => (
                <ScrollAnimation key={index} delay={index * 0.1}>
                  <div className="group rounded-2xl border border-black/5 bg-gradient-to-br from-white to-gray-50 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{feature.desc}</p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
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
                      $5.99
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
                        SAVE 30%
                      </span>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      $49.99
                    </div>
                    <p className="text-gray-500 text-sm">
                      Just $4.17/mo
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
                <div className="relative inline-flex h-[54px] w-[180px] items-center justify-center overflow-hidden rounded-[10px] sm:h-[60px] sm:w-[200px]">
                  <Image
                    src={playStoreBadge}
                    alt="Get it on Google Play"
                    width={960}
                    height={284}
                    className="h-full w-full object-contain"
                    unoptimized
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/55 backdrop-blur-[2px]">
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
