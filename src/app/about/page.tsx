"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollAnimation from "../components/ScrollAnimation";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - matches homepage */}
      <section className="relative overflow-hidden bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(37,99,235,0.28),transparent_55%),radial-gradient(900px_circle_at_80%_0%,rgba(34,197,94,0.18),transparent_55%),linear-gradient(to_bottom_right,#070A12,#0B1220,#070A12)] text-white py-20 lg:py-28">
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
              Our story
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.21, 1.11, 0.81, 0.99] }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6"
            >
              About{" "}
              <span className="bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
                Buddy Tech
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.21, 1.11, 0.81, 0.99] }}
              className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto"
            >
              We&apos;re on a mission to make pro-level coaching accessible to every athlete.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <ScrollAnimation>
              <p className="text-xs font-semibold tracking-[0.22em] text-blue-700 uppercase mb-3">
                Our mission
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Pro-level coaching for everyone.
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.1}>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  At Buddy Tech, we believe every athlete deserves the kind of coaching that unlocks their potential—regardless of zip code, budget, or experience. Our mission is to place pro-level feedback within reach by pairing trusted coaching knowledge with accessible AI.
                </p>
                <p>
                  We&apos;re building more than software. We&apos;re crafting training companions that understand the nuances of each sport, celebrate progress, and keep families informed at every step. Whether you&apos;re practicing shots in the driveway or preparing for elite competition, Buddy Tech stands alongside you with data-driven insights and encouragement.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <ScrollAnimation>
              <p className="text-xs font-semibold tracking-[0.22em] text-blue-700 uppercase mb-3">
                The technology
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Powered by advanced AI.
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.1}>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Buddy Tech is powered by MediaPipe-driven, on-device pose understanding. Our pipeline detects 33 anatomical landmarks in 3D—shoulders, elbows, knees, hips, and more—to reconstruct depth, timing, and rhythm without streaming a single frame to the cloud.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {[
                {
                  title: "Real-time performance",
                  desc: "Low-latency processing runs directly on the device, so athletes get feedback instantly.",
                },
                {
                  title: "Holistic awareness",
                  desc: "Optional hand and facial landmark models layer in stick control cues, release points, and emotional context.",
                },
                {
                  title: "Cross-platform reach",
                  desc: "The same model stack powers our native app and future web experiences through WebAssembly.",
                },
              ].map((item, index) => (
                <ScrollAnimation key={item.title} delay={index * 0.1}>
                  <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <p className="text-xs font-semibold tracking-[0.22em] text-blue-700 uppercase mb-3">
                  The team
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Built by sports enthusiasts.
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  After winning the Google Cloud x MLB hackathon, Jake saw the gap between motivated athletes and quality coaching. He partnered with Coach Seth to build the first AI hockey coach.
                </p>
              </div>
            </ScrollAnimation>

            {/* Team Members - placeholder for photos/bios */}
            <div className="grid md:grid-cols-2 gap-8">
              <ScrollAnimation delay={0.1}>
                <div className="rounded-2xl border border-black/5 bg-gradient-to-br from-white to-gray-50 p-8 shadow-sm text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600/15 to-emerald-400/15 ring-1 ring-black/5 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-blue-700">JD</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Jake DiBattista</h3>
                  <p className="text-sm font-medium text-blue-700 mb-3">CEO & Developer</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Google Cloud x MLB hackathon winner. Passionate about using AI to democratize coaching and make pro-level feedback accessible to every athlete.
                  </p>
                </div>
              </ScrollAnimation>

              <ScrollAnimation delay={0.2}>
                <div className="rounded-2xl border border-black/5 bg-gradient-to-br from-white to-gray-50 p-8 shadow-sm text-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden ring-1 ring-black/5 mx-auto mb-4">
                    <Image
                      src="/seth_logo.jpeg"
                      alt="Coach Seth"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Coach Seth Michelson</h3>
                  <p className="text-sm font-medium text-blue-700 mb-3">AI Hockey Coach & Co-founder</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Charleston&apos;s go-to youth hockey coach. 20+ years of rink-tested coaching expertise now powering every recommendation inside Puck Buddy.
                  </p>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
          <div className="max-w-2xl mx-auto text-center">
            <ScrollAnimation>
              <p className="text-xs font-semibold tracking-[0.22em] text-white/70 uppercase mb-3">
                Get in touch
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Have questions? We&apos;d love to hear from you.
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.1}>
              <div className="space-y-4 text-white/80">
                <p>
                  <span className="font-semibold text-white">Email:</span>{" "}
                  <a href="mailto:Jake@buddyllc.app" className="underline hover:text-white transition-colors">
                    Jake@buddyllc.app
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-white">App Store:</span>{" "}
                  <a
                    href="https://apps.apple.com/us/app/puck-buddy/id6752230304"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white transition-colors"
                  >
                    View Puck Buddy on the App Store
                  </a>
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </div>
  );
}
