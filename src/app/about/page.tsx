export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              About Puck Buddy
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Revolutionizing hockey training through AI-powered coaching
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Our Mission
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                At Buddy Tech, we believe every athlete deserves the kind of coaching that unlocks their potential, regardless of zip code, budget, or experience. Our mission is to place pro-level feedback within reach by pairing trusted coaching knowledge with accessible AI.
              </p>
              <p className="text-lg leading-relaxed">
                We are building more than software—we are crafting training companions that understand the nuances of each sport, celebrate progress, and keep families informed at every step. Whether you are ripping snapshots in the driveway or preparing for elite competition, Buddy Tech stands alongside you with data-driven insights and encouragement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Powered by Advanced AI
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                Buddy Tech is powered by MediaPipe-driven, on-device pose understanding. Our pipeline detects 33 anatomical landmarks in 3D—shoulders, elbows, knees, hips, and more—to reconstruct depth, timing, and rhythm without streaming a single frame to the cloud.
              </p>
              <ul className="list-disc list-inside space-y-3 text-lg">
                <li>
                  <strong>Real-time performance:</strong> Low-latency processing runs directly on the device, so athletes get feedback instantly, even at the rink or on a driveway hotspot.
                </li>
                <li>
                  <strong>Holistic awareness:</strong> Optional hand and facial landmark models layer in stick control cues, release points, and emotional context for a complete understanding of each rep.
                </li>
                <li>
                  <strong>Cross-platform reach:</strong> The same model stack powers our native app and future web experiences through WebAssembly, keeping analysis consistent everywhere.
                </li>
              </ul>
              <p className="text-lg leading-relaxed">
                These capabilities unlock more than highlight reels. They enable real-time form correction, gesture-driven controls, augmented reality overlays, and movement-based games that keep players engaged. With Buddy Tech, modern computer vision becomes a safe, parent-approved training partner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Built by Sports Enthusiasts
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                After winning the Google Cloud x MLB hackathon, Jake was shocked by how many parents and athletes 
                across sports struggled to find quality coaching. He saw firsthand the gap between motivated athletes 
                and the limitations of YouTube tutorials or fragmented online instruction, and he knew AI could help bridge it.
              </p>
              <p className="text-lg leading-relaxed">
                He didn&apos;t have to look far for a partner. His neighbor, &quot;Coach&quot; Seth, a trusted youth hockey coach in Charleston, 
                jumped at the chance to become the first AI hockey coach and infuse the system with real rink wisdom. Together, they 
                spent months testing and refining the experience, ensuring every piece of feedback felt like it came from a coach who cares.
              </p>
              <p className="text-lg leading-relaxed">
                The result is Puck Buddy—the first AI hockey coach purpose-built to analyze and guide developmental players. Our 
                multi-agent pipelines handle data capture, analysis, and real-time feedback, giving families access to professional-grade 
                insights that travel with them from the rink to the driveway.
              </p>
              <p className="text-lg leading-relaxed">
                Our team is passionate about sports and technology, and we listen closely to players, coaches, and parents to shape every 
                release. We&apos;re just getting started, and we can&apos;t wait to see where this journey takes us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Have questions, feedback, or suggestions? We&apos;d love to hear from you!
            </p>
            <div className="space-y-4">
              <p className="text-gray-600">
                <strong>CEO &amp; Developer:</strong> Jake DiBattista
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong>{" "}
                <a href="mailto:Jake@buddyllc.app" className="text-blue-600 hover:text-blue-700 underline">
                  Jake@buddyllc.app
                </a>
              </p>
              <p className="text-gray-600">
                <strong>Company:</strong> Buddy Tech LLC
              </p>
              <p className="text-gray-600">
                <strong>App Store:</strong>{" "}
                <a
                  href="https://apps.apple.com/us/app/puck-buddy/id6752230304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  View on App Store
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

