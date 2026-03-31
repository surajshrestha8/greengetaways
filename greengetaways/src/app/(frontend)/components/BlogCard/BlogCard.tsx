import React from 'react'
import Link from 'next/link'
import type { Blog } from '@/payload-types'
import './BlogCard.css'

interface BlogCardProps {
  blog: Blog
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="blog-card">
      <div className="blog-card-content">
        <h3 className="blog-card-title">{blog.title}</h3>
        <p className="blog-card-excerpt">{blog.excerpt}</p>

        <Link href={`/blogs/${blog.slug}`} className="blog-card-link">
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
