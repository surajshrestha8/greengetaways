import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Tour } from '@/payload-types'
import BookingForm from './BookingForm'
import type { TourData } from './BookingForm'
import './booking.css'

interface BookPageProps {
  searchParams: Promise<{ tour?: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ searchParams }: BookPageProps) {
  const { tour: tourSlug } = await searchParams
  if (!tourSlug) {
    return { title: 'Book a Tour - Green Getaways' }
  }
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'tours',
      where: { slug: { equals: tourSlug } },
      limit: 1,
    })
    const tour = docs[0] as Tour
    if (tour) {
      return { title: `Book ${tour.title} - Green Getaways` }
    }
  } catch {
    // ignore
  }
  return { title: 'Book a Tour - Green Getaways' }
}

export default async function BookPage({ searchParams }: BookPageProps) {
  const { tour: tourSlug } = await searchParams

  let tourData: TourData | null = null

  if (tourSlug) {
    try {
      const payload = await getPayload({ config: configPromise })
      const { docs } = await payload.find({
        collection: 'tours',
        where: { slug: { equals: tourSlug } },
        limit: 1,
      })
      const tour = docs[0] as Tour

      if (tour) {
        const today = new Date().toISOString().split('T')[0]

        tourData = {
          id: String(tour.id),
          title: tour.title,
          slug: tour.slug,
          price: tour.pricing?.discountedPrice || tour.pricing?.basePrice || 0,
          originalPrice: tour.pricing?.basePrice || 0,
          currency: tour.pricing?.currency || 'USD',
          duration: {
            days: tour.duration?.days || 0,
            nights: tour.duration?.nights || 0,
          },
          difficulty: tour.difficulty || null,
          maxGroupSize: tour.groupSize?.max || 20,
          departureDates: (tour.availability?.departureDates || [])
            .filter((d) => !!d.date && d.date >= today)
            .map((d) => ({
              date: d.date as string,
              availableSeats: d.availableSeats ?? 0,
            })),
        }
      }
    } catch {
      // DB error or tour not found — render without tour data
    }
  }

  return (
    <div className="booking-page">
      <div className="booking-page-header">
        <div className="booking-page-header-inner">
          {tourData ? (
            <Link href={`/tours/${tourData.slug}`} className="back-to-tour-link">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to {tourData.title}
            </Link>
          ) : (
            <Link href="/tours" className="back-to-tour-link">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Browse All Tours
            </Link>
          )}
          <h1 className="booking-page-title">Book Your Adventure</h1>
        </div>
      </div>

      <BookingForm tourData={tourData} />
    </div>
  )
}
