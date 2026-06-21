"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

const VIDEOS = [
  {
    src: "/scorecard header.mp4",
    alt: "Scorecard feature showcase",
    poster: "/v2-scorecard.png",
  },
  {
    src: "/coach header.mp4",
    alt: "Coach feedback feature showcase",
    poster: "/v2-coach-feedback.png",
  },
  {
    src: "/past header.mp4",
    alt: "Past shots history feature showcase",
    poster: "/journal1.5.png",
  },
  {
    src: "/chat header.mp4",
    alt: "AI chat feature showcase",
    poster: "/v2-chat.png",
  },
] as const;

export default function HeroVideoCarousel() {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goToIndex = useCallback((index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    goToIndex((currentIndex + 1) % VIDEOS.length);
  }, [currentIndex, goToIndex]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      goToNext();
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [currentIndex, goToNext, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const video = videoRef.current;
    if (!video) return;

    video.load();
    video.play().catch(() => {
      // Autoplay may be blocked
    });
  }, [currentIndex, shouldReduceMotion]);

  const current = VIDEOS[currentIndex];

  if (shouldReduceMotion) {
    return (
      <div className="relative aspect-[1170/2228] overflow-hidden rounded-[1.5rem] bg-gray-900">
        <Image
          src={current.poster}
          alt={current.alt}
          fill
          className="object-cover object-bottom"
          sizes="(min-width: 768px) 430px, 90vw"
          priority
        />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[1170/2228] overflow-hidden rounded-[1.5rem] bg-gray-900"
      aria-roledescription="carousel"
      aria-label="Puck Buddy app feature previews"
    >
      <video
        ref={videoRef}
        key={current.src}
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        style={{
          objectFit: "cover",
          objectPosition: "center bottom",
        }}
        autoPlay
        muted
        playsInline
        preload={currentIndex === 0 ? "auto" : "metadata"}
        poster={current.poster}
        aria-label={current.alt}
      >
        <source src={current.src} type="video/mp4" />
      </video>

      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        Showing {currentIndex + 1} of {VIDEOS.length}: {current.alt}
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {VIDEOS.map((video, index) => (
          <button
            key={video.src}
            type="button"
            onClick={() => goToIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-6 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Show ${video.alt}`}
            aria-current={index === currentIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
