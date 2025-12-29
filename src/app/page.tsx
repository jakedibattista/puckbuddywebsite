"use client";

import Image from "next/image";
import ScrollAnimation from "./components/ScrollAnimation";
import InteractiveDemo from "./components/InteractiveDemo";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Your Personal AI Hockey Coach
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-300 leading-relaxed">
              Stop guessing about your technique. Get AI-powered video analysis to perfect your shot, 
              improve your power, accuracy, and form—all from your iPhone.
            </p>
            <a
              href="https://apps.apple.com/us/app/puck-buddy/id6752230304"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg shadow-lg"
            >
              Download on the App Store
            </a>
          </div>
        </div>
      </section>

      {/* Video Showcase Section - Moved to Top */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
              See Puck Buddy in Action
            </h2>
          </ScrollAnimation>
          
          {/* Single Comprehensive Video */}
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation delay={0.1}>
              <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow">
                <iframe
                  src="https://player.vimeo.com/video/1143926214?badge=0&autopause=0&player_id=0&app_id=58479"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
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
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
              Try the Puck Buddy demo
            </h2>
            <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl mx-auto">
              Click through the app experience to see how players upload shots, view scorecards,
              and get coaching feedback.
            </p>
          </ScrollAnimation>
          <div className="max-w-xl mx-auto">
            <ScrollAnimation delay={0.1}>
              <InteractiveDemo />
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Meet Your Coach Section */}
      <section className="py-16 lg:py-24 bg-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation direction="left">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
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
                <h2 className="text-4xl md:text-5xl font-bold">Meet Your Coach</h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                Puck Buddy is built with the expertise of Coach Seth Michelson, Charleston, SC&apos;s go-to youth hockey coach. His real-world approach to teaching fundamentals, building confidence, and making practice fun informs every recommendation inside the app.
              </p>
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur">
                <p className="text-lg italic text-blue-50">
                  &ldquo;I wanted every kid to feel like they have a coach in the rink with them, even when they are practicing alone. Puck Buddy delivers that.&rdquo;
                </p>
                <p className="mt-4 text-sm uppercase tracking-wide text-blue-100">Coach Seth • Founder &amp; Puck Buddy AI Coach</p>
              </div>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-blue-200">✓</span>
                  <span>Designed training systems for elite and beginner players across the east coast.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-blue-200">✓</span>
                  <span>Brings rink-tested practice plans directly into the AI playbook.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-blue-200">✓</span>
                  <span>Dedicated to making advanced analytics approachable for families and fun for players.</span>
                </li>
              </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Unique Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
                What Makes Puck Buddy Unique
              </h2>
            </ScrollAnimation>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[
                {
                  title: "Multi-Agent AI Pipeline",
                  desc: "Our advanced multi-agent system handles data capture, analysis, and feedback generation seamlessly. Each component works together to provide comprehensive, accurate insights into your shooting technique.",
                },
                {
                  title: "60-Second Turnaround",
                  desc: "Upload a clip and get actionable insights in about a minute. Rapid processing means your player stays in the flow of practice.",
                },
                {
                  title: "Multi-Shot Detection",
                  desc: "Automatically capture every attempt in a session so you can compare trends, identify inconsistencies, and celebrate improvement.",
                },
                {
                  title: "Real-Time AI Coach Chat",
                  desc: "Chat with your AI coach in real-time, trained on your biomechanical data. Get instant answers to your questions, personalized training tips, and custom breakdowns of your videos.",
                },
                {
                  title: "Safety Guardrails",
                  desc: "Built-in content filters, moderation, and secured data storage keep every interaction safe for young athletes and give parents peace of mind.",
                },
                {
                  title: "Built on Real Coaching Expertise",
                  desc: "Puck Buddy's AI was trained and tested on over 100 videos of youth hockey with professional coach benchmarking. This ensures that every piece of feedback is grounded in proven coaching techniques and best AI practices for reliability and safety.",
                },
              ].map((feature, index) => (
                <ScrollAnimation key={index} delay={index * 0.1}>
                      <div className="bg-gray-100 p-8 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1 cursor-default">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{feature.desc}</p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* App Screenshots Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
              Custom Coaching Feedback
            </h2>
            <p className="text-xl text-gray-600 mb-12 text-center">
              Pick a coach and get on demand technique analysis
            </p>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Coach Seth Chat */}
            <ScrollAnimation delay={0.1}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="aspect-[9/19] relative bg-gray-100">
                <Image
                  src="/coach-report-iphone.png"
                  alt="Coach Seth AI Chat"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">AI Coach Seth Feedback</h3>
                <p className="text-sm text-gray-600">On demand technique analysis from the best youth hockey coach in Charleston, SC.</p>
              </div>
              </div>
            </ScrollAnimation>

            {/* Chat Interface */}
            <ScrollAnimation delay={0.2}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="aspect-[9/19] relative bg-gray-100">
                <Image
                  src="/chat-iphone.png"
                  alt="Chat Interface"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">Chat with Puck Buddy</h3>
                <p className="text-sm text-gray-600">Plan practice, ask questions, and learn how to improve with real time chat.</p>
              </div>
              </div>
            </ScrollAnimation>

            {/* Score Card */}
            <ScrollAnimation delay={0.3}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="aspect-[9/19] relative bg-gray-100">
                <Image
                  src="/scorecard-iphone.png"
                  alt="Score Card Analysis"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">Score Card</h3>
                <p className="text-sm text-gray-600">Detailed analysis of your shot performance with grades in 7 biomechanical metrics.</p>
              </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>


      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
              Built for Everyone
            </h2>
          </ScrollAnimation>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Parents */}
            <ScrollAnimation delay={0.1} direction="left">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
              How It Works
            </h2>
          </ScrollAnimation>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { number: "1", title: "Record", desc: "Use your iPhone to take a video of your shot." },
              { number: "2", title: "Upload", desc: "Select the video from your library and upload it to the app." },
              { number: "3", title: "Analyze", desc: "Let our AI coach work its magic! In moments, you'll have a complete analysis." },
              { number: "4", title: "Improve", desc: "Chat with a real time AI hockey coach trained on snapshot shot mechanics." },
            ].map((step, index) => (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <div className="text-center">
                      <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg"
                  >
                    {step.number}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <ScrollAnimation>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Unlock Your Full Potential
              </h2>
              <p className="text-xl text-gray-600">
                Get AI-powered coaching to improve your game
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
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
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
                <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200 hover:border-blue-500 transition-all duration-300">
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
                </div>

                {/* Annual Plan */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 border-2 border-blue-500 relative hover:scale-105 transition-transform duration-300">
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                    BEST VALUE
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Puck Buddy Annual
                    </h3>
                    <p className="text-blue-100 mb-2">Annual subscription</p>
                    <div className="mb-2">
                      <span className="inline-block bg-yellow-400 text-gray-900 text-sm font-bold px-3 py-1 rounded-full mb-2">
                        SAVE 30%
                      </span>
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">
                      $49.99
                    </div>
                    <p className="text-blue-100 text-sm">
                      Just $4.17/mo
                    </p>
                  </div>
                </div>
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollAnimation>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Score More Goals?
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.1}>
              <p className="text-xl mb-8 text-gray-300">
                Download Puck Buddy today and start shooting to score. Your AI coach is waiting.
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
      </div>
      </section>
    </div>
  );
}
