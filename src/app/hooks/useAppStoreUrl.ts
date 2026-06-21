"use client";

import { useState } from "react";

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/puck-buddy/id6752230304";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.buddyllc.puckbuddyandroid&hl=en_US";
export const PUCKBUDDY_DOWNLOAD_PATH = "/puckbuddy";

export type AppStorePlatform = "ios" | "android" | "chooser";

export type AppStoreDestination = {
  href: string;
  external: boolean;
  platform: AppStorePlatform;
};

function isAndroidUserAgent(userAgent: string) {
  return /android/i.test(userAgent);
}

function isAppleMobileUserAgent(userAgent: string, maxTouchPoints = 0) {
  const ua = userAgent.toLowerCase();
  if (/iphone|ipod|ipad/i.test(ua)) return true;
  // iPadOS 13+ desktop UA reports as Mac; touch points distinguish it.
  return /mac os x|macintosh/i.test(ua) && maxTouchPoints > 1;
}

function isMacDesktopUserAgent(userAgent: string, maxTouchPoints = 0) {
  const ua = userAgent.toLowerCase();
  return /mac os x|macintosh/i.test(ua) && maxTouchPoints <= 1;
}

/** Resolve the best download destination from a user agent string. */
export function resolveAppStoreDestination(
  userAgent: string,
  maxTouchPoints = 0,
): AppStoreDestination {
  if (isAndroidUserAgent(userAgent)) {
    return { href: PLAY_STORE_URL, external: true, platform: "android" };
  }

  if (isAppleMobileUserAgent(userAgent, maxTouchPoints) || isMacDesktopUserAgent(userAgent, maxTouchPoints)) {
    return { href: APP_STORE_URL, external: true, platform: "ios" };
  }

  // Windows, Linux, ChromeOS, and other desktop browsers: show both store options.
  return { href: PUCKBUDDY_DOWNLOAD_PATH, external: false, platform: "chooser" };
}

function readDestination(): AppStoreDestination {
  if (typeof navigator === "undefined") {
    return { href: PUCKBUDDY_DOWNLOAD_PATH, external: false, platform: "chooser" };
  }

  return resolveAppStoreDestination(navigator.userAgent, navigator.maxTouchPoints ?? 0);
}

export function useAppStoreDestination() {
  const [destination] = useState(readDestination);
  return destination;
}

/** @deprecated Prefer useAppStoreDestination for href + external + platform. */
export function useAppStoreUrl() {
  return useAppStoreDestination().href;
}

export function appStoreLinkProps(destination: AppStoreDestination) {
  return destination.external
    ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
    : {};
}

export function appStoreAriaLabel(destination: AppStoreDestination, context: string) {
  if (destination.platform === "android") {
    return `Open Puck Buddy on Google Play (${context})`;
  }
  if (destination.platform === "ios") {
    return `Open Puck Buddy on the App Store (${context})`;
  }
  return `View Puck Buddy download options (${context})`;
}
