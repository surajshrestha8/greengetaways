import { getPayload } from "payload"
import configPromise from '@payload-config'
import BlogSection from "../components/BlogSection"

const Blogs = async () => {
    const payload = await getPayload({ config: configPromise })
    const { docs: blogs } = await payload.find({
        collection: 'blog',
        where: {
          featured: { equals: true },
          status: { equals: 'published' },
        },
        limit: 3,
      })

      return (
        <BlogSection blogs={blogs} />
      )
}

export default Blogs;