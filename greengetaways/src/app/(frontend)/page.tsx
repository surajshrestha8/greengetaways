import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Hero from './components/Hero'
import TourCardSection from './components/TourCardSection'
import WhyChooseUs from './components/WhyChooseUs'
import TestimonialSection from './components/TestimonialSection'
import BlogSection from './components/BlogSection'

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

  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    where: {
      featured: { equals: true },
      status: { equals: 'approved' },
    },
    limit: 3,
  })

  const { docs: blogs } = await payload.find({
    collection: 'blog',
    where: {
      featured: { equals: true },
      status: { equals: 'published' },
    },
    limit: 3,
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
      <TestimonialSection testimonials={testimonials} />
      <BlogSection blogs={blogs} />
    </>
  )
}
