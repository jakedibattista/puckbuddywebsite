"use client";
// Presents hockey analysis features, pricing and Apple/Google download choices.

import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";
import Image from "next/image";
import ScrollAnimation from "../components/ScrollAnimation";
import InteractiveDemo from "../components/InteractiveDemo";
import MobileStickyCTA from "../components/MobileStickyCTA";
import HeroVideoCarousel from "../components/HeroVideoCarousel";
import SmartAppLink from "../components/SmartAppLink";
import HowItWorks from "../components/HowItWorks";
import StoreBadges from "../components/StoreBadges";
import RatingBadge from "../components/RatingBadge";
import { motion } from "framer-motion";

export default function PuckBuddyPage() {
  const shouldReduceMotion = useReducedMotionPreference();

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
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.21, 1.11, 0.81, 0.99] }}
                className="mb-6 flex justify-center"
              >
                <RatingBadge theme="dark" />
              </motion.div>
              <motion.h1
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.05, ease: [0.21, 1.11, 0.81, 0.99] }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight"
              >
                Meet Your New{" "}
                <span className="text-emerald-200">Private Hockey Coach</span>
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
                className="relative z-20 mb-5 inline-flex h-[56px] w-[220px] items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition-all hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12] sm:mb-6 sm:h-[60px] sm:w-[240px]"
              >
                Watch the demo
                <span className="ml-2 text-white/60">→</span>
              </a>
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 rounded-[2.25rem] bg-gradient-to-br from-blue-500/10 via-white/0 to-emerald-400/10 blur-2xl"
              />
              <div className="relative z-10 w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur">
                <div className="p-3 sm:p-4">
                  <HeroVideoCarousel />
                </div>
              </div>
              <StoreBadges
                location="puckbuddy_hero"
                theme="dark"
                priority
                className="relative z-20 mt-5 sm:mt-6"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Video Showcase Section - Moved to Top */}
      <section id="video" className="py-12 sm:py-16 lg:py-24 bg-white scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-black/5 bg-gradient-to-br from-gray-50 to-white px-5 py-8 shadow-xl sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <ScrollAnimation>
              <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
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
                  src="/puckbuddyclinic2.jpeg"
                  alt="Puck Buddy coaches working with players at a clinic."
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

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  quote:
                    "My shot was good, but it told me exactly what to improve. I worked on it, and now my shot is so much faster than before. One of the best training apps out there.",
                  name: "Ryan C.",
                  role: "Puck Buddy player",
                },
                {
                  quote:
                    "I've been using Puck Buddy with my son and it's been a great addition to his hockey education.",
                  name: "Michael P.",
                  role: "Hockey parent",
                },
                {
                  quote:
                    "This tool has been great for our academy. It helps give every kid personalized coaching and improve on and off the ice.",
                  name: "Ryan B.",
                  role: "Hockey director",
                },
              ].map((testimonial, index) => (
                <ScrollAnimation key={testimonial.name} delay={0.3 + index * 0.08}>
                  <figure className="flex h-full flex-col rounded-3xl border border-black/5 bg-gradient-to-br from-gray-50 to-white p-7 shadow-sm">
                    <p className="text-amber-500" aria-hidden>
                      ★★★★★
                    </p>
                    <blockquote className="mt-4 flex-grow text-base font-medium leading-relaxed text-gray-900">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">{testimonial.name}</span>
                      {" · "}
                      {testimonial.role}
                    </figcaption>
                  </figure>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clinics Section */}
      <section id="clinics" className="scroll-mt-24 py-12 sm:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation direction="left">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <Image
                  src="/pb-booth.png"
                  alt="Puck Buddy booth at a hockey clinic."
                  width={1024}
                  height={768}
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="right">
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    Bring the power of AI to your rink
                  </h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We host Puck Buddy shooting and stride clinics at rinks and events, 
                  helping players and coaches turn every rep into measurable progress 
                  using the same AI tools the pros use.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="https://anc.apm.activecommunities.com/carolinaicepalace/activity/search/detail/10427?onlineSiteId=0&from_original_cui=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-blue-700 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-800"
                  >
                    Join our summer camp
                  </a>
                  <a
                    href="https://puck-buddy-merch.myshopify.com/collections/puck-buddy-clinics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-50"
                  >
                    See all clinics
                  </a>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="scroll-mt-24 py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <ScrollAnimation>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Simple pricing, real coaching value
              </h2>
              <p className="text-lg text-gray-600">
                Less than one private lesson per month, for a coach that&apos;s there
                every single rep.
              </p>
            </div>
          </ScrollAnimation>

          {/* Pricing Plans */}
          <div className="max-w-6xl mx-auto">
            <ScrollAnimation delay={0.1}>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {/* Annual Plan — best value, listed first */}
                <SmartAppLink
                  context="Annual subscription"
                  className="relative block h-full rounded-2xl border-2 border-blue-600 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
                >
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                    Best value
                  </span>
                  <div className="flex h-full flex-col justify-center text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Puck Buddy Annual
                    </h3>
                    <p className="text-gray-600 mb-2">Annual subscription</p>
                    <div className="mb-2">
                      <span className="inline-block bg-yellow-400 text-yellow-950 text-sm font-bold px-3 py-1 rounded-full mb-2">
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
                </SmartAppLink>

                {/* Monthly Plan */}
                <SmartAppLink
                  context="Monthly subscription"
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
                </SmartAppLink>

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
              <StoreBadges location="puckbuddy_final_cta" theme="dark" />
            </ScrollAnimation>
        </div>
      </div>
      </section>
    </div>
  );
}
