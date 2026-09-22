import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // Photographs are pre-compressed WebP originals, with explicit responsive sizes.
  // Avoid a runtime image service dependency on the edge deployment.
  images: { unoptimized: true },
};
export default nextConfig;
