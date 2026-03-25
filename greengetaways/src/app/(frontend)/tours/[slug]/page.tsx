import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Tour, Media, Testimonial, Destination, ActivityCategory } from '@/payload-types'
import TourCard from '../../components/TourCard'
import TourTabs from './TourTabs'
import TourWhyChooseUsAccordion from './TourWhyChooseUsAccordion'
import TourHighlightsAccordion from './TourHighlightsAccordion'
import './tour-detail.css'

interface TourDetailPageProps {
  params: Promise<{ slug: string }>
}

// Force dynamic rendering to avoid database queries at build time
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: TourDetailPageProps) {
  const { slug } = await params

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'tours',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    const tour = docs[0]

    if (!tour) {
      return { title: 'Tour Not Found - Green Getaways' }
    }

    return {
      title: `${tour.title} - Green Getaways`,
      description: tour.shortDescription || tour.metaDescription,
    }
  } catch (_error) {
    // Database not ready yet
    return { title: 'Tour - Green Getaways' }
  }
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { slug } = await params

  try {
    const payload = await getPayload({ config: configPromise })

    const { docs } = await payload.find({
      collection: 'tours',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    const tour = docs[0] as Tour

    if (!tour) {
      notFound()
    }

    // Fetch testimonials for this tour
    const { docs: testimonials } = await payload.find({
      collection: 'testimonials',
      where: {
        and: [
          { tour: { equals: tour.id } },
          { status: { equals: 'approved' } },
        ],
      },
      limit: 10,
      sort: '-createdAt',
    })

    // Fetch suggested tours (same tour type, excluding current tour)
    const { docs: suggestedTours } = await payload.find({
      collection: 'tours',
      where: {
        and: [
          { slug: { not_equals: slug } },
          { status: { equals: 'active' } },
        ],
      },
      limit: 3,
      sort: '-popularityScore',
    })

    const featuredImage = tour.featuredImage as Media
    const price = tour.pricing?.basePrice || 0
    const discountedPrice = tour.pricing?.discountedPrice
    const currency = tour.pricing?.currency || 'USD'

    const getSupabaseImageUrl = (media: Media | null | undefined): string | null => {
      if (media?.filename && process.env.SUPABASE_PUBLIC_URL) {
        return `${process.env.SUPABASE_PUBLIC_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET_NAME}/${media.filename}`
      }
      return media?.url || null
    }

    // Prepare gallery images (featured image + gallery)
    const galleryImages: { url: string; alt: string }[] = []

    // Add featured image first
    const featuredUrl = getSupabaseImageUrl(featuredImage)
    if (featuredUrl) {
      galleryImages.push({ url: featuredUrl, alt: featuredImage.alt || tour.title })
    }

    // Add gallery images
    if (tour.gallery && tour.gallery.length > 0) {
      tour.gallery.forEach((item) => {
        const img = item.image as Media
        const imgUrl = getSupabaseImageUrl(img)
        if (imgUrl) {
          galleryImages.push({ url: imgUrl, alt: img?.alt || tour.title })
        }
      })
    }

    const formatPrice = (amount: number, curr: string) => {
      const symbol = curr === 'USD' ? '$' : curr
      return `${symbol} ${amount.toLocaleString()}`
    }

    const difficultyColors: Record<string, string> = {
      easy: '#4caf50',
      moderate: '#ff9800',
      challenging: '#f44336',
      difficult: '#9c27b0',
    }

    // Tour type colors
    const tourTypeColors: Record<string, string> = {
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

    // Tour type icons
    const tourTypeIcons: Record<string, React.ReactNode> = {
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

    // Activity category icons
    const activityIcons: Record<string, React.ReactNode> = {
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

    // Resolve relationship arrays (Payload populates as objects at runtime)
    const resolvedDestinations =
      tour.destination
        ?.filter((d): d is Destination => typeof d === 'object')
        .map((d) => d.name)
        .join(', ') ?? null

    const resolvedActivities =
      tour.activityCategory
        ?.filter((a): a is ActivityCategory => typeof a === 'object')
        .map((a) => a.name)
        .join(', ') ?? null

    const maxAltitudeStr = (() => {
      const alt = tour.maxAltitude
      if (!alt?.meters && !alt?.feet) return null
      const parts: string[] = []
      if (alt.meters) parts.push(`${alt.meters.toLocaleString()}m`)
      if (alt.feet) parts.push(`(${alt.feet.toLocaleString()}ft)`)
      const base = parts.join(' ')
      return alt.location ? `${base} at ${alt.location}` : base
    })()

    const totalMealsStr = (() => {
      const m = tour.totalMeals
      if (!m) return null
      const parts: string[] = []
      if (m.breakfast) parts.push(`${m.breakfast} Breakfast`)
      if (m.lunch) parts.push(`${m.lunch} Lunch`)
      if (m.dinner) parts.push(`${m.dinner} Dinner`)
      return parts.length ? parts.join(', ') : null
    })()

    return (
      <div className="tour-detail">
      {/* Tour Title Section */}
      <section className="tour-title-section">
        <div className="tour-title-container">
          <h1 className="tour-main-title">{tour.title}</h1>
          {/* <div className="tour-meta-info">
            {destinations && destinations.length > 0 && (
              <span className="tour-location">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {destinations.map((d) => d.name).join(', ')}
              </span>
            )}
            <span className="tour-duration">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />  
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {tour.duration?.days || 0} Days / {tour.duration?.nights || 0} Nights
            </span>
            {tour.difficulty && (
              <span
                className="tour-difficulty"
                style={{ color: difficultyColors[tour.difficulty] }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                {tour.difficulty.charAt(0).toUpperCase() + tour.difficulty.slice(1)}
              </span>
            )}
          </div> */}

          {/* Tour Type Badges & Activity Pills */}
          <div className="tour-badges-section">
            {/* Tour Type Badges */}
            {tour.tourType && tour.tourType.length > 0 && (
              <div className="tour-type-badges">
                {tour.tourType.map((type) => (
                  <span
                    key={type}
                    className="tour-type-badge"
                    style={{
                      backgroundColor: `${tourTypeColors[type] || '#4caf50'}20`,
                      color: tourTypeColors[type] || '#4caf50',
                      borderColor: `${tourTypeColors[type] || '#4caf50'}40`,
                    }}
                  >
                    {tourTypeIcons[type]}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                ))}
              </div>
            )}

            {/* Activity Category Pills */}
            {tour.activityCategory && tour.activityCategory.length > 0 && (
              <div className="activity-pills">
                {(tour.activityCategory as ActivityCategory[]).map((activity) => (
                  <span key={activity.id} className="activity-pill">
                    {activityIcons[activity.slug] || (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12h8M12 8v8" />
                      </svg>
                    )}
                    {activity.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image Gallery Grid */}
      <section className="tour-gallery-section">
        <div className="tour-gallery-container">
          <div className={`tour-gallery-grid images-${Math.min(galleryImages.length, 5)}`}>
            {galleryImages.slice(0, 5).map((img, index) => (
              <div
                key={index}
                className={`gallery-item ${index === 0 ? 'gallery-main' : ''}`}
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={index === 0}
                />
                {index === 4 && galleryImages.length > 5 && (
                  <div className="gallery-more-overlay">
                    <span>+{galleryImages.length - 5} more</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="tour-detail-container">
        <div className="tour-detail-layout">
          {/* Left: Tabs Content */}
          <div className="tour-detail-main">
            {/* Quick Info Bar */}
            {/* <div className="tour-quick-info-bar">
              <div className="quick-info-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>{tour.groupSize?.min || 1} - {tour.groupSize?.max} People</span>
              </div>
              <div className="quick-info-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{tour.duration?.days || 0} Days</span>
              </div>
              {tour.highlights && tour.highlights.length > 0 && (
                <div className="quick-info-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>{tour.highlights.length} Highlights</span>
                </div>
              )}
            </div> */}

            {/* Overview */}
            <div className="tour-overview">
              <h2>Overview</h2>
              <p>{tour.shortDescription}</p>
            </div>

            {/* Tour Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
              <div className="tour-highlights">
                <h2>Tour Highlights</h2>
                <TourHighlightsAccordion highlights={tour.highlights} />
              </div>
            )}

            {/* Why Choose Us Section */}
            {tour.whyChooseUs && (
              <div className="why-choose-us">
                <TourWhyChooseUsAccordion data={tour.whyChooseUs} />
              </div>
            )}

            {/* Tabs Section */}
            <TourTabs tour={tour} testimonials={testimonials as Testimonial[]} />
          </div>

          {/* Right: Booking Sidebar */}
          <aside className="tour-detail-sidebar">
            <div className="tour-booking-card">
              <div className="tour-price">
                {discountedPrice ? (
                  <>
                    <span className="price-original">{formatPrice(price, currency)}</span>
                    <span className="price-discounted">{formatPrice(discountedPrice, currency)}</span>
                  </>
                ) : (
                  <span className="price-current">{formatPrice(price, currency)}</span>
                )}
                <span className="price-per">per person</span>
              </div>

              <Link href={`/book?tour=${tour.slug}`} className="book-now-btn">
                Book This Tour
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>

              <Link href="/contact" className="inquiry-btn">
                Have Questions? Contact Us
              </Link>
            </div>

            {/* Trip Overview Badges */}
            {(() => {
              const items: { label: string; value: string; icon: React.ReactNode; valueColor?: string }[] = []

              if (resolvedDestinations) items.push({
                label: 'Destination', value: resolvedDestinations,
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
              })
              if (resolvedActivities) items.push({
                label: 'Activity', value: resolvedActivities,
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="4" r="2"/><path d="M12 22V10M4 22l4-10M8 10l-4-2M12 10l-4-6"/></svg>,
              })
              if (tour.region) items.push({
                label: 'Region', value: tour.region,
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>,
              })
              if (tour.duration?.days) items.push({
                label: 'Duration', value: `${tour.duration.days} Days / ${tour.duration.nights || 0} Nights`,
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
              })
              if (tour.groupSize?.max) items.push({
                label: 'Group Size', value: `${tour.groupSize.min || 1} – ${tour.groupSize.max} People`,
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
              })
              if (tour.difficulty) items.push({
                label: 'Difficulty', value: tour.difficulty.charAt(0).toUpperCase() + tour.difficulty.slice(1),
                valueColor: difficultyColors[tour.difficulty],
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
              })
              if (tour.bestSeason) items.push({
                label: 'Best Season', value: tour.bestSeason,
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
              })
              if (maxAltitudeStr) items.push({
                label: 'Max Altitude', value: maxAltitudeStr,
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 22 22 2 22"/><polyline points="12 8 8 18 16 18"/></svg>,
              })
              if (tour.accommodationType) items.push({
                label: 'Accommodation', value: tour.accommodationType,
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
              })
              if (totalMealsStr) items.push({
                label: 'Total Meals', value: totalMealsStr,
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
              })
              if (tour.adventureWalkHours) items.push({
                label: 'Walking Hours', value: tour.adventureWalkHours,
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
              })
              if (tour.ageRequirement?.minimum) items.push({
                label: 'Min Age', value: `${tour.ageRequirement.minimum} years`,
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
              })

              if (items.length === 0) return null

              return (
                <div className="sidebar-trip-overview">
                  <h4>Trip Overview</h4>
                  <div className="trip-overview-grid">
                    {items.map((item) => (
                      <div key={item.label} className="trip-overview-card">
                        <div className="trip-overview-icon">{item.icon}</div>
                        <div className="trip-overview-content">
                          <div className="trip-overview-label">{item.label}</div>
                          <div className="trip-overview-value" style={item.valueColor ? { color: item.valueColor } : undefined}>{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}
          </aside>
        </div>
      </div>

      {/* Suggested Tours */}
      {suggestedTours && suggestedTours.length > 0 && (
        <section className="suggested-tours">
          <div className="suggested-tours-container">
            <div className="suggested-tours-header">
              <h2>You May Also Like</h2>
              <p>Explore more eco-friendly adventures</p>
            </div>
            <div className="suggested-tours-grid">
              {suggestedTours.map((suggestedTour) => (
                <TourCard key={suggestedTour.id} tour={suggestedTour} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
    )
  } catch (_error) {
    // Database not ready or tour not found
    console.log('Database error')
    notFound()
  }
}
