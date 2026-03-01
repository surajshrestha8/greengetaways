import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, question, tourId } = body

    // Validation
    if (!name?.trim() || !email?.trim() || !question?.trim() || !tourId) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Invalid email address.' }, { status: 400 })
    }

    if (question.trim().length < 10) {
      return NextResponse.json(
        { message: 'Question must be at least 10 characters.' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: configPromise })

    const resolvedTourId = Number(tourId)
    if (isNaN(resolvedTourId) || resolvedTourId <= 0) {
      return NextResponse.json({ message: 'Invalid tour.' }, { status: 400 })
    }

    await payload.create({
      collection: 'tour-questions',
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        question: question.trim(),
        tour: resolvedTourId,
        status: 'pending',
      },
    })

    return NextResponse.json(
      { message: 'Your question has been submitted. We will get back to you soon!' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Tour question error:', error)
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' },
      { status: 500 },
    )
  }
}
