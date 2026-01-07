"use client";

import Image from "next/image";
import ScrollAnimation from "./components/ScrollAnimation";
import InteractiveDemo from "./components/InteractiveDemo";
import MobileStickyCTA from "./components/MobileStickyCTA";
import { motion, useReducedMotion } from "framer-motion";

import scorecardImg from "@/assets/app-screens/v2-scorecard.png";

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
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.21, 1.11, 0.81, 0.99] }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-white/90 backdrop-blur"
              >
                <span
                  className={[
                    "inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(16,185,129,0.12)]",
                    shouldReduceMotion ? "" : "animate-pulse",
                  ].join(" ")}
                />
                Rink-tested coaching inside
              </motion.div>

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
                <span className="text-white/90 font-medium">Get instant analysis</span>—scorecards, coaching feedback, and a clear plan to improve power, accuracy, and consistency.
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
                  className="inline-flex w-fit transition-transform hover:scale-[1.02] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12]"
                >
                  <Image
                    src="/app-store-badge.svg"
                    alt="Download on the App Store"
                    width={900}
                    height={300}
                    className="h-auto w-[220px] sm:w-[240px]"
                    unoptimized
                    priority
                  />
                </a>
                <a
                  href="#video"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition-all hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12]"
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
              className="relative mx-auto w-full max-w-[520px]"
            >
              <div className="absolute -inset-6 rounded-[2.25rem] bg-gradient-to-br from-blue-500/10 via-white/0 to-emerald-400/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur">
                <div className="p-3 sm:p-4">
                  <div className="relative aspect-[1170/2532] overflow-hidden rounded-[1.5rem] bg-white">
                    <Image
                      src={scorecardImg}
                      alt="Puck Buddy scorecard showing shot analysis with metrics and coaching feedback"
                      fill
                      className="object-cover object-center"
                      priority
                      unoptimized
                    />
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
          <ScrollAnimation>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.22em] text-blue-700 uppercase mb-3">
                Product demo
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                See Puck Buddy in action
              </h2>
            </div>
          </ScrollAnimation>
          
          {/* Single Comprehensive Video */}
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation delay={0.1}>
              <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10 hover:shadow-3xl transition-shadow">
                <iframe
                  src="https://player.vimeo.com/video/1143926214?badge=0&autopause=0&player_id=0&app_id=58479"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  title="Puck Buddy Complete Overview"
                />
              </div>
            </ScrollAnimation>
          </div>
          <ScrollAnimation delay={0.3}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://apps.apple.com/us/app/puck-buddy/id6752230304"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-105 w-auto max-w-[300px] sm:max-w-[600px]"
            >
              <Image
                src="/app-store-badge.svg"
                alt="Download on the App Store"
                width={1200}
                height={402}
                className="h-auto w-auto max-w-[300px] sm:max-w-[600px]"
                unoptimized
              />
            </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <ScrollAnimation direction="left">
              <div className="max-w-xl">
                <p className="text-xs font-semibold tracking-[0.22em] text-blue-700 uppercase mb-3">
                  Interactive
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Try it yourself.
                </h2>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                  Explore the real app experience—upload a shot, see your scorecard, and get coaching feedback. It&apos;s all interactive.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    { title: "Click the hotspots", desc: "Move between screens to see the full flow." },
                    { title: "Tap around", desc: "Try different areas to discover features." },
                    { title: "Use the menu", desc: "Quickly switch to any screen you want to see." },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-black/5 bg-white/70 p-5 shadow-sm backdrop-blur"
                    >
                      <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                      <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            <div className="mx-auto w-full max-w-xl">
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
                <p className="text-xs font-semibold tracking-[0.22em] text-blue-200/90 uppercase">
                  Coaching meets AI
                </p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Built with a real coach.</h2>
                <p className="text-lg text-white/75 leading-relaxed">
                  Puck Buddy is built with the expertise of Coach Seth Michelson—Charleston, SC&apos;s go-to youth
                  hockey coach. His rink-tested approach to fundamentals, confidence, and fun informs every
                  recommendation inside the app.
                </p>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
                  <p className="text-lg italic text-white/90 leading-relaxed">
                    &ldquo;I wanted every kid to feel like they have a coach in the rink with them—even when they
                    practice alone. Puck Buddy delivers that.&rdquo;
                  </p>
                  <p className="mt-4 text-xs font-semibold tracking-[0.22em] text-white/65 uppercase">
                    Coach Seth • Founder &amp; Puck Buddy AI Coach
                  </p>
                </div>

                <div className="grid gap-3">
                  {[
                    "Coaching that’s simple, actionable, and kid-friendly.",
                    "Scorecards + feedback that turn reps into improvement.",
                    "A consistent voice and plan—without scheduling 1:1 sessions.",
                  ].map((text) => (
                    <div
                      key={text}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
                    >
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/20">
                        ✓
                      </span>
                      <p className="text-sm text-white/75">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Proof / Trust Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollAnimation>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <p className="text-xs font-semibold tracking-[0.22em] text-blue-700 uppercase mb-3">
                  Proof
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Built for performance. Tested in the real world.
                </h2>
                <p className="text-lg text-gray-600">
                  We’re early—but we’re not guessing. The product is grounded in real coaching and validated by real reps.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  value: "5,000+",
                  label: "Videos analyzed",
                  desc: "Feedback generated from real player reps—not generic advice.",
                },
                {
                  value: "20 years",
                  label: "Coaching + AI experience",
                  desc: "Rink-tested coaching meets modern AI systems and UX.",
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
                <p className="text-sm font-semibold tracking-[0.22em] text-blue-700 uppercase">
                  Testimonial
                </p>
                <p className="mt-4 text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
                  &ldquo;After an afternoon of Puck Buddy my son is already talking about adding 10 mph to his snapshot&rdquo;
                </p>
                <p className="mt-4 text-sm text-gray-600">
                  - A Proud Puck Buddy Parent
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
                <p className="text-xs font-semibold tracking-[0.22em] text-blue-700 uppercase mb-3">
                  Why it works
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Built to create real improvement.
                </h2>
                <p className="text-lg text-gray-600">
                  Not generic tips—structured feedback designed to help players understand what to change and how.
                </p>
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
                  desc: "Quick feedback keeps players in the flow—review, adjust, and take the next rep with intent.",
                },
                {
                  title: "Multi-Shot Detection",
                  desc: "Compare attempts over time and spot trends—consistency is a skill you can actually track.",
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
                  desc: "Grounded in real rink teaching—so feedback stays practical, not theoretical.",
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

      {/* App Screenshots Section */}
      {/* App Screenshots Section removed per request */}


      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.22em] text-blue-700 uppercase mb-3">
                Built for real life
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Everyone wins.
              </h2>
              <p className="text-lg text-gray-600">
                A player-first experience that also gives parents and coaches the clarity they’ve been missing.
              </p>
            </div>
          </ScrollAnimation>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Parents */}
            <ScrollAnimation delay={0.1} direction="left">
              <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Parents</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Track your child&apos;s progress with detailed analytics.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Understand what areas need improvement.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Support training without expensive coaching fees.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>See measurable improvements over time.</span>
                </li>
              </ul>
              </div>
            </ScrollAnimation>

            {/* Kids */}
            <ScrollAnimation delay={0.2}>
              <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Players</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Get instant feedback on every shot.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Chat with an AI Coach in real-time.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Learn proper technique through AI analysis.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Build confidence with data-driven improvements.</span>
                </li>
              </ul>
              </div>
            </ScrollAnimation>

            {/* Coaches */}
            <ScrollAnimation delay={0.3} direction="right">
              <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Coaches</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Analyze multiple players efficiently.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Access real-time AI coaching insights.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Create data-driven training programs.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Provide objective, consistent feedback.</span>
                </li>
              </ul>
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
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.22em] text-blue-700 uppercase mb-3">
                Pricing
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Simple pricing. Real coaching value.
              </h2>
              <p className="text-lg text-gray-600">
                Subscriptions are managed by Apple. Cancel anytime.
              </p>
            </div>
          </ScrollAnimation>

          {/* Features Section */}
          <ScrollAnimation delay={0.1}>
            <div className="max-w-4xl mx-auto mb-16">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Unlimited Video Analysis",
                    desc: "Get AI feedback on every shot you upload",
                  },
                  {
                    title: "Advanced Stats Tracking",
                    desc: "Track your progress with detailed metrics over time",
                  },
                  {
                    title: "Real Time Coaching Chat",
                    desc: "Chat with your AI coach in real-time for instant feedback and guidance",
                  },
                  {
                    title: "Audio Coaching",
                    desc: "Listen to personalized coaching feedback",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/80 p-6 rounded-2xl border border-black/5 shadow-sm hover:shadow-lg transition-shadow backdrop-blur"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">✓</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Pricing Plans */}
          <div className="max-w-5xl mx-auto">
            <ScrollAnimation delay={0.2}>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Monthly Plan */}
                <a
                  href="https://apps.apple.com/us/app/puck-buddy/id6752230304"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Puck Buddy on the App Store (Monthly subscription)"
                  className="block bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
                >
                  <div className="text-center">
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
                  className="group relative block overflow-hidden rounded-2xl border border-black/5 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(37,99,235,0.18),transparent_55%),radial-gradient(700px_circle_at_90%_0%,rgba(34,197,94,0.12),transparent_55%),linear-gradient(to_bottom_right,#070A12,#0B1220,#070A12)] p-8 shadow-xl transition-transform duration-300 hover:scale-[1.02] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
                >
                  <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-soft-light" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)", backgroundSize: "26px 26px" }} />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                    BEST VALUE
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Puck Buddy Annual
                    </h3>
                    <p className="text-white/70 mb-2">Annual subscription</p>
                    <div className="mb-2">
                      <span className="inline-block bg-yellow-400 text-gray-900 text-sm font-bold px-3 py-1 rounded-full mb-2">
                        SAVE 30%
                      </span>
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">
                      $49.99
                    </div>
                    <p className="text-white/70 text-sm">
                      Just $4.17/mo
                    </p>
                  </div>
                </a>
              </div>
            </ScrollAnimation>
          </div>

          {/* Legal/Footer Text */}
          <ScrollAnimation delay={0.3}>
            <div className="max-w-4xl mx-auto">
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Payment will be charged to your Apple ID account at confirmation of purchase.
                Subscription automatically renews unless auto-renew is turned off at least 24
                hours before the end of the current period. Account will be charged for renewal
                within 24 hours prior to the end of the current period. You can manage and
                cancel your subscriptions by going to your Account Settings on the App Store
                after purchase.
              </p>
            </div>
          </ScrollAnimation>
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
              <p className="text-xs font-semibold tracking-[0.22em] text-white/70 uppercase mb-3">
                Get started
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Start training with your AI coach.
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.1}>
              <p className="text-lg md:text-xl mb-8 text-white/75 leading-relaxed">
                Download Puck Buddy and turn reps into measurable improvement—power, accuracy, and consistency.
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://apps.apple.com/us/app/puck-buddy/id6752230304"
            target="_blank"
            rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105 w-auto max-w-[300px] sm:max-w-[600px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12]"
              >
                <Image
                  src="/app-store-badge.svg"
                  alt="Download on the App Store"
                  width={1200}
                  height={402}
                  className="h-auto w-auto max-w-[300px] sm:max-w-[600px]"
                  unoptimized
                />
              </a>
              </div>
            </ScrollAnimation>
        </div>
      </div>
      </section>
    </div>
  );
}
