import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { Event } from '@/payload-types'
import EventCard from '../components/EventCard'
import MonthNav from './MonthNav'
import './what-on.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "What's On | Green Getaways",
  description:
    'Discover upcoming events, festivals, treks, and cultural happenings throughout the year with Green Getaways.',
  openGraph: {
    title: "What's On | Green Getaways",
    description:
      'Discover upcoming events, festivals, treks, and cultural happenings throughout the year.',
  },
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export default async function WhatsOnPage() {
  const currentYear = new Date().getFullYear()

  let events: Event[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'events',
      where: {
        and: [
          { startDate: { greater_than_equal: `${currentYear}-01-01` } },
          { startDate: { less_than_equal: `${currentYear}-12-31` } },
          { status: { not_equals: 'cancelled' } },
        ],
      },
      sort: 'startDate',
      limit: 200,
      depth: 1,
    })
    events = result.docs as Event[]
  } catch {
    // Database may not be ready yet
  }

  const eventsByMonth = new Map<number, Event[]>()
  for (const event of events) {
    const month = new Date(event.startDate).getMonth()
    if (!eventsByMonth.has(month)) {
      eventsByMonth.set(month, [])
    }
    eventsByMonth.get(month)!.push(event)
  }

  const monthsWithEvents = Array.from(eventsByMonth.keys()).sort((a, b) => a - b)

  return (
    <div className="whats-on-page">
      <section className="whats-on-hero">
        <div className="whats-on-hero-inner">
          <p className="whats-on-eyebrow">What&apos;s On</p>
          <h1 className="whats-on-hero-title">
            Events & Happenings {currentYear}
          </h1>
          <p className="whats-on-hero-subtitle">
            From vibrant cultural festivals to guided treks and eco-workshops — discover what&apos;s
            happening across our destinations throughout the year.
          </p>
        </div>
      </section>

      <MonthNav monthsWithEvents={monthsWithEvents} />

      <div className="whats-on-content">
        {monthsWithEvents.length === 0 ? (
          <div className="whats-on-empty">
            <div className="whats-on-empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h2 className="whats-on-empty-title">Events Coming Soon</h2>
            <p className="whats-on-empty-text">
              We&apos;re planning exciting events for {currentYear}. In the meantime, explore our
              tours and start planning your next adventure.
            </p>
            <Link href="/tours" className="whats-on-empty-btn">
              Explore Tours
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ) : (
          monthsWithEvents.map((month) => {
            const monthEvents = eventsByMonth.get(month)!
            return (
              <section
                key={month}
                className="month-section"
                id={`month-${month}`}
                data-month={month}
              >
                <div className="month-heading">
                  <h2 className="month-heading-name">{MONTH_NAMES[month]}</h2>
                  <span className="month-heading-count">
                    {monthEvents.length} event{monthEvents.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="event-grid">
                  {monthEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            )
          })
        )}
      </div>
    </div>
  )
}
