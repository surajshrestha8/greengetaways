'use client'

import React, { useState } from 'react'

interface FormData {
  name: string
  country: string
  email: string
  description: string
}

interface FormErrors {
  name?: string
  email?: string
  description?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    country: '',
    email: '',
    description: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.description.trim()) newErrors.description = 'Please tell us how we can help'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="contact-success">
        <div className="contact-success-icon">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h2>Message Sent!</h2>
        <p>
          Thank you, <strong>{formData.name}</strong>. We&apos;ve received your message and will be
          in touch at <strong>{formData.email}</strong> shortly.
        </p>
        <button className="contact-back-btn" onClick={() => { setSubmitted(false); setFormData({ name: '', country: '', email: '', description: '' }) }}>
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-group">
        <label htmlFor="name" className="contact-label">
          Full Name <span className="contact-required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`contact-input${errors.name ? ' contact-input-error' : ''}`}
          value={formData.name}
          onChange={handleChange}
          placeholder="Jane Doe"
          autoComplete="name"
        />
        {errors.name && <span className="contact-error">{errors.name}</span>}
      </div>

      <div className="contact-form-group">
        <label htmlFor="country" className="contact-label">
          Country
        </label>
        <input
          type="text"
          id="country"
          name="country"
          className="contact-input"
          value={formData.country}
          onChange={handleChange}
          placeholder="United States"
          autoComplete="country-name"
        />
      </div>

      <div className="contact-form-group">
        <label htmlFor="email" className="contact-label">
          Email Address <span className="contact-required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`contact-input${errors.email ? ' contact-input-error' : ''}`}
          value={formData.email}
          onChange={handleChange}
          placeholder="jane@example.com"
          autoComplete="email"
        />
        {errors.email && <span className="contact-error">{errors.email}</span>}
      </div>

      <div className="contact-form-group">
        <label htmlFor="description" className="contact-label">
          How can we help? <span className="contact-required">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          className={`contact-textarea${errors.description ? ' contact-input-error' : ''}`}
          value={formData.description}
          onChange={handleChange}
          placeholder="Tell us about your dream trip, questions about our tours, or anything else..."
          rows={5}
        />
        {errors.description && <span className="contact-error">{errors.description}</span>}
      </div>

      <button type="submit" className="contact-submit-btn">
        Send Message
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </form>
  )
}
