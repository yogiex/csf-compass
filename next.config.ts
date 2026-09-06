import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: "/csf-compass",
  assetPrefix: "/csf-compass",
};

export default nextConfig;
