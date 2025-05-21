/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@auraglyph/react'],
  webpack: (config) => {
    // Important: return the modified config
    return config;
  },
}

module.exports = nextConfig;