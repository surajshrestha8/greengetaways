import React from 'react'
import Link from 'next/link'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      {/* Our Associations Section */}
      <div className="footer-associations">
        <h2 className="footer-associations-title">Our Associations</h2>
        {/* Add association logos here if needed */}
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-column footer-company">
              <div className="footer-logo">
                {/* Add logo here */}
              </div>
              <p className="footer-description">
                Green Getaways is a family-run, first sustainable tourism company in Nepal. We
                offer more than hundred sustainable tourism packages making minimal harm to the local
                communities and the host environment.
              </p>
              <div className="footer-social">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="footer-column">
              <nav className="footer-nav">
                <Link href="/" className="footer-link">Home</Link>
                <Link href="/about" className="footer-link">About Us</Link>
                <Link href="/contact" className="footer-link">Contact</Link>
                <Link href="/career" className="footer-link">Career</Link>
              </nav>
            </div>

            {/* Legal Links */}
            <div className="footer-column">
              <nav className="footer-nav">
                <Link href="/terms" className="footer-link">Terms and Conditions</Link>
                <Link href="/privacy" className="footer-link">Privacy Policy</Link>
                <Link href="/travel-insurance" className="footer-link">Travel Insurance</Link>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="footer-column">
              <h3 className="footer-column-title">Contact</h3>
              <div className="footer-contact">
                <a href="mailto:sales@greengetaways.com.np" className="footer-contact-link">
                  sales@greengetaways.com.np
                </a>
                <a href="mailto:info@greengetaways.com.np" className="footer-contact-link">
                  info@greengetaways.com.np
                </a>
                <a href="tel:+9779849934867" className="footer-contact-link">
                  +977 9849934867
                </a>
                <a href="tel:+9779801136694" className="footer-contact-link">
                  +977 9801136694
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom">
        <div className="footer-container">
          <p className="footer-copyright">
            Copyright © all rights reserved, {currentYear} Green Getaways
          </p>
        </div>
      </div>
    </footer>
  )
}
