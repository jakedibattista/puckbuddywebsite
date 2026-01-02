"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~600px (roughly past hero)
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={shouldReduceMotion ? { y: 0, opacity: 0 } : { y: 100, opacity: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          <div className="border-t border-black/10 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
            <a
              href="https://apps.apple.com/us/app/puck-buddy/id6752230304"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-xl bg-gray-900 px-4 py-2.5 transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <Image
                src="/app-store-badge.svg"
                alt="Download on the App Store"
                width={120}
                height={40}
                className="h-6 w-auto"
                unoptimized
              />
              <span className="text-sm font-semibold text-white">Get the app</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

