'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import './Hero.css'

const NEPAL_DESTINATIONS = [
  { name: 'Everest Base Camp', region: 'Khumbu', emoji: '🏔️' },
  { name: 'Annapurna Circuit', region: 'Annapurna', emoji: '🌄' },
  { name: 'Langtang Valley', region: 'Langtang', emoji: '🏞️' },
  { name: 'Manaslu Circuit', region: 'Manaslu', emoji: '⛰️' },
  { name: 'Pokhara', region: 'Gandaki', emoji: '🏙️' },
  { name: 'Chitwan National Park', region: 'Terai', emoji: '🦏' },
  { name: 'Poon Hill', region: 'Annapurna', emoji: '🌅' },
  { name: 'Upper Mustang', region: 'Mustang', emoji: '🏜️' },
  { name: 'Kathmandu Valley', region: 'Bagmati', emoji: '🛕' },
  { name: 'Rara Lake', region: 'Karnali', emoji: '💧' },
]

const QUICK_FILTERS = [
  { label: '🥾 Adventure', value: 'adventure' },
  { label: '🛕 Cultural', value: 'cultural' },
  { label: '🦁 Wildlife', value: 'wildlife' },
  { label: '💎 Luxury', value: 'luxury' },
]

export default function Hero() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams()
    if (searchQuery.trim()) params.set('q', searchQuery.trim())
    if (activeFilter) params.set('type', activeFilter)
    router.push(`/tours${params.toString() ? `?${params.toString()}` : ''}`)
  }, [searchQuery, activeFilter, router])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false)
      handleSearch()
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (name: string) => {
    setSearchQuery(name)
    setShowSuggestions(false)
    const params = new URLSearchParams()
    params.set('q', name)
    if (activeFilter) params.set('type', activeFilter)
    router.push(`/tours?${params.toString()}`)
  }

  const handleFilterChip = (value: string) => {
    const next = activeFilter === value ? null : value
    setActiveFilter(next)
    const params = new URLSearchParams()
    if (searchQuery.trim()) params.set('q', searchQuery.trim())
    if (next) params.set('type', next)
    if (params.toString()) {
      router.push(`/tours?${params.toString()}`)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const q = searchQuery.toLowerCase()
  const filteredSuggestions =
    searchQuery.length > 0
      ? NEPAL_DESTINATIONS.filter(
          (d) => d.name.toLowerCase().includes(q) || d.region.toLowerCase().includes(q),
        )
      : NEPAL_DESTINATIONS

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Sustainable Travel in Nepal
        </div>

        <h1 className="hero-title">
          Discover Sustainable
          <span className="highlight"> Adventures</span>
        </h1>
        <p className="hero-subtitle">
          Explore breathtaking destinations while making a positive impact on nature and local
          communities.
        </p>

        {/* Search Box */}
        <div className="hero-search" ref={searchRef}>
          <div className={`search-box${showSuggestions && filteredSuggestions.length > 0 ? ' suggestions-open' : ''}`}>
            <div className="search-field">
              <svg
                className="search-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                className="search-input"
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() => {
                    setSearchQuery('')
                    setShowSuggestions(true)
                  }}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
            <button className="search-btn" onClick={handleSearch}>
              Search Tours
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="search-suggestions">
              <div className="suggestions-label">
                {searchQuery ? 'Matching destinations' : 'Popular in Nepal'}
              </div>
              {filteredSuggestions.map((dest) => (
                <button
                  key={dest.name}
                  className="suggestion-item"
                  onMouseDown={() => handleSuggestionClick(dest.name)}
                >
                  <span className="suggestion-emoji">{dest.emoji}</span>
                  <span className="suggestion-text">
                    <span className="suggestion-name">{dest.name}</span>
                    <span className="suggestion-region">{dest.region}</span>
                  </span>
                  <svg
                    className="suggestion-arrow"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Filter Chips */}
        <div className="hero-filter-chips">
          {QUICK_FILTERS.map((f) => (
            <button
              key={f.value}
              className={`filter-chip${activeFilter === f.value ? ' active' : ''}`}
              onClick={() => handleFilterChip(f.value)}
            >
              {f.label}
            </button>
          ))}
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
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
