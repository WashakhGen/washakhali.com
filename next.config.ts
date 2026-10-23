import type { NextConfig } from "next";

// Deployed on Vercel: every route is still prerendered at build time (see `next build` output).
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
