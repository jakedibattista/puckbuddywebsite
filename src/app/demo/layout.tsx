import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Puck Buddy Demo - Interactive Prototype",
  description: "Interactive demo of the Puck Buddy app for investors and stakeholders",
  robots: "noindex, nofollow", // Don't index this page in search engines
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}

