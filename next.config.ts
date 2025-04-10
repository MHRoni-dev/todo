// import type { NextConfig } from "next";
import path from 'path';
import nextPwa from 'next-pwa';

const withPWA = nextPwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false,
})

const nextConfig = withPWA({
  /* config options here */
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias || {}),
        '@': path.resolve(process.cwd()),
      },
    };
    return config;
  }
});

export default nextConfig;
