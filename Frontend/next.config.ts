import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: projectRoot,
  },
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      {
        pathname: "/media/file",
      },
      {
        pathname: "/images/**",
        search: "",
      },
      {
        pathname: "/partners/**",
        search: "",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap"],
  },
};

export default nextConfig;
