"use client";
// Renders screenshot-demo navigation and hints using the separate asset/hotspot catalog.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { demoHotspots, demoScreens, type DemoScreen } from "../lib/interactiveDemoCatalog";

export default function InteractiveDemo() {
  const [currentScreen, setCurrentScreen] = useState<DemoScreen>("home");
  const [showHints, setShowHints] = useState(false);

  const activeHotspots = demoHotspots.filter((h) => h.screen === currentScreen);

  const handleNavigation = (target: DemoScreen) => {
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
      <div className="relative w-full max-w-[280px] md:max-w-[320px]">
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
                src={demoScreens[currentScreen].src}
                alt={demoScreens[currentScreen].title}
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
        {(Object.keys(demoScreens) as DemoScreen[]).map((screen) => (
          <button
            key={screen}
            onClick={() => setCurrentScreen(screen)}
            className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition-all duration-200 ${
              currentScreen === screen
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {demoScreens[screen].title}
          </button>
        ))}
      </div>
    </div>
  );
}
