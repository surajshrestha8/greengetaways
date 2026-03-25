'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export type BookingRow = {
  id: string
  arrivalDay: string
  arrivalDate: string
  departureDay: string
  departureDate: string
  availability: string
  isPrivateOnly?: boolean
  priceUSD: number
  currency: string
  bookingUrl: string
}

export type MonthGroup = {
  month: string
  rows: BookingRow[]
}

type BookingTableProps = {
  groups: MonthGroup[]
}

const fmt = (price: number, currency: string) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price)

export function BookingTable({ groups }: BookingTableProps) {
  const router = useRouter()

  return (
    <div className="bt-wrapper">
      {/* Header */}
      <div className="bt-header">
        <div className="bt-col bt-col--dates">
          <span className="bt-header-title">Dates</span>
          <span className="bt-header-sub">Arrival - Departure</span>
        </div>
        <div className="bt-col bt-col--avail">
          <span className="bt-header-title">Availability</span>
          <span className="bt-header-sub">Spaces</span>
        </div>
        <div className="bt-col bt-col--price">
          <span className="bt-header-title">Price</span>
          <span className="bt-header-sub">Per Person (Twin share basis)</span>
        </div>
        <div className="bt-col bt-col--action" />
      </div>

      {/* Month groups */}
      {groups.map((group) => (
        <div key={group.month} className="bt-group">
          <div className="bt-month-header">{group.month}</div>

          {group.rows.map((row, i) => (
            <div key={row.id} className={`bt-row${i % 2 === 1 ? ' bt-row--alt' : ''}`}>
              {/* Dates */}
              <div className="bt-col bt-col--dates">
                <div className="bt-date-pair">
                  <div className="bt-date-block">
                    <span className="bt-day">{row.arrivalDay}</span>
                    <span className="bt-date">{row.arrivalDate}</span>
                  </div>
                  <span className="bt-arrow">→</span>
                  <div className="bt-date-block">
                    <span className="bt-day">{row.departureDay}</span>
                    <span className="bt-date">{row.departureDate}</span>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="bt-col bt-col--avail">
                <span className={row.isPrivateOnly ? 'bt-avail bt-avail--private' : 'bt-avail'}>
                  {row.availability}
                </span>
              </div>

              {/* Price */}
              <div className="bt-col bt-col--price">
                <span className="bt-price">{fmt(row.priceUSD, row.currency)}</span>
              </div>

              {/* CTA */}
              <div className="bt-col bt-col--action">
                <button className="bt-book-btn" onClick={() => router.push(row.bookingUrl)}>
                  BOOK NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
