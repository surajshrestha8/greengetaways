import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Hero from './components/Hero'
import TourCardSection from './components/TourCardSection'
import WhyChooseUs from './components/WhyChooseUs'
import CTASection from './components/CTASection'
import TestimonialSection from './components/TestimonialSection'
import type { Tour, Testimonial } from '@/payload-types'

// Force dynamic rendering to avoid database queries at build time
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let featuredTours: Tour[] = []
  let featuredTestimonials: Testimonial[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const [toursResult, testimonialsResult] = await Promise.all([
      payload.find({
        collection: 'tours',
        where: {
          featured: { equals: true },
          status: { equals: 'active' },
        },
        limit: 6,
      }),
      payload.find({
        collection: 'testimonials',
        where: {
          and: [
            { featured: { equals: true } },
            { status: { equals: 'approved' } },
          ],
        },
        limit: 6,
        sort: '-createdAt',
      }),
    ])
    featuredTours = toursResult.docs
    featuredTestimonials = testimonialsResult.docs as Testimonial[]
  } catch (_error) {
    // Database not ready yet (first deployment) - continue with empty data
    console.log('Database not ready, continuing with empty data')
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
      <TestimonialSection testimonials={featuredTestimonials} />
      <CTASection />
    </>
  )
}
