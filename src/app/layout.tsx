import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navigation from "./components/Navigation";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Puck Buddy - Your AI Hockey Coach",
  description: "Get AI-powered video analysis to perfect your shot and stride. Your personal AI hockey coach for players of all levels.",
  openGraph: {
    title: "Puck Buddy - Your AI Hockey Coach",
    description: "Get AI-powered video analysis to perfect your shot and stride. Your personal AI hockey coach for players of all levels.",
    images: [
      {
        url: "/coach-seth-on-ice.png",
        width: 1200,
        height: 630,
        alt: "Puck Buddy - Your AI Hockey Coach",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Puck Buddy - Your AI Hockey Coach",
    description: "Get AI-powered video analysis to perfect your shot and stride. Your personal AI hockey coach for players of all levels.",
    images: ["/coach-seth-on-ice.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">{children}</main>
          <footer className="bg-gray-900 text-white p-4">
            <div className="container mx-auto text-center">
              <p>&copy; 2025 Buddy Tech LLC. All rights reserved.</p>
              <div className="mt-3 space-y-2">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-sm">
                  <Link href="/terms" className="hover:text-gray-400">
                    Terms of Service
                  </Link>
                  <Link href="/privacy" className="hover:text-gray-400">
                    Privacy Policy
                  </Link>
                  <Link href="/refund" className="hover:text-gray-400">
                    Return & Refund Policy
                  </Link>
                  <Link href="/sms-terms" className="hover:text-gray-400">
                    SMS Terms & Conditions
                  </Link>
                </div>
                <div className="flex justify-center items-center gap-4 text-sm text-gray-300 mt-1">
                  <a
                    href="https://www.instagram.com/the_puck_buddy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-100"
                    aria-label="Puck Buddy on Instagram"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm9.5 1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61584979140977#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-100"
                    aria-label="Puck Buddy on Facebook"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M13 3h4a1 1 0 011 1v3a1 1 0 01-1 1h-3v12h-4V8H8V5a1 1 0 011-1h4z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@PuckBuddyapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-100"
                    aria-label="Puck Buddy on YouTube"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M10 9.5l4.5 2.5L10 14.5v-5z" />
                      <path d="M3 7.5c0-1.4.9-2.5 2.1-2.8C7 4.3 9.9 4 12 4s5 .3 6.9.7C20.1 5 21 6.1 21 7.5v9c0 1.4-.9 2.5-2.1 2.8-1.9.4-4.8.7-6.9.7s-5-.3-6.9-.7C3.9 19 3 17.9 3 16.5v-9z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}