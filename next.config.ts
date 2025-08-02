import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        hostname: "ik.imagekit.io"
      },
      {
        hostname: "lh3.googleusercontent.com"
      },
      {
        hostname: "avatars.githubusercontent.com"
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: "/api/listing/search/:pathname*",
        destination: `${process.env.LISTING_SERVICE_HOSTNAME}/listing/search/:pathname*`
      }
    ];
  }
};

export default nextConfig;
