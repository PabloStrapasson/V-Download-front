import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_BASE_URL: 'http://localhost:3500/download/',
  },
};

export default nextConfig;
