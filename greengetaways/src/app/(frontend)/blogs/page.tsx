import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Blog } from '@/payload-types'
import BlogSection from '../components/BlogSection'
import './blogs.css'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Blog - Green Getaways',
  description: 'Travel tips, destination guides, stories, and inspiration from the Green Getaways team.',
}

const MOCK_BLOGS: Blog[] = [
  {
    id: 1,
    title: '10 Essential Tips for Your First Trek in Nepal',
    slug: '10-essential-tips-first-trek-nepal',
    author: 1,
    category: ['travel-tips', 'adventure'],
    excerpt: 'Planning your first Himalayan trek? Here are expert tips to ensure a safe, enjoyable, and memorable adventure in the mountains of Nepal.',
    featuredImage: null as never,
    content: { root: { type: 'root', children: [], direction: 'ltr', format: '', indent: 0, version: 1 } },
    tags: [{ tag: 'trekking' }, { tag: 'nepal' }],
    readTime: 8,
    status: 'published',
    publishedDate: '2025-10-01T00:00:00.000Z',
    featured: true,
    updatedAt: '2025-10-01T00:00:00.000Z',
    createdAt: '2025-10-01T00:00:00.000Z',
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Everest Base Camp Trek',
    slug: 'ultimate-guide-everest-base-camp-trek',
    author: 1,
    category: ['destination-guides', 'adventure'],
    excerpt: "Everything you need to know about trekking to the base of the world's highest mountain, from preparation to daily itinerary.",
    featuredImage: null as never,
    content: { root: { type: 'root', children: [], direction: 'ltr', format: '', indent: 0, version: 1 } },
    tags: [{ tag: 'everest' }, { tag: 'trekking' }],
    readTime: 12,
    status: 'published',
    publishedDate: '2025-09-15T00:00:00.000Z',
    featured: true,
    updatedAt: '2025-09-15T00:00:00.000Z',
    createdAt: '2025-09-15T00:00:00.000Z',
  },
  {
    id: 3,
    title: 'Best Time to Visit Nepal: A Month-by-Month Guide',
    slug: 'best-time-to-visit-nepal',
    author: 1,
    category: ['travel-tips', 'destination-guides'],
    excerpt: "Nepal's diverse geography means different seasons suit different activities. Find out when to visit based on your interests.",
    featuredImage: null as never,
    content: { root: { type: 'root', children: [], direction: 'ltr', format: '', indent: 0, version: 1 } },
    tags: [{ tag: 'nepal' }, { tag: 'travel planning' }],
    readTime: 7,
    status: 'published',
    publishedDate: '2025-08-20T00:00:00.000Z',
    featured: true,
    updatedAt: '2025-08-20T00:00:00.000Z',
    createdAt: '2025-08-20T00:00:00.000Z',
  },
  {
    id: 4,
    title: 'Pokhara: Adventure Capital of Nepal',
    slug: 'pokhara-adventure-capital-nepal',
    author: 1,
    category: ['destination-guides', 'adventure'],
    excerpt: 'Discover why Pokhara is the perfect base for adventure activities, from paragliding to trekking, in this lakeside paradise.',
    featuredImage: null as never,
    content: { root: { type: 'root', children: [], direction: 'ltr', format: '', indent: 0, version: 1 } },
    tags: [{ tag: 'pokhara' }, { tag: 'adventure' }],
    readTime: 6,
    status: 'published',
    publishedDate: '2025-07-10T00:00:00.000Z',
    featured: false,
    updatedAt: '2025-07-10T00:00:00.000Z',
    createdAt: '2025-07-10T00:00:00.000Z',
  },
  {
    id: 5,
    title: "A Food Lover's Guide to Nepali Cuisine",
    slug: 'food-lovers-guide-nepali-cuisine',
    author: 1,
    category: ['food', 'culture'],
    excerpt: 'From dal bhat to momos, discover the delicious diversity of Nepal\'s culinary traditions.',
    featuredImage: null as never,
    content: { root: { type: 'root', children: [], direction: 'ltr', format: '', indent: 0, version: 1 } },
    tags: [{ tag: 'food' }, { tag: 'culture' }],
    readTime: 6,
    status: 'published',
    publishedDate: '2025-06-05T00:00:00.000Z',
    featured: false,
    updatedAt: '2025-06-05T00:00:00.000Z',
    createdAt: '2025-06-05T00:00:00.000Z',
  },
  {
    id: 6,
    title: 'Responsible Trekking: Leave No Trace in the Himalayas',
    slug: 'responsible-trekking-leave-no-trace',
    author: 1,
    category: ['travel-tips', 'adventure'],
    excerpt: 'How to minimize your environmental impact while trekking in Nepal and support sustainable mountain tourism.',
    featuredImage: null as never,
    content: { root: { type: 'root', children: [], direction: 'ltr', format: '', indent: 0, version: 1 } },
    tags: [{ tag: 'sustainability' }, { tag: 'eco-tourism' }],
    readTime: 6,
    status: 'published',
    publishedDate: '2025-05-18T00:00:00.000Z',
    featured: false,
    updatedAt: '2025-05-18T00:00:00.000Z',
    createdAt: '2025-05-18T00:00:00.000Z',
  },
]

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

  const displayBlogs = blogs.length > 0 ? blogs : MOCK_BLOGS

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

      <BlogSection blogs={displayBlogs} showHeader={false} showFooter={false} />
    </div>
  )
}
