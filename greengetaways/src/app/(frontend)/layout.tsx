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
  } catch (_error) {
    // Database not ready yet (first deployment) - continue with empty data
  }

  return (
    <html lang="en">
      <body>
        <Header tours={tours} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
