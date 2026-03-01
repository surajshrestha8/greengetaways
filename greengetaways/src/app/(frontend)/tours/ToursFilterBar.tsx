'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface ToursFilterBarProps {
  initialQuery: string
  initialType: string
  resultCount: number
}

const TYPE_CHIPS = [
  { label: 'All', value: '' },
  { label: '🥾 Adventure', value: 'adventure' },
  { label: '🛕 Cultural', value: 'cultural' },
  { label: '🦁 Wildlife', value: 'wildlife' },
  { label: '💎 Luxury', value: 'luxury' },
  { label: '👨‍👩‍👧 Family', value: 'family' },
  { label: '🏙️ City', value: 'city' },
]

export default function ToursFilterBar({
  initialQuery,
  initialType,
  resultCount,
}: ToursFilterBarProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState(initialQuery)
  const [activeType, setActiveType] = useState(initialType)

  const applyFilters = (q: string, t: string) => {
    const params = new URLSearchParams()
    if (q.trim()) params.set('q', q.trim())
    if (t) params.set('type', t)
    startTransition(() => {
      router.push(`/tours${params.toString() ? `?${params.toString()}` : ''}`)
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') applyFilters(query, activeType)
  }

  const handleTypeChip = (value: string) => {
    setActiveType(value)
    applyFilters(query, value)
  }

  const hasFilters = initialQuery || initialType

  return (
    <div className={`tours-filter-bar${isPending ? ' loading' : ''}`}>
      <div className="tours-filter-bar-inner">
        {/* Search field */}
        <div className="tours-filter-search-field">
          <svg
            className="tours-filter-search-icon"
            width="18"
            height="18"
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
            className="tours-filter-input"
            placeholder="Search tours, destinations…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button
              className="tours-filter-clear"
              onClick={() => {
                setQuery('')
                applyFilters('', activeType)
              }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Search button */}
        <button className="tours-filter-btn" onClick={() => applyFilters(query, activeType)}>
          Search
        </button>
      </div>

      {/* Type chips */}
      <div className="tours-type-chips">
        {TYPE_CHIPS.map((chip) => (
          <button
            key={chip.value}
            className={`tours-type-chip${activeType === chip.value ? ' active' : ''}`}
            onClick={() => handleTypeChip(chip.value)}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Result meta row */}
      {hasFilters && (
        <div className="tours-filter-meta">
          <span>
            <span className="tours-filter-count">{resultCount}</span>{' '}
            {resultCount === 1 ? 'tour' : 'tours'} found
            {initialQuery && (
              <>
                {' '}
                for <strong>&ldquo;{initialQuery}&rdquo;</strong>
              </>
            )}
            {initialType && (
              <>
                {' '}
                in <strong>{initialType}</strong>
              </>
            )}
          </span>
          <Link href="/tours" className="tours-filter-clear-all">
            Clear all filters
          </Link>
        </div>
      )}
    </div>
  )
}
