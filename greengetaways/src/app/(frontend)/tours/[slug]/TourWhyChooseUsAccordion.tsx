'use client'

import React, { useState } from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export default function TourWhyChooseUsAccordion({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="tour-why-accordion">
      <div className={`tour-why-item${isOpen ? ' open' : ''}`}>
        <button
          className="tour-why-header"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
        >
          <div className="tour-why-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <span className="tour-why-title">Why Choose Us?</span>
          <svg
            className="tour-why-chevron"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <div className="tour-why-body">
          <div className="tour-why-body-inner">
            <div className="tour-why-richtext">
              <RichText data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
