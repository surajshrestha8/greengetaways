import { CollectionConfig } from 'payload'

export const TourQuestions: CollectionConfig = {
  slug: 'tour-questions',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['name', 'email', 'tour', 'status', 'createdAt'],
    description: 'Questions submitted by visitors on tour pages',
  },
  access: {
    // Only authenticated admins can read/update
    read: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
    // Anyone can create (public form submission)
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'question',
      type: 'textarea',
      required: true,
    },
    {
      name: 'tour',
      type: 'relationship',
      relationTo: 'tours',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Answered', value: 'answered' },
        { label: 'Dismissed', value: 'dismissed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'adminAnswer',
      type: 'textarea',
      admin: {
        description: 'Optional reply to send back to the visitor',
        condition: (_, siblingData) => siblingData.status === 'answered',
      },
    },
  ],
  timestamps: true,
}
