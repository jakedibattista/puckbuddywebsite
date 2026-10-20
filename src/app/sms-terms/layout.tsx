// Gives the sms-terms page its canonical public URL without changing the shared shell.
import type { Metadata } from "next";
export const metadata: Metadata = { alternates: { canonical: "/sms-terms" } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
