"use client";

import Image from "next/image";

export default function PlayStoreFeature() {
  return (
    <div className="min-h-screen bg-[#1c1c1e] p-8 font-sans">
      <div 
        id="feature-graphic"
        className="relative overflow-hidden shrink-0"
        style={{ width: "1024px", height: "500px", backgroundColor: "#0f172a" }}
      >
        {/* Background gradient & glows */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] to-[#0f172a]" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[120%] bg-blue-500/20 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[120%] bg-emerald-500/20 blur-[100px] rounded-full mix-blend-screen" />

        {/* Player image background on the right */}
        <div className="absolute right-0 top-0 w-[600px] h-[500px]">
          <div className="relative w-full h-full">
            <Image 
              src="/screenshots/img4.png" 
              alt="Player"
              fill
              className="object-cover object-top opacity-50 mix-blend-luminosity"
              unoptimized
            />
            {/* Fade left edge into the background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-[#0f172a]/30" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center px-16">
          <div className="max-w-[600px]">
            <h1 className="text-[5rem] leading-[0.9] font-black text-white italic tracking-tighter uppercase drop-shadow-2xl mb-4">
              PUCK BUDDY.
            </h1>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 uppercase tracking-widest drop-shadow-md mb-8">
              Your AI Hockey Coach
            </p>
            
            <div className="flex gap-6 mt-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Pro Feedback</h3>
                  <p className="text-white/70 text-sm">Instant video analysis</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Track Progress</h3>
                  <p className="text-white/70 text-sm">Data-driven growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
