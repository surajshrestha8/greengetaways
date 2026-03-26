import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Testimonial } from '@/payload-types'
import TestimonialSection from '../components/TestimonialSection'
import ReviewSubmitForm from './ReviewSubmitForm'
import './reviews.css'

export const dynamic = 'force-dynamic'

const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    customerName: 'Sarah Mitchell',
    customerLocation: 'London, UK',
    rating: 5,
    title: 'An unforgettable Everest Base Camp experience',
    review:
      'Green Getaways made our Everest Base Camp trek truly magical. Our guide Pemba was knowledgeable, patient, and incredibly kind. The itinerary was perfectly paced and the team took care of every detail. I felt safe and supported throughout. Cannot recommend them enough!',
    travelDate: '2025-10-01T00:00:00.000Z',
    featured: true,
    status: 'approved',
    verifiedBooking: true,
    customerPhoto: null,
    tour: null,
    updatedAt: '2025-10-15T00:00:00.000Z',
    createdAt: '2025-10-15T00:00:00.000Z',
  },
  {
    id: 2,
    customerName: 'Marco Rossi',
    customerLocation: 'Milan, Italy',
    rating: 5,
    title: 'The best wildlife safari in Chitwan',
    review:
      'We spotted rhinos, elephants, and even a tiger on our Chitwan safari with Green Getaways. The naturalist guides were exceptional and clearly passionate about conservation. The eco-lodge they selected was rustic yet comfortable. A perfect blend of adventure and sustainability.',
    travelDate: '2025-11-01T00:00:00.000Z',
    featured: true,
    status: 'approved',
    verifiedBooking: true,
    customerPhoto: null,
    tour: null,
    updatedAt: '2025-11-20T00:00:00.000Z',
    createdAt: '2025-11-20T00:00:00.000Z',
  },
  {
    id: 3,
    customerName: 'Aisha Rahman',
    customerLocation: 'Dubai, UAE',
    rating: 5,
    title: 'Annapurna Circuit — worth every step',
    review:
      'I had always dreamed of the Annapurna Circuit and Green Getaways delivered beyond my expectations. The team was responsive before the trip, flexible on the trail, and genuinely cared about minimising our environmental footprint. The mountain views were out of this world.',
    travelDate: '2025-09-01T00:00:00.000Z',
    featured: false,
    status: 'approved',
    verifiedBooking: true,
    customerPhoto: null,
    tour: null,
    updatedAt: '2025-09-28T00:00:00.000Z',
    createdAt: '2025-09-28T00:00:00.000Z',
  },
  {
    id: 4,
    customerName: 'James & Claire Thornton',
    customerLocation: 'Sydney, Australia',
    rating: 5,
    title: 'Perfect honeymoon in the Himalayas',
    review:
      'We chose Green Getaways for our honeymoon trek to Ghorepani Poon Hill and it was absolutely perfect. The sunrise over Annapurna and Dhaulagiri was breathtaking. Everything from airport pick-up to farewell dinner was seamless. We are already planning our next trip back!',
    travelDate: '2025-12-01T00:00:00.000Z',
    featured: true,
    status: 'approved',
    verifiedBooking: true,
    customerPhoto: null,
    tour: null,
    updatedAt: '2025-12-18T00:00:00.000Z',
    createdAt: '2025-12-18T00:00:00.000Z',
  },
  {
    id: 5,
    customerName: 'Priya Nair',
    customerLocation: 'Bangalore, India',
    rating: 4,
    title: 'A deeply enriching cultural journey',
    review:
      'The Kathmandu Valley cultural tour with Green Getaways opened my eyes to Nepal\'s incredible heritage. Visiting Pashupatinath, Boudhanath, and the hidden courtyards of Bhaktapur with a local guide felt completely different from a typical tourist trip. Highly recommend for those who want depth over speed.',
    travelDate: '2025-08-01T00:00:00.000Z',
    featured: false,
    status: 'approved',
    verifiedBooking: false,
    customerPhoto: null,
    tour: null,
    updatedAt: '2025-08-22T00:00:00.000Z',
    createdAt: '2025-08-22T00:00:00.000Z',
  },
]

export const metadata = {
  title: 'Customer Reviews - Green Getaways',
  description: 'Read reviews from our past travellers and share your own experience with Green Getaways.',
}

export default async function ReviewsPage() {
  let testimonials: Testimonial[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'testimonials',
      where: { status: { equals: 'approved' } },
      sort: '-createdAt',
      limit: 50,
    })
    testimonials = result.docs as Testimonial[]
  } catch (_error) {
    console.log('Could not fetch testimonials')
  }

  return (
    <div className="reviews-page">
      {/* Hero */}
      <section className="reviews-hero">
        <div className="reviews-hero-inner">
          <h1 className="reviews-hero-title">What Our Travellers Say</h1>
          <p className="reviews-hero-subtitle">
            Real stories from real adventurers who explored the world with Green Getaways.
          </p>
        </div>
      </section>

      {/* Approved reviews grid */}
      <TestimonialSection testimonials={testimonials.length > 0 ? testimonials : MOCK_TESTIMONIALS} showHeader={false} />

      {/* Submit form */}
      <section className="reviews-submit-wrapper">
        <div className="reviews-submit-container">
          <ReviewSubmitForm />
        </div>
      </section>
    </div>
  )
}
