import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      use: "null-loader", // Prevents Webpack from processing .node files
    });
    return config;
  },
  // ignoreBuildErrors: true,
};

export default nextConfig;
