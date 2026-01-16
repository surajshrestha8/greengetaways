import React from 'react'
import TourCard from '../TourCard'
import type { Tour } from '@/payload-types'
import './TourCardSection.css'

interface TourCardSectionProps {
  title?: string
  subtitle?: string
  tours: Tour[]
}

export default function TourCardSection({ title, subtitle, tours }: TourCardSectionProps) {
  if (!tours || tours.length === 0) {
    return null
  }

  return (
    <section className="tour-card-section">
      <div className="tour-card-section-container">
        {(title || subtitle) && (
          <div className="tour-card-section-header">
            {title && <h2 className="tour-card-section-title">{title}</h2>}
            {subtitle && <p className="tour-card-section-subtitle">{subtitle}</p>}
          </div>
        )}

        <div className="tour-card-grid">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  )
}
