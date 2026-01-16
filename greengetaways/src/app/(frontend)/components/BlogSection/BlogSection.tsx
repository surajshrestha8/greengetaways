import React from 'react'
import Link from 'next/link'
import BlogCard from '../BlogCard'
import type { Blog } from '@/payload-types'
import './BlogSection.css'

interface BlogSectionProps {
  blogs: Blog[]
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  if (!blogs || blogs.length === 0) {
    return null
  }

  return (
    <section className="blog-section">
      <div className="blog-section-container">
        <div className="blog-section-header">
          <h2 className="blog-section-title">Read Our Blogs</h2>
          <p className="blog-section-subtitle">
            Find your inspiration here. Stay informed, stay curious.
          </p>
        </div>

        <div className="blog-grid">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        <div className="blog-section-footer">
          <Link href="/blog" className="blog-explore-btn">
            Explore More
          </Link>
        </div>
      </div>
    </section>
  )
}
