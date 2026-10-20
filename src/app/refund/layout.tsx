// Gives the refund page its canonical public URL without changing the shared shell.
import type { Metadata } from "next";
export const metadata: Metadata = { alternates: { canonical: "/refund" } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
