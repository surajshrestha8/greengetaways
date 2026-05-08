import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Bookings } from '@/collections/Bookings'

const getPayloadMock = vi.fn()

vi.mock('payload', async () => {
  const actual = await vi.importActual<typeof import('payload')>('payload')
  return {
    ...actual,
    getPayload: getPayloadMock,
  }
})

vi.mock('@payload-config', () => ({
  default: Promise.resolve({}),
}))

const makeRequest = (body: Record<string, unknown>) =>
  ({
    json: async () => body,
  }) as Request

const validBookingBody = {
  tourId: 1,
  departureDate: '2099-04-10T00:00:00.000Z',
  numberOfTravelers: 2,
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com',
  phone: '+1 555 0100',
  country: 'United States',
  specialRequests: 'Vegetarian meals',
}

const activeTour = {
  id: 1,
  status: 'active',
  pricing: {
    basePrice: 1000,
    discountedPrice: 900,
    currency: 'USD',
  },
  groupSize: {
    max: 10,
  },
  availability: {
    departureDates: [
      {
        date: '2099-04-10T00:00:00.000Z',
        availableSeats: 4,
      },
    ],
  },
}

describe('booking API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 400 when required fields are missing', async () => {
    const { POST } = await import('@/app/api/book/route')

    const response = await POST(makeRequest({}) as never)
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body.message).toBe('Missing required fields')
  })

  it('returns 400 for an invalid departure date', async () => {
    const { POST } = await import('@/app/api/book/route')

    const response = await POST(
      makeRequest({
        ...validBookingBody,
        departureDate: 'not-a-date',
      }) as never,
    )
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body.message).toBe('Please select a valid future departure date')
  })

  it('creates a pending booking with server-calculated pricing', async () => {
    const create = vi.fn().mockResolvedValue({ bookingReference: 'BK-TEST' })
    getPayloadMock.mockResolvedValue({
      findByID: vi.fn().mockResolvedValue(activeTour),
      create,
    })

    const { POST } = await import('@/app/api/book/route')
    const response = await POST(makeRequest(validBookingBody) as never)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.bookingReference).toBe('BK-TEST')
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'bookings',
        data: expect.objectContaining({
          numberOfTravelers: 2,
          payment: expect.objectContaining({
            status: 'pending',
            paidAmount: 0,
            remainingAmount: 1800,
          }),
          pricing: expect.objectContaining({
            subtotal: 1800,
            total: 1800,
            currency: 'USD',
          }),
          status: 'pending',
        }),
      }),
    )
  })

  it('returns 409 when travelers exceed scheduled availability', async () => {
    getPayloadMock.mockResolvedValue({
      findByID: vi.fn().mockResolvedValue(activeTour),
      create: vi.fn(),
    })

    const { POST } = await import('@/app/api/book/route')
    const response = await POST(
      makeRequest({
        ...validBookingBody,
        numberOfTravelers: 5,
      }) as never,
    )
    const body = await response.json()

    expect(response.status).toBe(409)
    expect(body.message).toBe('Only 4 seats available for this departure date')
  })

  it('allows custom-date requests when a tour has no predefined departures', async () => {
    const create = vi.fn().mockResolvedValue({ bookingReference: 'BK-CUSTOM' })
    getPayloadMock.mockResolvedValue({
      findByID: vi.fn().mockResolvedValue({
        ...activeTour,
        availability: {
          departureDates: [],
        },
      }),
      create,
    })

    const { POST } = await import('@/app/api/book/route')
    const response = await POST(makeRequest(validBookingBody) as never)

    expect(response.status).toBe(200)
    expect(create).toHaveBeenCalledOnce()
  })
})

describe('booking seat-hold hook', () => {
  const hook = Bookings.hooks?.beforeChange?.[0]

  it('holds seats when a scheduled booking is created', async () => {
    const update = vi.fn().mockResolvedValue({})
    const req = {
      payload: {
        findByID: vi.fn().mockResolvedValue(activeTour),
        update,
      },
    }
    const data = {
      ...validBookingBody,
      tour: 1,
      status: 'pending',
    }

    const result = await hook!({
      data,
      operation: 'create',
      req,
      context: {},
    } as never)

    expect(result.seatHold).toMatchObject({
      status: 'held',
      seats: 2,
    })
    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'tours',
        id: 1,
        data: expect.objectContaining({
          availability: expect.objectContaining({
            departureDates: [
              expect.objectContaining({
                availableSeats: 2,
              }),
            ],
          }),
        }),
        req,
      }),
    )
  })

  it('marks custom-date bookings as not applicable when no departures exist', async () => {
    const req = {
      payload: {
        findByID: vi.fn().mockResolvedValue({
          ...activeTour,
          availability: {
            departureDates: [],
          },
        }),
        update: vi.fn(),
      },
    }

    const result = await hook!({
      data: {
        ...validBookingBody,
        tour: 1,
        status: 'pending',
      },
      operation: 'create',
      req,
      context: {},
    } as never)

    expect(result.seatHold).toMatchObject({
      status: 'not-applicable',
      seats: 0,
    })
    expect(req.payload.update).not.toHaveBeenCalled()
  })

  it('releases held seats when a booking is cancelled', async () => {
    const update = vi.fn().mockResolvedValue({})
    const req = {
      payload: {
        findByID: vi.fn().mockResolvedValue({
          ...activeTour,
          availability: {
            departureDates: [
              {
                date: validBookingBody.departureDate,
                availableSeats: 2,
              },
            ],
          },
        }),
        update,
      },
    }

    const result = await hook!({
      data: {
        status: 'cancelled',
      },
      operation: 'update',
      originalDoc: {
        tour: 1,
        departureDate: validBookingBody.departureDate,
        numberOfTravelers: 2,
        status: 'pending',
        seatHold: {
          status: 'held',
          seats: 2,
        },
      },
      req,
      context: {},
    } as never)

    expect(result.seatHold).toMatchObject({
      status: 'released',
      seats: 2,
      releaseReason: 'cancelled',
    })
    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          availability: expect.objectContaining({
            departureDates: [
              expect.objectContaining({
                availableSeats: 4,
              }),
            ],
          }),
        }),
      }),
    )
  })

  it('does not double-release seats after a booking is already released', async () => {
    const req = {
      payload: {
        findByID: vi.fn(),
        update: vi.fn(),
      },
    }

    const result = await hook!({
      data: {
        status: 'cancelled',
      },
      operation: 'update',
      originalDoc: {
        tour: 1,
        departureDate: validBookingBody.departureDate,
        numberOfTravelers: 2,
        status: 'cancelled',
        seatHold: {
          status: 'released',
          seats: 2,
        },
      },
      req,
      context: {},
    } as never)

    expect(result.seatHold).toBeUndefined()
    expect(req.payload.update).not.toHaveBeenCalled()
  })
})
