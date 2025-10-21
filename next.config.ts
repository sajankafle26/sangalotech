/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'broadwayinfosys.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'codeit.com.np',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'edurock-next.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'leadschool.in',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
