'use client'

import React, { useState } from 'react'

interface HighlightItem {
  highlight?: string | null
}

interface Props {
  highlights: HighlightItem[]
}

function getExperienceIcon(highlight: string): React.ReactNode {
  const h = highlight.toLowerCase()

  if (h.includes('hik') || h.includes('trek') || h.includes('walk')) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 16.5l3-3m0 0l3-3m-3 3l-3-3m3 3l3 3" />
        <circle cx="8" cy="4" r="2" />
        <path d="M12 22V10M4 22l4-10M8 10l-4-2M12 10l-4-6" />
      </svg>
    )
  }
  if (h.includes('food') || h.includes('cuisine') || h.includes('dining') || h.includes('meal')) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
      </svg>
    )
  }
  if (h.includes('wildlife') || h.includes('animal') || h.includes('safari') || h.includes('rhino') || h.includes('elephant')) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a4 4 0 014 4c0 1.5-.8 3-2 4l2 10H8l2-10c-1.2-1-2-2.5-2-4a4 4 0 014-4z" />
      </svg>
    )
  }
  if (h.includes('temple') || h.includes('cultur') || h.includes('histor') || h.includes('heritage') || h.includes('monastery')) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    )
  }
  if (h.includes('sunset') || h.includes('sunrise') || h.includes('view') || h.includes('scenic') || h.includes('panorama')) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 18a5 5 0 00-10 0" />
        <line x1="12" y1="9" x2="12" y2="2" />
        <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
        <line x1="1" y1="18" x2="3" y2="18" />
        <line x1="21" y1="18" x2="23" y2="18" />
        <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
        <line x1="23" y1="22" x2="1" y2="22" />
        <polyline points="8 6 12 2 16 6" />
      </svg>
    )
  }
  if (h.includes('beach') || h.includes('ocean') || h.includes('sea') || h.includes('lake') || h.includes('river')) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="5" r="3" />
        <path d="M12 22V8M5 12l7 3 7-3" />
      </svg>
    )
  }
  if (h.includes('mountain') || h.includes('peak') || h.includes('summit') || h.includes('base camp') || h.includes('altitude')) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
      </svg>
    )
  }
  if (h.includes('village') || h.includes('local') || h.includes('community') || h.includes('people')) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    )
  }
  // default
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function splitHighlight(text: string): { title: string; body: string } {
  const colonIndex = text.indexOf(':')
  if (colonIndex === -1) return { title: text.trim(), body: '' }
  return {
    title: text.slice(0, colonIndex).trim(),
    body: text.slice(colonIndex + 1).trim(),
  }
}

export default function TourHighlightsAccordion({ highlights }: Props) {
  const [openIndex, setOpenIndex] = useState<number>(0)

  const toggle = (index: number) => setOpenIndex((prev) => (prev === index ? -1 : index))

  return (
    <div className="tour-hl-accordion">
      {highlights.map((item, index) => {
        const raw = item.highlight || ''
        const { title, body } = splitHighlight(raw)
        const isOpen = openIndex === index

        return (
          <div key={index} className={`tour-hl-item${isOpen ? ' open' : ''}`}>
            <button
              className="tour-hl-header"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
            >
              <div className="tour-hl-icon">{getExperienceIcon(raw)}</div>
              <span className="tour-hl-title">{title}</span>
              {body && (
                <svg
                  className="tour-hl-chevron"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              )}
            </button>

            {body && (
              <div className="tour-hl-body">
                <div className="tour-hl-body-inner">
                  <p className="tour-hl-text">{body}</p>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
