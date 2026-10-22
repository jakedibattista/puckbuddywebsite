"use client";
// Composes walkthrough controls with guarded browser text persistence and source-bound playback.

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEFAULT_SLIDES } from "../lib/walkthroughSlides";
import { useWalkthroughSlides } from "../hooks/useWalkthroughSlides";
import { useWalkthroughPlayback } from "../hooks/useWalkthroughPlayback";

export default function WalkthroughPage() {
  const { slides, saveSlides, notice, clearNotice } = useWalkthroughSlides();
  const [fullscreenNotice, setFullscreenNotice] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0); // Tracks sequential video index on current slide
  const [isPlaying, setIsPlaying] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const currentSlide = slides[currentIdx];
  const currentVideoSrc = currentSlide.videoSrcs[currentVideoIdx];

  const handlePlayPause = useCallback(() => setIsPlaying(playing => !playing), []);
  const handleNext = useCallback(() => {
    setCurrentVideoIdx(0);
    setCurrentIdx(previous => (previous + 1) % slides.length);
  }, [slides.length]);
  const handlePrev = useCallback(() => {
    setCurrentVideoIdx(0);
    setCurrentIdx(previous => (previous - 1 + slides.length) % slides.length);
  }, [slides.length]);
  const toggleFullscreen = useCallback(async () => {
    const target = document.fullscreenElement ? document : document.documentElement;
    const toggle = document.fullscreenElement ? document.exitFullscreen : document.documentElement.requestFullscreen;
    if (typeof toggle !== "function") {
      setFullscreenNotice("Fullscreen is unavailable in this browser.");
      return;
    }
    try {
      await toggle.call(target);
      setFullscreenNotice(null);
    } catch {
      setFullscreenNotice("Fullscreen could not change. You can keep using the walkthrough.");
    }
  }, []);

  const onPlaybackBlocked = useCallback(() => setIsPlaying(false), []);
  useWalkthroughPlayback(videoRef, currentVideoSrc, isPlaying, onPlaybackBlocked);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditing || e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target instanceof Element && e.target.closest("input, textarea, select, button, a, [contenteditable]:not([contenteditable='false'])")) return;

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
          void toggleFullscreen();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEditing, handleNext, handlePrev, handlePlayPause, toggleFullscreen]);

  const handleVideoEnded = () => {
    // If there is another video in the sequence for this slide, play it!
    if (currentVideoIdx < currentSlide.videoSrcs.length - 1) {
      setCurrentVideoIdx(previous => previous === currentVideoIdx ? previous + 1 : previous);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const startEditing = () => {
    clearNotice();
    setEditTitle(currentSlide.title);
    setEditDesc(currentSlide.description);
    setIsEditing(true);
  };

  const saveEdit = () => {
    const updated = slides.map((s, idx) =>
      idx === currentIdx ? { ...s, title: editTitle, description: editDesc } : s
    );
    if (saveSlides(updated)) setIsEditing(false);
  };

  const resetToDefault = () => {
    if (confirm("Reset current slide text to default?")) {
      const updated = slides.map((s, idx) =>
        idx === currentIdx ? { ...s, title: DEFAULT_SLIDES[idx].title, description: DEFAULT_SLIDES[idx].description } : s
      );
      if (saveSlides(updated)) setIsEditing(false);
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
          {notice && <p role="alert" className="text-sm text-amber-200">{notice}</p>}
          {fullscreenNotice && <p role="status" className="text-sm text-gray-300">{fullscreenNotice}</p>}
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
                  <label htmlFor="slide-title" className="text-xs text-gray-400 block font-semibold">Slide Title</label>
                  <input
                    id="slide-title"
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition text-lg font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="slide-description" className="text-xs text-gray-400 block font-semibold">Slide Description</label>
                  <textarea
                    id="slide-description"
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
                    onClick={() => { setIsEditing(false); clearNotice(); }}
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
                  key={currentVideoSrc}
                  ref={videoRef}
                  onEnded={handleVideoEnded}
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
