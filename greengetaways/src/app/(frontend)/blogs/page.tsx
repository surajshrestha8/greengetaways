import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Blog } from '@/payload-types'
import BlogSection from '../components/BlogSection'
import './blogs.css'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Blog',
  description: 'Travel tips, destination guides, stories, and inspiration from the Green Getaways team.',
  openGraph: {
    title: 'Blog | Green Getaways',
    description: 'Travel tips, destination guides, stories, and inspiration from the Green Getaways team.',
    type: 'website' as const,
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Blog | Green Getaways',
    description: 'Travel tips, destination guides, stories, and inspiration from the Green Getaways team.',
  },
}

export default async function BlogsPage() {
  let blogs: Blog[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'blog',
      where: { status: { equals: 'published' } },
      sort: '-publishedDate',
      limit: 50,
    })
    blogs = result.docs as Blog[]
  } catch (_error) {
    console.log('Could not fetch blogs')
  }

  return (
    <div className="blogs-page">
      <section className="blogs-hero">
        <div className="blogs-hero-inner">
          <h1 className="blogs-hero-title">Our Blog</h1>
          <p className="blogs-hero-subtitle">
            Travel tips, destination guides, and stories from the mountains of Nepal.
          </p>
        </div>
      </section>

      {blogs.length > 0 ? (
        <BlogSection blogs={blogs} showHeader={false} showFooter={false} />
      ) : (
        <section className="blogs-empty">
          <p className="blogs-empty-text">
            No blog posts yet. Check back soon for travel tips, stories, and guides!
          </p>
          <Link href="/tours" className="blogs-empty-link">
            Explore Our Tours
          </Link>
        </section>
      )}
    </div>
  )
}
