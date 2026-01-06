import { CollectionConfig } from 'payload'

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
    beforeChange: [
      ({ data }) => {
        // Generate booking reference if not exists
        if (!data.bookingReference) {
          data.bookingReference = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        }
        return data
      },
    ],
  },
}
