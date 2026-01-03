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
                Built for performance and privacy.
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.1}>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Puck Buddy uses a sophisticated dual-layer AI architecture. First, we use on-device MediaPipe pose estimation to track 33 anatomical landmarks in real-time. Second, those movements are analyzed by a suite of 10+ specialized Gemini coaching agents—trained on decades of elite hockey knowledge to provide instant, actionable feedback.
                </p>
                <p>
                  Our tech stack is built with safety as a core requirement. We strictly follow a &quot;no-storage&quot; video policy—your training clips are processed on your device and never saved to the cloud. Our agents are specifically constrained to hockey coaching, ensuring a focused and secure environment for personal development.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  title: "Privacy & Performance",
                  desc: "Processing runs entirely on-device, meaning your videos are never stored or uploaded. This ensures instant, low-latency feedback that respects your data and privacy.",
                },
                {
                  title: "Specialized Agents",
                  desc: "Our suite of 10+ Gemini agents is purpose-built for hockey development. These agents provide safe, expert guidance focused exclusively on skill growth and performance.",
                },
                {
                  title: "Data-Driven Growth",
                  desc: "We build a long-term development profile for every player. By tracking metrics over time, we create a clear, personalized plan to improve power, accuracy, and consistency.",
                },
              ].map((item, index) => (
                <ScrollAnimation key={item.title} delay={index * 0.1}>
                  <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow h-full">
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
          <div className="max-w-5xl mx-auto">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <p className="text-xs font-semibold tracking-[0.22em] text-blue-700 uppercase mb-3">
                  The team
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Built by athletes and engineers.
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  We&apos;re a team of builders, coaches, and former pros united by one mission: give every athlete access to the coaching they deserve.
                </p>
              </div>
            </ScrollAnimation>

            {/* Team Members */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Jake DiBattista */}
              <ScrollAnimation delay={0.1}>
                <div className="rounded-2xl border border-black/5 bg-gradient-to-br from-white to-gray-50 p-8 shadow-sm text-center h-full">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-blue-500/20 mx-auto mb-4 p-1 bg-white">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src="/jake-dibattista.jpg"
                        alt="Jake DiBattista"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Jake DiBattista</h3>
                  <p className="text-sm font-medium text-blue-700 mb-3">CEO & Lead Engineer</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Staff AI Engineer and Google Cloud Next 2025 keynote speaker. After winning the Vertex AI Hackathon with MLB, Jake saw the opportunity to bring elite AI coaching to youth sports. With 6+ years building AI products at scale—including generative AI systems reaching 600K+ users—he&apos;s the technical force behind Puck Buddy.
                  </p>
                </div>
              </ScrollAnimation>

              {/* Andrew Rowe */}
              <ScrollAnimation delay={0.2}>
                <div className="rounded-2xl border border-black/5 bg-gradient-to-br from-white to-gray-50 p-8 shadow-sm text-center h-full">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-blue-500/20 mx-auto mb-4 p-1 bg-white">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src="/andrew-rowe.jpg"
                        alt="Andrew Rowe"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Andrew Rowe</h3>
                  <p className="text-sm font-medium text-blue-700 mb-3">Chief Operating Officer</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Former pro hockey player with 15+ years across the AHL, ECHL, SHL, Swiss NL, and DEL. After a full-ride at Michigan State and starting his pro career with the Philadelphia Flyers, Andrew now channels that competitive drive into Puck Buddy—building the tool he wishes he had 25 years ago. His mission is to empower the next generation with accessible, elite-level coaching.
                  </p>
                </div>
              </ScrollAnimation>

              {/* Coach Seth */}
              <ScrollAnimation delay={0.3}>
                <div className="rounded-2xl border border-black/5 bg-gradient-to-br from-white to-gray-50 p-8 shadow-sm text-center h-full">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-blue-500/20 mx-auto mb-4 p-1 bg-white">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src="/seth-michelson.jpg"
                        alt="Coach Seth Michelson"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Coach Seth Michelson</h3>
                  <p className="text-sm font-medium text-blue-700 mb-3">Co-Founder & Head of Sales</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Charleston Stingrays coach with 20+ years of rink-tested expertise. Seth infused Puck Buddy with real coaching wisdom—his mission is to make every kid feel like they have a coach with them, even when practicing alone. He brings that same passion to building partnerships with rinks, clubs, and coaches across the country.
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
