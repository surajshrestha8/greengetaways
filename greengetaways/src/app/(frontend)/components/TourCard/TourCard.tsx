import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Tour, Media, Destination } from '@/payload-types'
import './TourCard.css'

interface TourCardProps {
  tour: Tour
}

function getSupabaseImageUrl(media: Media | null | undefined, fallback: string): string {
  if (media?.filename && process.env.SUPABASE_PUBLIC_URL) {
    return `${process.env.SUPABASE_PUBLIC_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET_NAME}/${media.filename}`
  }
  return media?.url || fallback
}

export default function TourCard({ tour }: TourCardProps) {
  const featuredImage = tour.featuredImage as Media
  const imageUrl = getSupabaseImageUrl(featuredImage, '/placeholder-tour.jpg')
  const duration = tour.duration?.days || 0
  const price = tour.pricing?.basePrice || 0
  const discountedPrice = tour.pricing?.discountedPrice
  const currency = tour.pricing?.currency || 'USD'
  const destinations = tour.destination as Destination[]

  const formatPrice = (amount: number, curr: string) => {
    const symbol = curr === 'USD' ? '$' : curr
    return `${symbol}${amount.toLocaleString()}`
  }

  // Calculate discount percentage
  const discountPercentage = discountedPrice
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0

  // Priority badge system: Discount > Featured
  const showDiscountBadge = discountPercentage > 0
  const showFeaturedBadge = !showDiscountBadge && tour.featured

  // Get primary destination
  const primaryDestination = destinations && destinations.length > 0
    ? destinations[0].name
    : 'Destination'

  return (
    <article className="tour-card">
      {/* Image Section */}
      <div className="tour-card-image">
        <Image
          src={imageUrl}
          alt={featuredImage?.alt || tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />

        {/* Minimal Vignette Overlay */}
        <div className="tour-card-overlay" />

        {/* Priority Badge - Only show one: Discount OR Featured */}
        {showDiscountBadge && (
          <div className="tour-card-badge tour-card-badge-discount">
            {discountPercentage}% OFF
          </div>
        )}

        {showFeaturedBadge && (
          <div className="tour-card-badge tour-card-badge-featured">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Featured
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="tour-card-content">
        {/* Compact Meta Row: Destination • Duration */}
        <div className="tour-card-meta">
          <span className="tour-card-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {primaryDestination}
          </span>
          <span className="tour-card-meta-separator">•</span>
          <span className="tour-card-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {duration} Days
          </span>
        </div>

        {/* Prominent Title */}
        <h3 className="tour-card-title">
          <Link href={`/tours/${tour.slug}`}>
            {tour.title}
          </Link>
        </h3>

        {/* Bottom Row: Price & CTA */}
        <div className="tour-card-bottom">
          <div className="tour-card-pricing">
            {discountedPrice ? (
              <>
                <span className="tour-card-price-original">{formatPrice(price, currency)}</span>
                <span className="tour-card-price">{formatPrice(discountedPrice, currency)}</span>
              </>
            ) : (
              <span className="tour-card-price">{formatPrice(price, currency)}</span>
            )}
            <span className="tour-card-price-per">per person</span>
          </div>

          <Link href={`/tours/${tour.slug}`} className="tour-card-btn">
            View Tour
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
