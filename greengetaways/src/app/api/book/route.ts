import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

type DepartureDate = {
  id?: string | null
  date?: string | null
  availableSeats?: number | null
  status?: 'available' | 'sold-out' | 'blocked' | 'private-only' | null
}

const normalizeDate = (value: string | Date | null | undefined): string | null => {
  if (!value) return null
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString().split('T')[0]
}

const isFutureOrToday = (value: string): boolean => {
  const selectedDate = normalizeDate(value)
  const today = normalizeDate(new Date())
  return Boolean(selectedDate && today && selectedDate >= today)
}

const findDeparture = (
  departures: DepartureDate[],
  selectedDate: string,
  selectedDepartureId?: string,
) => {
  if (selectedDepartureId) {
    const departure = departures.find((item) => item.id === selectedDepartureId)
    if (departure) return departure
  }

  const targetDate = normalizeDate(selectedDate)
  return departures.find((departure) => normalizeDate(departure.date) === targetDate)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      tourId,
      departureDate,
      departureId,
      numberOfTravelers,
      firstName,
      lastName,
      email,
      phone,
      country,
      specialRequests,
    } = body

    const parsedNumberOfTravelers = Number(numberOfTravelers)

    if (!tourId || !departureDate || !numberOfTravelers || !firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 },
      )
    }

    if (!Number.isInteger(parsedNumberOfTravelers) || parsedNumberOfTravelers < 1) {
      return NextResponse.json(
        { message: 'Number of travelers must be at least 1' },
        { status: 400 },
      )
    }

    if (!normalizeDate(departureDate) || !isFutureOrToday(departureDate)) {
      return NextResponse.json(
        { message: 'Please select a valid future departure date' },
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

    if (tour.status !== 'active') {
      return NextResponse.json({ message: 'This tour is not currently available for booking' }, { status: 400 })
    }

    const maxGroupSize = tour.groupSize?.max
    if (maxGroupSize && parsedNumberOfTravelers > maxGroupSize) {
      return NextResponse.json(
        { message: `Maximum ${maxGroupSize} travelers allowed for this tour` },
        { status: 400 },
      )
    }

    const departures = tour.availability?.departureDates ?? []

    if (departures.length === 0) {
      return NextResponse.json(
        { message: 'No departure dates are currently available for this tour' },
        { status: 400 },
      )
    }

    const selectedDeparture = findDeparture(departures, departureDate, departureId)

    if (!selectedDeparture) {
      return NextResponse.json(
        { message: 'Selected departure date is not available for this tour' },
        { status: 400 },
      )
    }

    const departureStatus = selectedDeparture.status || 'available'
    if (departureStatus !== 'available') {
      return NextResponse.json(
        { message: 'Selected departure date is not available for online booking' },
        { status: 409 },
      )
    }

    const availableSeats = selectedDeparture.availableSeats ?? 0
    if (availableSeats < parsedNumberOfTravelers) {
      return NextResponse.json(
        { message: `Only ${availableSeats} seats available for this departure date` },
        { status: 409 },
      )
    }

    const pricePerPerson = tour.pricing?.discountedPrice || tour.pricing?.basePrice || 0
    const subtotal = pricePerPerson * parsedNumberOfTravelers
    const total = subtotal

    // Pre-generate reference so it is available even if beforeChange hook runs after validation
    const bookingReference = `BK-${Date.now()}-${Math.random().toString(36).substring(2, 11).toUpperCase()}`

    const booking = await payload.create({
      collection: 'bookings',
      data: {
        bookingReference,
        tour: resolvedTourId,
        departureDate: new Date(departureDate).toISOString(),
        numberOfTravelers: parsedNumberOfTravelers,
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
          paidAmount: 0,
          remainingAmount: total,
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

    if (error instanceof Error && /seats|departure date/i.test(error.message)) {
      return NextResponse.json({ message: error.message }, { status: 409 })
    }

    return NextResponse.json(
      { message: 'An error occurred. Please try again later.' },
      { status: 500 },
    )
  }
}
