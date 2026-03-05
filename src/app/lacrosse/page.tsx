"use client";

import ScrollAnimation from "../components/ScrollAnimation";
import { motion, useReducedMotion } from "framer-motion";

export default function LacrossePage() {
  const shouldReduceMotion = useReducedMotion();

  const products = [
    {
      id: "lax-buddy",
      name: "Lax Buddy",
      tagline: "Goalie AI Coach",
      description:
        "Upload your goalie footage and get instant AI-powered mechanics analysis. Lax Buddy breaks down your form, tracks your reps, and delivers actionable feedback, like a goalie coach on demand.",
      href: "https://lax-buddy-358616086489.us-east1.run.app/",
      ctaLabel: "Try Lax Buddy →",
      accent: "from-green-500/20 via-emerald-400/10 to-transparent",
      ring: "ring-green-400/20",
      badge: "Goalie Coach",
      badgeColor: "bg-green-600 text-white ring-green-700/30",
      features: [
        "AI-powered goalie mechanics analysis",
        "Wall ball rep counter",
        "High-res & low-res video support",
        "Instant coaching feedback",
      ],
    },
    {
      id: "scout",
      name: "Scout",
      tagline: "Modern Scouting Platform",
      description:
        "Two workflows, one platform. Athletes build a living profile with AI scouting reports. Scouts run natural language searches to find hidden talent fast. No spreadsheets, no guesswork.",
      href: "https://scout-three-peach.vercel.app/",
      ctaLabel: "Try Scout →",
      accent: "from-blue-500/20 via-indigo-400/10 to-transparent",
      ring: "ring-blue-400/20",
      badge: "Recruiting Platform",
      badgeColor: "bg-blue-600 text-white ring-blue-700/30",
      features: [
        "AI drill analysis (wall ball, 20-yard dash, 5-10-5)",
        "Auto-generated scouting & coaching reports",
        "Natural language scout search",
        "Competition research via Gemini AI",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(16,185,129,0.28),transparent_55%),radial-gradient(900px_circle_at_80%_0%,rgba(37,99,235,0.18),transparent_55%),linear-gradient(to_bottom_right,#070A12,#0B1220,#070A12)] text-white py-20 sm:py-24 lg:py-32">
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
            AI coaching for{" "}
            <span className="bg-gradient-to-r from-green-300 via-emerald-200 to-blue-200 bg-clip-text text-transparent">
              lacrosse players & scouts
            </span>
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.12, ease: [0.21, 1.11, 0.81, 0.99] }}
            className="mt-5 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto"
          >
            We&apos;re pushing the frontier of computer vision in lacrosse, building systems
            that understand goalie mechanics, count reps, and evaluate athletes at a level
            that wasn&apos;t possible even two years ago. This is what that looks like in practice.
          </motion.p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <p className="text-xs font-semibold tracking-[0.22em] text-green-700 uppercase mb-3">
                Examples of Our Work
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Computer vision, applied.
              </h2>
              <p className="text-lg text-gray-600">
                Two live products built on the same cutting-edge AI pipeline, each solving
                a distinct problem in the lacrosse world.
              </p>
            </div>
          </ScrollAnimation>
          <div className="grid gap-10 lg:grid-cols-2 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <ScrollAnimation key={product.id} delay={index * 0.1}>
                <div className="group relative flex flex-col h-full rounded-3xl border border-black/5 bg-gradient-to-br from-white to-gray-50 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  {/* Accent glow */}
                  <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${product.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  <div className="relative">
                    {/* Badge */}
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${product.badgeColor} mb-4`}>
                      {product.badge}
                    </span>

                    <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
                    <p className="text-sm font-semibold text-gray-500 mt-1 mb-4 tracking-wide uppercase">
                      {product.tagline}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

                    {/* Feature list */}
                    <ul className="space-y-2 mb-8">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs font-bold">
                            ✓
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                    >
                      {product.ctaLabel}
                    </a>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Video */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.22em] text-green-700 uppercase mb-3">
                See it in action
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Watch the Scout demo
              </h2>
              <p className="text-lg text-gray-600">
                See how athletes build profiles, get AI scouting reports, and how scouts
                find talent with natural language search.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.1}>
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10">
                <iframe
                  src="https://www.youtube.com/embed/oQLrHAhPkMo"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  title="Scout Lacrosse Platform Demo"
                />
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.22em] text-green-700 uppercase mb-3">
                Under the hood
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Powered by AI, built for the field
              </h2>
              <p className="text-lg text-gray-600">
                The same multi-agent AI pipeline that powers Puck Buddy, adapted
                specifically for lacrosse mechanics and scouting workflows.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Video Analysis",
                desc: "Gemini AI watches your drill footage and extracts mechanics, metrics, and reps automatically.",
              },
              {
                title: "AI Scouting Reports",
                desc: "Auto-generated scouting and coaching reports highlight strengths, weaknesses, and next steps.",
              },
              {
                title: "Natural Language Search",
                desc: "Scouts type queries like \u201cleft-handed attack under 6 feet, top 20% speed\u201d and get instant results.",
              },
              {
                title: "Competition Research",
                desc: "Gemini searches the web to auto-populate athlete competition history and stats.",
              },
              {
                title: "Living Athlete Profile",
                desc: "Profiles grow over time as athletes add drills, events, and scores and are always up to date.",
              },
              {
                title: "Goalie Mechanics Breakdown",
                desc: "Frame-by-frame goalie analysis covers stance, positioning, reaction time, and recovery.",
              },
            ].map((feature, index) => (
              <ScrollAnimation key={feature.title} delay={index * 0.08}>
                <div className="group rounded-2xl border border-black/5 bg-gradient-to-br from-white to-gray-50 p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(16,185,129,0.25),transparent_55%),radial-gradient(900px_circle_at_80%_0%,rgba(37,99,235,0.16),transparent_55%),linear-gradient(to_bottom_right,#070A12,#0B1220,#070A12)] text-white">
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
                Try our lacrosse tools today.
              </h2>
              <p className="text-lg md:text-xl mb-10 text-white/75 leading-relaxed">
                Both products are live and free to try. No signup required for Lax Buddy.
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={0.1}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://lax-buddy-358616086489.us-east1.run.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-green-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12]"
                >
                  Try Lax Buddy: Your AI Goalie Evaluator
                </a>
                <a
                  href="https://scout-three-peach.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white/90 backdrop-blur transition-all hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12]"
                >
                  Explore Scout →
                </a>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </div>
  );
}
