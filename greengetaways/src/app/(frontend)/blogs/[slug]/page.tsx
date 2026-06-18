import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Blog, User, Media, Tour } from '@/payload-types'
import { formatDate, getImageUrl } from '../../lib/utils'
import { BLOG_CATEGORY_LABELS } from '../../lib/constants'
import TourCard from '../../components/TourCard'
import './blog-detail.css'

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'blog',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      limit: 1,
    })
    const blog = docs[0]
    if (!blog) return { title: 'Blog Not Found' }

    const title = blog.metaTitle || blog.title
    const description = blog.metaDescription || blog.excerpt || ''
    const imageUrl = getImageUrl(blog.featuredImage as Media | null)
    const ogImages = imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : []

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: ogImages,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
    }
  } catch {
    return { title: 'Blog' }
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params

  let blog: Blog | null = null
  let relatedBlogs: Blog[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'blog',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      limit: 1,
    })
    blog = (docs[0] as Blog) ?? null

    if (blog) {
      const { docs: related } = await payload.find({
        collection: 'blog',
        where: {
          and: [
            { slug: { not_equals: slug } },
            { status: { equals: 'published' } },
          ],
        },
        sort: '-publishedDate',
        limit: 3,
      })
      relatedBlogs = related as Blog[]
    }
  } catch {
    // DB not ready
  }

  if (!blog) notFound()

  const author = blog.author as User
  const authorName = author?.email || 'Green Getaways'
  const publishedDate = formatDate(blog.publishedDate)
  const featuredImage = blog.featuredImage as Media | null
  const featuredImageUrl = getImageUrl(featuredImage)
  const relatedTours = (blog.relatedTours ?? []).filter(
    (t): t is Tour => typeof t === 'object' && t.status === 'active',
  )

  return (
    <div className="blog-detail">
      {/* Hero */}
      <section className="blog-detail-hero">
        <div className="blog-detail-hero-inner">
          {/* Back link */}
          <Link href="/blogs" className="blog-detail-back-link blog-detail-back-top">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            All Blogs
          </Link>

          {/* Categories */}
          {blog.category && blog.category.length > 0 && (
            <div className="blog-detail-categories">
              {blog.category.map((cat) => (
                <span key={cat} className="blog-detail-category">
                  {BLOG_CATEGORY_LABELS[cat] || cat}
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

      {/* Featured Image */}
      {featuredImageUrl && (
        <section className="blog-detail-featured-image">
          <div className="blog-detail-featured-image-inner">
            <Image
              src={featuredImageUrl}
              alt={featuredImage?.alt || blog.title}
              width={1200}
              height={600}
              className="blog-detail-hero-img"
              priority
            />
          </div>
        </section>
      )}

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
                <span key={id} className="blog-detail-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Related Tours */}
          {relatedTours.length > 0 && (
            <div className="blog-detail-related-tours">
              <h3 className="blog-detail-related-title">Related Tours</h3>
              <div className="blog-detail-related-grid">
                {relatedTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
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

      {/* More Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="blog-detail-more">
          <div className="blog-detail-more-inner">
            <h2 className="blog-detail-more-title">More from Our Blog</h2>
            <div className="blog-detail-more-grid">
              {relatedBlogs.map((related) => {
                const relImg = getImageUrl(related.featuredImage as Media | null)
                return (
                  <Link
                    key={related.id}
                    href={`/blogs/${related.slug}`}
                    className="blog-more-card"
                  >
                    {relImg && (
                      <div className="blog-more-card-img">
                        <Image
                          src={relImg}
                          alt={related.title}
                          width={400}
                          height={220}
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                      </div>
                    )}
                    <div className="blog-more-card-body">
                      <h3 className="blog-more-card-title">{related.title}</h3>
                      <p className="blog-more-card-excerpt">{related.excerpt}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
