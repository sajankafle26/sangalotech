/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Allow builds to proceed even if ESLint reports errors (you should still run lint locally)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow the build to proceed even if there are type errors. Remove this when types are clean.
    ignoreBuildErrors: true,
  },
  // Standalone output is useful for some deployment environments like Vercel
  output: 'standalone',
};

module.exports = nextConfig;
