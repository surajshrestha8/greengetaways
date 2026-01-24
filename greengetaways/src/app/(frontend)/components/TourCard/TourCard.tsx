import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Tour, Media, Destination } from '@/payload-types'
import './TourCard.css'

interface TourCardProps {
  tour: Tour
}

export default function TourCard({ tour }: TourCardProps) {
  const featuredImage = tour.featuredImage as Media
  const imageUrl = featuredImage?.url || '/placeholder-tour.jpg'
  const duration = tour.duration.days
  const nights = tour.duration.nights
  const price = tour.pricing.basePrice
  const discountedPrice = tour.pricing.discountedPrice
  const currency = tour.pricing.currency || 'USD'
  const destinations = tour.destination as Destination[]
  const tourTypes = tour.tourType || []
  const difficulty = tour.difficulty

  const formatPrice = (amount: number, curr: string) => {
    const symbol = curr === 'USD' ? '$' : curr
    return `${symbol}${amount.toLocaleString()}`
  }

  // Calculate discount percentage
  const discountPercentage = discountedPrice
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0

  // Tour type colors
  const tourTypeColors: Record<string, string> = {
    adventure: '#ff6b35',
    beach: '#00b4d8',
    cultural: '#9c27b0',
    wildlife: '#4caf50',
    city: '#607d8b',
    cruise: '#0077b6',
    honeymoon: '#e91e63',
    family: '#ff9800',
    luxury: '#ffd700',
    budget: '#8bc34a',
  }

  // Difficulty colors
  const difficultyColors: Record<string, string> = {
    easy: '#4caf50',
    moderate: '#ff9800',
    challenging: '#f44336',
    difficult: '#9c27b0',
  }

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

        {/* Image Overlay */}
        <div className="tour-card-overlay" />

        {/* Featured Badge */}
        {tour.featured && (
          <div className="tour-card-featured">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Featured
          </div>
        )}

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="tour-card-discount">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Tour Type Badge */}
        {tourTypes.length > 0 && (
          <div
            className="tour-card-type"
            style={{
              backgroundColor: tourTypeColors[tourTypes[0]] || '#4caf50',
            }}
          >
            {tourTypes[0].charAt(0).toUpperCase() + tourTypes[0].slice(1)}
          </div>
        )}

        {/* Duration Badge */}
        <div className="tour-card-duration-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {duration}D / {nights}N
        </div>
      </div>

      {/* Content Section */}
      <div className="tour-card-content">
        {/* Location */}
        {destinations && destinations.length > 0 && (
          <div className="tour-card-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{destinations.map((d) => d.name).join(', ')}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="tour-card-title">
          <Link href={`/tours/${tour.slug}`}>
            {tour.title}
          </Link>
        </h3>

        {/* Short Description */}
        {tour.shortDescription && (
          <p className="tour-card-description">
            {tour.shortDescription.length > 80
              ? tour.shortDescription.substring(0, 80) + '...'
              : tour.shortDescription
            }
          </p>
        )}

        {/* Tags Row */}
        <div className="tour-card-tags">
          {difficulty && (
            <span
              className="tour-card-difficulty"
              style={{
                color: difficultyColors[difficulty],
                borderColor: difficultyColors[difficulty],
              }}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          )}
          {tourTypes.slice(1, 3).map((type) => (
            <span key={type} className="tour-card-tag">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="tour-card-divider" />

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
