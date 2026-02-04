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
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Info',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              unique: true,
              required: true,
            },
            {
              name: 'destination',
              type: 'relationship',
              relationTo: 'destinations',
              hasMany: true,
              admin: {
                description: 'Destinations included in this tour',
              },
            },
            {
              name: 'activityCategory',
              type: 'relationship',
              relationTo: 'activity-categories',
              hasMany: true,
              admin: {
                description: 'Activity categories (e.g., Trekking, Cycling, Day Trips)',
              },
            },
            {
              name: 'tourType',
              type: 'select',
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
              name: 'region',
              type: 'text',
              admin: {
                description: 'Trekking region (e.g., Everest, Annapurna, Manaslu, Langtang)',
              },
            },
            {
              name: 'maxAltitude',
              type: 'group',
              admin: {
                description: 'Maximum altitude reached during the trek',
              },
              fields: [
                {
                  name: 'meters',
                  type: 'number',
                  admin: {
                    description: 'Altitude in meters (e.g., 5545)',
                  },
                },
                {
                  name: 'feet',
                  type: 'number',
                  admin: {
                    description: 'Altitude in feet (e.g., 18225)',
                  },
                },
                {
                  name: 'location',
                  type: 'text',
                  admin: {
                    description: 'Location name (e.g., "at Kalapathar")',
                  },
                },
              ],
            },
            {
              name: 'bestSeason',
              type: 'text',
              admin: {
                description: 'Best months/seasons to trek (e.g., "Mar-May, Sep-Dec")',
              },
            },
            {
              name: 'accommodationType',
              type: 'text',
              admin: {
                description: 'Type of accommodation (e.g., "Hotel/ Tea House/ Lodge")',
              },
            },
            {
              name: 'adventureWalkHours',
              type: 'text',
              admin: {
                description: 'Average walking hours per day (e.g., "5 to 7 Hrs per Day")',
              },
            },
            {
              name: 'totalMeals',
              type: 'group',
              admin: {
                description: 'Total meals included in the package',
              },
              fields: [
                {
                  name: 'breakfast',
                  type: 'number',
                  admin: {
                    description: 'Number of breakfasts included',
                  },
                },
                {
                  name: 'lunch',
                  type: 'number',
                  admin: {
                    description: 'Number of lunches included',
                  },
                },
                {
                  name: 'dinner',
                  type: 'number',
                  admin: {
                    description: 'Number of dinners included',
                  },
                },
              ],
            },
            {
              name: 'description',
              type: 'richText',
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              maxLength: 200,
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'gallery',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
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
                  min: 1,
                },
                {
                  name: 'nights',
                  type: 'number',
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
                    },
                    {
                      name: 'availableSeats',
                      type: 'number',
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
        },
        {
          label: 'Detailed Info',
          fields: [
            {
              name: 'whyChooseUs',
              type: 'richText',
              admin: {
                description: 'Why travelers should choose this tour with your company',
              },
            },
            {
              name: 'commitmentToSustainability',
              type: 'richText',
              admin: {
                description: 'Environmental and community sustainability initiatives',
              },
            },
            {
              name: 'trekkersResponsibilities',
              type: 'richText',
              admin: {
                description: 'Environmental, cultural, and safety responsibilities',
              },
            },
            {
              name: 'trekkersPreparation',
              type: 'richText',
              admin: {
                description: 'Physical, health, gear, permit, and mental preparation guide',
              },
            },
            {
              name: 'cultureAndCommunity',
              type: 'richText',
              admin: {
                description: 'Local culture, traditions, and community information',
              },
            },
          ],
        },
        {
          label: 'Practical Info',
          fields: [
            {
              name: 'packingList',
              type: 'richText',
              admin: {
                description: 'Comprehensive packing list with categories',
              },
            },
            {
              name: 'accommodationInfo',
              type: 'richText',
              admin: {
                description: 'Details about teahouses, lodges, and facilities',
              },
            },
            {
              name: 'foodInfo',
              type: 'richText',
              admin: {
                description: 'Meal options, typical dishes, and dietary information',
              },
            },
            {
              name: 'bestTimeToTrek',
              type: 'richText',
              admin: {
                description: 'Seasonal breakdown with weather and conditions',
              },
            },
            {
              name: 'typicalRoutine',
              type: 'richText',
              admin: {
                description: 'What a typical trekking day looks like',
              },
            },
            {
              name: 'permitInfo',
              type: 'richText',
              admin: {
                description: 'Required permits, costs, and how to obtain them',
              },
            },
            {
              name: 'guideRequirement',
              type: 'richText',
              admin: {
                description: 'Guide requirements and solo trekking policies',
              },
            },
            {
              name: 'acclimatizationInfo',
              type: 'richText',
              admin: {
                description: 'Altitude sickness prevention and acclimatization strategies',
              },
            },
            {
              name: 'currencyExchangeInfo',
              type: 'richText',
              admin: {
                description: 'ATM availability, cash requirements, and currency tips',
              },
            },
            {
              name: 'requiredDocuments',
              type: 'richText',
              admin: {
                description: 'Passport, permits, insurance, and document requirements',
              },
            },
            {
              name: 'womenParticipation',
              type: 'richText',
              admin: {
                description: 'Women-specific services, guides, and safety arrangements',
              },
            },
          ],
        },
        {
          label: 'FAQ',
          fields: [
            {
              name: 'faqs',
              type: 'array',
              admin: {
                description: 'Frequently Asked Questions',
              },
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
          ],
        },
      ],
    },
  ],
}
