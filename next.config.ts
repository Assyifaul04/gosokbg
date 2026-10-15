import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "huggingface.co" },
      { protocol: "https", hostname: "cdn-lfs.huggingface.co" },
      { protocol: "https", hostname: "cdn-lfs-us-1.huggingface.co" },
    ],
  },
  serverExternalPackages: ["@huggingface/transformers"],
};

export default nextConfig;