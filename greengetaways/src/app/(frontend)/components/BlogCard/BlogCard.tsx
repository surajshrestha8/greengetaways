import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Blog, Media } from '@/payload-types'
import './BlogCard.css'

interface BlogCardProps {
  blog: Blog
}

export default function BlogCard({ blog }: BlogCardProps) {
  const featuredImage = blog.featuredImage as Media
  const imageUrl = featuredImage?.url || '/images/placeholder-blog.jpg'

  return (
    <article className="blog-card">
      <div className="blog-card-image">
        <Image
          src={imageUrl}
          alt={featuredImage?.alt || blog.title}
          width={400}
          height={250}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="blog-card-content">
        <h3 className="blog-card-title">{blog.title}</h3>
        <p className="blog-card-excerpt">{blog.excerpt}</p>

        <Link href={`/blog/${blog.slug}`} className="blog-card-link">
          Read More
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" fill="#d4a857" />
            <path d="M12 8l4 4-4 4M8 12h8" stroke="#1a2e1a" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
