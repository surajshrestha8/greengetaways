import { CollectionConfig } from 'payload'

export const CSRProjects: CollectionConfig = {
  slug: 'csr-projects',
  admin: {
    useAsTitle: 'projectName',
    defaultColumns: ['projectName', 'category', 'status', 'startDate'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'projectName',
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
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Child Sponsorship', value: 'child-sponsorship' },
        { label: 'Environmental Conservation', value: 'environmental' },
        { label: 'Cultural Preservation', value: 'cultural' },
        { label: 'Community Development', value: 'community' },
        { label: 'Porter & Guide Welfare', value: 'porter-guide' },
        { label: 'Responsible Tourism', value: 'responsible-tourism' },
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
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'objectives',
      type: 'array',
      fields: [
        {
          name: 'objective',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'impact',
      type: 'group',
      fields: [
        {
          name: 'beneficiaries',
          type: 'number',
          admin: {
            description: 'Number of people/entities benefited',
          },
        },
        {
          name: 'description',
          type: 'richText',
        },
        {
          name: 'statistics',
          type: 'array',
          fields: [
            {
              name: 'metric',
              type: 'text',
              admin: {
                description: 'e.g., "Trees Planted", "Children Educated"',
              },
            },
            {
              name: 'value',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'timeline',
      type: 'group',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          required: true,
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            description: 'Leave empty for ongoing projects',
          },
        },
        {
          name: 'milestones',
          type: 'array',
          fields: [
            {
              name: 'milestone',
              type: 'text',
            },
            {
              name: 'date',
              type: 'date',
            },
            {
              name: 'completed',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'region',
          type: 'text',
        },
        {
          name: 'specificLocation',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'partners',
      type: 'array',
      fields: [
        {
          name: 'partnerName',
          type: 'text',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
      ],
      admin: {
        description: 'Partner organizations',
      },
    },
    {
      name: 'howToContribute',
      type: 'richText',
      admin: {
        description: 'Information for people who want to contribute',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Planning', value: 'planning' },
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
        { label: 'On Hold', value: 'on-hold' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Display prominently on CSR page',
      },
    },
  ],
}
