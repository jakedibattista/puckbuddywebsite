import { APP_STORE_RATING } from "../lib/constants";

type RatingBadgeProps = {
  theme?: "dark" | "light";
  className?: string;
};

export default function RatingBadge({ theme = "dark", className = "" }: RatingBadgeProps) {
  const pill =
    theme === "dark"
      ? "border-white/12 bg-white/5 text-white/85"
      : "border-gray-200 bg-white text-gray-700 shadow-sm";
  const starColor = theme === "dark" ? "text-amber-300" : "text-amber-500";
  const mutedColor = theme === "dark" ? "text-white/55" : "text-gray-500";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold backdrop-blur sm:text-sm ${pill} ${className}`}
    >
      <span className={starColor} aria-hidden>
        ★★★★★
      </span>
      <span>{APP_STORE_RATING}</span>
      <span className={`font-medium ${mutedColor}`}>on the App Store</span>
    </span>
  );
}
