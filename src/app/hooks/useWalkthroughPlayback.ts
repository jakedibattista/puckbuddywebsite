"use client";
// Owns walkthrough source loading and playback attempts without resetting pause/resume time.
// Retired attempts cannot publish failure into newer playback; detached media always pauses.
import { useEffect, type RefObject } from "react";

export function useWalkthroughPlayback(
  videoRef: RefObject<HTMLVideoElement | null>, source: string, playing: boolean,
  onBlocked: () => void,
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    return () => video.pause();
  }, [videoRef, source]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let active = true;
    if (!playing) video.pause();
    else {
      const play = async () => {
        try {
          await video.play();
          if (!active && videoRef.current !== video) video.pause();
        } catch {
          if (active) onBlocked();
        }
      };
      void play();
    }
    return () => { active = false; };
  }, [videoRef, source, playing, onBlocked]);
}
