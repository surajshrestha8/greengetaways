import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Hero from './components/Hero'
import TourCardSection from './components/TourCardSection'
import WhyChooseUs from './components/WhyChooseUs'
import CTASection from './components/CTASection'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: featuredTours } = await payload.find({
    collection: 'tours',
    where: {
      featured: { equals: true },
      status: { equals: 'active' },
    },
    limit: 6,
  })

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
