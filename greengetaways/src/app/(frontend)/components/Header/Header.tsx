'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import './Header.css'

interface NavItem {
  label: string
  href: string
  hasDropdown?: boolean
  dropdownItems?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  { label: 'HOME', href: '/' },
  {
    label: 'TOURS',
    href: '/tours',
    hasDropdown: true,
    dropdownItems: [
      { label: 'All Tours', href: '/tours' },
      { label: 'Popular Tours', href: '/tours/popular' },
      { label: 'Adventure Tours', href: '/tours/adventure' },
    ],
  },
  {
    label: 'ADVENTURE',
    href: '/adventure',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Trekking', href: '/adventure/trekking' },
      { label: 'Rafting', href: '/adventure/rafting' },
      { label: 'Paragliding', href: '/adventure/paragliding' },
    ],
  },
  {
    label: 'COMPANY',
    href: '/about',
    hasDropdown: true,
    dropdownItems: [
      { label: 'About Us', href: '/about' },
      { label: 'Why Green Getaways', href: '/why-green-getaways' },
      { label: 'Request a B2B Brochure', href: '/b2b-brochure' },
      { label: 'Sign Up for Newsletter', href: '/newsletter' },
      { label: 'Our Fleet', href: '/fleet' },
      { label: 'Meet the Team', href: '/team' },
      { label: 'Legal Document', href: '/legal' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    label: 'CSR',
    href: '/csr',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Our Projects', href: '/csr/projects' },
      { label: 'Get Involved', href: '/csr/get-involved' },
    ],
  },
]

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link href="/" className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Mountain background */}
              <ellipse cx="30" cy="20" rx="28" ry="18" fill="#87CEEB" />
              {/* Mountains */}
              <path d="M5 32 L18 12 L25 20 L35 8 L50 32 Z" fill="#2E7D32" />
              <path d="M35 8 L40 15 L35 15 Z" fill="white" />
              {/* Hikers */}
              <circle cx="20" cy="28" r="2" fill="#1565C0" />
              <line x1="20" y1="30" x2="20" y2="35" stroke="#1565C0" strokeWidth="1.5" />
              <line x1="20" y1="32" x2="17" y2="34" stroke="#1565C0" strokeWidth="1.5" />
              <line x1="20" y1="32" x2="23" y2="34" stroke="#1565C0" strokeWidth="1.5" />
              <circle cx="26" cy="28" r="2" fill="#1565C0" />
              <line x1="26" y1="30" x2="26" y2="35" stroke="#1565C0" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-title">
              <span className="green">Green</span>
              <span className="blue">Getaways</span>
            </span>
            <span className="logo-tagline">TRAVEL FOR SUSTAINABILITY</span>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Navigation */}
        <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="nav-item"
                onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link href={item.href} className="nav-link">
                  {item.label}
                  {item.hasDropdown && (
                    <svg
                      className={`dropdown-icon ${activeDropdown === item.label ? 'open' : ''}`}
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Link>
                {item.hasDropdown && item.dropdownItems && activeDropdown === item.label && (
                  <ul className="dropdown-menu">
                    {item.dropdownItems.map((dropdownItem) => (
                      <li key={dropdownItem.label}>
                        <Link href={dropdownItem.href} className="dropdown-link">
                          {dropdownItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* User Menu */}
          <div
            className="user-menu"
            onMouseEnter={() => handleMouseEnter('user')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="user-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF9800">
                <circle cx="12" cy="8" r="4" />
                <path d="M12 14c-6 0-8 3-8 6v1h16v-1c0-3-2-6-8-6z" />
              </svg>
              <svg
                className={`dropdown-icon ${activeDropdown === 'user' ? 'open' : ''}`}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {activeDropdown === 'user' && (
              <ul className="dropdown-menu user-dropdown">
                <li>
                  <Link href="/login" className="dropdown-link">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="dropdown-link">
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* CTA Button */}
          <Link href="/book" className="cta-btn">
            Make my trip
          </Link>
        </nav>
      </div>
    </header>
  )
}
