/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Changed to false for production - fix TypeScript errors before deploying
  },
  images: {
    unoptimized: false, // Enable Next.js Image Optimization for production
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
