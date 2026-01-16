import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Tour, Media } from '@/payload-types'
import './TourCard.css'

interface TourCardProps {
  tour: Tour
}

export default function TourCard({ tour }: TourCardProps) {
  const featuredImage = tour.featuredImage as Media
  const imageUrl = featuredImage?.url || '/placeholder-tour.jpg'
  const duration = tour.duration.days
  const price = tour.pricing.basePrice
  const currency = tour.pricing.currency || 'USD'

  const formatPrice = (amount: number, curr: string) => {
    const symbol = curr === 'USD' ? '$' : curr
    return `${symbol} ${amount.toLocaleString()}`
  }

  return (
    <article className="tour-card">
      <div className="tour-card-image">
        <Image
          src={imageUrl}
          alt={featuredImage?.alt || tour.title}
          width={400}
          height={300}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="tour-card-content">
        <h3 className="tour-card-title">{tour.title}</h3>

        <div className="tour-card-details">
          <span className="tour-card-duration">{duration} Days</span>
          <span className="tour-card-price">{formatPrice(price, currency)}</span>
        </div>

        <Link href={`/tours/${tour.slug}`} className="tour-card-btn">
          Book Now
        </Link>
      </div>
    </article>
  )
}
