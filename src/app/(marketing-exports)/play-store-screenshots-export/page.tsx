"use client";

import Image from "next/image";

export default function PlayStoreScreenshotsExport() {
  const scale = 2; // 540 * 2 = 1080, 960 * 2 = 1920 (9:16 Aspect Ratio)

  // Helper component to scale the 540x960 designs to 1080x1920
  const ScreenWrapper = ({ id, children }: { id: string, children: React.ReactNode }) => (
    <div id={id} className="w-[1080px] h-[1920px] relative bg-white overflow-hidden shrink-0">
      <div 
        className="absolute top-0 left-0 w-[540px] h-[960px] origin-top-left"
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1c1c1e] p-24 font-sans flex gap-24 flex-wrap">
      
      {/* Screen 1 */}
      <ScreenWrapper id="screen-1">
        <div className="relative w-full h-full bg-gray-100 overflow-hidden flex flex-col">
          <Image 
            src="/screenshots/img2.png" 
            alt="Player Celebrating"
            fill
            className="object-cover object-center"
            unoptimized
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
          
          <div className="relative z-10 flex-1 flex flex-col justify-between p-12 pt-20 pb-20 text-center">
            <div>
              <h2 className="text-[6.5rem] leading-[0.85] font-black text-white/90 italic tracking-tighter uppercase drop-shadow-lg">
                PUCK<br/>BUDDY.
              </h2>
            </div>
            
            <div>
              <p className="text-4xl font-black text-white italic tracking-tighter uppercase drop-shadow-md">
                The future of hockey is here
              </p>
            </div>
          </div>
        </div>
      </ScreenWrapper>

      {/* Screen 2 */}
      <ScreenWrapper id="screen-2">
        <div className="relative w-full h-full bg-gray-900 overflow-hidden flex flex-col">
          <Image 
            src="/screenshots/img1.png" 
            alt="Player Sliding"
            fill
            className="object-cover object-center opacity-40"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
          
          <div className="relative z-10 flex-1 flex flex-col p-10 pt-20">
            <h2 className="text-[4.5rem] leading-[0.9] font-black text-white italic tracking-tighter uppercase text-center mb-16 drop-shadow-lg">
              Stop Guessing.<br/>Coaching Tailored<br/>To Your Needs.
            </h2>
            
            <div className="flex-1 flex flex-col justify-center gap-6 w-full max-w-[440px] mx-auto">
              <div className="bg-white rounded-3xl p-6 flex items-center gap-5 shadow-xl">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Practice Mode</h3>
                  <p className="text-sm text-gray-500 leading-snug">Select a drill, upload film, set new high scores!</p>
                </div>
                <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
              
              <div className="bg-white rounded-3xl p-6 flex items-center gap-5 shadow-xl">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Talk to Puck Buddy</h3>
                  <p className="text-sm text-gray-500 leading-snug">Have a live conversation with a master AI hockey coach.</p>
                </div>
                <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>

              <div className="bg-white rounded-3xl p-6 flex items-center gap-5 shadow-xl opacity-90">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 shrink-0">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Training History</h3>
                  <p className="text-sm text-gray-500 leading-snug">Browse your scores and feedback by date.</p>
                </div>
                <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </div>
        </div>
      </ScreenWrapper>

      {/* Screen 3 */}
      <ScreenWrapper id="screen-3">
        <div className="relative w-full h-full bg-black overflow-hidden flex flex-col">
          <Image 
            src="/screenshots/img4.png" 
            alt="Player Face"
            fill
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
          
          <div className="relative z-10 flex-1 flex flex-col justify-between p-12 pt-20 pb-20 text-center">
            <h2 className="text-[4.5rem] leading-[0.9] font-black text-white italic tracking-tighter uppercase drop-shadow-lg">
              Stop Guessing.<br/>Follow The Data.
            </h2>
            
            <div className="flex flex-col items-center gap-10">
              <p className="text-2xl font-bold text-white uppercase tracking-wider drop-shadow-md">
                Tryouts don&apos;t care that you<br/>&quot;worked hard.&quot;
              </p>
              <div className="bg-blue-600 text-white font-bold text-2xl uppercase tracking-wider py-5 px-10 rounded-xl shadow-lg w-full max-w-[360px] text-center">
                Analyze a video now
              </div>
            </div>
          </div>
        </div>
      </ScreenWrapper>

      {/* Screen 4 */}
      <ScreenWrapper id="screen-4">
        <div className="relative w-full h-full bg-gray-900 overflow-hidden flex flex-col">
          <Image 
            src="/screenshots/img3.png" 
            alt="Player Shooting"
            fill
            className="object-cover object-center opacity-30"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
          
          <div className="relative z-10 flex-1 flex flex-col p-10 pt-20">
            <h2 className="text-[3.5rem] leading-[1] font-black text-white italic tracking-tighter uppercase text-center mb-10 drop-shadow-lg">
              Expert video breakdowns<br/>and coaching on-demand.
            </h2>
            
            <div className="flex-1 bg-gray-50 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col border-[6px] border-white mx-4 mb-8">
              <div className="bg-white p-5 border-b flex items-center justify-between">
                <div className="flex items-center gap-3 text-blue-900 font-semibold text-lg">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  Home
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
              
              <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-hidden text-base relative">
                <div className="flex gap-3 w-11/12">
                  <div className="w-10 h-10 rounded-full bg-blue-900 shrink-0 flex items-center justify-center text-white font-bold">PB</div>
                  <div className="bg-white p-4 rounded-3xl rounded-tl-none shadow-sm text-gray-700 leading-snug border border-gray-100">
                    Hey Jake! I noticed you are consistently missing high glove side. Since you always send videos, I&apos;ll be able to help you track your progress. For now, you can ask me about:
                    <ol className="list-decimal pl-5 mt-3 space-y-2 text-gray-600">
                      <li>How to improve your snapshot technique.</li>
                      <li>Best drills for skating speed.</li>
                      <li>Creating a detailed training plan.</li>
                    </ol>
                  </div>
                </div>
                
                <div className="flex justify-end w-full">
                  <div className="bg-blue-900 text-white p-4 rounded-3xl rounded-tr-none shadow-sm max-w-[80%]">
                    Help me build a training plan
                  </div>
                </div>

                <div className="flex gap-3 w-11/12">
                  <div className="w-10 h-10 rounded-full bg-blue-900 shrink-0 flex items-center justify-center text-white font-bold">PB</div>
                  <div className="bg-white p-4 rounded-3xl rounded-tl-none shadow-sm text-gray-700 leading-snug border border-gray-100">
                    To get faster, you need a long, powerful stride and quick feet. Since we do not have any data for you yet, I recommend starting with these drills:
                    <div className="mt-4 space-y-3">
                      <div className="text-blue-900 font-medium bg-blue-50 p-3 rounded-lg">Forward Stride Extension Video ↗</div>
                      <div className="text-blue-900 font-medium bg-blue-50 p-3 rounded-lg">Quick Feet Drills Video ↗</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
              </div>
              
              <div className="p-4 bg-white border-t">
                <div className="bg-gray-100 rounded-full px-5 py-3 text-gray-400 text-base flex justify-between items-center">
                  <span>Ask a question...</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScreenWrapper>

    </div>
  );
}
