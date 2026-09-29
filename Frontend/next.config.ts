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
    maximumResponseBody: 50 * 1024 * 1024,
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
    serverActions: {
      bodySizeLimit: "50mb",
    },
    proxyClientMaxBodySize: "50mb",
  },
};

export default nextConfig;
