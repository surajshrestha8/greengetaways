import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SITE_URL } from '@/config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/tours`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/blogs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/book`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  try {
    const payload = await getPayload({ config: configPromise })

    const [toursResult, blogsResult] = await Promise.all([
      payload.find({
        collection: 'tours',
        where: { status: { equals: 'active' } },
        limit: 500,
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: 'blog',
        where: { status: { equals: 'published' } },
        limit: 500,
        select: { slug: true, updatedAt: true },
      }),
    ])

    const tourRoutes: MetadataRoute.Sitemap = toursResult.docs.map((tour) => ({
      url: `${SITE_URL}/tours/${tour.slug}`,
      lastModified: tour.updatedAt ? new Date(tour.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    const blogRoutes: MetadataRoute.Sitemap = blogsResult.docs.map((blog) => ({
      url: `${SITE_URL}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

    return [...staticRoutes, ...tourRoutes, ...blogRoutes]
  } catch {
    // DB not ready — return static routes only
    return staticRoutes
  }
}
