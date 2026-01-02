import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navigation from "./components/Navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Puck Buddy - Your AI Hockey Coach",
  description: "Get AI-powered video analysis to perfect your shot. Your personal AI shooting coach for hockey players of all levels.",
  // Used to resolve relative OpenGraph/Twitter URLs (set NEXT_PUBLIC_SITE_URL in Vercel).
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://buddyllc.app"),
  openGraph: {
    title: "Puck Buddy - Your AI Hockey Coach",
    description: "Get AI-powered video analysis to perfect your shot. Your personal AI shooting coach for hockey players of all levels.",
    images: [
      {
        url: "/og-image.jpeg",
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
    description: "Get AI-powered video analysis to perfect your shot. Your personal AI shooting coach for hockey players of all levels.",
    images: ["/og-image.jpeg"],
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
        <link rel="icon" href="/BlackLogo.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">{children}</main>
          <footer className="bg-gray-900 text-white p-4">
            <div className="container mx-auto text-center">
              <p>&copy; 2025 Buddy Tech LLC. All rights reserved.</p>
              <div className="flex justify-center items-center gap-4 mt-3 text-sm">
                <Link
                  href="https://www.facebook.com/profile.php?id=61584979140977"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  Facebook
                </Link>
                <Link
                  href="https://www.instagram.com/the_puck_buddy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.youtube.com/@PuckBuddyapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  YouTube
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mt-2 text-sm">
                <Link href="/terms" className="hover:text-gray-400">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="hover:text-gray-400">
                  Privacy Policy
                </Link>
                <Link href="/refund" className="hover:text-gray-400">
                  Return & Refund Policy
                </Link>
              </div>
            </div>
          </footer>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}