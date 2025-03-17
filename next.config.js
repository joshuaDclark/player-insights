/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable type checking during production builds
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during production builds (optional)
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 