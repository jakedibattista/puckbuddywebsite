"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import InteractiveDemo from "../components/InteractiveDemo";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-slate-950 to-gray-900 text-white">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-16">
        {/* Investor Hero */}
        <section className="space-y-8">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="relative h-20 w-20 rounded-full overflow-hidden border border-white/10 bg-white">
              <Image
                src="/seth_logo.jpeg"
                alt="Puck Buddy logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-blue-300 uppercase">
                Investor Demo • Private Link
              </p>
              <p className="text-sm text-gray-300">
                The Center for AI Sports Coaching — starting with youth hockey.
              </p>
            </div>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Puck Buddy: AI video coaching for youth hockey.
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              This page is a focused walkthrough of the live Puck Buddy iOS app,
              built for investors and partners. Explore the clickable product
              demo below and review traction, roadmap, and our raise at a glance.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 sm:grid-cols-4 max-w-4xl">
            {[
              {
                label: "Launch",
                value: "Soft launch • Dec 2025",
              },
              {
                label: "Traction",
                value: "500 installs • 25 DAU",
              },
              {
                label: "Stage",
                value: "iOS app live • early customers",
              },
              {
                label: "Raise",
                value: "$100k seed to grow & add 2nd sport",
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
              >
                <p className="text-xs font-semibold tracking-wide text-blue-200 uppercase">
                  {item.label}
                </p>
                <p className="mt-1 text-sm md:text-base font-medium text-white">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Interactive Product Demo */}
        <section className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">
              Clickable product walkthrough
            </h2>
            <div className="mt-6 flex justify-center">
              <InteractiveDemo />
            </div>
          </div>

          {/* Investor Context */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold mb-3">Vision & positioning</h3>
              <p className="text-sm text-gray-200 mb-3">
                <span className="font-semibold text-white">
                  Vision — The Center for AI Sports Coaching:
                </span>{" "}
                build a category‑defining platform for youth skill development,
                starting with hockey and expanding to additional sports.
              </p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li>
                  • Combines{" "}
                  <span className="font-semibold">
                    computer vision, custom AI agents, and structured training workflows
                  </span>{" "}
                  into a polished, kid‑friendly mobile experience.
                </li>
                <li>
                  • Bridges the gap between short‑form video tools and expensive 1:1 coaching
                  with always‑on, personalized feedback.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold mb-3">Traction & next 6–12 months</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li>• 500 installs and ~25 daily active users since soft launch (Dec 2025).</li>
                <li>• Deepen product value for hockey: more drills, richer feedback, and better progress tracking.</li>
                <li>• Launch a second sport using the same AI coaching infrastructure.</li>
                <li>• Grow paying subscriptions through partnerships with rinks, clubs, and coaches.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold mb-3">What this demo shows</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li>• Current UX for onboarding a shot video and selecting a coach.</li>
                <li>• Scorecard visualization of key biomechanical metrics.</li>
                <li>• Coach report, chat, and journaling for ongoing improvement.</li>
              </ul>
              <p className="mt-4 text-xs text-gray-400">
                For detailed metrics, retention data, and financials, please refer to the latest
                investor memo or reach out directly.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

