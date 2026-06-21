import { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventType', 'startDate', 'status', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'eventType',
      type: 'select',
      required: true,
      options: [
        { label: 'Festival', value: 'festival' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Trek Departure', value: 'trek-departure' },
        { label: 'Cultural', value: 'cultural' },
        { label: 'Environmental', value: 'environmental' },
        { label: 'Community', value: 'community' },
        { label: 'Seasonal', value: 'seasonal' },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 250,
      admin: {
        description: 'Brief summary for card preview',
      },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        description: 'Primary date for calendar placement',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        description: 'Optional end date for multi-day events',
      },
    },
    {
      name: 'startTime',
      type: 'text',
      admin: {
        description: 'e.g. "8:00 AM"',
      },
    },
    {
      name: 'endTime',
      type: 'text',
      admin: {
        description: 'e.g. "5:00 PM"',
      },
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'region',
          type: 'text',
        },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'isFree',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'price',
          type: 'number',
          admin: {
            condition: (data, siblingData) => !siblingData?.isFree,
          },
        },
        {
          name: 'currency',
          type: 'text',
          defaultValue: 'USD',
          admin: {
            condition: (data, siblingData) => !siblingData?.isFree,
          },
        },
      ],
    },
    {
      name: 'relatedTour',
      type: 'relationship',
      relationTo: 'tours',
    },
    {
      name: 'externalLink',
      type: 'text',
      admin: {
        description: 'Optional external registration URL',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'upcoming',
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'metaTitle',
      type: 'text',
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      maxLength: 160,
    },
  ],
}
