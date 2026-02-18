'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export interface TourData {
  id: string
  title: string
  slug: string
  price: number
  originalPrice: number
  currency: string
  duration: { days: number; nights: number }
  difficulty: string | null
  maxGroupSize: number
  departureDates: { date: string; availableSeats: number }[]
}

interface FormData {
  departureDate: string
  numberOfTravelers: number
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  specialRequests: string
}

interface FormErrors {
  departureDate?: string
  numberOfTravelers?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

interface BookingFormProps {
  tourData: TourData | null
}

const difficultyColors: Record<string, string> = {
  easy: '#4caf50',
  moderate: '#ff9800',
  challenging: '#f44336',
  difficult: '#9c27b0',
}

export default function BookingForm({ tourData }: BookingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    departureDate: '',
    numberOfTravelers: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    specialRequests: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [bookingSuccess, setBookingSuccess] = useState<{ bookingReference: string } | null>(null)

  const price = tourData?.price || 0
  const currency = tourData?.currency || 'USD'
  const total = price * formData.numberOfTravelers

  const formatPrice = (amount: number) => {
    const symbol = currency === 'USD' ? '$' : currency
    return `${symbol}${amount.toLocaleString()}`
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.departureDate) {
      newErrors.departureDate = 'Please select a departure date'
    }
    if (formData.numberOfTravelers < 1) {
      newErrors.numberOfTravelers = 'At least 1 traveler is required'
    } else if (tourData && formData.numberOfTravelers > tourData.maxGroupSize) {
      newErrors.numberOfTravelers = `Maximum ${tourData.maxGroupSize} travelers allowed`
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target
    const parsed = type === 'number' ? parseInt(value, 10) || 1 : value
    setFormData((prev) => ({ ...prev, [name]: parsed } as FormData))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    if (!tourData) {
      setSubmitError('No tour selected. Please choose a tour from our tours page.')
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: tourData.id,
          departureDate: formData.departureDate,
          numberOfTravelers: formData.numberOfTravelers,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          specialRequests: formData.specialRequests,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setSubmitError(data.message || 'An error occurred. Please try again.')
        return
      }
      setBookingSuccess({ bookingReference: data.bookingReference })
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (bookingSuccess) {
    return (
      <div className="booking-success-wrapper">
        <div className="booking-success-card">
          <div className="booking-success-icon">
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4caf50"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2 className="booking-success-heading">Booking Request Received!</h2>
          <p className="booking-success-message">
            Thank you for booking with Green Getaways. Our team will review your request and confirm
            your adventure shortly.
          </p>
          <div className="booking-reference-box">
            <span className="booking-reference-label">Your Booking Reference</span>
            <span className="booking-reference-code">{bookingSuccess.bookingReference}</span>
          </div>
          <p className="booking-success-note">
            Please save this reference number. Confirmation details will be sent to{' '}
            <strong>{formData.email}</strong>.
          </p>
          <div className="booking-success-actions">
            <Link href="/tours" className="btn-outline">
              Browse More Tours
            </Link>
            <Link href="/" className="btn-primary-action">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const hasDepartureDates = tourData && tourData.departureDates.length > 0

  return (
    <div className="booking-layout">
      {/* Left: Form */}
      <form className="booking-form-card" onSubmit={handleSubmit} noValidate>
        {/* Section 1: Trip Details */}
        <div className="form-section">
          <div className="form-section-header">
            <span className="form-section-number">1</span>
            <h2>Trip Details</h2>
          </div>

          {tourData && (
            <div className="form-group">
              <span className="form-label">Tour</span>
              <div className="form-display-value">{tourData.title}</div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="departureDate" className="form-label">
              Departure Date <span className="required">*</span>
            </label>
            {hasDepartureDates ? (
              <select
                id="departureDate"
                name="departureDate"
                className={`form-select${errors.departureDate ? ' input-error' : ''}`}
                value={formData.departureDate}
                onChange={handleChange}
              >
                <option value="">Select a departure date</option>
                {tourData.departureDates.map((d) => (
                  <option key={d.date} value={d.date} disabled={d.availableSeats === 0}>
                    {new Date(d.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    {d.availableSeats > 0 ? ` — ${d.availableSeats} seats` : ' — Sold out'}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="date"
                id="departureDate"
                name="departureDate"
                className={`form-input${errors.departureDate ? ' input-error' : ''}`}
                value={formData.departureDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
              />
            )}
            {errors.departureDate && (
              <span className="form-error">{errors.departureDate}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="numberOfTravelers" className="form-label">
              Number of Travelers <span className="required">*</span>
            </label>
            <input
              type="number"
              id="numberOfTravelers"
              name="numberOfTravelers"
              className={`form-input${errors.numberOfTravelers ? ' input-error' : ''}`}
              value={formData.numberOfTravelers}
              onChange={handleChange}
              min={1}
              max={tourData?.maxGroupSize ?? 20}
            />
            {errors.numberOfTravelers && (
              <span className="form-error">{errors.numberOfTravelers}</span>
            )}
          </div>
        </div>

        {/* Section 2: Your Details */}
        <div className="form-section">
          <div className="form-section-header">
            <span className="form-section-number">2</span>
            <h2>Your Details</h2>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`form-input${errors.firstName ? ' input-error' : ''}`}
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Jane"
                autoComplete="given-name"
              />
              {errors.firstName && <span className="form-error">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`form-input${errors.lastName ? ' input-error' : ''}`}
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                autoComplete="family-name"
              />
              {errors.lastName && <span className="form-error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input${errors.email ? ' input-error' : ''}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              autoComplete="email"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`form-input${errors.phone ? ' input-error' : ''}`}
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 8900"
              autoComplete="tel"
            />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              className="form-input"
              value={formData.country}
              onChange={handleChange}
              placeholder="United States"
              autoComplete="country-name"
            />
          </div>
        </div>

        {/* Section 3: Special Requests */}
        <div className="form-section">
          <div className="form-section-header">
            <span className="form-section-number">3</span>
            <h2>Special Requests</h2>
          </div>

          <div className="form-group">
            <label htmlFor="specialRequests" className="form-label">
              Any special requirements or requests?
            </label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              className="form-textarea"
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="Dietary restrictions, accessibility needs, special occasions..."
              rows={4}
            />
          </div>
        </div>

        {submitError && <div className="submit-error-message">{submitError}</div>}

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="btn-spinner" />
              Processing...
            </>
          ) : (
            <>
              Confirm Booking
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
            </>
          )}
        </button>
      </form>

      {/* Right: Summary Card */}
      {tourData && (
        <aside className="booking-summary-card">
          <h3 className="summary-title">Tour Summary</h3>
          <div className="summary-tour-name">{tourData.title}</div>

          <div className="summary-meta">
            {tourData.duration.days > 0 && (
              <span className="summary-meta-item">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {tourData.duration.days} Days / {tourData.duration.nights} Nights
              </span>
            )}
            {tourData.difficulty && (
              <span
                className="summary-meta-item"
                style={{ color: difficultyColors[tourData.difficulty] }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                {tourData.difficulty.charAt(0).toUpperCase() + tourData.difficulty.slice(1)}
              </span>
            )}
          </div>

          <div className="summary-divider" />

          <div className="summary-price-breakdown">
            <div className="summary-price-row">
              <span>Price per person</span>
              <span>{formatPrice(price)}</span>
            </div>
            {tourData.originalPrice > tourData.price && (
              <div className="summary-price-row summary-original-price">
                <span>Original price</span>
                <span className="strikethrough">{formatPrice(tourData.originalPrice)}</span>
              </div>
            )}
            <div className="summary-price-row">
              <span>Travelers</span>
              <span>× {formData.numberOfTravelers}</span>
            </div>
          </div>

          <div className="summary-divider" />

          <div className="summary-total-row">
            <span>Total</span>
            <span className="summary-total-amount">{formatPrice(total)}</span>
          </div>

          <p className="summary-note">
            Total updates live as you change the number of travelers.
          </p>
        </aside>
      )}
    </div>
  )
}
