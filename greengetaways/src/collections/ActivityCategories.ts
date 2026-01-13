import { CollectionConfig } from 'payload'

export const ActivityCategories: CollectionConfig = {
  slug: 'activity-categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'parentCategory', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Category Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'parentCategory',
      type: 'relationship',
      relationTo: 'activity-categories',
      admin: {
        description: 'For subcategories (e.g., Trekking is under Terrestrial Adventures)',
      },
    },
    {
      name: 'categoryType',
      type: 'select',
      required: true,
      options: [
        { label: 'Terrestrial Adventures', value: 'terrestrial' },
        { label: 'Watercourse Adventures', value: 'watercourse' },
        { label: 'Aerial Adventures', value: 'aerial' },
        { label: 'Tours', value: 'tours' },
        { label: 'Special Packages', value: 'special' },
      ],
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Icon for the category',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}