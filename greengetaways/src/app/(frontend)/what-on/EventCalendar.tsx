'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Event, Media, Tour } from '@/payload-types'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const EVENT_TYPE_COLORS: Record<string, string> = {
  festival: '#e86c3a',
  workshop: '#1c75bc',
  'trek-departure': '#009444',
  cultural: '#9b59b6',
  environmental: '#69bd45',
  community: '#d4a857',
  seasonal: '#ff6b81',
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  festival: 'Festival',
  workshop: 'Workshop',
  'trek-departure': 'Trek Departure',
  cultural: 'Cultural',
  environmental: 'Environmental',
  community: 'Community',
  seasonal: 'Seasonal',
}

interface EventCalendarProps {
  events: Event[]
  currentYear: number
}

function getImageUrl(media: Media | number | null | undefined, fallback = ''): string {
  if (!media || typeof media === 'number') return fallback
  if (media.filename && typeof window === 'undefined') return fallback
  return media.url || fallback
}

export default function EventCalendar({ events, currentYear }: EventCalendarProps) {
  const now = new Date()
  const initialMonth = now.getFullYear() === currentYear ? now.getMonth() : 0
  const [activeMonth, setActiveMonth] = useState(initialMonth)
  const [activeDate, setActiveDate] = useState<string | null>(null)
  const [popoverPos, setPopoverPos] = useState<'bottom' | 'top'>('bottom')
  const [popoverTop, setPopoverTop] = useState<number | undefined>(undefined)
  const calendarRef = useRef<HTMLDivElement>(null)
  const activeCellRef = useRef<HTMLButtonElement>(null)

  const eventsByDate = new Map<string, Event[]>()
  for (const event of events) {
    const dateKey = event.startDate.slice(0, 10)
    if (!eventsByDate.has(dateKey)) {
      eventsByDate.set(dateKey, [])
    }
    eventsByDate.get(dateKey)!.push(event)
  }

  const firstDay = new Date(currentYear, activeMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, activeMonth + 1, 0).getDate()

  const calendarDays: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) calendarDays.push(null)
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d)

  const today = new Date()
  const todayStr =
    today.getFullYear() === currentYear && today.getMonth() === activeMonth
      ? today.getDate()
      : null

  const monthHasEvents = events.some((e) => {
    const d = new Date(e.startDate)
    return d.getMonth() === activeMonth && d.getFullYear() === currentYear
  })

  const prevMonth = () => setActiveMonth((m) => (m > 0 ? m - 1 : 11))
  const nextMonth = () => setActiveMonth((m) => (m < 11 ? m + 1 : 0))

  const handleDateInteraction = (dateKey: string, cellEl: HTMLButtonElement | null) => {
    if (activeDate === dateKey) {
      setActiveDate(null)
      return
    }
    setActiveDate(dateKey)

    if (cellEl && calendarRef.current) {
      const isMobile = window.innerWidth <= 768
      if (isMobile) {
        setPopoverTop(undefined)
        return
      }
      const cellRect = cellEl.getBoundingClientRect()
      const calRect = calendarRef.current.getBoundingClientRect()
      const spaceBelow = calRect.bottom - cellRect.bottom
      if (spaceBelow < 280) {
        setPopoverPos('top')
        setPopoverTop(cellRect.top - calRect.top - 280 - 12)
      } else {
        setPopoverPos('bottom')
        setPopoverTop(cellRect.bottom - calRect.top + 12)
      }
    }
  }

  useEffect(() => {
    setActiveDate(null)
    setPopoverTop(undefined)
  }, [activeMonth])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setActiveDate(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const activeEvents = activeDate ? eventsByDate.get(activeDate) || [] : []

  const monthEventCount = events.filter((e) => {
    const d = new Date(e.startDate)
    return d.getMonth() === activeMonth && d.getFullYear() === currentYear
  }).length

  return (
    <div className="calendar-wrapper" ref={calendarRef}>
      {/* Month Switcher */}
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={prevMonth} aria-label="Previous month">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="calendar-month-info">
          <h2 className="calendar-month-name">{MONTHS[activeMonth]} {currentYear}</h2>
          {monthHasEvents && (
            <span className="calendar-month-count">
              {monthEventCount} event{monthEventCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <button className="calendar-nav-btn" onClick={nextMonth} aria-label="Next month">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Mini month strip */}
      <div className="calendar-month-strip">
        {MONTHS.map((m, i) => {
          const hasEvents = events.some((e) => new Date(e.startDate).getMonth() === i)
          return (
            <button
              key={i}
              className={`calendar-strip-pill${activeMonth === i ? ' active' : ''}${hasEvents ? ' has-events' : ''}`}
              onClick={() => setActiveMonth(i)}
            >
              {m.slice(0, 3)}
            </button>
          )
        })}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {WEEKDAYS.map((day) => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}

        {calendarDays.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="calendar-day empty" />
          }

          const dateKey = `${currentYear}-${String(activeMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const dayEvents = eventsByDate.get(dateKey) || []
          const hasEvents = dayEvents.length > 0
          const isToday = day === todayStr
          const isActive = activeDate === dateKey

          return (
            <button
              key={dateKey}
              ref={isActive ? activeCellRef : null}
              className={`calendar-day${hasEvents ? ' has-events' : ''}${isToday ? ' today' : ''}${isActive ? ' active' : ''}`}
              onClick={(e) => hasEvents && handleDateInteraction(dateKey, e.currentTarget)}
              onMouseEnter={(e) => {
                if (hasEvents && window.innerWidth > 768) {
                  handleDateInteraction(dateKey, e.currentTarget)
                }
              }}
            >
              <span className="calendar-day-number">{day}</span>
              {hasEvents && (
                <div className="calendar-day-dots">
                  {dayEvents.slice(0, 3).map((ev, i) => (
                    <span
                      key={i}
                      className="calendar-day-dot"
                      style={{ backgroundColor: EVENT_TYPE_COLORS[ev.eventType] || '#69bd45' }}
                    />
                  ))}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Event Popover */}
      {activeDate && activeEvents.length > 0 && (
        <>
          <div
            className="calendar-popover-backdrop"
            onClick={() => setActiveDate(null)}
          />
          <div
            className={`calendar-popover ${popoverPos}`}
            style={typeof popoverTop === 'number' ? { top: popoverTop } : undefined}
          >
          <div className="calendar-popover-header">
            <span className="calendar-popover-date">
              {new Date(activeDate + 'T00:00:00').toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <button
              className="calendar-popover-close"
              onClick={() => setActiveDate(null)}
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="calendar-popover-events">
            {activeEvents.map((event) => {
              const featuredImage = event.featuredImage as Media
              const imageUrl = featuredImage?.url || '/placeholder-tour.jpg'
              const relatedTour = event.relatedTour as Tour | null
              const typeColor = EVENT_TYPE_COLORS[event.eventType] || '#69bd45'
              const typeLabel = EVENT_TYPE_LABELS[event.eventType] || event.eventType
              const ctaHref = relatedTour
                ? `/tours/${relatedTour.slug}`
                : event.externalLink || null

              return (
                <div key={event.id} className="calendar-event-item">
                  <div className="calendar-event-image">
                    <Image
                      src={imageUrl}
                      alt={featuredImage?.alt || event.title}
                      fill
                      sizes="120px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="calendar-event-info">
                    <div className="calendar-event-top">
                      <span
                        className="calendar-event-type"
                        style={{ color: typeColor, borderColor: typeColor }}
                      >
                        {typeLabel}
                      </span>
                      {event.startTime && (
                        <span className="calendar-event-time">{event.startTime}</span>
                      )}
                    </div>
                    <h4 className="calendar-event-title">{event.title}</h4>
                    <p className="calendar-event-desc">{event.shortDescription}</p>
                    <div className="calendar-event-bottom">
                      {event.location?.name && (
                        <span className="calendar-event-location">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {event.location.name}
                        </span>
                      )}
                      {ctaHref && (
                        <Link
                          href={ctaHref}
                          className="calendar-event-link"
                          {...(event.externalLink && !relatedTour ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {relatedTour ? 'View Tour' : 'Learn More'}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        </>
      )}
    </div>
  )
}
