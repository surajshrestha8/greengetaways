'use client'

import React, { useState } from 'react'

export default function ReviewSubmitForm() {
  const [customerName, setCustomerName] = useState('')
  const [customerLocation, setCustomerLocation] = useState('')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState('')
  const [review, setReview] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      setStatus('error')
      setMessage('Please select a rating.')
      return
    }
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName, customerLocation, rating, title, review, travelDate }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message)
        setCustomerName('')
        setCustomerLocation('')
        setRating(0)
        setTitle('')
        setReview('')
        setTravelDate('')
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
    <div className="review-submit-section">
      <div className="review-submit-header">
        <h2 className="review-submit-title">Share Your Experience</h2>
        <p className="review-submit-subtitle">
          Travelled with Green Getaways? We&apos;d love to hear from you.
        </p>
      </div>

      {status === 'success' ? (
        <div className="review-submit-success">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#69bd45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <p>{message}</p>
        </div>
      ) : (
        <form className="review-submit-form" onSubmit={handleSubmit} noValidate>
          <div className="review-form-row">
            <div className="review-form-field">
              <label className="review-form-label" htmlFor="r-name">Your Name <span className="review-form-required">*</span></label>
              <input
                id="r-name"
                type="text"
                className="review-form-input"
                placeholder="Jane Smith"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                disabled={status === 'loading'}
              />
            </div>
            <div className="review-form-field">
              <label className="review-form-label" htmlFor="r-location">Location <span className="review-form-optional">(optional)</span></label>
              <input
                id="r-location"
                type="text"
                className="review-form-input"
                placeholder="City, Country"
                value={customerLocation}
                onChange={(e) => setCustomerLocation(e.target.value)}
                disabled={status === 'loading'}
              />
            </div>
          </div>

          <div className="review-form-row">
            <div className="review-form-field">
              <label className="review-form-label">Rating <span className="review-form-required">*</span></label>
              <div className="review-star-picker">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`review-star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    disabled={status === 'loading'}
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill={star <= (hoverRating || rating) ? '#ffc107' : 'none'} stroke="#ffc107" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            <div className="review-form-field">
              <label className="review-form-label" htmlFor="r-date">Travel Date <span className="review-form-optional">(optional)</span></label>
              <input
                id="r-date"
                type="month"
                className="review-form-input"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value ? `${e.target.value}-01` : '')}
                disabled={status === 'loading'}
              />
            </div>
          </div>

          <div className="review-form-field">
            <label className="review-form-label" htmlFor="r-title">Review Title <span className="review-form-required">*</span></label>
            <input
              id="r-title"
              type="text"
              className="review-form-input"
              placeholder="Summarise your experience in a few words"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={status === 'loading'}
            />
          </div>

          <div className="review-form-field">
            <label className="review-form-label" htmlFor="r-review">Your Review <span className="review-form-required">*</span></label>
            <textarea
              id="r-review"
              className="review-form-input review-form-textarea"
              placeholder="Tell us about your experience with Green Getaways..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={5}
              required
              disabled={status === 'loading'}
            />
          </div>

          {status === 'error' && <p className="review-form-error">{message}</p>}

          <button type="submit" className="review-form-submit" disabled={status === 'loading'}>
            {status === 'loading' ? (
              <>
                <svg className="review-form-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Submitting…
              </>
            ) : (
              <>
                Submit Review
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
