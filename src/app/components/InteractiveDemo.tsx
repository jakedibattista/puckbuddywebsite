"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import homeImg from "@/assets/app-screens/v2-home.png";
import selectCoachImg from "@/assets/app-screens/v2-select-coach.png";
import uploadImg from "@/assets/app-screens/v2-upload.png";
import scorecardImg from "@/assets/app-screens/v2-scorecard.png";
import coachReportImg from "@/assets/app-screens/v2-coach-feedback.png";
import statsImg from "@/assets/app-screens/v2-stats.png";
import journalImg from "@/assets/app-screens/v2-journal.png";
import chatImg from "@/assets/app-screens/v2-chat.png";

type Screen = "home" | "select-coach" | "upload" | "scorecard" | "coach-report" | "stats" | "journal" | "chat";

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
    id: "stats-tab",
    screen: "home",
    target: "stats",
    top: 92,
    left: 20,
    width: 18,
    height: 6,
    label: "Stats",
  },
  {
    id: "journal-tab",
    screen: "home",
    target: "journal",
    top: 92,
    left: 42,
    width: 18,
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
    top: 7,
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
    top: 9,
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
    top: 9,
    left: 2,
    width: 48,
    height: 5,
    label: "ScoreCard",
  },
  // Stats screen hotspots
  {
    id: "home-from-stats",
    screen: "stats",
    target: "home",
    top: 92,
    left: 2,
    width: 18,
    height: 6,
    label: "Home",
  },
  {
    id: "journal-from-stats",
    screen: "stats",
    target: "journal",
    top: 92,
    left: 42,
    width: 18,
    height: 6,
    label: "Journal",
  },
  // Journal screen hotspots
  {
    id: "home-from-journal",
    screen: "journal",
    target: "home",
    top: 92,
    left: 2,
    width: 18,
    height: 6,
    label: "Home",
  },
  {
    id: "stats-from-journal",
    screen: "journal",
    target: "stats",
    top: 92,
    left: 20,
    width: 18,
    height: 6,
    label: "Stats",
  },
];

const screens: Record<Screen, { src: any; title: string }> = {
  home: { src: homeImg, title: "Home" },
  "select-coach": { src: selectCoachImg, title: "Select Coach" },
  upload: { src: uploadImg, title: "Upload" },
  scorecard: { src: scorecardImg, title: "ScoreCard" },
  "coach-report": { src: coachReportImg, title: "Coach's Feedback" },
  stats: { src: statsImg, title: "Stats" },
  journal: { src: journalImg, title: "Journal" },
  chat: { src: chatImg, title: "Chat" },
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
                unoptimized
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
