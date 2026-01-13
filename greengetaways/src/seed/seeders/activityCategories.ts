import type { Payload } from 'payload'
import { generateSlug, logComplete, logStart } from '../utils'

interface CategoryData {
  name: string
  description: string
  categoryType: 'terrestrial' | 'watercourse' | 'aerial' | 'tours' | 'special'
  subcategories?: { name: string; description: string }[]
}

const CATEGORIES: CategoryData[] = [
  {
    name: 'Trekking',
    description: 'Explore the majestic Himalayan trails on foot through diverse landscapes and cultures.',
    categoryType: 'terrestrial',
    subcategories: [
      { name: 'Everest Region Treks', description: 'Treks in the iconic Everest region including EBC, Gokyo Lakes, and Three Passes.' },
      { name: 'Annapurna Region Treks', description: 'Explore the Annapurna massif with circuits, base camps, and scenic trails.' },
      { name: 'Langtang Valley Treks', description: 'Discover the beautiful Langtang Valley close to Kathmandu.' },
      { name: 'Manaslu Circuit', description: 'Remote and challenging trek around the eighth highest mountain.' },
    ],
  },
  {
    name: 'Mountaineering',
    description: 'Summit the peaks of Nepal from trekking peaks to 8000m expeditions.',
    categoryType: 'terrestrial',
    subcategories: [
      { name: 'Trekking Peaks', description: 'Climb peaks like Island Peak, Mera Peak, and Lobuche East.' },
      { name: '8000m Expeditions', description: 'Guided expeditions to Everest, Lhotse, Makalu, and more.' },
    ],
  },
  {
    name: 'Adventure Sports',
    description: 'Get your adrenaline pumping with extreme activities across Nepal.',
    categoryType: 'aerial',
    subcategories: [
      { name: 'Paragliding', description: 'Soar over Pokhara and enjoy stunning views of the Annapurnas.' },
      { name: 'Bungee Jumping', description: 'Take the plunge at one of the highest bungee sites in the world.' },
      { name: 'Zip Lining', description: 'Experience the thrill of zip lining across river gorges.' },
      { name: 'Skydiving', description: 'Tandem skydive with views of the Himalayan range.' },
    ],
  },
  {
    name: 'Water Activities',
    description: 'Navigate Nepal\'s rivers and lakes for unforgettable aquatic adventures.',
    categoryType: 'watercourse',
    subcategories: [
      { name: 'White Water Rafting', description: 'Raft through rapids on rivers like Trisuli, Bhote Koshi, and Sun Koshi.' },
      { name: 'Kayaking', description: 'Kayak on Himalayan rivers with expert instruction.' },
      { name: 'Canyoning', description: 'Descend waterfalls and gorges with ropes and rappelling.' },
    ],
  },
  {
    name: 'Wildlife Safari',
    description: 'Encounter diverse wildlife in Nepal\'s national parks and conservation areas.',
    categoryType: 'tours',
    subcategories: [
      { name: 'Chitwan Safari', description: 'Spot rhinos, tigers, and elephants in Chitwan National Park.' },
      { name: 'Bardia Safari', description: 'Remote wildlife experience in Bardia National Park.' },
    ],
  },
  {
    name: 'Cultural Tours',
    description: 'Immerse yourself in Nepal\'s rich heritage, temples, and traditions.',
    categoryType: 'tours',
    subcategories: [
      { name: 'Heritage Walks', description: 'Explore UNESCO World Heritage sites in Kathmandu Valley.' },
      { name: 'Festival Tours', description: 'Experience vibrant Nepali festivals like Dashain and Tihar.' },
      { name: 'Village Homestays', description: 'Live with local families and experience authentic culture.' },
    ],
  },
  {
    name: 'Day Trips',
    description: 'Short excursions perfect for travelers with limited time.',
    categoryType: 'tours',
  },
]

export async function seedActivityCategories(payload: Payload): Promise<number[]> {
  logStart('Activity Categories')
  const categoryIds: number[] = []
  let order = 1

  for (const category of CATEGORIES) {
    // Create parent category
    const parent = await payload.create({
      collection: 'activity-categories',
      data: {
        name: category.name,
        slug: generateSlug(category.name),
        description: category.description,
        categoryType: category.categoryType,
        order: order++,
        featured: true,
      },
    })
    categoryIds.push(parent.id)

    // Create subcategories
    if (category.subcategories) {
      for (const sub of category.subcategories) {
        const subCategory = await payload.create({
          collection: 'activity-categories',
          data: {
            name: sub.name,
            slug: generateSlug(sub.name),
            description: sub.description,
            categoryType: category.categoryType,
            parentCategory: parent.id,
            order: order++,
            featured: false,
          },
        })
        categoryIds.push(subCategory.id)
      }
    }
  }

  logComplete('Activity Categories', categoryIds.length)
  return categoryIds
}
