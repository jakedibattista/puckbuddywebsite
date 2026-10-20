"use client";
// Owns preview playback and end listeners for the lifetime of one rendered video.
// Detached previews stop even when an earlier autoplay request resolves after cleanup.
import { useEffect, type RefObject } from "react";

export function usePreviewPlayback(
  videoRef: RefObject<HTMLVideoElement | null>,
  enabled: boolean,
  sourceKey?: number,
  onEnded?: () => void,
  reload = false,
) {
  useEffect(() => {
    if (!enabled) return;
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;
    const handleEnded = () => {
      if (!cancelled) onEnded?.();
    };
    video.addEventListener("ended", handleEnded);
    if (reload) video.load();
    const play = async () => {
      try {
        await video.play();
        // StrictMode may already have restarted playback on this same element.
        if (cancelled && videoRef.current !== video) video.pause();
      } catch {
        // The poster remains visible when autoplay is blocked or interrupted.
      }
    };
    void play();
    return () => {
      cancelled = true;
      video.removeEventListener("ended", handleEnded);
      video.pause();
    };
  }, [videoRef, enabled, sourceKey, onEnded, reload]);
}
