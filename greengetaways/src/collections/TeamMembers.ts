import { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'position', 'department', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      required: true,
      admin: {
        description: 'Job title (e.g., Managing Director, Tour Guide)',
      },
    },
    {
      name: 'department',
      type: 'select',
      options: [
        { label: 'Management', value: 'management' },
        { label: 'Operations', value: 'operations' },
        { label: 'Sales & Marketing', value: 'sales-marketing' },
        { label: 'Trekking Guides', value: 'guides' },
        { label: 'Support Staff', value: 'support' },
        { label: 'CSR Team', value: 'csr' },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'bio',
      type: 'richText',
      admin: {
        description: 'Short biography',
      },
    },
    {
      name: 'expertise',
      type: 'array',
      fields: [
        {
          name: 'skill',
          type: 'text',
        },
      ],
      admin: {
        description: 'Areas of expertise (e.g., Everest Region Expert, First Aid Certified)',
      },
    },
    {
      name: 'experience',
      type: 'group',
      fields: [
        {
          name: 'years',
          type: 'number',
          min: 0,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        {
          name: 'certification',
          type: 'text',
        },
        {
          name: 'year',
          type: 'number',
        },
      ],
    },
    {
      name: 'languages',
      type: 'array',
      fields: [
        {
          name: 'language',
          type: 'text',
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
        },
        {
          name: 'facebook',
          type: 'text',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Display prominently on Meet the Team page',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order',
      },
    },
  ],
}
