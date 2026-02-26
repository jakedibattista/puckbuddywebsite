"use client";

import Image from "next/image";

export default function AppStoreScreenshotsExport() {
  const scale = 1284 / 390; // approx 3.2923

  // Helper component to scale the 390x844 designs to 1284x2778
  const ScreenWrapper = ({ id, children }: { id: string, children: React.ReactNode }) => (
    <div id={id} className="w-[1284px] h-[2778px] relative bg-white overflow-hidden shrink-0">
      <div 
        className="absolute top-0 left-0 w-[390px] h-[844px] origin-top-left"
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
          
          <div className="relative z-10 flex-1 flex flex-col justify-between p-10 pt-16 pb-16 text-center">
            <div>
              <h2 className="text-[5rem] leading-[0.85] font-black text-white/90 italic tracking-tighter uppercase drop-shadow-lg">
                PUCK<br/>BUDDY.
              </h2>
            </div>
            
            <div>
              <p className="text-3xl font-black text-white italic tracking-tighter uppercase drop-shadow-md">
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
          
          <div className="relative z-10 flex-1 flex flex-col p-8 pt-16">
            <h2 className="text-[3.5rem] leading-[0.9] font-black text-white italic tracking-tighter uppercase text-center mb-12 drop-shadow-lg">
              Stop Guessing.<br/>Coaching Tailored<br/>To Your Needs.
            </h2>
            
            <div className="flex-1 flex flex-col justify-center gap-4 w-full max-w-[320px] mx-auto">
              <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm">Practice Mode</h3>
                  <p className="text-xs text-gray-500 leading-tight">Select a drill, upload film, set new high scores!</p>
                </div>
                <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
              
              <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-xl">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm">Talk to Puck Buddy</h3>
                  <p className="text-xs text-gray-500 leading-tight">Have a live conversation with a master AI hockey coach.</p>
                </div>
                <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>

              <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-xl opacity-90">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm">Training History</h3>
                  <p className="text-xs text-gray-500 leading-tight">Browse your scores and feedback by date.</p>
                </div>
                <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
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
          
          <div className="relative z-10 flex-1 flex flex-col justify-between p-10 pt-16 pb-16 text-center">
            <h2 className="text-[3.5rem] leading-[0.9] font-black text-white italic tracking-tighter uppercase drop-shadow-lg">
              Stop Guessing.<br/>Follow The Data.
            </h2>
            
            <div className="flex flex-col items-center gap-8">
              <p className="text-xl font-bold text-white uppercase tracking-wider drop-shadow-md">
                Tryouts don&apos;t care that you<br/>&quot;worked hard.&quot;
              </p>
              <div className="bg-blue-600 text-white font-bold text-xl uppercase tracking-wider py-4 px-8 rounded-lg shadow-lg w-full max-w-[280px] text-center">
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
          
          <div className="relative z-10 flex-1 flex flex-col p-8 pt-16">
            <h2 className="text-[2.5rem] leading-[1] font-black text-white italic tracking-tighter uppercase text-center mb-8 drop-shadow-lg">
              Expert video breakdowns<br/>and coaching on-demand.
            </h2>
            
            <div className="flex-1 bg-gray-50 rounded-3xl overflow-hidden shadow-2xl flex flex-col border-4 border-white mx-2 mb-4">
              <div className="bg-white p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-900 font-medium">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  Home
                </div>
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              </div>
              
              <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-hidden text-sm relative">
                <div className="flex gap-2 w-11/12">
                  <div className="w-8 h-8 rounded-full bg-blue-900 shrink-0 flex items-center justify-center text-white text-xs font-bold">PB</div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-gray-700 leading-snug border border-gray-100">
                    Hey Jake! I noticed you are consistently missing high glove side. Since you always send videos, I&apos;ll be able to help you track your progress. For now, you can ask me about:
                    <ol className="list-decimal pl-4 mt-2 space-y-1 text-gray-600">
                      <li>How to improve your snapshot technique.</li>
                      <li>Best drills for skating speed.</li>
                      <li>Creating a detailed training plan.</li>
                    </ol>
                  </div>
                </div>
                
                <div className="flex justify-end w-full">
                  <div className="bg-blue-900 text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]">
                    Help me build a training plan
                  </div>
                </div>

                <div className="flex gap-2 w-11/12">
                  <div className="w-8 h-8 rounded-full bg-blue-900 shrink-0 flex items-center justify-center text-white text-xs font-bold">PB</div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-gray-700 leading-snug border border-gray-100">
                    To get faster, you need a long, powerful stride and quick feet. Since we do not have any data for you yet, I recommend starting with these drills:
                    <div className="mt-3 space-y-2">
                      <div className="text-blue-900 text-xs font-medium bg-blue-50 p-2 rounded">Forward Stride Extension Video ↗</div>
                      <div className="text-blue-900 text-xs font-medium bg-blue-50 p-2 rounded">Quick Feet Drills Video ↗</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
              </div>
              
              <div className="p-3 bg-white border-t">
                <div className="bg-gray-100 rounded-full px-4 py-2 text-gray-400 text-sm flex justify-between items-center">
                  <span>Ask a question...</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScreenWrapper>

    </div>
  );
}
