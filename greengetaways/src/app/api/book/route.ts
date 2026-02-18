import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      tourId,
      departureDate,
      numberOfTravelers,
      firstName,
      lastName,
      email,
      phone,
      country,
      specialRequests,
    } = body

    if (!tourId || !departureDate || !numberOfTravelers || !firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 },
      )
    }

    if (typeof numberOfTravelers !== 'number' || numberOfTravelers < 1) {
      return NextResponse.json(
        { message: 'Number of travelers must be at least 1' },
        { status: 400 },
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    // Payload uses integer IDs with PostgreSQL — coerce to number
    const resolvedTourId = Number(tourId)
    if (isNaN(resolvedTourId) || resolvedTourId <= 0) {
      return NextResponse.json({ message: 'Invalid tour ID' }, { status: 400 })
    }

    const tour = await payload.findByID({
      collection: 'tours',
      id: resolvedTourId,
    })

    if (!tour) {
      return NextResponse.json({ message: 'Tour not found' }, { status: 404 })
    }

    const pricePerPerson = tour.pricing?.discountedPrice || tour.pricing?.basePrice || 0
    const subtotal = pricePerPerson * numberOfTravelers
    const total = subtotal

    // Pre-generate reference so it is available even if beforeChange hook runs after validation
    const bookingReference = `BK-${Date.now()}-${Math.random().toString(36).substring(2, 11).toUpperCase()}`

    const booking = await payload.create({
      collection: 'bookings',
      data: {
        bookingReference,
        tour: resolvedTourId,
        departureDate: new Date(departureDate).toISOString(),
        numberOfTravelers,
        customerInfo: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          country: (country || '').trim(),
        },
        pricing: {
          subtotal,
          taxes: 0,
          discount: 0,
          total,
          currency: tour.pricing?.currency || 'USD',
        },
        payment: {
          status: 'pending',
        },
        status: 'pending',
        specialRequests: specialRequests || '',
      },
    })

    return NextResponse.json(
      {
        bookingReference: booking.bookingReference || bookingReference,
        message: 'Booking request received',
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { message: 'An error occurred. Please try again later.' },
      { status: 500 },
    )
  }
}
