import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [{ source: "/", destination: "/id", permanent: false }];
  },
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
