import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_BASE_URL: 'https://v-download-api-production.up.railway.app/download/',
  },
};

export default nextConfig;
