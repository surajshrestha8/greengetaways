import React from 'react'
import TestimonialCard from '../TestimonialCard'
import type { Testimonial } from '@/payload-types'
import './TestimonialSection.css'

interface TestimonialSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section className="testimonial-section">
      <div className="testimonial-section-container">
        <div className="testimonial-section-header">
          <h2 className="testimonial-section-title">What Our Customers Say</h2>
          <p className="testimonial-section-subtitle">
            Discover the feedbacks from our past customers!
          </p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
