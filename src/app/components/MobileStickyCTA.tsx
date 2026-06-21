"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  appStoreLinkProps,
  useAppStoreDestination,
  type AppStoreDestination,
} from "../hooks/useAppStoreUrl";

type MobileStickyCTAProps = {
  href?: string;
  label?: string;
  external?: boolean;
  scrollThreshold?: number;
};

export default function MobileStickyCTA({
  href,
  label = "Get the app",
  external,
  scrollThreshold = 600,
}: MobileStickyCTAProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const storeDestination = useAppStoreDestination();

  const destination: AppStoreDestination = href
    ? { href, external: external ?? !href.startsWith("/"), platform: "chooser" }
    : storeDestination;

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

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
              href={destination.href}
              {...appStoreLinkProps(destination)}
              className="flex items-center justify-center rounded-full bg-gray-900 px-4 py-2.5 transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <span className="text-sm font-semibold text-white">{label}</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
