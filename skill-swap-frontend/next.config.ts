import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com', // Add your Cloudinary domain here
      // Add any other external image domains if you use them
    ],
  },
};

export default nextConfig;
