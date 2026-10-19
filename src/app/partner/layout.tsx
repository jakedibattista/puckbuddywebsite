// Sets partner page metadata while leaving shared navigation to the root layout.
import type { Metadata } from "next";

const title = "Partner with Buddy Tech — Team Plans, White-Label Apps & Sports AI API";
const description =
  "Bring AI video coaching to your team, league, platform, or brand. Team promo codes, white-label coaching apps, and a REST API for video analysis — built on the engine behind Puck Buddy.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
  alternates: { canonical: "/partner" },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
