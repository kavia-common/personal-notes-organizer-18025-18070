import type { NextConfig } from "next";

/**
 * Use default server output so dynamic/authenticated pages can render properly.
 * Static export can cause issues when pages depend on client-only state or redirects.
 */
const nextConfig: NextConfig = {
  // No explicit 'export' output
  reactStrictMode: true,
};

export default nextConfig;
