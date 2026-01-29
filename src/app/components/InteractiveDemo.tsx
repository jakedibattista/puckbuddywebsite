"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Screen = "home" | "select-coach" | "upload" | "scorecard" | "coach-report" | "stats" | "scoreboard" | "journal" | "chat" | "past-results";

interface Hotspot {
  id: string;
  screen: Screen;
  target: Screen;
  // Position as percentage of image dimensions
  top: number;
  left: number;
  width: number;
  height: number;
  label: string;
}

// Define clickable areas on each screen (percentages)
// New nav bar order: Home (0-20%), Stats (20-40%), Scoreboard (40-60%), Journal (60-80%), Profile (80-100%)
const hotspots: Hotspot[] = [
  // Home screen hotspots
  {
    id: "practice-mode",
    screen: "home",
    target: "select-coach",
    top: 50,
    left: 5,
    width: 90,
    height: 9,
    label: "Practice Mode",
  },
  {
    id: "talk-to-puck-buddy",
    screen: "home",
    target: "chat",
    top: 62,
    left: 5,
    width: 90,
    height: 9,
    label: "Talk to Puck Buddy",
  },
  {
    id: "training-history",
    screen: "home",
    target: "past-results",
    top: 74,
    left: 5,
    width: 90,
    height: 9,
    label: "Training History",
  },
  // Home bottom nav
  {
    id: "stats-tab-home",
    screen: "home",
    target: "stats",
    top: 92,
    left: 20,
    width: 20,
    height: 6,
    label: "Stats",
  },
  {
    id: "scoreboard-tab-home",
    screen: "home",
    target: "scoreboard",
    top: 92,
    left: 40,
    width: 20,
    height: 6,
    label: "Scoreboard",
  },
  {
    id: "journal-tab-home",
    screen: "home",
    target: "journal",
    top: 92,
    left: 60,
    width: 20,
    height: 6,
    label: "Journal",
  },
  // Chat screen
  {
    id: "back-from-chat",
    screen: "chat",
    target: "home",
    top: 5,
    left: 2,
    width: 22,
    height: 5,
    label: "Back to Home",
  },
  // Select Coach screen
  {
    id: "back-from-select-coach",
    screen: "select-coach",
    target: "home",
    top: 10,
    left: 2,
    width: 22,
    height: 5,
    label: "Back to Home",
  },
  {
    id: "continue-to-upload",
    screen: "select-coach",
    target: "upload",
    top: 83,
    left: 5,
    width: 90,
    height: 6,
    label: "Continue",
  },
  // Upload screen
  {
    id: "back-from-upload",
    screen: "upload",
    target: "home",
    top: 5,
    left: 2,
    width: 22,
    height: 5,
    label: "Back to Home",
  },
  {
    id: "analyze-snapshot",
    screen: "upload",
    target: "scorecard",
    top: 88,
    left: 38,
    width: 57,
    height: 6,
    label: "Analyze Snapshot",
  },
  // Scorecard screen
  {
    id: "back-from-scorecard",
    screen: "scorecard",
    target: "home",
    top: 5,
    left: 2,
    width: 22,
    height: 5,
    label: "Back to Home",
  },
  {
    id: "coach-feedback-tab",
    screen: "scorecard",
    target: "coach-report",
    top: 12,
    left: 50,
    width: 48,
    height: 5,
    label: "Coach's Feedback",
  },
  // Coach Report screen
  {
    id: "back-from-coach-report",
    screen: "coach-report",
    target: "home",
    top: 5,
    left: 2,
    width: 22,
    height: 5,
    label: "Back to Home",
  },
  {
    id: "scorecard-tab",
    screen: "coach-report",
    target: "scorecard",
    top: 12,
    left: 2,
    width: 48,
    height: 5,
    label: "ScoreCard",
  },
  // Stats screen hotspots (bottom nav)
  {
    id: "home-from-stats",
    screen: "stats",
    target: "home",
    top: 92,
    left: 0,
    width: 20,
    height: 6,
    label: "Home",
  },
  {
    id: "scoreboard-from-stats",
    screen: "stats",
    target: "scoreboard",
    top: 92,
    left: 40,
    width: 20,
    height: 6,
    label: "Scoreboard",
  },
  {
    id: "journal-from-stats",
    screen: "stats",
    target: "journal",
    top: 92,
    left: 60,
    width: 20,
    height: 6,
    label: "Journal",
  },
  // Scoreboard screen hotspots (bottom nav)
  {
    id: "home-from-scoreboard",
    screen: "scoreboard",
    target: "home",
    top: 92,
    left: 0,
    width: 20,
    height: 6,
    label: "Home",
  },
  {
    id: "stats-from-scoreboard",
    screen: "scoreboard",
    target: "stats",
    top: 92,
    left: 20,
    width: 20,
    height: 6,
    label: "Stats",
  },
  {
    id: "journal-from-scoreboard",
    screen: "scoreboard",
    target: "journal",
    top: 92,
    left: 60,
    width: 20,
    height: 6,
    label: "Journal",
  },
  // Journal screen hotspots (bottom nav)
  {
    id: "home-from-journal",
    screen: "journal",
    target: "home",
    top: 92,
    left: 0,
    width: 20,
    height: 6,
    label: "Home",
  },
  {
    id: "stats-from-journal",
    screen: "journal",
    target: "stats",
    top: 92,
    left: 20,
    width: 20,
    height: 6,
    label: "Stats",
  },
  {
    id: "scoreboard-from-journal",
    screen: "scoreboard",
    target: "scoreboard",
    top: 92,
    left: 40,
    width: 20,
    height: 6,
    label: "Scoreboard",
  },
  // Past Results screen
  {
    id: "back-from-past-results",
    screen: "past-results",
    target: "home",
    top: 3,
    left: 2,
    width: 22,
    height: 5,
    label: "Back to Home",
  },
];

const screens: Record<Screen, { src: string; title: string }> = {
  home: { src: "/home1.5.png", title: "Home" },
  "select-coach": { src: "/v2-select-coach.png", title: "Select Coach" },
  upload: { src: "/v2-upload.png", title: "Upload" },
  scorecard: { src: "/v2-scorecard.png", title: "ScoreCard" },
  "coach-report": { src: "/v2-coach-feedback.png", title: "Coach's Feedback" },
  stats: { src: "/stats1.5.png", title: "Stats" },
  scoreboard: { src: "/scoreboard1.5.png", title: "Scoreboard" },
  journal: { src: "/journal1.5.png", title: "Journal" },
  chat: { src: "/v2-chat.png", title: "Chat" },
  "past-results": { src: "/past results1.5.png", title: "Past Results" },
};

export default function InteractiveDemo() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [showHints, setShowHints] = useState(false);

  const activeHotspots = hotspots.filter((h) => h.screen === currentScreen);

  const handleNavigation = (target: Screen) => {
    setCurrentScreen(target);
  };

  // Flash hints briefly when user taps the screen (not on a hotspot)
  const handleScreenTap = () => {
    if (!showHints) {
      setShowHints(true);
      setTimeout(() => setShowHints(false), 1500);
    }
  };

  return (
    <div className="flex flex-col items-center">

      {/* Phone Frame Container */}
      <div className="relative w-full max-w-[320px] md:max-w-[375px]">
        {/* iPhone Frame - Hidden on very small screens */}
        <div className="hidden sm:block absolute inset-0 -m-3 md:-m-4 bg-gray-900 rounded-[3rem] md:rounded-[3.5rem] shadow-2xl pointer-events-none" />
        <div className="hidden sm:block absolute inset-0 -m-2 md:-m-3 bg-gray-800 rounded-[2.5rem] md:rounded-[3rem] pointer-events-none" />
        
        {/* Dynamic Island - Desktop only */}
        <div className="hidden md:block absolute top-1 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20 pointer-events-none" />

        {/* Screen Container */}
        <div 
          className="relative bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl aspect-[9/19.5] cursor-pointer"
          onClick={handleScreenTap}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {/* Screen Image */}
              <Image
                src={screens[currentScreen].src}
                alt={screens[currentScreen].title}
                fill
                className="object-cover object-top"
                priority
              />

              {/* Hotspots */}
              {activeHotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation(hotspot.target);
                  }}
                  className="absolute cursor-pointer"
                  style={{
                    top: `${hotspot.top}%`,
                    left: `${hotspot.left}%`,
                    width: `${hotspot.width}%`,
                    height: `${hotspot.height}%`,
                  }}
                  aria-label={`Navigate to ${hotspot.label}`}
                >
                  {/* Hotspot highlight - only visible when hints are shown */}
                  <AnimatePresence>
                    {showHints && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 rounded-lg bg-blue-500/30 border-2 border-blue-400 shadow-lg shadow-blue-500/20"
                      />
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Home Indicator */}
        <div className="hidden sm:block absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-800 rounded-full pointer-events-none" />
      </div>

      {/* Screen Navigation Pills - Mobile friendly */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {(Object.keys(screens) as Screen[]).map((screen) => (
          <button
            key={screen}
            onClick={() => setCurrentScreen(screen)}
            className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition-all duration-200 ${
              currentScreen === screen
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {screens[screen].title}
          </button>
        ))}
      </div>
    </div>
  );
}
