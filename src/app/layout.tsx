import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Puckbuddy - Coming Soon",
  description: "A New Way to Learn Hockey. Because everybody deserves a Puckbuddy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">
                Puckbuddy
              </Link>
            </div>
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="bg-gray-900 text-white p-4">
            <div className="container mx-auto text-center">
              <p>&copy; 2025 Buddy LLC. All rights reserved.</p>
              <div className="flex justify-center space-x-4 mt-2">
                <Link href="/terms" className="hover:text-gray-400">
                  Terms of Service
                </Link>
                <Link href="/refund" className="hover:text-gray-400">
                  Return & Refund Policy
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}