import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return [{ source: "/", destination: "/id", permanent: false }];
  },
};

export default nextConfig;
