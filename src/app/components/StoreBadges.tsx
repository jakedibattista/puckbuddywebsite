"use client";

import Image from "next/image";
import { track } from "@vercel/analytics";
import { APP_STORE_URL, PLAY_STORE_URL } from "../hooks/useAppStoreUrl";

type StoreBadgesProps = {
  /** Where on the site the badges live, e.g. "home_hero". Used for analytics. */
  location: string;
  /** Match the section background so focus rings and borders read correctly. */
  theme?: "dark" | "light";
  className?: string;
  priority?: boolean;
};

export default function StoreBadges({
  location,
  theme = "dark",
  className = "",
  priority = false,
}: StoreBadgesProps) {
  const focusRing =
    theme === "dark"
      ? "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A12]"
      : "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";
  const playBorder = theme === "dark" ? "border-white/20" : "border-gray-200";

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 sm:flex-row ${className}`}
    >
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("store_badge_click", { store: "app_store", location })}
        className={`inline-flex h-[54px] w-[180px] items-center justify-center transition-transform hover:scale-105 sm:h-[60px] sm:w-[200px] ${focusRing}`}
      >
        <Image
          src="/app-store-badge.svg"
          alt="Download on the App Store"
          width={1200}
          height={402}
          className="h-full w-full object-contain"
          unoptimized
          priority={priority}
        />
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("store_badge_click", { store: "play_store", location })}
        className={`inline-flex h-[54px] w-[180px] items-center justify-center overflow-hidden rounded-[10px] border bg-black shadow-[0_6px_18px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 sm:h-[60px] sm:w-[200px] ${playBorder} ${focusRing}`}
      >
        <div className="flex items-center gap-2 px-3 sm:px-4">
          <svg className="h-7 w-7 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 2.6a1 1 0 0 1 1.5-.86l10.74 6.14L12.2 10.9 3 2.6Z" fill="#34A853" />
            <path d="M3 2.6v18.8a1 1 0 0 0 1.5.86l10.74-6.14-3.04-3.03L3 21.4Z" fill="#4285F4" />
            <path d="m21 10.82-3.77-2.15-3.67 3.66 3.67 3.66L21 13.84c1.33-.76 1.33-2.26 0-3.02Z" fill="#FBBC04" />
            <path d="m13.56 12.33-1.36 1.36 3.04 3.03 1.99-1.13-3.67-3.26Z" fill="#EA4335" />
          </svg>
          <div className="text-left leading-none text-white">
            <div className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/80 sm:text-[10px]">
              Get it on
            </div>
            <div className="mt-1 text-lg font-semibold sm:text-[20px]">Google Play</div>
          </div>
        </div>
      </a>
    </div>
  );
}
