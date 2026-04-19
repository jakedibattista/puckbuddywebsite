"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type NavLink = {
  id: string;
  label: string;
  href: string;
  badge?: string;
  submenu?: { href: string; label: string }[];
};

const navLinks: NavLink[] = [
  {
    id: "puck-buddy",
    label: "Puck Buddy",
    href: "/puckbuddy",
    submenu: [
      { href: "/puckbuddy#clinics", label: "Clinics" },
      { href: "/puckbuddy#pricing", label: "Pricing" },
    ],
  },
  { id: "lax-buddy", label: "Lax Buddy", href: "/lacrosse", badge: "New" },
  { id: "partner", label: "Partner with Us", href: "/partner" },
  { id: "about-us", label: "About Us", href: "/about" },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100/50 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/90 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo and Company Name - Left Side */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            <Image src="/pngtilted.png?v=3" alt="Buddy Tech Logo" width={40} height={40} className="w-10 h-10 flex-shrink-0" priority />
            <span>Buddy Tech</span>
          </Link>

          {/* Desktop Navigation - Right Side */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) =>
              link.submenu ? (
                <div key={link.id} className="group relative">
                  <div className="flex cursor-default items-center gap-1.5">
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                    <span className="text-[10px] leading-none text-gray-400 transition-colors group-hover:text-gray-600" aria-hidden>
                      ▼
                    </span>
                  </div>
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" aria-hidden />
                  <div
                    className="absolute left-0 top-full z-[60] min-w-[11rem] pt-2 opacity-0 invisible transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                    role="menu"
                    aria-label={`${link.label} sections`}
                  >
                    <div className="rounded-xl border border-gray-100 bg-white py-1 shadow-lg ring-1 ring-black/5">
                      {link.submenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          className="block px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.id}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  {link.badge && (
                    <span
                      className={`ml-2 text-xs px-2 py-0.5 rounded-full font-semibold ${link.badge === "New" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              ),
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-200 overflow-hidden"
            >
              <div className="flex flex-col space-y-1 py-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors px-3 py-3 rounded-xl hover:bg-gray-100 block"
                    >
                      {link.label}
                      {link.badge && (
                        <span
                          className={`ml-2 text-xs px-2 py-0.5 rounded-full font-semibold ${link.badge === "New" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                        >
                          {link.badge}
                        </span>
                      )}
                    </Link>
                    {link.submenu?.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 pl-8 pr-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
