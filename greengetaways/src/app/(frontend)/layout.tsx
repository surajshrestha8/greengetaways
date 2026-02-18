import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Header from './components/Header'
import Footer from './components/Footer'
import './styles.css'

export const metadata = {
  description: 'Green Getaways - Travel for Sustainability. Discover eco-friendly tours and adventures.',
  title: 'Green Getaways - Travel for Sustainability',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  let tours: import('@/payload-types').Tour[] = []
  let logoUrl: string | null = null

  try {
    const payload = await getPayload({ config: configPromise })

    // Fetch active tours for the header dropdown
    const result = await payload.find({
      collection: 'tours',
      where: {
        status: { equals: 'active' },
      },
      limit: 10,
      sort: '-featured,-createdAt',
    })
    tours = result.docs

    // Fetch main logo from Media collection
    const logoResult = await payload.find({
      collection: 'media',
      where: { filename: { contains: 'main-logo' } },
      limit: 1,
    })
    const logo = logoResult.docs[0]
    if (logo?.filename && process.env.SUPABASE_PUBLIC_URL) {
      logoUrl = `${process.env.SUPABASE_PUBLIC_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET_NAME}/${logo.filename}`
    } else if (logo?.url) {
      logoUrl = logo.url
    }
  } catch (_error) {
    // Database not ready yet (first deployment) - continue with empty data
  }

  return (
    <html lang="en">
      <body>
        <Header tours={tours} logoUrl={logoUrl} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
