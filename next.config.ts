import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.technodom.kz',
        port: '',
        pathname: '/_next/**',
      },
      {
        protocol: 'https',
        hostname: 'api.technodom.kz',
        port: '',
        pathname: '/f3/api/v1/images/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'https://www.market-next.shop/'],
    },
  },
  reactStrictMode: false,
};

export default nextConfig;
