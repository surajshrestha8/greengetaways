import { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'tour', 'rating', 'featured', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'customerName',
      type: 'text',
      required: true,
    },
    {
      name: 'customerPhoto',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'customerLocation',
      type: 'text',
      admin: {
        description: 'City, Country',
      },
    },
    {
      name: 'tour',
      type: 'relationship',
      relationTo: 'tours',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Testimonial headline',
      },
    },
    {
      name: 'review',
      type: 'textarea',
      required: true,
    },
    {
      name: 'travelDate',
      type: 'date',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Display on homepage',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending Review', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    {
      name: 'verifiedBooking',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Verified as actual customer',
      },
    },
  ],
}
