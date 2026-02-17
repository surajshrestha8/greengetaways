import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Seed script for Annapurna Base Camp Trek 15 Days
 *
 * Prerequisites:
 * 1. Create a Destination with slug: 'annapurna-region' (run main seed first)
 * 2. Create an Activity Category with slug: 'trekking' (run main seed first)
 *
 * Run with: npx tsx src/seed/abc-trek-seed.ts
 */

type MealType = 'breakfast' | 'lunch' | 'dinner'

const abcTrekData = {
  title: 'Annapurna Base Camp with Poonhill/Ghorepani (15 Days)',
  slug: 'annapurna-base-camp-trek-15-days',
  tourType: ['adventure', 'cultural'],
  shortDescription:
    'The Annapurna Base Camp trek via Poonhill and Ghorepani is one of Nepal\'s most popular trekking routes, offering a blend of natural beauty and cultural richness.',
  region: 'Annapurna',
  maxAltitude: {
    meters: 4130,
    feet: 13545,
    location: 'at Annapurna Base Camp',
  },
  bestSeason: 'Sep-May',
  accommodationType: 'Hotel/ Lodge/ Tea House, During the Trek',
  adventureWalkHours: '5 to 7 Hrs per Day',
  totalMeals: {
    breakfast: 14,
    lunch: 12,
    dinner: 12,
  },
  duration: {
    days: 15,
    nights: 14,
  },
  pricing: {
    basePrice: 1999,
    currency: 'USD',
    priceIncludes: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Accommodation and Meals' }],
          },
          {
            type: 'list',
            listType: 'bullet',
            children: [
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Hotel accommodation in Kathmandu and Pokhara: 2 nights in Kathmandu and 2 nights in Pokhara in comfortable 5-star hotels (or similar), with daily breakfast included',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Best available teahouse accommodation during the trek (twin-sharing basis with attached bathrooms wherever possible)',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Full board meals (Breakfast, Lunch, and Dinner) during trekking, open menu and unlimited',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  { type: 'text', text: 'Welcome dinner with cultural performance in Kathmandu upon arrival' },
                ],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Farewell dinner in Kathmandu before departure' }],
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Transportation' }],
          },
          {
            type: 'list',
            listType: 'bullet',
            children: [
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Airport pick-up and drop-off in Kathmandu by private, air-conditioned vehicle',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Domestic flight from Kathmandu to Pokhara to Kathmandu, including airport taxes and transfers',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Private ground transportation between Pokhara and Birethanti, and return from Nayapul to Pokhara',
                  },
                ],
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Guides, Staff, and Safety' }],
          },
          {
            type: 'list',
            listType: 'bullet',
            children: [
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Professional, licensed, English-speaking trekking guide throughout the trek',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Porters (1 porter for 2 trekkers) with food, accommodation, salary, and insurance included',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'First-aid medical kits (carried by guides)' }],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Safety briefings, trekking tips, and 24/7 assistance from our team',
                  },
                ],
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Permits and Documentation' }],
          },
          {
            type: 'list',
            listType: 'bullet',
            children: [
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Annapurna Conservation Area Permit (ACAP)' }],
              },
              {
                type: 'listitem',
                children: [
                  { type: 'text', text: 'TIMS (Trekkers\' Information Management System) card' },
                ],
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Essential Gear' }],
          },
          {
            type: 'list',
            listType: 'bullet',
            children: [
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Duffel Bag provided (yours to take home)' }],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Down jacket and sleeping bag offered (to be returned after trek completion)',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    priceExcludes: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Accommodation and Meals' }],
          },
          {
            type: 'list',
            listType: 'bullet',
            children: [
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Lunches and dinners in Kathmandu and Pokhara (except welcome and farewell dinners)',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Any special à la carte meals, alcoholic beverages, and snacks beyond the provided menu',
                  },
                ],
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Travel Documentation and Insurance' }],
          },
          {
            type: 'list',
            listType: 'bullet',
            children: [
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Nepal visa fees' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'International flights to and from Nepal' }],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Personal travel insurance (highly recommended for medical emergencies, trip cancellations, or evacuations)',
                  },
                ],
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Personal Expenses and Services' }],
          },
          {
            type: 'list',
            listType: 'bullet',
            children: [
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Extra snacks, beverages, or personal items' }],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Laundry, telephone calls, mobile data, and other personal expenses',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Tips or gratuities for guides, porters, and drivers (recommended but not included)',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Single supplement fee for travelers requesting a private room',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Optional activities such as paragliding, zip-lining, boating in Pokhara, or other personal excursions',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Personal trekking gear or clothing (only a duffel bag provided)',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },
  itinerary: [
    {
      day: 1,
      title: 'Arrival in Kathmandu (1,350m / 4,428ft)',
      description:
        'Upon your arrival at Tribhuvan International Airport (TIA) in Kathmandu, our Green Getaways representative will warmly welcome you with a personalized sign and assist with your transfer to the hotel in the city. Enjoy a comfortable ride in a private, air-conditioned vehicle. In the evening, we host a welcome dinner with cultural performances in Kathmandu.',
      meals: ['dinner'] as MealType[],
      accommodation: 'Hotel in Kathmandu',
    },
    {
      day: 2,
      title: 'Orientation and Trek Preparation',
      description:
        'After breakfast at your hotel, there will be an orientation scheduled. Meet the Managing Director and professional guides, receive a comprehensive trek briefing, and prepare your equipment. Optional exploration of Kathmandu\'s famous sites is available.',
      meals: ['breakfast', 'lunch'] as MealType[],
      accommodation: 'Hotel in Kathmandu',
    },
    {
      day: 3,
      title: 'Fly to Pokhara (827m / 2,713ft)',
      description:
        'After an early breakfast, you will be transferred to the domestic terminal for your scenic flight to Pokhara. The short 25-minute journey offers breathtaking aerial views of the Himalayas. Upon arrival, transfer to your hotel near the serene Phewa Lake. The rest of the day is free to explore Pokhara at your own pace.',
      meals: ['breakfast'] as MealType[],
      accommodation: 'Hotel in Pokhara',
    },
    {
      day: 4,
      title: 'Drive to Birethanti (1,025m / 3,363ft) and Trek to Hile (1,430m / 4,690ft)',
      description:
        'After an early breakfast, embark on a scenic drive to Nayapul and then to Birethanti, the official starting point of your Annapurna Base Camp trek. The journey takes approximately 1.5 hours. Upon reaching Birethanti, your trekking adventure begins. After about 3–4 hours of gentle trekking, you\'ll arrive at Hile.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Hile',
    },
    {
      day: 5,
      title: 'Trek from Hile (1,430m / 4,690ft) to Ghorepani (2,860m / 9,383ft)',
      description:
        'After an early breakfast, begin your steady ascent toward Ghorepani. The trek starts with a pleasant walk through small settlements before reaching the steep climb up the famous stone staircase to Ulleri. Continue through enchanting rhododendron and oak forests. By late afternoon, reach Ghorepani, a charming mountain village known for its blue-roofed lodges and panoramic Himalayan views.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Ghorepani',
    },
    {
      day: 6,
      title: 'Hike to Poon Hill (3,210m / 10,531ft) and Trek to Tadapani (2,630m / 8,629ft)',
      description:
        'Your day begins before dawn with an early morning hike to Poon Hill, one of the most celebrated viewpoints in the Annapurna region. A gentle yet steady climb of about 45 minutes brings you to the summit, just in time to witness a breathtaking sunrise over the Himalayas. After returning to Ghorepani for breakfast, continue your trek toward Tadapani through lush rhododendron and pine forests.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Tadapani',
    },
    {
      day: 7,
      title: 'Trek from Tadapani (2,630m / 8,629ft) to Chhomrong (2,170m / 7,119ft)',
      description:
        'Wake up to stunning morning views of Machhapuchhre (Fishtail), Annapurna South, and Hiunchuli. The trail starts with a steady descent through lush rhododendron and oak forests to Chule and Gurjung. After crossing the Kimrong Khola (river), the trail gradually ascends again to Chhomrong, one of the largest and most picturesque Gurung villages in the region.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Chhomrong',
    },
    {
      day: 8,
      title: 'Trek from Chhomrong (2,170m / 7,119ft) to Dovan (2,505m / 8,215ft)',
      description:
        'After breakfast, set out on a rewarding trek through lush forests and dramatic landscapes. The route gradually descends from Chhomrong toward the Chhomrong Khola before climbing through dense rhododendron and bamboo forests. By afternoon, arrive at Dovan, a quiet campsite nestled along the Modi Khola valley.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Dovan',
    },
    {
      day: 9,
      title: 'Trek from Dovan (2,505m / 8,215ft) to Machhapuchhre Base Camp (3,700m / 12,139ft)',
      description:
        'After an early breakfast at Dovan, begin today\'s trek which gradually ascends along the Modi Khola valley. As you climb higher, the scenery transforms dramatically. Lush green forests give way to alpine meadows, and towering peaks dominate the skyline. By afternoon, arrive at Machhapuchhre Base Camp (MBC), perched at the foot of the majestic Machhapuchhre peak.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge at Machhapuchhre Base Camp',
    },
    {
      day: 10,
      title:
        'Trek from Machhapuchhre Base Camp (3,700m / 12,139ft) to Annapurna Base Camp (4,130m / 13,550ft)',
      description:
        'After an early breakfast at Machhapuchhre Base Camp, begin the final stretch to Annapurna Base Camp (ABC). The trail gradually ascends through alpine terrain, passing moraine ridges, glacial streams, and rugged mountain landscapes. By early afternoon, arrive at Annapurna Base Camp, the heart of the Annapurna massif, with awe-inspiring 360-degree views of the surrounding peaks.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge at Annapurna Base Camp',
    },
    {
      day: 11,
      title: 'Trek from Annapurna Base Camp (4,130m / 13,550ft) to Bamboo (2,310m / 7,580ft)',
      description:
        'After breakfast at ABC, begin your descent toward Bamboo, retracing part of the trail you ascended. The journey downward is easier on the legs but still requires focus. The scenery continues to impress, with panoramic views gradually giving way to alpine meadows, pine forests, and terraced fields. By afternoon, reach Bamboo, a serene village surrounded by forests.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Bamboo',
    },
    {
      day: 12,
      title: 'Trek from Bamboo (2,310m / 7,580ft) to Jhinu Danda (1,780m / 5,840ft)',
      description:
        'After breakfast at Bamboo, continue your descent toward Jhinu Danda, a peaceful village famous for its natural hot springs. The trail winds through lush forests, terraced fields, and small riverside villages. By afternoon, arrive at Jhinu Danda where you can soak your tired muscles in the warm natural hot springs.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Jhinu Danda',
    },
    {
      day: 13,
      title:
        'Trek from Jhinu Danda (1,780m / 5,840ft) to Nayapul (1,070m / 3,510ft) and drive to Pokhara (827m / 2,713ft)',
      description:
        'After breakfast at Jhinu Danda, embark on the final day of your trek, descending along a well-marked trail through forests, terraced fields, and riverside paths toward Nayapul. Upon reaching Nayapul, meet our vehicle for the drive back to Pokhara, a relaxing journey of about 1.5 hours. The afternoon is free to explore Pokhara at your leisure.',
      meals: ['breakfast', 'lunch'] as MealType[],
      accommodation: 'Hotel in Pokhara',
    },
    {
      day: 14,
      title: 'Fly from Pokhara (827m / 2,713ft) to Kathmandu (1,350m / 4,428ft) and Farewell Dinner',
      description:
        'After breakfast, transfer to Pokhara Airport for your scenic domestic flight back to Kathmandu. The short flight offers beautiful aerial views of the Annapurna and Dhaulagiri ranges. Upon arrival, transfer to your hotel. The rest of the day is free to relax or do last-minute shopping. Later, enjoy a farewell dinner at a traditional Nepali restaurant.',
      meals: ['breakfast', 'dinner'] as MealType[],
      accommodation: 'Hotel in Kathmandu',
    },
    {
      day: 15,
      title: 'Departure from Kathmandu',
      description:
        'Your unforgettable Annapurna Base Camp adventure comes to an end as we transfer you from your hotel to Tribhuvan International Airport for your international departure. Thank you for choosing us as your travel partner, and we look forward to welcoming you back for another incredible adventure in the Himalayas.',
      meals: ['breakfast'] as MealType[],
      accommodation: null,
    },
  ],
  highlights: [
    {
      highlight:
        'Spectacular Mountain Views: Enjoy breathtaking panoramas of the Annapurna and Dhaulagiri ranges',
    },
    {
      highlight:
        'Magical Sunrise from Poon Hill: Watch the first golden rays of the sun light up the Himalayan peaks',
    },
    {
      highlight:
        'Cultural Encounters in Mountain Villages: Walk through beautiful Gurung and Magar villages',
    },
    {
      highlight:
        'Diverse and Changing Landscapes: Trek through rhododendron forests, terraced farmlands, alpine meadows, and deep river valleys',
    },
    {
      highlight:
        'Rich Biodiversity in the Annapurna Conservation Area: Discover incredible variety of plants and wildlife',
    },
    {
      highlight:
        'Relax in Natural Hot Springs: Unwind in the natural hot springs at Jhinu Danda',
    },
    {
      highlight:
        'Reaching Annapurna Base Camp: Stand at Annapurna Base Camp (4,130 m), surrounded by snow-covered peaks',
    },
    {
      highlight: 'Professional guides and comprehensive support throughout the journey',
    },
  ],
  groupSize: {
    min: 1,
    max: 12,
  },
  difficulty: 'moderate' as const,
  ageRequirement: {
    minimum: 12,
    maximum: 65,
  },
  status: 'active' as const,
  featured: true,
  popularityScore: 90,
  metaTitle: 'Annapurna Base Camp Trek 15 Days | Poon Hill & Ghorepani | Green Getaways',
  metaDescription:
    'Trek to Annapurna Base Camp via Poon Hill and Ghorepani in 15 days. Experience stunning Himalayan views, cultural immersion, and natural beauty. From USD 1,999.',
  description: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Introduction to the Annapurna Base Camp Trek' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'The Annapurna Base Camp (ABC) Trek in Nepal is a truly captivating journey that combines adventure, culture, and breathtaking natural beauty. The trail follows an ancient trade route to Tibet, winding through rhododendron and bamboo forests, terraced farmlands, and charming mountain villages. As the path climbs higher, it leads to the stunning Annapurna Base Camp at 4,130 meters - a spectacular amphitheater surrounded by towering peaks and glaciers.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Our trek also includes a scenic hike to Ghorepani and an early morning climb to Poon Hill, where you can witness the first golden rays of sunrise touching the snow-capped peaks of Dhaulagiri and Annapurna - one of the most unforgettable views in the Himalayas.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Why Choose Green Getaways' }],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Commitment to Safety and Experience' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'We prioritize safety, especially given the challenging nature of the ABC trek and the risk of altitude sickness. Before you book the trip with us, we offer you training guidelines and other important information to help you complete the trek successfully.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Experienced and Licensed Guides' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'We emphasize our guides\' extensive experience, with some having completed the ABC trek over 100 times. These guides are government-licensed and trained in high-altitude trekking and first aid.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Comprehensive and Transparent Services' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'We offer all-inclusive packages to simplify the trek planning with no hidden costs. Services include airport pickup and drop-off, accommodation, all meals during the trek, domestic flights, permits, and guide and porter services.',
            },
          ],
        },
      ],
    },
  },
}

async function seed() {
  console.log('Starting ABC Trek seed...')

  const payload = await getPayload({ config })

  // Look up the destination by slug
  const destinations = await payload.find({
    collection: 'destinations',
    where: {
      slug: { equals: 'annapurna-region' },
    },
    limit: 1,
  })

  if (destinations.docs.length === 0) {
    console.error(
      'Error: Destination with slug "annapurna-region" not found. Please run the main seed first or create the destination manually.',
    )
    console.log('Creating Annapurna region destination...')

    await payload.create({
      collection: 'destinations',
      data: {
        name: 'Annapurna Region',
        slug: 'annapurna-region',
        country: 'Nepal',
        continent: 'asia',
        shortDescription: 'The Annapurna region is one of the most popular trekking destinations in Nepal, known for its diverse landscapes and stunning mountain views.',
        description: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'The Annapurna region is one of the most popular trekking destinations in Nepal, known for its diverse landscapes and stunning mountain views.',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        featured: true,
      },
    })

    console.log('Destination created successfully!')
  }

  const destinationResult = await payload.find({
    collection: 'destinations',
    where: {
      slug: { equals: 'annapurna-region' },
    },
    limit: 1,
  })

  const destinationId = destinationResult.docs[0].id

  // Look up the activity category by slug
  const activityCategories = await payload.find({
    collection: 'activity-categories',
    where: {
      slug: { equals: 'trekking' },
    },
    limit: 1,
  })

  if (activityCategories.docs.length === 0) {
    console.error(
      'Error: Activity Category with slug "trekking" not found. Please run the main seed first.',
    )
    console.log('Run: npm run seed')
    process.exit(1)
  }

  const activityCategoryId = activityCategories.docs[0].id

  // Check if tour already exists
  const existingTours = await payload.find({
    collection: 'tours',
    where: {
      slug: { equals: abcTrekData.slug },
    },
    limit: 1,
  })

  if (existingTours.docs.length > 0) {
    console.log(`Tour "${abcTrekData.title}" already exists. Updating...`)

    await payload.update({
      collection: 'tours',
      id: existingTours.docs[0].id,
      data: {
        ...abcTrekData,
        destination: [destinationId],
        activityCategory: [activityCategoryId],
      } as unknown as Record<string, unknown>,
    })

    console.log(`Tour updated successfully!`)
  } else {
    console.log(`Creating new tour: ${abcTrekData.title}`)

    await payload.create({
      collection: 'tours',
      data: {
        ...abcTrekData,
        destination: [destinationId],
        activityCategory: [activityCategoryId],
      } as unknown as Record<string, unknown>,
    })

    console.log(`Tour created successfully!`)
  }

  console.log('ABC Trek seed completed!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
