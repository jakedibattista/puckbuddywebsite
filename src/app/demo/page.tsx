"use client";

import InteractiveDemo from "../components/InteractiveDemo";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Puck Buddy Interactive Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the app&apos;s key features and user flow. Tap anywhere on the screen to reveal interactive hotspots.
          </p>
        </div>

        {/* Demo Component */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <InteractiveDemo />
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This is a prototype demonstration. Actual app experience may vary.</p>
        </div>
      </div>
    </div>
  );
}

