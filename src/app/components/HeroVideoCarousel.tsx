"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const VIDEOS = [
  { src: "/scorecard header.mp4", alt: "Scorecard feature showcase" },
  { src: "/coach header.mp4", alt: "Coach feedback feature showcase" },
  { src: "/past header.mp4", alt: "Past shots history feature showcase" },
  { src: "/chat header.mp4", alt: "AI chat feature showcase" },
];

export default function HeroVideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % VIDEOS.length);
      setIsTransitioning(false);
    }, 300);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      goToNext();
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [currentIndex, goToNext]);

  // Reset video when index changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().catch(() => {
        // Autoplay may be blocked, that's okay
      });
    }
  }, [currentIndex]);

  return (
    <div className="relative aspect-[1170/2532] overflow-hidden rounded-[1.5rem] bg-gray-900">
      <video
        ref={videoRef}
        key={VIDEOS[currentIndex].src}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src={VIDEOS[currentIndex].src} type="video/mp4" />
      </video>
      
      {/* Video indicator dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {VIDEOS.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== currentIndex) {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsTransitioning(false);
                }, 300);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to video ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
