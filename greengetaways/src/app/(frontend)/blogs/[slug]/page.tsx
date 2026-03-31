import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Blog, User } from '@/payload-types'
import './blog-detail.css'

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'blog',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const blog = docs[0]
    if (!blog) return { title: 'Blog Not Found - Green Getaways' }
    return {
      title: `${blog.metaTitle || blog.title} - Green Getaways`,
      description: blog.metaDescription || blog.excerpt,
    }
  } catch {
    return { title: 'Blog - Green Getaways' }
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  'travel-tips': 'Travel Tips',
  'destination-guides': 'Destination Guides',
  'travel-stories': 'Travel Stories',
  'travel-news': 'Travel News',
  'photography': 'Photography',
  'culture': 'Culture',
  'food': 'Food & Cuisine',
  'adventure': 'Adventure',
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params

  let blog: Blog | null = null

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'blog',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    blog = docs[0] as Blog
  } catch {
    // DB not ready
  }

  if (!blog) return notFound()

  const author = blog.author as User
  const authorName = author?.name || author?.email || 'Green Getaways'
  const publishedDate = blog.publishedDate
    ? new Date(blog.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <div className="blog-detail">
      {/* Hero */}
      <section className="blog-detail-hero">
        <div className="blog-detail-hero-inner">
          {/* Categories */}
          {blog.category && blog.category.length > 0 && (
            <div className="blog-detail-categories">
              {blog.category.map((cat) => (
                <span key={cat} className="blog-detail-category">
                  {CATEGORY_LABELS[cat] || cat}
                </span>
              ))}
            </div>
          )}

          <h1 className="blog-detail-title">{blog.title}</h1>
          <p className="blog-detail-excerpt">{blog.excerpt}</p>

          {/* Meta */}
          <div className="blog-detail-meta">
            {authorName && (
              <span className="blog-detail-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {authorName}
              </span>
            )}
            {publishedDate && (
              <span className="blog-detail-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {publishedDate}
              </span>
            )}
            {blog.readTime && (
              <span className="blog-detail-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {blog.readTime} min read
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="blog-detail-body">
        <div className="blog-detail-body-inner">
          <div className="blog-detail-content">
            <RichText data={blog.content} />
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="blog-detail-tags">
              {blog.tags.map(({ tag, id }) => (
                <span key={id} className="blog-detail-tag">#{tag}</span>
              ))}
            </div>
          )}

          {/* Back link */}
          <div className="blog-detail-back">
            <Link href="/blogs" className="blog-detail-back-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Blogs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
