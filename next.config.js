/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // Produces .next/standalone for the slim Docker runtime image (Dockerfile).
  output: 'standalone',
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
