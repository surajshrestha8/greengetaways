'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import type { Tour } from '@/payload-types'
import './Header.css'

interface NavItem {
  label: string
  href: string
  hasDropdown?: boolean
  dropdownItems?: { label: string; href: string }[]
}

interface HeaderProps {
  tours: Tour[]
}

export default function Header({ tours }: HeaderProps) {
  const navItems: NavItem[] = useMemo(() => [
    { label: 'Home', href: '/' },
    {
      label: 'Tours',
      href: '/tours',
      hasDropdown: true,
      dropdownItems: [
        { label: 'All Tours', href: '/tours' },
        ...tours.map(tour => ({
          label: tour.title,
          href: `/tours/${tour.slug}`,
        })),
      ],
    },
    {
      label: 'Destinations',
      href: '/destinations',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Everest Region', href: '/destinations/everest' },
        { label: 'Annapurna Region', href: '/destinations/annapurna' },
        { label: 'Manaslu Region', href: '/destinations/manaslu' },
        { label: 'Langtang Region', href: '/destinations/langtang' },
      ],
    },
    {
      label: 'About',
      href: '/about',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Our Story', href: '/about' },
        { label: 'Why Choose Us', href: '/about/why-us' },
        { label: 'Our Team', href: '/about/team' },
        { label: 'Sustainability', href: '/about/sustainability' },
      ],
    },
    { label: 'Contact', href: '/contact' },
  ], [tours])
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <Link href="/" className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="30" cy="20" rx="28" ry="18" fill="#e8f5e9" />
              <path d="M5 32 L18 12 L25 20 L35 8 L50 32 Z" fill="#2e7d32" />
              <path d="M35 8 L40 15 L35 15 Z" fill="#ffffff" />
              <circle cx="20" cy="28" r="1.5" fill="#1b5e20" />
              <line x1="20" y1="29.5" x2="20" y2="33" stroke="#1b5e20" strokeWidth="1.2" />
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-title">Green Getaways</span>
            <span className="logo-tagline">Sustainable Adventures</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
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
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
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
        </nav>

        {/* Right Section */}
        <div className="header-right">
          <Link href="/book" className="cta-btn">
            Plan Your Trip
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <nav className="mobile-nav">
              {navItems.map((item) => (
                <div key={item.label} className="mobile-nav-item">
                  <Link
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={() => !item.hasDropdown && setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && item.dropdownItems && (
                    <ul className="mobile-dropdown">
                      {item.dropdownItems.map((dropdownItem) => (
                        <li key={dropdownItem.label}>
                          <Link
                            href={dropdownItem.href}
                            className="mobile-dropdown-link"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
