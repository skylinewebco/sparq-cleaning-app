/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages (served from sparq.skylinewebx.com).
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    // Local assets are already high quality; allow modern formats for on-demand optimisation.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920, 2560],
  },
  // Ship smaller client bundles for these icon/animation libs.
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
