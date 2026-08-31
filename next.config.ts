import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [{ source: "/", destination: "/id", permanent: false }];
  },
};

export default nextConfig;
