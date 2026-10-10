/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/xsrr0wfh/image/upload/**',
      },
    ],
  },
  async redirects() {
    // Removed pages and old /tours addresses from before the expedition catalogue.
    return [
      { source: '/layover', destination: '/expeditions', permanent: true },
      { source: '/tours', destination: '/expeditions', permanent: true },
      { source: '/tours/danakil-expedition', destination: '/expeditions/danakil-deep', permanent: true },
      { source: '/tours/:slug', destination: '/expeditions', permanent: true },
    ]
  },
  async rewrites() {
    const apiBase = process.env.API_BASE_URL ?? 'http://localhost:5000'
    return [{ source: '/api/:path*', destination: `${apiBase}/api/:path*` }]
  },
}

export default nextConfig
