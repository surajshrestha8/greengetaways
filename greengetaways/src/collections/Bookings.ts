import type { CollectionBeforeChangeHook, CollectionConfig, PayloadRequest } from 'payload'

type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'refunded'
type SeatHoldStatus = 'held' | 'released' | 'not-applicable'

type DepartureDate = {
  id?: string | null
  date?: string | null
  availableSeats?: number | null
  note?: string | null
  status?: 'available' | 'sold-out' | 'blocked' | 'private-only' | null
}

type TourWithAvailability = {
  id: number | string
  availability?: {
    startDate?: string | null
    endDate?: string | null
    departureDates?: DepartureDate[] | null
  } | null
}

const holdingStatuses: BookingStatus[] = ['pending', 'confirmed']
const releaseStatuses: BookingStatus[] = ['cancelled', 'refunded']

const getRelationshipID = (value: unknown): number | string | null => {
  if (typeof value === 'number' || typeof value === 'string') return value
  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id?: number | string }).id
    return id ?? null
  }
  return null
}

const normalizeDate = (value: string | Date | null | undefined): string | null => {
  if (!value) return null
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString().split('T')[0]
}

const getDepartureIndex = (departures: DepartureDate[], departureDate: string): number => {
  const targetDate = normalizeDate(departureDate)
  if (!targetDate) return -1

  return departures.findIndex((departure) => normalizeDate(departure.date) === targetDate)
}

const updateTourDepartureSeats = async ({
  departureDate,
  reason,
  req,
  seatsDelta,
  tourID,
}: {
  departureDate: string
  reason: string
  req: PayloadRequest
  seatsDelta: number
  tourID: number | string
}): Promise<SeatHoldStatus> => {
  const tour = (await req.payload.findByID({
    collection: 'tours',
    id: tourID,
    depth: 0,
    req,
  })) as TourWithAvailability | null

  const departures = tour?.availability?.departureDates ?? []

  if (departures.length === 0) {
    return 'not-applicable'
  }

  const departureIndex = getDepartureIndex(departures, departureDate)

  if (departureIndex === -1) {
    throw new Error('Selected departure date is not available for this tour.')
  }

  const selectedDeparture = departures[departureIndex]
  const currentSeats = selectedDeparture.availableSeats ?? 0
  const nextSeats = currentSeats + seatsDelta

  if (nextSeats < 0) {
    throw new Error('Not enough seats available for this departure date.')
  }

  const updatedDepartures = departures.map((departure, index) =>
    index === departureIndex
      ? {
          ...departure,
          availableSeats: nextSeats,
        }
      : departure,
  )

  await req.payload.update({
    collection: 'tours',
    id: tourID,
    data: {
      availability: {
        ...(tour?.availability ?? {}),
        departureDates: updatedDepartures,
      },
    },
    req,
    context: {
      skipBookingSeatHoldHooks: true,
      seatHoldReason: reason,
    },
  })

  return 'held'
}

const manageSeatHold: CollectionBeforeChangeHook = async ({
  context,
  data,
  operation,
  originalDoc,
  req,
}) => {
  if (context.skipBookingSeatHoldHooks) return data

  if (!data.bookingReference) {
    data.bookingReference = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  }

  const nextStatus = (data.status ?? originalDoc?.status ?? 'pending') as BookingStatus
  const previousHoldStatus = originalDoc?.seatHold?.status as SeatHoldStatus | undefined
  const isPreviouslyHeld = previousHoldStatus === 'held'
  const isNextHoldingStatus = holdingStatuses.includes(nextStatus)
  const isNextReleaseStatus = releaseStatuses.includes(nextStatus)

  const tourID = getRelationshipID(data.tour ?? originalDoc?.tour)
  const departureDate = data.departureDate ?? originalDoc?.departureDate
  const seats = Number(data.numberOfTravelers ?? originalDoc?.numberOfTravelers ?? 0)

  if (!tourID || !departureDate || !Number.isFinite(seats) || seats < 1) {
    return data
  }

  if (isPreviouslyHeld && isNextReleaseStatus) {
    await updateTourDepartureSeats({
      departureDate,
      reason: `Released seats for ${nextStatus} booking`,
      req,
      seatsDelta: seats,
      tourID,
    })

    data.seatHold = {
      ...(data.seatHold ?? originalDoc?.seatHold ?? {}),
      status: 'released',
      seats,
      releasedAt: new Date().toISOString(),
      releaseReason: nextStatus,
    }

    return data
  }

  if (!isPreviouslyHeld && isNextHoldingStatus) {
    const holdStatus = await updateTourDepartureSeats({
      departureDate,
      reason: operation === 'create' ? 'Held seats for new booking' : 'Re-held seats for booking',
      req,
      seatsDelta: -seats,
      tourID,
    })

    data.seatHold = {
      ...(data.seatHold ?? {}),
      status: holdStatus,
      seats: holdStatus === 'held' ? seats : 0,
      releasedAt: null,
      releaseReason: null,
    }
  }

  return data
}

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'bookingReference',
    defaultColumns: ['bookingReference', 'customerName', 'tour', 'status', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return false
    },
  },
  fields: [
    {
      name: 'bookingReference',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique booking reference number',
      },
    },
    {
      name: 'tour',
      type: 'relationship',
      relationTo: 'tours',
      required: true,
    },
    {
      name: 'departureDate',
      type: 'date',
      required: true,
    },
    {
      name: 'numberOfTravelers',
      type: 'number',
      required: true,
      min: 1,
    },
    {
      name: 'customerInfo',
      type: 'group',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'address',
          type: 'textarea',
        },
        {
          name: 'country',
          type: 'text',
        },
        {
          name: 'passportNumber',
          type: 'text',
        },
      ],
    },
    {
      name: 'travelers',
      type: 'array',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
        {
          name: 'dateOfBirth',
          type: 'date',
        },
        {
          name: 'passportNumber',
          type: 'text',
        },
        {
          name: 'specialRequirements',
          type: 'textarea',
          admin: {
            description: 'Dietary restrictions, medical conditions, etc.',
          },
        },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'subtotal',
          type: 'number',
          required: true,
        },
        {
          name: 'taxes',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'discount',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'total',
          type: 'number',
          required: true,
        },
        {
          name: 'currency',
          type: 'text',
          defaultValue: 'USD',
        },
      ],
    },
    {
      name: 'payment',
      type: 'group',
      fields: [
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'pending',
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Deposit Paid', value: 'deposit' },
            { label: 'Fully Paid', value: 'paid' },
            { label: 'Refunded', value: 'refunded' },
            { label: 'Failed', value: 'failed' },
          ],
        },
        {
          name: 'method',
          type: 'select',
          options: [
            { label: 'Credit Card', value: 'credit-card' },
            { label: 'Bank Transfer', value: 'bank-transfer' },
            { label: 'PayPal', value: 'paypal' },
            { label: 'Cash', value: 'cash' },
          ],
        },
        {
          name: 'transactionId',
          type: 'text',
        },
        {
          name: 'paidAmount',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'remainingAmount',
          type: 'number',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Completed', value: 'completed' },
        { label: 'Refunded', value: 'refunded' },
      ],
    },
    {
      name: 'seatHold',
      type: 'group',
      admin: {
        description: 'Tracks whether this booking is holding seats from a scheduled departure',
        position: 'sidebar',
      },
      fields: [
        {
          name: 'status',
          type: 'select',
          defaultValue: 'not-applicable',
          options: [
            { label: 'Held', value: 'held' },
            { label: 'Released', value: 'released' },
            { label: 'Not Applicable', value: 'not-applicable' },
          ],
        },
        {
          name: 'seats',
          type: 'number',
          defaultValue: 0,
          min: 0,
        },
        {
          name: 'releasedAt',
          type: 'date',
        },
        {
          name: 'releaseReason',
          type: 'text',
        },
      ],
    },
    {
      name: 'specialRequests',
      type: 'textarea',
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: {
        description: 'Internal notes not visible to customer',
      },
    },
    {
      name: 'assignedAgent',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Travel agent handling this booking',
      },
    },
  ],
  hooks: {
    beforeChange: [manageSeatHold],
  },
}
