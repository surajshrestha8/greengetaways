import { CollectionConfig } from 'payload'

export const SpecialServices: CollectionConfig = {
  slug: 'special-services',
  admin: {
    useAsTitle: 'serviceName',
    defaultColumns: ['serviceName', 'serviceType', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'serviceName',
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
      name: 'serviceType',
      type: 'select',
      required: true,
      options: [
        { label: 'MICE (Meetings, Incentives, Conferences, Events)', value: 'mice' },
        { label: 'Wedding in Nepal', value: 'wedding' },
        { label: 'Filming and Documentary', value: 'filming' },
        { label: 'Yoga and Meditation', value: 'yoga' },
        { label: 'Team Building', value: 'team-building' },
        { label: 'Rock Climbing', value: 'rock-climbing' },
        { label: 'Homestay Programs', value: 'homestay' },
        { label: 'Educational Tours', value: 'educational' },
        { label: 'Custom Service', value: 'custom' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 250,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Key features or highlights of this service',
      },
    },
    {
      name: 'whatWeOffer',
      type: 'array',
      fields: [
        {
          name: 'offering',
          type: 'text',
        },
      ],
      admin: {
        description: 'Specific offerings included in this service',
      },
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'pricingModel',
          type: 'select',
          options: [
            { label: 'Fixed Price', value: 'fixed' },
            { label: 'Per Person', value: 'per-person' },
            { label: 'Per Day', value: 'per-day' },
            { label: 'Custom Quote', value: 'custom' },
          ],
        },
        {
          name: 'startingPrice',
          type: 'number',
          admin: {
            description: 'Starting price (if applicable)',
          },
        },
        {
          name: 'currency',
          type: 'text',
          defaultValue: 'USD',
        },
        {
          name: 'pricingNote',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'requirements',
      type: 'richText',
      admin: {
        description: 'Requirements or prerequisites for this service',
      },
    },
    {
      name: 'sampleItinerary',
      type: 'array',
      fields: [
        {
          name: 'day',
          type: 'number',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'richText',
        },
      ],
      admin: {
        description: 'Sample itinerary (if applicable)',
      },
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      admin: {
        description: 'Related testimonials for this service',
      },
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        {
          name: 'contactPerson',
          type: 'text',
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        },
      ],
      admin: {
        description: 'Specific contact for this service',
      },
    },
    {
      name: 'faq',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Coming Soon', value: 'coming-soon' },
        { label: 'Seasonal', value: 'seasonal' },
        { label: 'Inactive', value: 'inactive' },
      ],
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
