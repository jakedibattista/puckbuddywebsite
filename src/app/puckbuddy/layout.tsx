// Sets puckbuddy page metadata while leaving shared navigation to the root layout.
import type { Metadata } from "next";

const title = "Puck Buddy — AI Hockey Shot Analysis & Coaching App";
const description =
  "Film a hockey shot and get AI coaching feedback in about 60 seconds. Computer vision scores your mechanics, tracks progress, and coaches every rep. 4.7★ on the App Store. iOS & Android, plans from $6.67/mo.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
  alternates: { canonical: "/puckbuddy" },
};

export default function PuckBuddyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
