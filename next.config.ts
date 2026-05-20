import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "d18-a.sdn.cz"
      },
      {
        protocol: "https",
        hostname: "marketaoktabcova.cz"
      }
    ]
  }
};

export default nextConfig;
