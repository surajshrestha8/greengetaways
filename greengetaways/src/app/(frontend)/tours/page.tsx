import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import TourCardSection from '../components/TourCardSection'
import './tours.css'

export const metadata = {
  title: 'Tours - Green Getaways',
  description: 'Explore our eco-friendly tours and sustainable travel packages. Discover breathtaking destinations while preserving nature.',
}

export default async function ToursPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: tours } = await payload.find({
    collection: 'tours',
    where: {
      status: { equals: 'active' },
    },
    limit: 50,
    sort: '-createdAt',
  })

  return (
    <div className="tours-page">
      <section className="tours-hero">
        <div className="tours-hero-overlay"></div>
        <div className="tours-hero-content">
          <h1 className="tours-hero-title">
            Explore Our <span className="highlight">Eco Tours</span>
          </h1>
          <p className="tours-hero-subtitle">
            Discover sustainable adventures that connect you with nature while supporting local communities
          </p>
        </div>
      </section>

      <TourCardSection
        title="All Tours"
        subtitle="Choose from our collection of sustainable travel experiences"
        tours={tours}
      />

      {tours.length === 0 && (
        <div className="tours-empty">
          <p>No tours available at the moment. Please check back soon!</p>
        </div>
      )}
    </div>
  )
}
