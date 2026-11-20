import type { MetadataRoute } from 'next'

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

/** Only the public pages. Courses and lessons sit behind sign-in under /dashboard, so they are not listed. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/therapists', '/login', '/signup'].map((path) => ({ url: `${SITE}${path}` }))
}
