import { getPayload } from "payload"
import configPromise from '@payload-config'
import BlogSection from "../components/BlogSection"
import type { Blog } from '@/payload-types'

// Force dynamic rendering to avoid database queries at build time
export const dynamic = 'force-dynamic'

const Blogs = async () => {
    let blogs: Blog[] = []

    try {
      const payload = await getPayload({ config: configPromise })
      const result = await payload.find({
        collection: 'blog',
        where: {
          featured: { equals: true },
          status: { equals: 'published' },
        },
        limit: 3,
      })
      blogs = result.docs
    } catch (_error) {
      // Database not ready yet (first deployment) - continue with empty data
      console.log('Database not ready, continuing with empty blogs')
    }

    return (
      <BlogSection blogs={blogs} />
    )
}

export default Blogs;