import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Hero from './components/Hero'
import TourCardSection from './components/TourCardSection'
import WhyChooseUs from './components/WhyChooseUs'
import CTASection from './components/CTASection'
import type { Tour } from '@/payload-types'

// Force dynamic rendering to avoid database queries at build time
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let featuredTours: Tour[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'tours',
      where: {
        featured: { equals: true },
        status: { equals: 'active' },
      },
      limit: 6,
    })
    featuredTours = result.docs
  } catch (_error) {
    // Database not ready yet (first deployment) - continue with empty data
    console.log('Database not ready, continuing with empty tours')
  }

  return (
    <>
      <Hero />
      <TourCardSection
        title="Featured Tours"
        subtitle="Discover our most popular eco-friendly adventures"
        tours={featuredTours}
      />
      <WhyChooseUs />
      <CTASection />
    </>
  )
}
