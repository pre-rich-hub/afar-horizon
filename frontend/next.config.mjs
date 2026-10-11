import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    loader: 'custom',
    loaderFile: './lib/config/image-loader.ts',
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600, 1920, 2560],
    imageSizes: [32, 48, 64, 96, 128, 192, 256],
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
      { source: '/blog/responsible-travel-in-the-omo', destination: '/blog/responsible-travel-in-afar', permanent: true },
    ]
  },
  async rewrites() {
    const apiBase = process.env.API_BASE_URL ?? 'http://localhost:5000'
    return [{ source: '/api/:path*', destination: `${apiBase}/api/:path*` }]
  },
}

export default withNextIntl(nextConfig)
