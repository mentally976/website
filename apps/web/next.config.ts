import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  images: {
    // Demo photos are hotlinked from Unsplash (Unsplash License). Swap for Supabase Storage later.
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com', pathname: '/photo-**' }],
    qualities: [70, 75, 85],
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
}

export default nextConfig
