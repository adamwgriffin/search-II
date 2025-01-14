import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'loremflickr.com'
      },
      {
        hostname: 'lh3.googleusercontent.com'
      },
      {
        hostname: 'avatars.githubusercontent.com'
      }
    ]
  }
};

export default nextConfig;
