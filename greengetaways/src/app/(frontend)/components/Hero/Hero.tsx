'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import './Hero.css'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          Discover Sustainable
          <span className="highlight"> Adventures</span>
        </h1>
        <p className="hero-subtitle">
          Explore breathtaking destinations while making a positive impact on nature and local communities.
        </p>

        {/* Search Box */}
        <div className="hero-search">
          <div className="search-box">
            <div className="search-field">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <button className="search-btn">
              Search Tours
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Eco Tours</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Destinations</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Happy Travelers</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="hero-cta">
          <Link href="/tours" className="cta-primary">
            Explore Tours
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
