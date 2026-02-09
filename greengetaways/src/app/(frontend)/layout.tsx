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

  const payload = await getPayload({ config: configPromise })

  // Fetch active tours for the header dropdown
  const { docs: tours } = await payload.find({
    collection: 'tours',
    where: {
      status: { equals: 'active' },
    },
    limit: 10,
    sort: '-featured,-createdAt',
  })

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
