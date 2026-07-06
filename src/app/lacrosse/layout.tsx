import type { Metadata } from "next";

const title = "Lax Buddy & Scout — AI Lacrosse Coaching and Scouting Tools";
const description =
  "AI-powered lacrosse tools from Buddy Tech: Lax Buddy analyzes goalie mechanics and counts wall ball reps, Scout builds athlete profiles with AI scouting reports. Both free to try in beta.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
  alternates: { canonical: "/lacrosse" },
};

export default function LacrosseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
