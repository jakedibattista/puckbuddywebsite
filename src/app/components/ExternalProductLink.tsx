import type { ReactNode } from "react";

type ExternalProductLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  suffix?: string;
  suffixClassName?: string;
};

export default function ExternalProductLink({
  href,
  children,
  className = "",
  suffix = "Web app · Opens in new tab",
  suffixClassName = "text-gray-500",
}: ExternalProductLinkProps) {
  return (
    <span className="inline-flex flex-col items-start gap-1 sm:items-center">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <span className="inline-flex items-center gap-2">
          {children}
          <svg
            className="h-4 w-4 shrink-0 opacity-70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 3h6v6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 14 21 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>
      <span className={`text-xs ${suffixClassName}`}>{suffix}</span>
    </span>
  );
}
