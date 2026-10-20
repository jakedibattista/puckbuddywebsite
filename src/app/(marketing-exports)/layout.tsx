// Keeps publicly routable artwork utilities out of search results without changing their URLs.
import type { Metadata } from "next";
export const metadata: Metadata = { robots: { index: false, follow: false }, alternates: { canonical: null } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
