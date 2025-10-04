import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add experimental features for better performance
  experimental: {
    optimizePackageImports: ['@vercel/analytics', '@heroicons/react', '@headlessui/react'],
  },
};

export default nextConfig;
