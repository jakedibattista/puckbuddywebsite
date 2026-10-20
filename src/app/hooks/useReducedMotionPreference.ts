"use client";
// Subscribes marketing animations and previews to live accessibility preferences.
// Server rendering starts with static content so hydration never starts an unwanted video.
import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
function subscribe(listener: () => void) {
  if (typeof window.matchMedia !== "function") return () => {};
  const media = window.matchMedia(query);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}
function snapshot() {
  return typeof window.matchMedia !== "function" || window.matchMedia(query).matches;
}
const serverSnapshot = () => true;

export function useReducedMotionPreference() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
