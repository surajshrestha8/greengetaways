import React from 'react'

/** Maps difficulty slug → display color */
export const DIFFICULTY_COLORS: Record<string, string> = {
  easy: '#4caf50',
  moderate: '#ff9800',
  challenging: '#f44336',
  difficult: '#9c27b0',
}

/** Maps tour type slug → display color */
export const TOUR_TYPE_COLORS: Record<string, string> = {
  adventure: '#ff6b35',
  beach: '#00b4d8',
  cultural: '#9c27b0',
  wildlife: '#4caf50',
  city: '#607d8b',
  cruise: '#0077b6',
  honeymoon: '#e91e63',
  family: '#ff9800',
  luxury: '#ffd700',
  budget: '#8bc34a',
}

/** Maps tour type slug → small icon */
export const TOUR_TYPE_ICONS: Record<string, React.ReactNode> = {
  adventure: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 11l18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 11-5.8-1.6" />
    </svg>
  ),
  beach: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="5" r="3" />
      <path d="M12 22V8M5 12l7 3 7-3" />
    </svg>
  ),
  cultural: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  wildlife: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2a4 4 0 014 4c0 1.5-.8 3-2 4l2 10H8l2-10c-1.2-1-2-2.5-2-4a4 4 0 014-4z" />
    </svg>
  ),
  city: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </svg>
  ),
  cruise: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M19.38 20A11.6 11.6 0 0020 17l-9-4-9 4c0 1 .19 2.04.56 3" />
      <path d="M11 4V1l-1 3M19 8l-4-2" />
    </svg>
  ),
  honeymoon: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z" />
    </svg>
  ),
  family: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  luxury: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  budget: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
}

/** Maps activity slug → icon */
export const ACTIVITY_ICONS: Record<string, React.ReactNode> = {
  trekking: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 16.5l3-3m0 0l3-3m-3 3l-3-3m3 3l3 3" />
      <circle cx="8" cy="4" r="2" />
      <path d="M12 22V10M4 22l4-10M8 10l-4-2M12 10l-4-6" />
    </svg>
  ),
  cycling: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <circle cx="15" cy="5" r="1" />
      <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
    </svg>
  ),
  'day-trips': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  'multi-day': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  camping: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l8 18H4L12 2z" />
      <path d="M12 8v6" />
    </svg>
  ),
  'water-sports': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12h2a2 2 0 002-2V8a2 2 0 012-2h3a2 2 0 012 2v2a2 2 0 002 2h2a2 2 0 012-2V8a2 2 0 012-2h1" />
      <path d="M2 17c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  ),
  'bird-watching': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 7h.01M3.4 18H12a8 8 0 008-8V7a4 4 0 00-7.28-2.3L2 20" />
      <path d="M20 7l2 2-2 2" />
    </svg>
  ),
  photography: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
}

/** Maps blog category slug → display label */
export const BLOG_CATEGORY_LABELS: Record<string, string> = {
  'travel-tips': 'Travel Tips',
  'destination-guides': 'Destination Guides',
  'travel-stories': 'Travel Stories',
  'travel-news': 'Travel News',
  'photography': 'Photography',
  'culture': 'Culture',
  'food': 'Food & Cuisine',
  'adventure': 'Adventure',
}
