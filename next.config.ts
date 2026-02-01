import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'medikost-cms.test',
      },
    ],
  },
};

export default nextConfig;
