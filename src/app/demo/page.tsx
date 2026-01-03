"use client";

import { motion } from "framer-motion";
import InteractiveDemo from "../components/InteractiveDemo";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - matches homepage */}
      <section className="relative overflow-hidden bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(37,99,235,0.28),transparent_55%),radial-gradient(900px_circle_at_80%_0%,rgba(34,197,94,0.18),transparent_55%),linear-gradient(to_bottom_right,#070A12,#0B1220,#070A12)] text-white py-16 lg:py-24">
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
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.21, 1.11, 0.81, 0.99] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-white/90 backdrop-blur mb-6"
            >
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(16,185,129,0.12)]" />
              Investor Demo • Private Link
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.21, 1.11, 0.81, 0.99] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6"
            >
              Puck Buddy:{" "}
              <span className="bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
                AI video coaching
              </span>{" "}
              for youth hockey.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.21, 1.11, 0.81, 0.99] }}
              className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto"
            >
              A focused walkthrough of the live Puck Buddy iOS app for investors and partners.
              Explore the clickable demo and review traction at a glance.
            </motion.p>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.21, 1.11, 0.81, 0.99] }}
            className="grid gap-4 sm:grid-cols-4 max-w-4xl mx-auto mt-12"
          >
            {[
              { label: "Launch", value: "Soft launch • Dec 2025" },
              { label: "Traction", value: "500 installs • 25 DAU" },
              { label: "Stage", value: "iOS app live • early customers" },
              { label: "Raise", value: "$100k seed to grow & add 2nd sport" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur"
              >
                <p className="text-xs font-semibold tracking-[0.15em] text-emerald-300/80 uppercase">
                  {item.label}
                </p>
                <p className="mt-1 text-sm md:text-base font-medium text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Product Demo Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start max-w-6xl mx-auto">
            {/* Demo */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <p className="text-xs font-semibold tracking-[0.22em] text-blue-700 uppercase mb-3">
                  Product walkthrough
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Clickable demo
                </h2>
              </div>
              <div className="flex justify-center lg:justify-start">
                <InteractiveDemo />
              </div>
            </div>

            {/* Investor Context Cards */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-black/5 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Vision & positioning</h3>
                <p className="text-sm text-gray-700 mb-3">
                  <span className="font-semibold text-gray-900">
                    Vision — The Center for AI Sports Coaching:
                  </span>{" "}
                  build a category-defining platform for youth skill development,
                  starting with hockey and expanding to additional sports.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>
                      Combines{" "}
                      <span className="font-semibold">
                        computer vision, custom AI agents, and structured training workflows
                      </span>{" "}
                      into a polished, kid-friendly mobile experience.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>
                      Bridges the gap between short-form video tools and expensive 1:1 coaching
                      with always-on, personalized feedback.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-black/5 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Traction & next 6–12 months</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>500 installs and ~25 daily active users since soft launch (Dec 2025).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Deepen product value for hockey: more drills, richer feedback, and better progress tracking.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Launch a second sport using the same AI coaching infrastructure.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Grow paying subscriptions through partnerships with rinks, clubs, and coaches.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-black/5 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What this demo shows</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Current UX for onboarding a shot video and selecting a coach.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Scorecard visualization of key biomechanical metrics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Coach report, chat, and journaling for ongoing improvement.</span>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-gray-500">
                  For detailed metrics, retention data, and financials, please refer to the latest
                  investor memo or reach out directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
