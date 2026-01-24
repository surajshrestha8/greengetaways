'use client'

import React, { useState } from 'react'
import './NewsletterSignup.css'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setStatus('error')
      setMessage('Please enter your email address')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Thank you for subscribing! Check your inbox for confirmation.')
        setEmail('')
      } else {
        const data = await response.json()
        setStatus('error')
        setMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section className="newsletter">
      <div className="newsletter-overlay"></div>
      <div className="newsletter-content">
        <div className="newsletter-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h1 className="newsletter-title">
          Stay Updated with
          <span className="highlight"> Green Getaways</span>
        </h1>

        <p className="newsletter-subtitle">
          Subscribe to our newsletter and be the first to know about new eco-friendly destinations,
          exclusive deals, sustainable travel tips, and inspiring stories from our community.
        </p>

        <form onSubmit={handleSubmit} className="newsletter-form">
          <div className="form-box">
            <div className="input-field">
              <svg className="email-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
                disabled={status === 'loading'}
              />
            </div>
            <button
              type="submit"
              className="subscribe-btn"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>

          {message && (
            <p className={`form-message ${status}`}>
              {status === 'success' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
              {status === 'error' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              )}
              {message}
            </p>
          )}
        </form>

        <div className="newsletter-benefits">
          <div className="benefit-item">
            <div className="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span>Exclusive Deals</span>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span>No Spam</span>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </div>
            <span>Unsubscribe Anytime</span>
          </div>
        </div>

        <p className="newsletter-privacy">
          By subscribing, you agree to our Privacy Policy and consent to receive updates from Green Getaways.
        </p>
      </div>

      <div className="newsletter-decoration">
        <div className="floating-leaf leaf-1">🍃</div>
        <div className="floating-leaf leaf-2">🌿</div>
        <div className="floating-leaf leaf-3">🌱</div>
      </div>
    </section>
  )
}
