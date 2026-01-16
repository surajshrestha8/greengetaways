import React from 'react'
import Image from 'next/image'
import type { Testimonial, Media } from '@/payload-types'
import './TestimonialCard.css'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const customerPhoto = testimonial.customerPhoto as Media | null
  const photoUrl = customerPhoto?.url || '/images/default-avatar.jpg'

  return (
    <article className="testimonial-card">
      <div className="testimonial-card-content">
        <p className="testimonial-card-review">{testimonial.review}</p>
      </div>

      <div className="testimonial-card-author">
        <div className="testimonial-card-photo">
          <Image
            src={photoUrl}
            alt={testimonial.customerName}
            width={80}
            height={80}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="testimonial-card-info">
          <h4 className="testimonial-card-name">{testimonial.customerName}</h4>
          {testimonial.customerLocation && (
            <span className="testimonial-card-location">{testimonial.customerLocation}</span>
          )}
        </div>
      </div>
    </article>
  )
}
