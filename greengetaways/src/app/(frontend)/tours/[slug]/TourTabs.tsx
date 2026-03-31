'use client'

import React, { useState } from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Tour } from '@/payload-types'
import { BookingTable, type MonthGroup } from './BookingTable'
import TourHighlightsAccordion from './TourHighlightsAccordion'
import { formatPrice } from '../../lib/utils'

interface TourTabsProps {
  tour: Tour
}

type TabKey = 'itinerary' | 'highlights' | 'includes' | 'dates-prices' | 'useful-info' | 'faqs'

const tabs: { key: TabKey; label: string }[] = [
  { key: 'highlights', label: 'Highlights' },
  { key: 'itinerary', label: 'Itinerary' },
  { key: 'includes', label: 'Includes' },
  { key: 'dates-prices', label: 'Dates & Prices' },
  { key: 'useful-info', label: 'Useful Info' },
  { key: 'faqs', label: 'FAQs' },
]

const MOCK_BOOKING_GROUPS: MonthGroup[] = [
  {
    month: 'MARCH 2026',
    rows: [
      {
        id: 'mar-27',
        arrivalDay: 'Friday',
        arrivalDate: '27 Mar, 2026',
        departureDay: 'Friday',
        departureDate: '10 Apr, 2026',
        availability: '6 spaces left',
        priceUSD: 3790,
        currency: 'USD',
        bookingUrl: '/book?date=2026-03-27',
      },
    ],
  },
  {
    month: 'APRIL 2026',
    rows: [
      {
        id: 'apr-03',
        arrivalDay: 'Friday',
        arrivalDate: '03 Apr, 2026',
        departureDay: 'Friday',
        departureDate: '17 Apr, 2026',
        availability: '1 spaces left',
        priceUSD: 3790,
        currency: 'USD',
        bookingUrl: '/book?date=2026-04-03',
      },
      {
        id: 'apr-10',
        arrivalDay: 'Friday',
        arrivalDate: '10 Apr, 2026',
        departureDay: 'Friday',
        departureDate: '24 Apr, 2026',
        availability: '8 spaces left',
        priceUSD: 3790,
        currency: 'USD',
        bookingUrl: '/book?date=2026-04-10',
      },
      {
        id: 'apr-12',
        arrivalDay: 'Sunday',
        arrivalDate: '12 Apr, 2026',
        departureDay: 'Sunday',
        departureDate: '26 Apr, 2026',
        availability: 'Available (private only)',
        isPrivateOnly: true,
        priceUSD: 3790,
        currency: 'USD',
        bookingUrl: '/book?date=2026-04-12',
      },
    ],
  },
  {
    month: 'MAY 2026',
    rows: [
      {
        id: 'may-01',
        arrivalDay: 'Friday',
        arrivalDate: '01 May, 2026',
        departureDay: 'Friday',
        departureDate: '15 May, 2026',
        availability: '10 spaces left',
        priceUSD: 3790,
        currency: 'USD',
        bookingUrl: '/book?date=2026-05-01',
      },
      {
        id: 'may-15',
        arrivalDay: 'Friday',
        arrivalDate: '15 May, 2026',
        departureDay: 'Friday',
        departureDate: '29 May, 2026',
        availability: 'Sold Out',
        priceUSD: 3790,
        currency: 'USD',
        bookingUrl: '/book?date=2026-05-15',
      },
    ],
  },
]

function buildMonthGroups(tour: Tour): MonthGroup[] {
  const departures = tour.availability?.departureDates ?? []
  const currency = tour.pricing?.currency ?? 'USD'
  const basePrice = tour.pricing?.basePrice ?? 0
  const durationDays = tour.duration?.days ?? 0

  const monthMap = new Map<string, MonthGroup>()

  departures.forEach((dep, i) => {
    if (!dep.date) return
    const arrival = new Date(dep.date)
    const arrivalDay = arrival.toLocaleDateString('en-US', { weekday: 'long' })
    const arrivalDate = arrival.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })

    let departureDay = ''
    let departureDate = ''
    if (durationDays > 0) {
      const dep2 = new Date(arrival)
      dep2.setDate(dep2.getDate() + durationDays)
      departureDay = dep2.toLocaleDateString('en-US', { weekday: 'long' })
      departureDate = dep2.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    } else {
      departureDay = arrivalDay
      departureDate = arrivalDate
    }

    const seats = dep.availableSeats ?? 0
    const availability = seats > 0 ? `${seats} spaces left` : 'Sold Out'

    const monthKey = arrival
      .toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
      .toUpperCase()

    if (!monthMap.has(monthKey)) {
      monthMap.set(monthKey, { month: monthKey, rows: [] })
    }

    monthMap.get(monthKey)!.rows.push({
      id: `dep-${i}`,
      arrivalDay,
      arrivalDate,
      departureDay,
      departureDate,
      availability,
      priceUSD: basePrice,
      currency,
      bookingUrl: `/book?tour=${tour.id}&date=${dep.date}`,
    })
  })

  return Array.from(monthMap.values())
}

export default function TourTabs({ tour }: TourTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('itinerary')


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="tour-tabs">
      {/* Tab Navigation */}
      <div className="tour-tabs-nav">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tour-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tour-tabs-content">
        {/* Itinerary Tab */}
        {activeTab === 'itinerary' && (
          <div className="tab-panel">
            {tour.itinerary && tour.itinerary.length > 0 ? (
              <div className="tour-itinerary">
                {tour.itinerary.map((day: ItineraryDay, index: number) => (
                  <ItineraryItem key={index} day={day} defaultOpen={index === 0} />
                ))}
              </div>
            ) : (
              <p className="tab-empty">Itinerary details coming soon.</p>
            )}
            <ItineraryEnquiryBanner tourId={tour.id} tourTitle={tour.title} />
          </div>
        )}

        {/* Highlights Tab */}
        {activeTab === 'highlights' && (
          <div className="tab-panel">
            {tour.highlights && tour.highlights.length > 0 ? (
              <TourHighlightsAccordion highlights={tour.highlights} />
            ) : (
              <p className="tab-empty">No highlights available for this tour.</p>
            )}
          </div>
        )}

        {/* Includes Tab */}
        {activeTab === 'includes' && (
          <div className="tab-panel">
            <div className="includes-accordion-stack">
              <IncludesAccordionItem
                title="What's Included"
                sectionClass="included-section"
                listClass="included"
                iconStroke="#4caf50"
                icon={<polyline points="20 6 9 17 4 12" />}
                iconWrapClass="included-icon"
                content={tour.pricing?.priceIncludes}
                emptyText="Inclusion details coming soon."
                defaultOpen={false}
              />
              <IncludesAccordionItem
                title="What's Not Included"
                sectionClass="excluded-section"
                listClass="excluded"
                iconStroke="#f44336"
                icon={
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                }
                iconWrapClass="excluded-icon"
                content={tour.pricing?.priceExcludes}
                emptyText="Exclusion details coming soon."
                defaultOpen={false}
              />
            </div>
          </div>
        )}

        {/* Dates & Prices Tab */}
        {activeTab === 'dates-prices' && (
          <div className="tab-panel">
            <div className="dates-prices-content">
              {/* Pricing Info */}
              <div className="pricing-info">
                <div className="price-display">
                  <span className="price-label">Starting From</span>
                  {tour.pricing?.discountedPrice ? (
                    <div className="price-values">
                      <span className="price-original">
                        {formatPrice(tour.pricing?.basePrice || 0, tour.pricing?.currency || 'USD')}
                      </span>
                      <span className="price-current">
                        {formatPrice(tour.pricing.discountedPrice, tour.pricing?.currency || 'USD')}
                      </span>
                    </div>
                  ) : (
                    <span className="price-current">
                      {formatPrice(tour.pricing?.basePrice || 0, tour.pricing?.currency || 'USD')}
                    </span>
                  )}
                  <span className="price-per">per person</span>
                </div>
              </div>

              {/* Available Dates */}
              <div className="available-dates">
                <h3>Available Departure Dates</h3>
                <BookingTable
                  groups={
                    tour.availability?.departureDates && tour.availability.departureDates.length > 0
                      ? buildMonthGroups(tour)
                      : MOCK_BOOKING_GROUPS
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* Useful Info Tab */}
        {activeTab === 'useful-info' && (
          <div className="tab-panel">
            {(() => {
              const infoItems = [
                { title: 'Commitment to Sustainability', content: tour.commitmentToSustainability },
                { title: 'Trekkers Responsibilities', content: tour.trekkersResponsibilities },
                { title: 'Trekkers Preparation', content: tour.trekkersPreparation },
                { title: 'Culture & Community', content: tour.cultureAndCommunity },
                { title: 'Packing List', content: tour.packingList },
                { title: 'Accommodation', content: tour.accommodationInfo },
                { title: 'Food & Dining', content: tour.foodInfo },
                { title: 'Best Time to Visit', content: tour.bestTimeToTrek },
                { title: 'Typical Daily Routine', content: tour.typicalRoutine },
                { title: 'Permits & Fees', content: tour.permitInfo },
                { title: 'Guide Requirements', content: tour.guideRequirement },
                { title: 'Acclimatization', content: tour.acclimatizationInfo },
                { title: 'Currency & Exchange', content: tour.currencyExchangeInfo },
                { title: 'Required Documents', content: tour.requiredDocuments },
                { title: 'Women Participation', content: tour.womenParticipation },
              ].filter((item) => item.content != null)

              return infoItems.length > 0 ? (
                <div className="useful-info-list">
                  {infoItems.map((item, index) => (
                    <InfoAccordionItem key={index} title={item.title} content={item.content!} />
                  ))}
                </div>
              ) : (
                <p className="tab-empty">No additional information available for this tour.</p>
              )
            })()}
          </div>
        )}

        {/* FAQs Tab */}
        {activeTab === 'faqs' && (
          <div className="tab-panel">
            {tour.faqs && tour.faqs.length > 0 ? (
              <div className="faqs-list">
                {tour.faqs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            ) : (
              <p className="tab-empty">No FAQs available for this tour.</p>
            )}

            <QuestionForm tourId={tour.id} />
          </div>
        )}
      </div>
    </div>
  )
}

// FAQ Item Component with accordion behavior
type FAQAnswer = NonNullable<NonNullable<Tour['faqs']>[number]>['answer']

function FAQItem({ question, answer }: { question: string; answer: FAQAnswer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`faq-icon ${isOpen ? 'rotated' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && (
        <div className="faq-answer">
          <RichText data={answer} />
        </div>
      )}
    </div>
  )
}

// Info Accordion Item Component for Useful Info tab
type RichTextContent = NonNullable<Tour['packingList']>

function InfoAccordionItem({ title, content }: { title: string; content: RichTextContent }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`info-accordion-item ${isOpen ? 'open' : ''}`}>
      <button className="info-accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`info-accordion-icon ${isOpen ? 'rotated' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && (
        <div className="info-accordion-content">
          <RichText data={content} />
        </div>
      )}
    </div>
  )
}

// Includes / Excludes Accordion Item
type PriceRichText = NonNullable<NonNullable<Tour['pricing']>['priceIncludes']>

function IncludesAccordionItem({
  title,
  sectionClass,
  listClass,
  iconStroke,
  icon,
  iconWrapClass,
  content,
  emptyText,
  defaultOpen = false,
}: {
  title: string
  sectionClass: string
  listClass: string
  iconStroke: string
  icon: React.ReactNode
  iconWrapClass: string
  content?: PriceRichText | null
  emptyText: string
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={`includes-section ${sectionClass}${isOpen ? ' open' : ''}`}>
      <button className="includes-header" onClick={() => setIsOpen((p) => !p)}>
        <span className={`includes-icon-wrap ${iconWrapClass}`}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconStroke}
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            {icon}
          </svg>
        </span>
        <span className="includes-header-title">{title}</span>
        <svg
          className="includes-chevron"
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
      <div className="includes-body">
        <div className="includes-body-inner">
          {content ? (
            <div className={`includes-list ${listClass}`}>
              <RichText data={content} />
            </div>
          ) : (
            <p className="tab-empty" style={{ padding: '16px 20px', margin: 0 }}>
              {emptyText}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// Ask a Question Form
function QuestionForm({ tourId }: { tourId: number }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [question, setQuestion] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/tour-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, question, tourId }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message)
        setName('')
        setEmail('')
        setQuestion('')
      } else {
        setStatus('error')
        setMessage(data.message || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <div className="question-form-section">
      <div className="question-form-header">
        <div className="question-form-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div>
          <h3 className="question-form-title">Still have questions?</h3>
          <p className="question-form-subtitle">
            Ask us anything about this tour and we&apos;ll get back to you.
          </p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="question-form-success">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#69bd45"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <p>{message}</p>
        </div>
      ) : (
        <form className="question-form" onSubmit={handleSubmit} noValidate>
          <div className="question-form-row">
            <div className="question-form-field">
              <label className="question-form-label" htmlFor="q-name">
                Your Name
              </label>
              <input
                id="q-name"
                type="text"
                className="question-form-input"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={status === 'loading'}
              />
            </div>
            <div className="question-form-field">
              <label className="question-form-label" htmlFor="q-email">
                Email Address
              </label>
              <input
                id="q-email"
                type="email"
                className="question-form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
              />
            </div>
          </div>

          <div className="question-form-field">
            <label className="question-form-label" htmlFor="q-question">
              Your Question
            </label>
            <textarea
              id="q-question"
              className="question-form-input question-form-textarea"
              placeholder="What would you like to know about this tour?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              required
              disabled={status === 'loading'}
            />
          </div>

          {status === 'error' && <p className="question-form-error">{message}</p>}

          <button type="submit" className="question-form-submit" disabled={status === 'loading'}>
            {status === 'loading' ? (
              <>
                <svg
                  className="question-form-spinner"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Sending…
              </>
            ) : (
              <>
                Send Question
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}

// Itinerary Enquiry Banner
function ItineraryEnquiryBanner({ tourId, tourTitle }: { tourId: number; tourTitle: string }) {
  const [expanded, setExpanded] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/tour-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          question: `[Custom Itinerary Request for "${tourTitle}"] ${message}`,
          tourId,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(data.message || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  return (
    <div className={`itinerary-enquiry-banner ${expanded ? 'expanded' : ''}`}>
      {/* Top gradient strip */}
      <div className="ienq-glow" />

      <div className="ienq-inner">
        {/* Collapsed state — always visible */}
        <div className="ienq-top">
          <div className="ienq-top-left">
            <span className="ienq-badge">Customize</span>
            <div>
              <p className="ienq-heading">Not loving this itinerary?</p>
              <p className="ienq-sub">
                Tell us your preferences — we&apos;ll craft the perfect trip for you.
              </p>
            </div>
          </div>
          {!expanded && (
            <button className="ienq-cta-btn" onClick={() => setExpanded(true)}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Request Custom Itinerary
            </button>
          )}
        </div>

        {/* Expanded form */}
        {expanded && (
          <div className="ienq-form-wrap">
            {status === 'success' ? (
              <div className="ienq-success">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#69bd45"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <div>
                  <p className="ienq-success-title">Request sent!</p>
                  <p className="ienq-success-sub">
                    We&apos;ll get back to you within 24 hours with a custom plan.
                  </p>
                </div>
              </div>
            ) : (
              <form className="ienq-form" onSubmit={handleSubmit} noValidate>
                <div className="ienq-form-row">
                  <div className="ienq-field">
                    <label htmlFor="ienq-name">Your Name</label>
                    <input
                      id="ienq-name"
                      type="text"
                      placeholder="Jane Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={status === 'loading'}
                    />
                  </div>
                  <div className="ienq-field">
                    <label htmlFor="ienq-email">Email Address</label>
                    <input
                      id="ienq-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>
                <div className="ienq-field">
                  <label htmlFor="ienq-message">What would you like to change or add?</label>
                  <textarea
                    id="ienq-message"
                    placeholder="e.g. I'd love an extra day in Pokhara, prefer a sunrise hike on Day 3, skip the city tour..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    required
                    disabled={status === 'loading'}
                  />
                </div>
                {status === 'error' && <p className="ienq-error">{errorMsg}</p>}
                <div className="ienq-form-actions">
                  <button
                    type="button"
                    className="ienq-cancel-btn"
                    onClick={() => setExpanded(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="ienq-submit-btn" disabled={status === 'loading'}>
                    {status === 'loading' ? (
                      <>
                        <svg
                          className="question-form-spinner"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Request
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Itinerary Item Component with accordion behavior
type ItineraryDay = NonNullable<Tour['itinerary']>[number]

function ItineraryItem({ day, defaultOpen = false }: { day: ItineraryDay; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={`itinerary-item ${isOpen ? 'open' : ''}`}>
      <button className="itinerary-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="itinerary-header-left">
          <span className="itinerary-day-number">Day {day.day || 0}</span>
          <h3 className="itinerary-day-title">{day.title || 'Untitled'}</h3>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`itinerary-icon ${isOpen ? 'rotated' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && (
        <div className="itinerary-content">
          {day.description && (
            <div className="itinerary-description">
              <RichText data={day.description} />
            </div>
          )}
          <div className="itinerary-meta">
            {day.meals && day.meals.length > 0 && (
              <div className="itinerary-meals">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
                <span>
                  Meals: {day.meals.map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join(', ')}
                </span>
              </div>
            )}
            {day.accommodation && (
              <div className="itinerary-accommodation">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>{day.accommodation}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
