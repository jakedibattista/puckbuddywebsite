"use client";

import Image from "next/image";

export default function YouTubeBanner() {
  return (
    <div className="min-h-screen bg-[#1c1c1e] p-8 font-sans flex items-center justify-center">
      <div 
        id="youtube-banner"
        className="relative overflow-hidden shrink-0 bg-[#0f172a]"
        style={{ width: "2048px", height: "1152px" }}
      >
        {/* Background gradient & glows */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#020617]" />
        
        {/* Large ambient glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[120%] bg-blue-600/15 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[120%] bg-emerald-600/15 blur-[150px] rounded-full mix-blend-screen" />

        {/* Left Side Player Image - TV/Desktop area */}
        <div className="absolute left-0 top-0 w-[800px] h-[1152px] opacity-30 mix-blend-luminosity">
          <div className="relative w-full h-full">
            <Image 
              src="/screenshots/img4.png" 
              alt="Player Face"
              fill
              className="object-cover object-center"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0f172a]/80 to-[#0f172a]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-[#0f172a]" />
          </div>
        </div>

        {/* Right Side Player Image - TV/Desktop area */}
        <div className="absolute right-0 top-0 w-[800px] h-[1152px] opacity-40 mix-blend-luminosity">
          <div className="relative w-full h-full">
            <Image 
              src="/screenshots/img2.png" 
              alt="Player Celebrating"
              fill
              className="object-cover object-top"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0f172a]/80 to-[#0f172a]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-[#0f172a]" />
          </div>
        </div>

        {/* SAFE AREA: 1546 x 423 (Centered) - Visible on all devices (mobile, desktop) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1546px] h-[423px] flex flex-col items-center justify-center z-20">
          
          <div className="text-center">
            <h1 className="text-[8rem] leading-[0.85] font-black text-white italic tracking-tighter uppercase drop-shadow-2xl mb-6">
              PUCK BUDDY.
            </h1>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 uppercase tracking-widest drop-shadow-md mb-12">
              Your AI Hockey Coach
            </p>
          </div>

          <div className="flex gap-8 mt-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 flex items-center gap-5 shadow-2xl">
              <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shrink-0">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-white text-xl">Pro Feedback</h3>
                <p className="text-white/70 text-base">Instant video analysis</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 flex items-center gap-5 shadow-2xl">
              <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-white text-xl">Track Progress</h3>
                <p className="text-white/70 text-base">Data-driven growth</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
