import { faker } from '@faker-js/faker'
import type { Payload } from 'payload'
import { getFutureDate, getPastDate, logComplete, logStart, randomInRange, randomItem } from '../utils'

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Australia',
  'Canada',
  'Germany',
  'France',
  'Japan',
  'South Korea',
  'Netherlands',
  'Italy',
  'Spain',
  'Switzerland',
  'Belgium',
  'New Zealand',
  'Singapore',
  'India',
  'China',
  'Brazil',
  'Mexico',
  'South Africa',
]

const SPECIAL_REQUESTS = [
  'Vegetarian meals only please',
  'Please arrange an early check-in at the hotel',
  'Would like a room on a higher floor if possible',
  'Celebrating anniversary - any special touches appreciated',
  'Need airport wheelchair assistance',
  'Prefer rooms with mountain views',
  'Allergic to peanuts - please inform all restaurants',
  'Would like to arrange a birthday cake on day 3',
  'Please book window seat for all flights',
  'Need extra blankets in teahouses',
  '',
  '',
  '',
]

function generateBookingReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const nums = '0123456789'
  let ref = 'GGT-'
  for (let i = 0; i < 3; i++) ref += chars[Math.floor(Math.random() * chars.length)]
  for (let i = 0; i < 4; i++) ref += nums[Math.floor(Math.random() * nums.length)]
  return ref
}

export async function seedBookings(
  payload: Payload,
  tourIds: number[],
  userIds: number[]
): Promise<number[]> {
  logStart('Bookings')
  const bookingIds: number[] = []

  const statuses: ('pending' | 'confirmed' | 'cancelled' | 'completed' | 'refunded')[] = [
    'confirmed',
    'confirmed',
    'confirmed',
    'confirmed',
    'completed',
    'completed',
    'pending',
    'pending',
    'cancelled',
    'refunded',
  ]

  const paymentStatuses: ('pending' | 'deposit' | 'paid' | 'refunded' | 'failed')[] = [
    'paid',
    'paid',
    'paid',
    'deposit',
    'deposit',
    'pending',
    'refunded',
    'failed',
  ]

  const paymentMethods: ('credit-card' | 'bank-transfer' | 'paypal' | 'cash')[] = [
    'credit-card',
    'credit-card',
    'credit-card',
    'bank-transfer',
    'paypal',
    'cash',
  ]

  for (let i = 0; i < 25; i++) {
    const numberOfTravelers = randomInRange(1, 6)
    const basePrice = randomInRange(800, 3500)
    const subtotal = basePrice * numberOfTravelers
    const taxes = Math.round(subtotal * 0.13) // 13% tax
    const discount = Math.random() > 0.7 ? Math.round(subtotal * 0.1) : 0 // 10% occasional discount
    const total = subtotal + taxes - discount

    const status = randomItem(statuses)
    const paymentStatus = status === 'cancelled' || status === 'refunded'
      ? (status === 'refunded' ? 'refunded' : 'pending')
      : randomItem(paymentStatuses)

    const isPast = status === 'completed' || Math.random() > 0.6
    const departureDate = isPast ? getPastDate(randomInRange(30, 365)) : getFutureDate(randomInRange(30, 180))

    const paidAmount = paymentStatus === 'paid'
      ? total
      : paymentStatus === 'deposit'
        ? Math.round(total * 0.3)
        : paymentStatus === 'refunded'
          ? total
          : 0

    const country = randomItem(COUNTRIES)
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    // Generate travelers
    const travelers = []
    for (let t = 0; t < numberOfTravelers; t++) {
      travelers.push({
        firstName: t === 0 ? firstName : faker.person.firstName(),
        lastName: t === 0 ? lastName : (Math.random() > 0.5 ? lastName : faker.person.lastName()),
        dateOfBirth: faker.date.past({ years: 50, refDate: new Date(2000, 0, 1) }).toISOString(),
        passportNumber: `${faker.string.alpha({ length: 2, casing: 'upper' })}${faker.string.numeric(7)}`,
        specialRequirements: Math.random() > 0.8 ? 'Vegetarian meals' : undefined,
      })
    }

    const booking = await payload.create({
      collection: 'bookings',
      data: {
        bookingReference: generateBookingReference(),
        tour: randomItem(tourIds),
        departureDate,
        numberOfTravelers,
        customerInfo: {
          firstName,
          lastName,
          email: faker.internet.email({ firstName, lastName }).toLowerCase(),
          phone: `+${randomInRange(1, 99)} ${faker.phone.number()}`,
          address: faker.location.streetAddress(),
          country,
          passportNumber: `${faker.string.alpha({ length: 2, casing: 'upper' })}${faker.string.numeric(7)}`,
        },
        travelers,
        pricing: {
          subtotal,
          taxes,
          discount,
          total,
          currency: 'USD',
        },
        payment: {
          status: paymentStatus,
          method: paymentStatus !== 'pending' && paymentStatus !== 'failed' ? randomItem(paymentMethods) : undefined,
          transactionId: paymentStatus === 'paid' || paymentStatus === 'deposit' ? `TXN${faker.string.alphanumeric(12).toUpperCase()}` : undefined,
          paidAmount,
          remainingAmount: total - paidAmount,
        },
        status,
        specialRequests: randomItem(SPECIAL_REQUESTS) || undefined,
        internalNotes: Math.random() > 0.7 ? `Customer contacted via email. ${faker.lorem.sentence()}` : undefined,
        assignedAgent: Math.random() > 0.3 ? randomItem(userIds) : undefined,
      },
    })
    bookingIds.push(booking.id)
  }

  logComplete('Bookings', bookingIds.length)
  return bookingIds
}
