import React from 'react'
import ContactForm from './ContactForm'
import './contact.css'

export const metadata = {
  title: 'Contact Us - Green Getaways',
  description: 'Get in touch with the Green Getaways team. We\'d love to help plan your next sustainable adventure.',
}

export default function ContactPage() {
  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <div className="contact-hero-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            Get in Touch
          </div>
          <h1>We&apos;d Love to Hear From You</h1>
          <p>
            Have a question about our tours, need help planning your adventure, or just want to say
            hello? Drop us a message and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Main layout */}
      <div className="contact-layout">
        {/* Form */}
        <div className="contact-form-card">
          <h2>Send Us a Message</h2>
          <ContactForm />
        </div>

        {/* Info sidebar */}
        <aside className="contact-info-card">
          <div className="contact-info-section">
            <h3>Contact Details</h3>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="contact-info-text">
                <span className="contact-info-label">Email</span>
                <span className="contact-info-value">hello@greengetaways.com</span>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div className="contact-info-text">
                <span className="contact-info-label">Phone</span>
                <span className="contact-info-value">+977 1 234 5678</span>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="contact-info-text">
                <span className="contact-info-label">Office</span>
                <span className="contact-info-value">Thamel, Kathmandu{'\n'}Nepal</span>
              </div>
            </div>
          </div>

          <div className="contact-divider" />

          <div className="contact-info-section">
            <h3>Office Hours</h3>
            <div className="contact-hours-grid">
              <div className="contact-hours-row">
                <span className="contact-hours-day">Monday – Friday</span>
                <span className="contact-hours-time">9:00 – 18:00</span>
              </div>
              <div className="contact-hours-row">
                <span className="contact-hours-day">Saturday</span>
                <span className="contact-hours-time">10:00 – 15:00</span>
              </div>
              <div className="contact-hours-row">
                <span className="contact-hours-day">Sunday</span>
                <span className="contact-hours-time">Closed</span>
              </div>
            </div>
          </div>

          <div className="contact-divider" />

          <div className="contact-info-section">
            <h3>Response Time</h3>
            <p style={{ fontSize: '14px', color: '#a0a0a0', margin: 0, lineHeight: '1.6' }}>
              We typically respond within <strong style={{ color: '#4caf50' }}>24 hours</strong>.
              For urgent inquiries, please call us directly.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
