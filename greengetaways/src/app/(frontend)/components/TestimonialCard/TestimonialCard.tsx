import React from 'react'
import Image from 'next/image'
import type { Testimonial, Media } from '@/payload-types'
import './TestimonialCard.css'

interface TestimonialCardProps {
  testimonial: Testimonial
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
}

function formatTravelDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const customerPhoto = testimonial.customerPhoto as Media | null
  const photoUrl = customerPhoto?.url || null

  return (
    <article className="testimonial-card">
      {/* Quote mark */}
      <div className="testimonial-card-quote">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M9.33 20C7.49 20 6 18.51 6 16.67V12c0-3.31 2.69-6 6-6v2.67c-1.84 0-3.33 1.49-3.33 3.33H12c1.84 0 3.33 1.49 3.33 3.33V20H9.33zM22.67 20c-1.84 0-3.34-1.49-3.34-3.33V12c0-3.31 2.69-6 6-6v2.67c-1.84 0-3.33 1.49-3.33 3.33H25.33c1.84 0 3.34 1.49 3.34 3.33V20h-6z"
            fill="#69bd45"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Stars */}
      {testimonial.rating && (
        <div className="testimonial-card-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill={star <= testimonial.rating! ? '#ffc107' : 'none'}
              stroke="#ffc107"
              strokeWidth="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
      )}

      {/* Title */}
      {testimonial.title && (
        <h4 className="testimonial-card-title">{testimonial.title}</h4>
      )}

      {/* Review text */}
      <p className="testimonial-card-review">{testimonial.review}</p>

      {/* Divider */}
      <div className="testimonial-card-divider" />

      {/* Author */}
      <div className="testimonial-card-author">
        <div className="testimonial-card-photo">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={testimonial.customerName}
              width={48}
              height={48}
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div className="testimonial-card-initials">
              {getInitials(testimonial.customerName)}
            </div>
          )}
        </div>
        <div className="testimonial-card-info">
          <span className="testimonial-card-name">{testimonial.customerName}</span>
          {testimonial.customerLocation && (
            <span className="testimonial-card-location">{testimonial.customerLocation}</span>
          )}
          {testimonial.travelDate && (
            <span className="testimonial-card-date">
              Travelled {formatTravelDate(testimonial.travelDate)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
