// Gives the v2-walkthrough page its canonical public URL without changing the shared shell.
import type { Metadata } from "next";
export const metadata: Metadata = { alternates: { canonical: "/v2-walkthrough" } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
