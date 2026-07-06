import type { Metadata } from "next";

const title = "About Buddy Tech — The Team Behind Puck Buddy";
const description =
  "Buddy Tech builds AI coaching tools for youth sports. Meet the team: an AI engineer, a 15-year pro hockey player, and a 20-year youth coach on a mission to make pro-level coaching accessible to every athlete.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
