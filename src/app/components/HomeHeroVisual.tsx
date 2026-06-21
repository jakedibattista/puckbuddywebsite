"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const HERO_VIDEO = "/scorecard header.mp4";
const HERO_POSTER = "/v2-scorecard.png";

export default function HomeHeroVisual() {
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      // Autoplay may be blocked until user interaction
    });
  }, [shouldReduceMotion]);

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.65, delay: 0.22, ease: [0.21, 1.11, 0.81, 0.99] }}
      className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br from-blue-500/15 via-transparent to-emerald-400/15 blur-3xl"
      />
      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={shouldReduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_30px_90px_color-mix(in_srgb,var(--color-black)_45%,transparent)] backdrop-blur sm:rounded-[2.25rem] sm:p-4"
      >
        <div className="overflow-hidden rounded-[1.5rem] bg-gray-900">
          {shouldReduceMotion ? (
            <Image
              src={HERO_POSTER}
              alt="Puck Buddy scorecard showing AI shot analysis on a phone"
              width={440}
              height={952}
              className="h-auto w-full object-cover object-top"
              priority
              sizes="(min-width: 1024px) 400px, 80vw"
            />
          ) : (
            <video
              ref={videoRef}
              className="aspect-[1170/2228] h-auto w-full object-cover object-top"
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
              poster={HERO_POSTER}
              aria-label="Puck Buddy app scorecard preview"
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
          )}
        </div>
      </motion.div>
      <p className="mt-4 text-center text-xs text-white/45">
        Puck Buddy · AI shot analysis in ~1 min
      </p>
    </motion.div>
  );
}
