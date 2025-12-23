import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
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
              <div className="flex justify-center mb-4">
                <Image
                  src="/logo.svg"
                  alt="Puck Buddy Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
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
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
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
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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