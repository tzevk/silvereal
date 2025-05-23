import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEON_DATABASE_URL: process.env.NEON_DATABASE_URL,
  },
  // Enable server-side environment variables
  serverRuntimeConfig: {
    NEON_DATABASE_URL: process.env.NEON_DATABASE_URL,
  },
  // Enable both client and server-side environment variables
  publicRuntimeConfig: {
    // Empty for now as we don't need to expose any env vars to the client
  },
};

export default nextConfig;
