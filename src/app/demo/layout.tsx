import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Puck Buddy Demo - Interactive Prototype",
  description: "Interactive demo of the Puck Buddy app for investors and stakeholders",
  robots: "noindex, nofollow", // Don't index this page in search engines
  openGraph: {
    title: "Puck Buddy Demo - Interactive Prototype",
    description: "Interactive demo of the Puck Buddy app for investors and stakeholders",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Puck Buddy - Interactive Demo",
      },
    ],
    type: "website",
    url: "https://buddyllc.app/demo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Puck Buddy Demo - Interactive Prototype",
    description: "Interactive demo of the Puck Buddy app for investors and stakeholders",
    images: ["/og-image.jpeg"],
  },
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

