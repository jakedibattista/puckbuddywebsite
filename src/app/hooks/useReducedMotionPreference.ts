"use client";
// Subscribes marketing animations and previews through complete modern or legacy media-query listener pairs.
// Missing observation support and server rendering keep content static; every registered listener has an owner cleanup.
import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
function observableQuery() {
  if (typeof window.matchMedia !== "function") return null;
  const media = window.matchMedia(query);
  if (typeof media.addEventListener === "function" && typeof media.removeEventListener === "function") {
    return { media, legacy: false };
  }
  if (typeof media.addListener === "function" && typeof media.removeListener === "function") {
    return { media, legacy: true };
  }
  return null;
}
function subscribe(listener: () => void) {
  const selected = observableQuery();
  if (!selected) return () => {};
  const { media, legacy } = selected;
  if (legacy) {
    media.addListener(listener);
    return () => media.removeListener(listener);
  }
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}
function snapshot() {
  const selected = observableQuery();
  return selected ? selected.media.matches : true;
}
const serverSnapshot = () => true;

export function useReducedMotionPreference() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
