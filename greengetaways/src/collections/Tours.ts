import { CollectionConfig } from 'payload'

export const Tours: CollectionConfig = {
  slug: 'tours',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'duration', 'status', 'updatedAt'],
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
      name: 'destination',
      type: 'relationship',
      relationTo: 'destinations',
      required: true,
      hasMany: true,
      admin: {
        description: 'Destinations included in this tour',
      },
    },
    {
      name: 'activityCategory',
      type: 'relationship',
      relationTo: 'activity-categories',
      required: true,
      hasMany: true,
      admin: {
        description: 'Activity categories (e.g., Trekking, Cycling, Day Trips)',
      },
    },
    {
      name: 'tourType',
      type: 'select',
      required: true,
      options: [
        { label: 'Adventure', value: 'adventure' },
        { label: 'Beach & Relaxation', value: 'beach' },
        { label: 'Cultural', value: 'cultural' },
        { label: 'Wildlife', value: 'wildlife' },
        { label: 'City Tours', value: 'city' },
        { label: 'Cruise', value: 'cruise' },
        { label: 'Honeymoon', value: 'honeymoon' },
        { label: 'Family', value: 'family' },
        { label: 'Luxury', value: 'luxury' },
        { label: 'Budget', value: 'budget' },
      ],
      hasMany: true,
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
      maxLength: 200,
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
      name: 'duration',
      type: 'group',
      fields: [
        {
          name: 'days',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'nights',
          type: 'number',
          required: true,
          min: 0,
        },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'basePrice',
          type: 'number',
          required: true,
          min: 0,
        },
        {
          name: 'currency',
          type: 'text',
          defaultValue: 'USD',
        },
        {
          name: 'discountedPrice',
          type: 'number',
          min: 0,
          admin: {
            description: 'Leave empty if no discount',
          },
        },
        {
          name: 'priceIncludes',
          type: 'richText',
        },
        {
          name: 'priceExcludes',
          type: 'richText',
        },
      ],
    },
    {
      name: 'itinerary',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'day',
          type: 'number',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
        },
        {
          name: 'meals',
          type: 'select',
          options: [
            { label: 'Breakfast', value: 'breakfast' },
            { label: 'Lunch', value: 'lunch' },
            { label: 'Dinner', value: 'dinner' },
          ],
          hasMany: true,
        },
        {
          name: 'accommodation',
          type: 'text',
        },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'highlight',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'availability',
      type: 'group',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          admin: {
            description: 'First available date',
          },
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            description: 'Last available date',
          },
        },
        {
          name: 'departureDates',
          type: 'array',
          fields: [
            {
              name: 'date',
              type: 'date',
              required: true,
            },
            {
              name: 'availableSeats',
              type: 'number',
              required: true,
              min: 0,
            },
          ],
        },
      ],
    },
    {
      name: 'groupSize',
      type: 'group',
      fields: [
        {
          name: 'min',
          type: 'number',
          defaultValue: 1,
        },
        {
          name: 'max',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'difficulty',
      type: 'select',
      options: [
        { label: 'Easy', value: 'easy' },
        { label: 'Moderate', value: 'moderate' },
        { label: 'Challenging', value: 'challenging' },
        { label: 'Difficult', value: 'difficult' },
      ],
    },
    {
      name: 'ageRequirement',
      type: 'group',
      fields: [
        {
          name: 'minimum',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'maximum',
          type: 'number',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Sold Out', value: 'sold-out' },
        { label: 'Coming Soon', value: 'coming-soon' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'popularityScore',
      type: 'number',
      min: 0,
      max: 100,
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
