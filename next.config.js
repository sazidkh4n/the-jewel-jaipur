/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['thejeweljaipur.com'],
    unoptimized: true
  },
  // Remove output: 'export' as it's not compatible with Clerk
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;