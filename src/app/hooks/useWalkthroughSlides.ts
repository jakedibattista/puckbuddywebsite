"use client";
// Owns browser-local walkthrough text and preserves drafts when storage is unavailable.
// The legacy cache shape stays readable; successful storage precedes adopting edited slides.
import { useEffect, useState } from "react";
import { DEFAULT_SLIDES, restoreWalkthroughSlides, type Slide } from "../lib/walkthroughSlides";

export const WALKTHROUGH_STORAGE_KEY = "puckbuddy_v2_slides_v3";

export function useWalkthroughSlides() {
  const [slides, setSlides] = useState<Slide[]>(() => DEFAULT_SLIDES.map(slide => ({ ...slide, videoSrcs: [...slide.videoSrcs] })));
  const [notice, setNotice] = useState<string | null>(null);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(WALKTHROUGH_STORAGE_KEY);
      if (!raw) return;
      const restored = restoreWalkthroughSlides(raw);
      setSlides(restored.slides);
      if (!restored.complete) setNotice("Some saved slide text could not be loaded. Available text is shown with defaults.");
    } catch {
      setNotice("Saved slide text could not be loaded. Defaults are shown.");
    }
  }, []);
  function saveSlides(next: Slide[]) {
    try {
      window.localStorage.setItem(WALKTHROUGH_STORAGE_KEY, JSON.stringify(next));
      setSlides(next);
      setNotice(null);
      return true;
    } catch {
      setNotice("Could not save slide text in this browser. Your draft is still open.");
      return false;
    }
  }
  return { slides, saveSlides, notice, clearNotice: () => setNotice(null) };
}
