import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config: configPromise })

    const existingSubscriber = await payload.find({
      collection: 'newsletter-subscribers',
      where: {
        email: { equals: email.toLowerCase() },
      },
    })

    if (existingSubscriber.docs.length > 0) {
      return NextResponse.json(
        { message: 'This email is already subscribed' },
        { status: 400 }
      )
    }

    await payload.create({
      collection: 'newsletter-subscribers',
      data: {
        email: email.toLowerCase(),
        subscribedAt: new Date().toISOString(),
        status: 'active',
      },
    })

    return NextResponse.json(
      { message: 'Successfully subscribed to the newsletter' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { message: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
