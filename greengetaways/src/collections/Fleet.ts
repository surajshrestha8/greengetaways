import { CollectionConfig } from 'payload'

export const Fleet: CollectionConfig = {
  slug: 'fleet',
  admin: {
    useAsTitle: 'vehicleName',
    defaultColumns: ['vehicleName', 'vehicleType', 'capacity', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'vehicleName',
      type: 'text',
      required: true,
      admin: {
        description: 'Name or model of the vehicle',
      },
    },
    {
      name: 'vehicleType',
      type: 'select',
      required: true,
      options: [
        { label: 'Tourist Bus', value: 'tourist-bus' },
        { label: 'Mini Van', value: 'mini-van' },
        { label: 'Jeep/SUV', value: 'jeep' },
        { label: 'Car', value: 'car' },
        { label: 'Helicopter', value: 'helicopter' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      minRows: 1,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'capacity',
      type: 'group',
      fields: [
        {
          name: 'passengers',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'luggage',
          type: 'text',
          admin: {
            description: 'Luggage capacity description',
          },
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
        },
      ],
      admin: {
        description: 'Vehicle features (e.g., Air Conditioning, WiFi, First Aid Kit)',
      },
    },
    {
      name: 'specifications',
      type: 'group',
      fields: [
        {
          name: 'make',
          type: 'text',
        },
        {
          name: 'model',
          type: 'text',
        },
        {
          name: 'year',
          type: 'number',
        },
        {
          name: 'registrationNumber',
          type: 'text',
        },
      ],
    },
    {
      name: 'safetyFeatures',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
        },
      ],
      admin: {
        description: 'Safety features (e.g., Seat belts, Fire extinguisher, GPS)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Under Maintenance', value: 'maintenance' },
        { label: 'Retired', value: 'retired' },
      ],
    },
    {
      name: 'availableFor',
      type: 'array',
      fields: [
        {
          name: 'serviceType',
          type: 'select',
          options: [
            { label: 'Airport Transfers', value: 'airport-transfer' },
            { label: 'City Tours', value: 'city-tours' },
            { label: 'Long Distance Treks', value: 'long-distance' },
            { label: 'Private Hire', value: 'private-hire' },
          ],
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
