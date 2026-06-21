import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Event, Media, Tour } from '@/payload-types'
import { getImageUrl, formatPrice } from '../../lib/utils'
import './EventCard.css'

interface EventCardProps {
  event: Event
}

const EVENT_TYPE_COLORS: Record<string, string> = {
  festival: '#e86c3a',
  workshop: '#1c75bc',
  'trek-departure': '#009444',
  cultural: '#9b59b6',
  environmental: '#69bd45',
  community: '#d4a857',
  seasonal: '#ff6b81',
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  festival: 'Festival',
  workshop: 'Workshop',
  'trek-departure': 'Trek Departure',
  cultural: 'Cultural',
  environmental: 'Environmental',
  community: 'Community',
  seasonal: 'Seasonal',
}

export default function EventCard({ event }: EventCardProps) {
  const featuredImage = event.featuredImage as Media
  const imageUrl = getImageUrl(featuredImage, '/placeholder-tour.jpg')
  const relatedTour = event.relatedTour as Tour | null

  const startDate = new Date(event.startDate)
  const day = startDate.getDate()
  const monthAbbr = startDate.toLocaleString('en-US', { month: 'short' }).toUpperCase()

  const typeColor = EVENT_TYPE_COLORS[event.eventType] || '#69bd45'
  const typeLabel = EVENT_TYPE_LABELS[event.eventType] || event.eventType

  const isFree = event.pricing?.isFree
  const price = event.pricing?.price
  const currency = event.pricing?.currency || 'USD'

  const ctaHref = relatedTour
    ? `/tours/${relatedTour.slug}`
    : event.externalLink || null

  return (
    <article className="event-card">
      <div className="event-card-image">
        <Image
          src={imageUrl}
          alt={featuredImage?.alt || event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <div className="event-card-overlay" />

        <div className="event-card-date-badge">
          <span className="event-card-date-day">{day}</span>
          <span className="event-card-date-month">{monthAbbr}</span>
        </div>

        <div
          className="event-card-type-badge"
          style={{ backgroundColor: typeColor }}
        >
          {typeLabel}
        </div>
      </div>

      <div className="event-card-content">
        <h3 className="event-card-title">{event.title}</h3>

        <p className="event-card-description">{event.shortDescription}</p>

        <div className="event-card-meta">
          {event.location?.name && (
            <span className="event-card-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {event.location.name}
              {event.location.region && `, ${event.location.region}`}
            </span>
          )}

          {event.startTime && (
            <span className="event-card-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {event.startTime}
              {event.endTime && ` - ${event.endTime}`}
            </span>
          )}
        </div>

        <div className="event-card-bottom">
          <div className="event-card-pricing">
            {isFree ? (
              <span className="event-card-price event-card-price-free">Free</span>
            ) : price ? (
              <span className="event-card-price">{formatPrice(price, currency)}</span>
            ) : null}
          </div>

          {ctaHref && (
            <Link
              href={ctaHref}
              className="event-card-btn"
              {...(event.externalLink && !relatedTour ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {relatedTour ? 'View Tour' : 'Learn More'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
