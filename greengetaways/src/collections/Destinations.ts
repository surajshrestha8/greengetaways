import { CollectionConfig } from 'payload'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'country', 'featured', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Destination Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the name',
      },
    },
    {
      name: 'country',
      type: 'text',
      required: true,
    },
    {
      name: 'continent',
      type: 'select',
      required: true,
      options: [
        { label: 'Africa', value: 'africa' },
        { label: 'Asia', value: 'asia' },
        { label: 'Europe', value: 'europe' },
        { label: 'North America', value: 'north-america' },
        { label: 'South America', value: 'south-america' },
        { label: 'Oceania', value: 'oceania' },
        { label: 'Antarctica', value: 'antarctica' },
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
      maxLength: 200,
      admin: {
        description: 'Brief description for cards and previews',
      },
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
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'highlight',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Key attractions or points of interest',
      },
    },
    {
      name: 'climate',
      type: 'group',
      fields: [
        {
          name: 'bestTimeToVisit',
          type: 'text',
        },
        {
          name: 'averageTemperature',
          type: 'text',
        },
        {
          name: 'weatherDescription',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'travelInfo',
      type: 'group',
      fields: [
        {
          name: 'currency',
          type: 'text',
        },
        {
          name: 'language',
          type: 'text',
        },
        {
          name: 'timezone',
          type: 'text',
        },
        {
          name: 'visaRequirements',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Display on homepage as featured destination',
      },
    },
    {
      name: 'popularityScore',
      type: 'number',
      min: 0,
      max: 100,
      admin: {
        description: 'Used for sorting and recommendations',
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      admin: {
        description: 'SEO title',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      maxLength: 160,
      admin: {
        description: 'SEO description',
      },
    },
  ],
}
