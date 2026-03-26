import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerName, customerLocation, rating, title, review, travelDate } = body

    if (!customerName?.trim() || !rating || !title?.trim() || !review?.trim()) {
      return NextResponse.json({ message: 'Name, rating, title, and review are required.' }, { status: 400 })
    }

    const ratingNum = Number(rating)
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json({ message: 'Rating must be between 1 and 5.' }, { status: 400 })
    }

    if (review.trim().length < 10) {
      return NextResponse.json({ message: 'Review must be at least 10 characters.' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'testimonials',
      data: {
        customerName: customerName.trim(),
        customerLocation: customerLocation?.trim() || undefined,
        rating: ratingNum,
        title: title.trim(),
        review: review.trim(),
        travelDate: travelDate || new Date().toISOString(),
        status: 'pending',
        featured: false,
        verifiedBooking: false,
      },
    })

    return NextResponse.json(
      { message: 'Thank you! Your review has been submitted and will appear once approved.' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Review submission error:', error)
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' },
      { status: 500 },
    )
  }
}
