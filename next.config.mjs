/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Allow TypeScript errors during build for v0 projects
  },
  images: {
    unoptimized: true, // Use unoptimized images for v0 projects
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
  turbopack: {
    root: '/vercel/share/v0-project',
  },
  // Production optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Optional: Add output: 'standalone' for Docker deployments
  // output: 'standalone',
}

export default nextConfig
