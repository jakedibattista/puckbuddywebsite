"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  id: number;
  videoSrcs: string[]; // Support playing multiple videos sequentially on a single slide
  title: string;
  description: string;
}

const DEFAULT_SLIDES: Slide[] = [
  {
    id: 1,
    videoSrcs: [
      "/v2-walkthrough/ScreenRecording_06-01-2026 15-43-48_1.mov",
      "/v2-walkthrough/ScreenRecording_06-01-2026 15-47-27_1.mov"
    ],
    title: "AI Coaching & Drill Selection",
    description: "Welcome to Puck Buddy 2.0. Select whether you are a Player or Goalie, choose from a wide variety of standard drills (like Butterfly Slide), and choose your master AI Coach. Then, upload your practice film directly from your iPhone. Our custom computer vision models analyze your movement, positioning, and technique in real-time to prepare a comprehensive scorecard.",
  },
  {
    id: 2,
    videoSrcs: ["/v2-walkthrough/ScreenRecording_06-01-2026 16-04-28_1.mp4"],
    title: "Master Coach Report Card",
    description: "Get detailed, actionable feedback from your selected AI Coach. See your overall score, key metrics, and specific areas of strength and improvement with professional coaching insights.",
  },
  {
    id: 3,
    videoSrcs: ["/v2-walkthrough/ScreenRecording_06-01-2026 16-05-02_1.mov"],
    title: "Interactive Hockey Chat",
    description: "Have a live, natural conversation with your AI Coach. Ask specific questions about your session, get tips on how to fix errors, and receive tailored hockey advice anytime.",
  },
  {
    id: 4,
    videoSrcs: ["/v2-walkthrough/ScreenRecording_06-01-2026 16-06-11_1.mov"],
    title: "Detailed Performance Stats",
    description: "Track your progress over time with rich, visual statistics. Monitor your high scores, drill completion rates, and skill development across multiple practice sessions.",
  },
  {
    id: 5,
    videoSrcs: ["/v2-walkthrough/ScreenRecording_06-01-2026 16-07-27_1.mp4"],
    title: "Leaderboard & Community",
    description: "Compete with friends and teammates on the community scoreboard. Compare your scores, share your progress, and push each other to stop being average and train the right way.",
  },
];

export default function WalkthroughPage() {
  const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0); // Tracks sequential video index on current slide
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const currentSlide = slides[currentIdx] || DEFAULT_SLIDES[0];
  const currentVideoSrc = currentSlide.videoSrcs[currentVideoIdx] || currentSlide.videoSrcs[0];

  // Load custom slides text from localStorage if available (with structure safety checks)
  useEffect(() => {
    const saved = localStorage.getItem("puckbuddy_v2_slides_v3");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Slide[];
        // Ensure the parsed data has the correct structure (videoSrcs array)
        if (parsed.length === DEFAULT_SLIDES.length && parsed[0].videoSrcs) {
          setSlides(parsed);
        } else {
          localStorage.removeItem("puckbuddy_v2_slides_v3");
        }
      } catch (e) {
        console.error("Failed to parse saved slides", e);
      }
    }
  }, []);

  // Save slides text to localStorage
  const saveSlides = (newSlides: Slide[]) => {
    setSlides(newSlides);
    localStorage.setItem("puckbuddy_v2_slides_v3", JSON.stringify(newSlides));
  };

  // Handle slide or video changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentIdx, currentVideoIdx]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditing) return; // Don't trigger shortcuts if editing text

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          handleNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handlePrev();
          break;
        case " ":
          e.preventDefault();
          handlePlayPause();
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIdx, currentVideoIdx, isPlaying, isMuted, isEditing]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    setCurrentVideoIdx(0);
    setCurrentIdx((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentVideoIdx(0);
    setCurrentIdx((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleVideoEnded = () => {
    // If there is another video in the sequence for this slide, play it!
    if (currentVideoIdx < currentSlide.videoSrcs.length - 1) {
      setCurrentVideoIdx((prev) => prev + 1);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const startEditing = () => {
    setEditTitle(currentSlide.title);
    setEditDesc(currentSlide.description);
    setIsEditing(true);
  };

  const saveEdit = () => {
    const updated = slides.map((s, idx) =>
      idx === currentIdx ? { ...s, title: editTitle, description: editDesc } : s
    );
    saveSlides(updated);
    setIsEditing(false);
  };

  const resetToDefault = () => {
    if (confirm("Reset current slide text to default?")) {
      const updated = slides.map((s, idx) =>
        idx === currentIdx ? { ...s, title: DEFAULT_SLIDES[idx].title, description: DEFAULT_SLIDES[idx].description } : s
      );
      saveSlides(updated);
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070913] text-white font-sans flex flex-col justify-center overflow-hidden relative">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      {/* Main Slide Canvas */}
      <main className="w-full max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Slide Text & Info */}
        <div className="lg:col-span-6 space-y-8 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="edit-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur w-full max-w-xl"
              >
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Edit Slide Text</h3>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 block font-semibold">Slide Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition text-lg font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 block font-semibold">Slide Description</label>
                  <textarea
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    rows={4}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition text-sm leading-relaxed"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={saveEdit}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-full transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={resetToDefault}
                    className="bg-white/5 hover:bg-white/10 text-red-400 text-xs font-bold px-4 py-2 rounded-full transition border border-red-500/10 hover:border-red-500/20"
                  >
                    Reset Default
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold px-4 py-2 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Slide Counter & Edit Option */}
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider">
                    SLIDE {String(currentIdx + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                  </div>
                  <button
                    onClick={startEditing}
                    className="text-xs text-blue-400/60 hover:text-blue-400 transition flex items-center gap-1 font-semibold"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit Slide Text
                  </button>
                </div>

                {/* Slide Title */}
                <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
                  {currentSlide.title}
                </h2>

                {/* Slide Description */}
                <p className="text-lg text-gray-300 leading-relaxed font-medium max-w-xl">
                  {currentSlide.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4 pt-4">
            {/* Previous Slide Button */}
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition text-gray-300 hover:text-white font-semibold text-sm"
              title="Previous Slide"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            {/* Play / Pause Button */}
            <button
              onClick={handlePlayPause}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition text-white font-semibold text-sm shadow-lg shadow-blue-600/20"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" clipRule="evenodd" />
                  </svg>
                  Pause
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Play
                </>
              )}
            </button>

            {/* Next Slide Button */}
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition text-gray-300 hover:text-white font-semibold text-sm"
              title="Next Slide"
            >
              Next
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Column: Realistic iPhone 15 Pro Frame */}
        <div className="lg:col-span-6 flex justify-center items-center relative py-6">
          {/* Outer phone container with realistic drop shadow */}
          <div className="relative w-[340px] h-[690px] md:w-[360px] md:h-[730px] rounded-[3.2rem] md:rounded-[3.5rem] bg-black p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-[1.01]">
            
            {/* Inner phone bezel */}
            <div className="absolute inset-1.5 rounded-[2.8rem] md:rounded-[3.1rem] border-[4px] border-[#1d1d1f] pointer-events-none z-40" />
            
            {/* Screen Container */}
            <div className="relative w-full h-full rounded-[2.5rem] md:rounded-[2.8rem] overflow-hidden bg-[#0a0a0c] flex flex-col z-10">
              
              {/* Dynamic Island */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-6.5 bg-black rounded-full z-50 flex items-center justify-center pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-[#111] absolute right-4" />
              </div>

              {/* Video Container (Crops top 5.53% to hide original status bar) */}
              <div className="relative w-full h-full overflow-hidden">
                <video
                  ref={videoRef}
                  onEnded={handleVideoEnded}
                  autoPlay
                  muted
                  playsInline
                  className="absolute w-full h-[106%] object-cover"
                  style={{
                    top: "-5.6%", // Perfectly crops out the original 140px iOS status bar
                  }}
                >
                  <source src={currentVideoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Subtle Screen Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/3 to-white/10 pointer-events-none z-30" />
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/80 rounded-full z-40 pointer-events-none" />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
