import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import TourCardSection from '../components/TourCardSection'
import ToursFilterBar from './ToursFilterBar'
import type { Tour, Destination } from '@/payload-types'
import type { Where } from 'payload'
import './tours.css'
import Link from 'next/link'

// Force dynamic rendering to avoid database queries at build time
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Tours',
  description:
    'Explore our eco-friendly tours and sustainable travel packages. Discover breathtaking destinations while preserving nature.',
  openGraph: {
    title: 'Tours | Green Getaways',
    description:
      'Explore our eco-friendly tours and sustainable travel packages. Discover breathtaking destinations while preserving nature.',
    type: 'website' as const,
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Tours | Green Getaways',
    description:
      'Explore our eco-friendly tours and sustainable travel packages. Discover breathtaking destinations while preserving nature.',
  },
}

interface ToursPageProps {
  searchParams: Promise<{ q?: string; type?: string }>
}

export default async function ToursPage({ searchParams }: ToursPageProps) {
  const { q, type } = await searchParams
  const searchQuery = q?.trim() ?? ''
  const typeFilter = type?.trim() ?? ''

  let tours: Tour[] = []

  try {
    const payload = await getPayload({ config: configPromise })

    const where: Where = {
      status: { equals: 'active' },
      ...(typeFilter && { tourType: { contains: typeFilter } }),
    }

    const result = await payload.find({
      collection: 'tours',
      where,
      limit: 100,
      sort: '-createdAt',
      depth: 1,
    })
    tours = result.docs as Tour[]
  } catch (_error) {
    // Database not ready yet (first deployment) — continue with empty data
    console.log('Database not ready, continuing with empty tours')
  }

  // In-memory text filter
  if (searchQuery) {
    const sq = searchQuery.toLowerCase()
    tours = tours.filter((tour) => {
      if (tour.title?.toLowerCase().includes(sq)) return true
      if (tour.region?.toLowerCase().includes(sq)) return true
      if (
        Array.isArray(tour.destination) &&
        tour.destination.some(
          (d) => typeof d === 'object' && (d as Destination).name?.toLowerCase().includes(sq),
        )
      )
        return true
      return false
    })
  }

  const hasSearch = !!searchQuery || !!typeFilter

  return (
    <div className="tours-page">
      <section className="tours-hero">
        <div className="tours-hero-overlay"></div>
        <div className="tours-hero-content">
          {hasSearch ? (
            <>
              <h1 className="tours-hero-title">
                <span className="highlight">{tours.length}</span> Tours Found
              </h1>
              <p className="tours-hero-subtitle">
                Showing results for
                {searchQuery && (
                  <>
                    {' '}
                    &ldquo;<strong>{searchQuery}</strong>&rdquo;
                  </>
                )}
                {typeFilter && (
                  <>
                    {searchQuery ? ' · ' : ' '}
                    <strong>{typeFilter}</strong> tours
                  </>
                )}
              </p>
            </>
          ) : (
            <>
              <h1 className="tours-hero-title">
                Explore Our <span className="highlight">Eco Tours</span>
              </h1>
              <p className="tours-hero-subtitle">
                Discover sustainable adventures that connect you with nature while supporting local
                communities
              </p>
            </>
          )}
        </div>
      </section>

      <ToursFilterBar
        initialQuery={searchQuery}
        initialType={typeFilter}
        resultCount={tours.length}
      />

      {tours.length > 0 ? (
        <TourCardSection
          title={hasSearch ? undefined : 'All Tours'}
          subtitle={
            hasSearch ? undefined : 'Choose from our collection of sustainable travel experiences'
          }
          tours={tours}
        />
      ) : (
        <div className="tours-empty">
          <div className="tours-empty-icon">🔍</div>
          <h2 className="tours-empty-title">No tours found</h2>
          <p className="tours-empty-text">
            {hasSearch
              ? `We couldn't find any tours matching your search. Try different keywords or browse all tours.`
              : 'No tours available at the moment. Please check back soon!'}
          </p>
          {hasSearch && (
            <Link href="/tours" className="tours-empty-reset">
              View all tours
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
