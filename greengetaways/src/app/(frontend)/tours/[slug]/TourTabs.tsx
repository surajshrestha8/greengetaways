'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Tour, Media, Testimonial } from '@/payload-types'

interface TourTabsProps {
  tour: Tour
  testimonials: Testimonial[]
}

type TabKey = 'itinerary' | 'includes' | 'dates-prices' | 'reviews' | 'faqs'

const tabs: { key: TabKey; label: string }[] = [
  { key: 'itinerary', label: 'Itinerary' },
  { key: 'includes', label: 'Includes' },
  { key: 'dates-prices', label: 'Dates & Prices' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'faqs', label: 'FAQs' },
]

export default function TourTabs({ tour, testimonials }: TourTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('itinerary')

  const formatPrice = (amount: number, currency: string) => {
    const symbol = currency === 'USD' ? '$' : currency
    return `${symbol} ${amount.toLocaleString()}`
  }

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
          </div>
        )}

        {/* Includes Tab */}
        {activeTab === 'includes' && (
          <div className="tab-panel">
            <div className="includes-grid">
              {/* Price Includes */}
              <div className="includes-section">
                <h3>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4caf50"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  What&apos;s Included
                </h3>
                {tour.pricing?.priceIncludes ? (
                  <div className="includes-list included">
                    <RichText data={tour.pricing.priceIncludes} />
                  </div>
                ) : (
                  <p className="tab-empty">Inclusion details coming soon.</p>
                )}
              </div>

              {/* Price Excludes */}
              <div className="includes-section">
                <h3>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f44336"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  What&apos;s Not Included
                </h3>
                {tour.pricing?.priceExcludes ? (
                  <div className="includes-list excluded">
                    <RichText data={tour.pricing.priceExcludes} />
                  </div>
                ) : (
                  <p className="tab-empty">Exclusion details coming soon.</p>
                )}
              </div>
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
                {tour.availability?.departureDates &&
                tour.availability.departureDates.length > 0 ? (
                  <div className="dates-table">
                    <div className="dates-table-header">
                      <span>Departure Date</span>
                      <span>Available Seats</span>
                      <span>Status</span>
                    </div>
                    {tour.availability.departureDates.map((departure: { date?: string | null; availableSeats?: number | null }, index: number) => (
                      <div key={index} className="dates-table-row">
                        <span className="departure-date">{departure.date ? formatDate(departure.date) : 'TBD'}</span>
                        <span className="departure-seats">{departure.availableSeats ?? 0} seats</span>
                        <span
                          className={`departure-status ${(departure.availableSeats ?? 0) > 0 ? 'available' : 'sold-out'}`}
                        >
                          {(departure.availableSeats ?? 0) > 0 ? 'Available' : 'Sold Out'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="tab-empty">Contact us for available dates.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="tab-panel">
            {testimonials && testimonials.length > 0 ? (
              <div className="reviews-list">
                {testimonials.map((testimonial: Testimonial) => (
                  <div key={testimonial.id} className="review-card">
                    <div className="review-header">
                      <div className="reviewer-info">
                        {testimonial.customerPhoto && (
                          <div className="reviewer-photo">
                            <Image
                              src={
                                (testimonial.customerPhoto as Media).url ||
                                '/placeholder-avatar.jpg'
                              }
                              alt={testimonial.customerName}
                              width={48}
                              height={48}
                            />
                          </div>
                        )}
                        <div className="reviewer-details">
                          <h4>{testimonial.customerName}</h4>
                          {testimonial.customerLocation && (
                            <span className="reviewer-location">
                              {testimonial.customerLocation}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill={i < testimonial.rating ? '#ffc107' : 'none'}
                            stroke="#ffc107"
                            strokeWidth="2"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <h5 className="review-title">{testimonial.title}</h5>
                    <p className="review-text">{testimonial.review}</p>
                    <span className="review-date">
                      Traveled:{' '}
                      {new Date(testimonial.travelDate).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-reviews">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <p>No reviews yet for this tour.</p>
                <span>Be the first to share your experience!</span>
              </div>
            )}
          </div>
        )}

        {/* FAQs Tab */}
        {activeTab === 'faqs' && (
          <div className="tab-panel">
            <div className="faqs-list">
              {/* Common FAQs for tours - you can make this dynamic later */}
              <FAQItem
                question="What is the cancellation policy?"
                answer="Free cancellation up to 30 days before departure. 50% refund for cancellations 15-29 days before. No refund for cancellations less than 15 days before departure."
              />
              <FAQItem
                question="What should I pack for this tour?"
                answer="We recommend comfortable walking shoes, weather-appropriate clothing, sunscreen, a hat, and a reusable water bottle. A detailed packing list will be provided upon booking."
              />
              <FAQItem
                question="Are meals included in the tour?"
                answer="Meal inclusions vary by day and are detailed in the itinerary. Generally, breakfast is included daily. Check the 'Includes' tab for specific details."
              />
              <FAQItem
                question="What is the group size?"
                answer={`This tour operates with a minimum of ${tour.groupSize?.min || 1} and maximum of ${tour.groupSize?.max} travelers to ensure a quality experience.`}
              />
              <FAQItem
                question="Is travel insurance required?"
                answer="Yes, comprehensive travel insurance is mandatory for all participants. We recommend coverage that includes trip cancellation, medical expenses, and emergency evacuation."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// FAQ Item Component with accordion behavior
function FAQItem({ question, answer }: { question: string; answer: string }) {
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
          <p>{answer}</p>
        </div>
      )}
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
