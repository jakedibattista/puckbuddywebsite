// Gives the privacy page its canonical public URL without changing the shared shell.
import type { Metadata } from "next";
export const metadata: Metadata = { alternates: { canonical: "/privacy" } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
