import React from 'react'
import Link from 'next/link'
import './CTASection.css'

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">Ready for Your Next Adventure?</h2>
        <p className="cta-subtitle">
          Join thousands of travelers who have discovered sustainable adventures with us
        </p>
        <div className="cta-buttons">
          <Link href="/tours" className="cta-button-primary">
            Browse All Tours
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/contact" className="cta-button-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
