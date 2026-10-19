// Sets the repository build root and allowed remote image host for Next.js.
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tools.applemediaservices.com',
      },
    ],
  },
};

export default nextConfig;
