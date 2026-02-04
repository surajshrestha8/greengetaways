import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Seed script for Everest Base Camp Trek 16 Days
 *
 * Prerequisites:
 * 1. Create a Destination with slug: 'everest-region' (run main seed first)
 * 2. Create an Activity Category with slug: 'trekking' (run main seed first)
 *
 * Run with: npx tsx src/seed/ebc-trek-seed.ts
 */

type MealType = 'breakfast' | 'lunch' | 'dinner'

const ebcTrekData = {
  title: 'Everest Base Camp Trek (EBC) 16 Days',
  slug: 'everest-base-camp-trek-16-days',
  tourType: ['adventure', 'cultural'],
  shortDescription:
    'Take a thrilling trip along the trails in the Khumbu region, where you can see the world\'s highest peak, Mt. Everest, and other beautiful mountain peaks.',
  region: 'Everest',
  maxAltitude: {
    meters: 5545,
    feet: 18192,
    location: 'at Kalapathar',
  },
  bestSeason: 'Mar-May, Sep-Dec',
  accommodationType: 'Hotel/ Tea House, During the Trek',
  adventureWalkHours: '4 to 6 Hrs per Day',
  totalMeals: {
    breakfast: 15,
    lunch: 13,
    dinner: 14,
  },
  duration: {
    days: 16,
    nights: 15,
  },
  pricing: {
    basePrice: 2699,
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
                    text: '4-night stay in Kathmandu at a 5-star category hotel with daily breakfast',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Best available tea house accommodation for 11 nights (twin-sharing basis)',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Full board meals during the trek (breakfast, lunch, dinner) with unlimited menu',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Welcome dinner and farewell dinner in Kathmandu' }],
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
                  { type: 'text', text: 'Airport pick-up and drop-off services by private vehicle' },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Domestic flights from Kathmandu to Lukla and back, including all taxes',
                  },
                ],
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Guides, Porters, and Safety' }],
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
                    text: 'Professional, licensed, English-speaking mountain guides with food, insurance, and equipment',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Porters (1 porter for 2 trekkers) to carry luggage up to 13kg per person',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'First-aid medical kits and oximeters' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Emergency rescue assistance' }],
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Permits and Equipment' }],
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
                    text: 'All trekking permits: Sagarmatha National Park and Khumbu Pasang Lhamu Rural Municipality',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'TIMS Card fee' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Duffel bag (yours to keep), sleeping bag and down jacket (rental)' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Trekking map and trekking hat' }],
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Additional Benefits' }],
          },
          {
            type: 'list',
            listType: 'bullet',
            children: [
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'All service charges and VAT' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: '24/7 support throughout your journey' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Guaranteed departure' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Lifetime deposit policy' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'No booking fee or hidden costs' }],
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
            children: [{ type: 'text', text: 'Travel Documentation and Insurance' }],
          },
          {
            type: 'list',
            listType: 'bullet',
            children: [
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Visa to Nepal fees' }],
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
                    text: 'Personal travel insurance (recommended: coverage for helicopter evacuation up to 5,500m)',
                  },
                ],
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Personal Expenses' }],
          },
          {
            type: 'list',
            listType: 'bullet',
            children: [
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Extra snacks and drinks beyond the included menu' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Hot showers, battery charging, and Wi-Fi at tea houses' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Personal expenses (laundry, telephone calls, internet)' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Tips for guides, porters, and drivers' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Single supplement for private room' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Excess baggage fees (above 10kg luggage + 5kg hand carry)' }],
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Optional Add-ons' }],
          },
          {
            type: 'list',
            listType: 'bullet',
            children: [
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Helicopter flights to/from Lukla' }],
              },
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'Extra night accommodations in Kathmandu' }],
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
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Upon your arrival at Tribhuvan International Airport (TIA) in Kathmandu, our Green Getaways representative will warmly welcome you with a personalized sign and assist with your transfer to the hotel in the city. Enjoy a comfortable ride in a private, air-conditioned vehicle, ensuring a smooth and stress-free start to your journey.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'In the evening, we host a welcome dinner with cultural performances in Kathmandu. This day is reserved primarily for rest and acclimatization after your flight.',
                },
              ],
            },
          ],
        },
      },
      meals: ['dinner'],
      accommodation: 'Hotel in Kathmandu',
    },
    {
      day: 2,
      title: 'Orientation and Trek Preparation',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'After breakfast, attend the orientation program where you will meet the Managing Director of Green Getaways and the professional guides who will lead your trek. Your lead guide will outline the entire EBC trekking itinerary, including daily distances, estimated hiking time, altitude changes, trail conditions, and essential safety protocols.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Guides will review your packing list and ensure you have all necessary equipment. If you need to purchase or rent additional items, Thamel offers ample gear shops. Green Getaways will secure all required trekking permits.',
                },
              ],
            },
          ],
        },
      },
      meals: ['breakfast', 'lunch'],
      accommodation: 'Hotel in Kathmandu',
    },
    {
      day: 3,
      title: 'Fly to Lukla (2,860m) & Trek to Phakding (2,610m)',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Begin with an early morning flight from Kathmandu to Lukla\'s Tenzing-Hillary Airport, often described as one of the most thrilling airports globally. The 40-45 minute flight offers breathtaking Himalayan views.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Upon arrival, meet your porters and begin the trek with a gentle descent to Phakding, taking around 3-4 hours (8-9 km). Follow the Dudh Koshi River through charming Sherpa villages like Chheplung, Thado Koshi, and Nachipang.',
                },
              ],
            },
          ],
        },
      },
      meals: ['breakfast', 'lunch', 'dinner'],
      accommodation: 'Local Lodge - Phakding',
    },
    {
      day: 4,
      title: 'Trek to Namche Bazaar (3,440m / 11,286ft)',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'One of the more challenging days. Hike around 10 km over 5-6 hours, crossing several high suspension bridges including the famous Hillary Bridge. Pass through pine and rhododendron forests and villages like Benkar.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Enter Sagarmatha National Park at Monjo. After the Hillary Bridge, a steep 2-3 hour ascent leads to Namche Bazaar, known as the "Sherpa Capital" and the biggest town in the Everest region.',
                },
              ],
            },
          ],
        },
      },
      meals: ['breakfast', 'lunch', 'dinner'],
      accommodation: 'Local Lodge - Namche Bazaar',
    },
    {
      day: 5,
      title: 'Acclimatization Day in Namche Bazaar (3,440m)',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Crucial acclimatization day. Option to hike 4-5 hours to the Everest View Hotel (3,880m) for stunning panoramic views of Mount Everest, Lhotse, Nuptse, Pumori, Thamserku, and Ama Dablam.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Visit the Sherpa Museum to learn about Sherpa history, culture, and mountaineering heritage. Alternatively, visit Khumjung Village (3,790m) with its monastery and the Khumjung School built by Sir Edmund Hillary. Namche is also the last place to find an ATM.',
                },
              ],
            },
          ],
        },
      },
      meals: ['breakfast', 'lunch', 'dinner'],
      accommodation: 'Local Lodge - Namche Bazaar',
    },
    {
      day: 6,
      title: 'Trek to Tengboche (3,860m / 12,665ft)',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Trek about 10 km in around 6 hours. The trail begins with a steep climb from Namche, offering stunning views of Thamserku, Kangtega, and Kusum Kanguru. Gradually ascend through lush rhododendron forests.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Reach Tengboche village, home to the famous Tengboche Monastery, one of the most important Buddhist temples in the Khumbu region. Witness monks performing daily rituals and chanting with spectacular mountain views.',
                },
              ],
            },
          ],
        },
      },
      meals: ['breakfast', 'lunch', 'dinner'],
      accommodation: 'Local Lodge - Tengboche',
    },
    {
      day: 7,
      title: 'Trek to Dingboche (4,410m / 14,469ft)',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'This 10-11 km trek takes around 6 hours. Pass through Pangboche, known for its ancient monastery (the oldest in the region) housing a purported Yeti scalp relic. Cross a long footbridge over the Imja Khola River.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Travel through beautiful rhododendron woodland with Lhotse and Ama Dablam dominating the skyline. Notice mani stones carved with Buddhist chants along the trail. Reach Dingboche village with its stone-walled fields.',
                },
              ],
            },
          ],
        },
      },
      meals: ['breakfast', 'lunch', 'dinner'],
      accommodation: 'Local Lodge - Dingboche',
    },
    {
      day: 8,
      title: 'Acclimatization Day in Dingboche (4,410m)',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Second crucial acclimatization day. Option for a 3-4 hour hike (approx. 5 km) to Nagarjuna Hill or Nangkartshang Peak (5,083m), offering panoramic views of Mt. Lhotse, Mt. Makalu, Mt. Ama Dablam, and other peaks.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'This is completely optional - you can instead spend the day exploring Dingboche village, enjoying the peaceful surroundings, and preparing for the trek ahead. Proper hydration and nutrition are key.',
                },
              ],
            },
          ],
        },
      },
      meals: ['breakfast', 'lunch', 'dinner'],
      accommodation: 'Local Lodge - Dingboche',
    },
    {
      day: 9,
      title: 'Trek to Lobuche (4,940m / 16,207ft)',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Cover about 9 km in around 6 hours through increasingly rugged Himalayan terrain. Ascend a steep uphill route to Dusa and then Dughla (4,620m), finding yourself at the foot of the Khumbu Glacier - the highest glacier in the world.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Pass memorial monuments honoring mountaineers who lost their lives on Everest. The landscape changes to barren glacial moraines and empty valleys before reaching Lobuche, a small settlement with tea houses.',
                },
              ],
            },
          ],
        },
      },
      meals: ['breakfast', 'lunch', 'dinner'],
      accommodation: 'Local Lodge - Lobuche',
    },
    {
      day: 10,
      title: 'Trek to Gorak Shep (5,164m) & Everest Base Camp (5,364m)',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The highly anticipated day! Trek from Lobuche to Gorak Shep along the Khumbu Glacier (2-3 hours, 4 km). Gorak Shep is the last overnight accommodation for trekkers.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Continue for another two hours to Everest Base Camp (EBC). Stand at the foot of the world\'s highest mountain, witnessing the vast walls of Lhotse, the Western Cwm glacier, Nuptse, and the Khumbu Icefall. Return to Gorak Shep for the night.',
                },
              ],
            },
          ],
        },
      },
      meals: ['breakfast', 'lunch', 'dinner'],
      accommodation: 'Local Lodge - Gorak Shep',
    },
    {
      day: 11,
      title: 'Hike to Kala Patthar (5,545m) & Trek to Pheriche (4,371m)',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Wake up around 3 am for a 2-3 hour hike to Kala Patthar (5,545m / 18,192ft). This viewpoint offers the most striking panoramic sunrise views of Mount Everest, Lhotse, Nuptse, Ama Dablam, and Pumori when peaks are bathed in golden light.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Descend to Gorak Shep for breakfast, then continue to Pheriche (4-5 hours, 12 km). The trail retraces parts of the upward journey to a lower altitude with greener valleys.',
                },
              ],
            },
          ],
        },
      },
      meals: ['breakfast', 'lunch', 'dinner'],
      accommodation: 'Local Lodge - Pheriche',
    },
    {
      day: 12,
      title: 'Trek to Namche Bazaar (3,440m)',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Long descent covering about 19 km in 6-7 hours, retracing steps from Pheriche back to Namche Bazaar. Pass through Pangboche and Tengboche again, offering another chance to appreciate the scenery and monastery.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The changing landscape from rocky terrain to lush alpine forests provides a refreshing contrast. Time for shopping or relaxing after the long walk.',
                },
              ],
            },
          ],
        },
      },
      meals: ['breakfast', 'lunch', 'dinner'],
      accommodation: 'Local Lodge - Namche Bazaar',
    },
    {
      day: 13,
      title: 'Trek to Lukla (2,860m)',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Final trekking day covering 18 km over 8 hours from Namche Bazaar to Lukla. Steep descent through lush rhododendron and pine forests, crossing multiple suspension bridges over the Dudh Koshi River.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Pass through remote villages, experiencing the vibrant sounds of local life. Celebrate the successful completion of your trek with a celebratory dinner in Lukla.',
                },
              ],
            },
          ],
        },
      },
      meals: ['breakfast', 'lunch', 'dinner'],
      accommodation: 'Local Lodge - Lukla',
    },
    {
      day: 14,
      title: 'Fly back to Kathmandu (1,350m)',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Early morning flight from Lukla back to Kathmandu (approximately 45 minutes), providing a final aerial perspective of the stunning Himalayan range.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Upon arrival in Kathmandu, transfer to your hotel where you can relax and reflect on your incredible journey.',
                },
              ],
            },
          ],
        },
      },
      meals: ['breakfast', 'lunch', 'dinner'],
      accommodation: 'Hotel in Kathmandu',
    },
    {
      day: 15,
      title: 'Farewell Program',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Extra day in Kathmandu to relax, shop, and explore cultural heritage sites. In the evening, attend the farewell program to celebrate the successful completion of your journey to Everest Base Camp.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Meet with the Managing Director for feedback sharing. Receive a special keepsake and participate in sustainability discussions. Enjoy farewell dinner with authentic local cuisines and cultural dance performances.',
                },
              ],
            },
          ],
        },
      },
      meals: ['breakfast', 'dinner'],
      accommodation: 'Hotel in Kathmandu',
    },
    {
      day: 16,
      title: 'Departure from Kathmandu',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Your unforgettable Everest Base Camp adventure comes to an end as we transfer you from your hotel to Tribhuvan International Airport for your international departure.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'We are truly grateful for the opportunity to be part of your journey and hope the memories you\'ve made will last a lifetime. Wishing you a safe, comfortable, and pleasant flight home!',
                },
              ],
            },
          ],
        },
      },
      meals: ['breakfast'],
      accommodation: null,
    },
  ],
  highlights: [
    { highlight: 'One of the world\'s most popular and iconic treks to Mount Everest Base Camp' },
    { highlight: 'Thrilling scenic flight from Kathmandu to Lukla Airport' },
    { highlight: 'Stunning Himalayan landscapes with breathtaking glaciers and majestic mountains' },
    { highlight: 'Cross high suspension bridges including the famous Hillary Bridge' },
    { highlight: 'Rich cultural immersion into the life of the Sherpa people' },
    { highlight: 'Visit Tengboche Monastery - the spiritual center of Khumbu region' },
    { highlight: 'Panoramic sunrise views from Kala Patthar (5,545m)' },
    { highlight: 'Trek through Sagarmatha National Park - UNESCO World Heritage Site' },
    { highlight: 'Explore Namche Bazaar - the Sherpa Capital' },
    { highlight: 'Professional guides and comprehensive support throughout the journey' },
  ],
  groupSize: {
    min: 1,
    max: 12,
  },
  difficulty: 'challenging' as const,
  ageRequirement: {
    minimum: 16,
    maximum: 65,
  },
  status: 'active' as const,
  featured: true,
  popularityScore: 95,
  metaTitle: 'Everest Base Camp Trek 16 Days | Classic Adventure | Green Getaways',
  metaDescription:
    'Trek to Everest Base Camp in 16 days. Experience Mt. Everest, Sherpa culture, and stunning Himalayan views. From USD 2,699.',
  description: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Introduction to the Everest Base Camp Trek' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'The Everest Base Camp (EBC) trek is widely recognized as one of the world\'s most popular and iconic treks, attracting thousands of adventurers each year. Located in the northeastern Khumbu region of Nepal, it offers a journey to the base camp of Mount Everest, the world\'s highest mountain, known locally as Mt. Sagarmatha.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'This expedition is typically completed over 16 days, starting and ending in Kathmandu, Nepal. The adventure begins with a thrilling, short flight from Kathmandu to Lukla Airport (Tenzing-Hillary Airport), which is notable for its short runway, steep incline, and location amidst the Himalayan mountains, making it one of the most adventurous airports globally.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'A Visual Masterpiece' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'The EBC trek is a visual masterpiece, traversing through stunning Himalayan landscapes that include remote villages, towering peaks, breathtaking glaciers, lush rhododendron forests, and serene alpine meadows. Trekkers will witness majestic mountains such as Ama Dablam, Pumori, Lhotse, Nuptse, and, of course, Mount Everest itself. The trail also crosses high suspension bridges over deep gorges and rivers like the Dudh Koshi.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Cultural Immersion' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Beyond its natural beauty, the trek offers a rich cultural immersion into the life of the Sherpa people, renowned for their mountaineering skills, hospitality, and deep-rooted Buddhist traditions. Along the way, trekkers have opportunities to explore vibrant towns like Namche Bazaar (often called "The Sherpa Capital"), visit ancient monasteries such as Tengboche Monastery (a significant spiritual center in the Khumbu region), and observe cultural practices like spinning prayer wheels.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'The Achievement' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Reaching Everest Base Camp (5,364m / 17,598 ft.) and hiking to Kala Patthar (5,545m / 18,192 ft.), which offers unparalleled panoramic sunrise views of Mount Everest, Lhotse, Nuptse, and the vast Khumbu Glacier and Icefall, provides a profound sense of accomplishment and personal triumph.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Despite being physically challenging, requiring good physical fitness and acclimatization days to adjust to high altitudes, the trek is considered doable for beginners with proper preparation and guidance. It\'s an exhilarating and transformative experience that creates lifelong memories and often fosters deep friendships among trekkers.',
            },
          ],
        },
      ],
    },
  },
  // Detailed Info
  whyChooseUs: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Why Everest with Green Getaways' }],
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
              text: 'We prioritize safety, especially given the challenging nature of the EBC trek and the risk of altitude sickness. Before you book the trip with us, we offer you training guidelines and other important information to help you complete the trek successfully.',
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
              text: 'We emphasize our guides\' extensive experience, with some having completed the EBC trek over 100 times. These guides are government-licensed and trained in high-altitude trekking and first aid. They are crucial for navigation, especially where paths might not be evident, and for ensuring trekkers\' well-being by monitoring health and altitude acclimatization.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Acclimatization Focus' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Itineraries are carefully designed with rest days and gradual ascents to help trekkers adjust to the altitude, following principles like "climb high, sleep low".',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Emergency Preparedness' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Guides carry emergency kits and oximeters, and companies assist with rescue and evacuation arrangements. However, we recommend having insurance to cover the cost of rescue and evacuation. Your personal travel consultant will give all the necessary information about the insurance before booking the trip.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Reliable Support Teams' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'We often provide porters who carry luggage, easing the physical burden on trekkers. We support the local economy by hiring porters who can later become guides.',
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
              text: 'We offer all-inclusive packages to simplify the trek planning with no hidden costs. Services include airport pickup and drop-off, accommodation, and all meals during the trek, welcome and farewell dinner, domestic flights (Kathmandu-Lukla-Kathmandu), permits (Sagarmatha National Park and Local Permit), and a trekking guide and porter services.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Flexibility and Customer Service' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'We offer carefully curated itineraries that can be designed or customized to match clients\' preferences and schedules. We boast 24/7 customer service and guides available throughout the trek. We offer private trekking options, allowing trekkers to go at their own pace without rushing or waiting for others.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Authentic Cultural Immersion' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Beyond the physical challenge, we emphasize the cultural aspect of the trek, helping you to soak in authentic cultural experiences. We show a dedication to supporting local businesses and promoting eco-friendly tourism practices, often partnering with locally owned teahouses.',
            },
          ],
        },
      ],
    },
  },
  commitmentToSustainability: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Our Commitment to Sustainability' }],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Environmental Stewardship' }],
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
                  text: '"Leave No Trace" Commitment: Every trekker receives comprehensive information on minimizing environmental impact, including waste segregation, responsible disposal, and respecting natural habitats.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Waste Deposit System: To encourage responsible disposal, trekkers pay a refundable waste deposit returned upon bringing back collected non-biodegradable waste from the trail.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Eco-friendly Lodging: Most of our partnered lodges use solar power and biogas, minimizing firewood consumption to protect local forests.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Water Conservation: We educate travelers on responsible water use and provide clean water refill services to reduce plastic bottle waste.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Support Local Conservation Initiatives: Green Getaways partners with the Sagarmatha Pollution Control Committee (SPCC) and contributes to reforestation projects to help preserve Everest\'s fragile ecosystem.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Trail and Wildlife Protection: Trekkers are guided to stay on marked trails to prevent erosion and respect wildlife habitats.',
                },
              ],
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Socio-Cultural Preservation & Community Empowerment' }],
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
                  text: 'Authentic Local Experiences: Stay in community-run lodges and Sherpa homestays, fostering direct economic benefits and cultural exchange.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Engagement with Local Communities: Trek with certified Sherpa guides and hire local porters who are fairly compensated and supported with ethical working conditions.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Cultural Sensitivity Training: Pre-trek sessions detail Sherpa traditions, sacred mountain reverence, and respectful etiquette.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Support Local Artisans: Opportunities to purchase authentic handicrafts directly from Sherpa artisans enhance local livelihoods.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Transparency and Fairness: A clear breakdown of how your trekking fees contribute to community projects like education, healthcare, and infrastructure development.',
                },
              ],
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Economic Viability' }],
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
                  text: 'Support Local Economy: All services prioritize local Sherpa-owned businesses to ensure the community benefits directly.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Off-Peak Trekking Incentives: Special packages encourage trekking during less crowded times.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Diversified Offerings: Explore secondary trekking routes promoted by Green Getaways to distribute tourism benefits throughout Nepal.',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  trekkersResponsibilities: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Trekkers Responsibilities' }],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Environmental Protection and Waste Management' }],
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
                  text: 'Bring Reusable Water Solutions: Avoid single-use plastic bottles by carrying water purifiers such as Lifestraw, Sawyer filters, Steripen, or purification tablets. This helps reduce plastic pollution in the fragile Himalayan ecosystem.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Carry Out All Trash: You are responsible for carrying out every piece of your waste, including items like batteries and packaging. Participate in initiatives like the #Carry_Me_Back program.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Follow Leave No Trace Principles: Minimize your environmental footprint by sticking to marked trails, avoiding disturbance to wildlife and vegetation, and properly disposing of all waste.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Respect Local Energy Resources: Power in the Everest Region is often solar-generated and limited. Use electricity sparingly, bring spare batteries or power banks.',
                },
              ],
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Cultural Respect and Local Engagement' }],
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
                  text: 'Honor Local Customs and Traditions: Dress modestly and behave respectfully, especially when visiting monasteries or stupas. Walk clockwise around religious sites and observe silence or prayers when appropriate.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Be Respectful and Polite: Engage kindly with Sherpa guides, porters, lodge owners, and fellow trekkers, recognizing the efforts and hospitality they provide.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Support Local Businesses: Stay at family-run tea houses, purchase authentic handicrafts, and buy local products to directly benefit the communities that welcome you.',
                },
              ],
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Responsible Consumption' }],
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
                  text: 'Prepare financially: Carry sufficient Nepalese Rupees (NPR), as many remote lodges and vendors do not accept cards. Prices for food, water, and services increase with altitude.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Use Resources Wisely: Conserve water and energy resources on the trail and in lodges, understanding their scarcity and environmental impact.',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  trekkersPreparation: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Trekkers Preparation' }],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Physical Preparation' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'To prepare effectively for your trek, start training at least two to three months in advance. Focus on building stamina and endurance through activities like cycling, jogging, swimming, and running. In addition to cardiovascular exercise, incorporate strength training that targets your core, lower body, and upper body. Beneficial exercises include squats, lunges, deadlifts, planks, push-ups, pull-ups, and rows. It\'s also important to practice day hikes carrying a backpack weighing 5 to 7 kg, so you get accustomed to walking long distances on varied terrain with uphill and downhill sections. Make sure to break in your hiking boots well before the trip to prevent blisters and discomfort.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Health and Acclimatization' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'When trekking at high elevations, it\'s crucial to understand the risks of altitude mountain sickness (AMS), which can affect anyone above 2,400m (8,000ft). Typical symptoms include headaches, nausea, dizziness, insomnia, fatigue, and shortness of breath. More severe conditions like High-Altitude Pulmonary Edema (HAPE) or High-Altitude Cerebral Edema (HACE) are medical emergencies and can be fatal.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'To acclimatize safely, ascend gradually and follow the standard itinerary, which includes acclimatization days at vital locations such as Namche Bazaar (3,440m) and Dingboche (4,410m). Stay well-hydrated by drinking at least 3 liters of water daily and avoiding alcohol and caffeine while ascending. Ensure you eat enough calories from a balanced diet rich in carbohydrates, proteins, and vitamins.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Always consult your doctor if you have a pre-existing medical condition before embarking, and purchase comprehensive travel insurance that covers high-altitude trekking (above 5,500 m) and includes helicopter rescue and medical evacuation.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Gear and Packing' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'When packing for your trek, aim to pack lightly and bring only essentials, as porters typically carry up to 13kg of your main pack. Prioritize good quality, waterproof, and well-fitted trekking boots with ankle support, making sure they\'re properly broken in. Essential items include a warm, zero or minus-rated sleeping bag and a down jacket for cold temperatures.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Pack warm clothing: several pairs of thermal leggings, quick-dry trekking pants, waterproof pants, moisture-wicking shirts, and a fleece jacket for layering. Don\'t forget inner thermal gloves and waterproof outer gloves, along with several pairs of thermal trekking socks. A headlamp with extra batteries is crucial for dark mornings and nights.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Carry water bottles or a hydration bladder (2-3 liters capacity) and water purification tablets or a system. Also, pack a comprehensive first aid kit with necessary medications and blister care, along with sunscreen (SPF 50 or above) and lip balm for sun protection. Trekking poles can provide valuable support on uneven trails.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Permits and Guides' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'For trekking in the Everest region, permits are mandatory and primarily include the Khumbu Pasang Lhamu Rural Municipality Entry Permit and the Sagarmatha National Park Entry Permit. Both cost around NPR 3,000 (approximately USD 20) for foreigners.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Our tour packages include all the trekking permits and entrance fees, so if you are traveling with us, you do not need to worry about this. Hiring a guide is highly recommended and is officially mandatory for most trekking routes in Nepal since 2023. Guides enhance safety, offer valuable cultural and trail information, and assist with logistics such as accommodation and food.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Mental Preparation and Expectations' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Maintaining a positive attitude and mindset is essential to successfully overcoming the challenges encountered during the trek. Be prepared to face physical discomfort, unpredictable weather, and tough terrain along the way. It\'s important to embrace the journey itself as much as the destination. Take time to soak in the breathtaking scenery, engage with the local Sherpa people and their rich culture, and reflect on your own personal growth throughout the experience.',
            },
          ],
        },
      ],
    },
  },
  cultureAndCommunity: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Culture and Community During Trek' }],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Sherpa Culture and Community' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'The trek provides an immersive experience into the life of the Sherpa community. Sherpas are renowned for their mountaineering skills, hospitality, and deep-rooted Buddhist traditions. You will have opportunities to interact with local Sherpas and gain insights into their daily lives, customs, and rich heritage.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Namche Bazaar is considered "The Sherpa Capital", a bustling market town and a main commercial hub for people trekking in the Himalayas. Khumjung Village is a typical Sherpa village known for its stunning natural beauty and traditional Sherpa culture. You can visit the Khumjung Monastery, which reputedly houses a Yeti scalp, and the Khumjung School, built by Sir Edmund Hillary in 1961.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Buddhism and Spirituality' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Throughout the trek, you will encounter numerous prayer wheels, prayer flags, and stupas as a Tibetan influence. Rotating a prayer wheel is believed to be equivalent to reciting a mantra, often "OM MANI PADME HUM". It is customary and considered good luck to spin prayer wheels clockwise and walk clockwise around stupas and sacred rocks.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Tengboche Monastery, located at 3,867 meters, is one of the most important and famous monasteries in the Everest region, considered the spiritual center of the Khumbu region. It houses around 60 monks, features a prayer hall with colorful murals and artifacts, and you can witness monks performing daily rituals, chanting, and playing traditional musical instruments.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Local Life and Economy' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Tea houses are the primary accommodation along the trek, run by local families, offering basic but comfortable twin-sharing rooms. They serve as central communal areas where trekkers eat meals, meet others, and play cards. Porters, yaks, and donkeys are crucial for transporting all supplies up the mountain, including food and construction materials.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Yak dung is used as fuel for heating stoves in tea houses, especially above the tree line, where wood is scarce. Yaks are essential animals, providing milk, meat, fur, and acting as pack animals.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Historical and Commemorative Aspects' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'The trek allows you to follow in the footsteps of Sir Edmund Hillary and Tenzing Norgay Sherpa, the first confirmed climbers to reach the summit of Mount Everest in 1953. The Lukla Airport is also known as Tenzing-Hillary Airport, and there is a stupa honoring Tenzing Norgay in Namche Bazaar. The Sherpa Museum in Namche Bazaar showcases the history and culture of the Sherpa people.',
            },
          ],
        },
      ],
    },
  },
  // Practical Info
  packingList: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Packing List for Everest Base Camp Trek' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Packing wisely for the Everest Base Camp (EBC) trek is crucial for your comfort and safety. It\'s recommended to pack only the essentials, as every ounce counts when trekking for days. The quality of your gear is essential for your comfort and safety.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Clothing' }],
        },
        {
          type: 'paragraph',
          children: [{ type: 'text', text: 'Base Layers:' }],
        },
        {
          type: 'list',
          listType: 'bullet',
          children: [
            {
              type: 'listitem',
              children: [{ type: 'text', text: '2-3 moisture-wicking long-sleeved t-shirts' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: '2-3 short-sleeve shirts (moisture-wicking)' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: '1-2 merino wool or synthetic tank tops' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: '3-4 pairs of thermal leggings' }],
            },
          ],
        },
        {
          type: 'paragraph',
          children: [{ type: 'text', text: 'Insulating Layers:' }],
        },
        {
          type: 'list',
          listType: 'bullet',
          children: [
            {
              type: 'listitem',
              children: [{ type: 'text', text: '1 fleece or wool sweater' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: '1 fleece jacket or pullover' }],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'A full down jacket certified for at least minus eight degrees Celsius (provided by Green Getaways)',
                },
              ],
            },
          ],
        },
        {
          type: 'paragraph',
          children: [{ type: 'text', text: 'Outer Shell (Waterproof & Windproof):' }],
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
                  text: '1 waterproof and breathable rain jacket with a hood (Gore-Tex or similar)',
                },
              ],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: '1 waterproof and breathable rain pants' }],
            },
          ],
        },
        {
          type: 'paragraph',
          children: [{ type: 'text', text: 'Other Clothing:' }],
        },
        {
          type: 'list',
          listType: 'bullet',
          children: [
            {
              type: 'listitem',
              children: [{ type: 'text', text: '2-3 pairs of quick-dry trekking pants' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: '5-7 pairs of moisture-wicking underwear' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'A woolen cap or warm hat' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'A sun hat (full brim for face and neck protection)' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Scarf/Neck Gaiter/Buff (for dust and cold protection)' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Sunglasses (polarized are recommended)' }],
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Footwear' }],
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
                  text: 'Waterproof and well-fitted trekking boots with good ankle support (must be worn in before the trek)',
                },
              ],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Lightweight shoes or sandals for the teahouse' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: '3-4 pairs of thermal trekking socks (wool or technical fabric)' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: '3-4 pairs of regular trekking socks' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Gaiters (for prevention against dust and snow)' }],
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Gear' }],
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
                  text: 'Duffel bag: 65-75 liters for porters to carry (max 15kg/33lbs) - provided by Green Getaways',
                },
              ],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Daypack: 30-40 liters for daily essentials' }],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Sleeping bag: Rated for at least -9°C (15°F) or zero or minus rated - provided by Green Getaways',
                },
              ],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Trekking poles: Adjustable and lightweight' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Headlamp with extra batteries' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Water bottles or hydration bladder (2-3 liters capacity)' }],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Water purification tablets or UV treatment systems (e.g., Lifestraw, Sawyer filter, Steripen)',
                },
              ],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Portable chargers or power banks' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Camera and spare batteries' }],
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Personal Care & Health' }],
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
                  text: 'First Aid Kit (personal medication, band-aids, blister care, painkillers, Diamox)',
                },
              ],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Sunscreen and Lip Balm (SPF 50 or higher)' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Moisturizer' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Hand sanitizer' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Toilet paper and trowel' }],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Toothbrush, toothpaste, biodegradable soap' }],
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Other Essentials' }],
        },
        {
          type: 'list',
          listType: 'bullet',
          children: [
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Passport with necessary permits and visa' }],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Trekking insurance that covers helicopter evacuation up to 5,500m',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Local currency (Nepalese Rupees) for personal expenses, tips, and emergencies',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                { type: 'text', text: 'Snacks (energy bars, nuts, dried fruits) to supplement meals' },
              ],
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Note: Duffel bag, Sleeping bag, and down jacket are provided by Green Getaways. Most trekking equipment can be bought or rented in Kathmandu, especially in areas like Thamel.',
            },
          ],
        },
      ],
    },
  },
  accommodationInfo: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Accommodation in the Everest Base Camp Trek' }],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Teahouses and Lodges' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Teahouses are the most common form of accommodation along the EBC trek route, offering a basic but authentic experience. Rooms are generally small but clean and comfortable, typically offering twin-sharing beds with mattresses and blankets.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Bathrooms can be either private or shared. In lower altitudes like Phakding, you might find private bathrooms with Western toilets and hot running water for showers. However, as you ascend, facilities become more basic; toilets may not flush and require water to be manually dumped, and hot showers become less common or are only available for an extra charge.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Most teahouses feature a common area where trekkers gather to eat meals, socialize, play cards, and relax. These areas often have wood-burning stoves (sometimes fueled by yak dung at higher altitudes) to provide warmth.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Hotels in Kathmandu' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Most EBC trek packages provided by Green Getaways include accommodation in a 5-star category hotel (or similar standard) in Kathmandu upon arrival and before departure. These hotels are often located in the Central market of Kathmandu, a tourist hub with shops, restaurants, and trekking gear stores.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Connectivity and Charging' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Wi-Fi service is available in many villages like Lukla, Phakding, Namche Bazaar, and Tengboche, though it often comes at an additional cost, can be slow, and is not always reliable. Charging stations for electronic devices are available in most lodges, but these facilities usually incur an extra fee, especially at higher elevations, and may be solar-powered, affecting availability on cloudy days.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Cultural Aspects' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'It is customary and respectful to eat your meals at the teahouse where you are staying for the night. Interactions with local Sherpa people and teahouse owners are a significant part of the cultural immersion experience.',
            },
          ],
        },
      ],
    },
  },
  foodInfo: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Food During the EBC Trek' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'The trekking package covers three daily meals (breakfast, lunch, and dinner). Dal Bhat, a traditional Nepalese dish of steamed rice, lentil soup, and vegetable curry, is highly nutritious and offered with unlimited servings.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Teahouses offer a wide selection of healthy and delicious options, including momos (dumplings), Thukpa (noodle soup), chapati, sandwiches, Tibetan bread, and porridge. In Namche Bazaar, you can find a greater variety, like pizza, burgers, steak, and bakery items.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'It is generally advised to avoid non-vegetarian food at higher altitudes due to a lack of refrigeration and the long transport journey for meat. Hot drinks like tea (including ginger lemon honey tea) and coffee are widely available but typically not included in the package price and become more expensive with increasing altitude.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Additional Expenses' }],
        },
        {
          type: 'list',
          listType: 'bullet',
          children: [
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Extra snacks and drinks beyond the included menu' }],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Hot drinks are often a necessity and can cost around a dollar per cup, with prices increasing at higher altitudes',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Trekkers often buy extra snacks (e.g., energy bars, nuts, dried fruits) as tour meals may not always be enough',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  bestTimeToTrek: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Best Time to Trek Everest Base Camp' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'For an optimal experience, we recommend two primary seasons for trekking: Spring and Autumn.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Spring (March to May)' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Weather and Visibility: This season offers milder, warm, and dry weather with clear skies, providing stunning views of the Himalayas. Daytime temperatures can range from 15 to 20°C, dropping to 5 to 10°C at night.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Flora: A significant highlight of spring is the lush rhododendron forests and alpine meadows, which are in full bloom, adding vibrant colors to the landscape, along with magnolias and cherry trees.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Crowds: Due to favorable conditions, spring is a popular time to trek, meaning the trails can be quite crowded, and securing accommodation might be challenging.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Autumn (September to November)' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Weather and Visibility: Following the monsoon season, the air is typically clear and mild, with stable, dry weather. Temperatures during the day usually range from 12 to 20°C, falling to minus 5 to 5°C at night. The mountains are perfectly visible, offering excellent views.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Crowds: This period is generally less busy than spring. There\'s a chance of encountering light snowfall towards the end of the season. If you visit in October, you might experience the Mani Rimdu festival, a Buddhist celebration.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Winter (December to February)' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Conditions: This season brings heavy snow and significantly colder temperatures, ranging from minus 10 to minus 15 °C during the day and minus 20 to minus 25°C at night. Trails can be challenging due to snow and ice, and some areas might become inaccessible. However, winter offers a less crowded trekking experience.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Monsoon/Summer (June to August)' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Conditions: This period is characterized by heavy rainfall, high humidity, and cloudy skies. Daytime temperatures are warmer, around 20 to 25°C, but nights can still be chilly at 10 to 15°C. Trekking can be difficult due to wet and slippery trails. Despite the challenges, the landscape is lush and green.',
            },
          ],
        },
      ],
    },
  },
  typicalRoutine: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'A Typical Day on the EBC Trek' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'A typical day on the Everest Base Camp trek is a blend of physical challenge, breathtaking scenery, and cultural immersion. Trekkers generally wake up early, often around 6:00 a.m., to chilly temperatures.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Breakfast can include options like musli with fruit and hot milk, pancakes, oatmeal, porridge, or egg dishes, and is often ordered the night before to be ready in the morning. Hot drinks like tea or coffee are a necessity.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'The hiking typically begins around 7:00 or 7:30 a.m. and involves walking for 5-8 hours per day, covering distances of 8-19 kilometers. The terrain is varied, ranging from gradual inclines and declines through rhododendron and pine forests at lower altitudes to rocky, sandy, and sometimes icy paths at higher elevations.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Trekkers cross numerous high steel cable suspension bridges, including the famous Hillary Bridge. Upon reaching the day\'s destination village, trekkers check into a teahouse or lodge.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Evenings are spent in communal dining areas, often around a wood-burning stove. This is a time for trekkers to relax, eat dinner, share stories, play cards, and connect with fellow adventurers and local Sherpa hosts. The day ends with an early night to prepare for the next day\'s trek.',
            },
          ],
        },
      ],
    },
  },
  permitInfo: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Types and Cost of Permits for EBC Trek' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'For the Everest Base Camp trek, you will generally need two primary permits:',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [
            { type: 'text', text: 'Khumbu Pasang Lhamu Rural Municipality Entrance Permit' },
          ],
        },
        {
          type: 'list',
          listType: 'bullet',
          children: [
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Cost: NPR 3,000 (approximately USD 20)' }],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Where to obtain: You can acquire this permit locally, usually in Lukla, the starting point of the trek, or on the trail just outside Lukla airport',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'You will need a copy of your passport, two passport-sized photographs, and payment in Nepalese rupees',
                },
              ],
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Sagarmatha National Park Entry Permit' }],
        },
        {
          type: 'list',
          listType: 'bullet',
          children: [
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Cost: NPR 3,000 (approximately USD 20)' }],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Where to obtain: This permit can be obtained at the Nepal Tourism Board in Kathmandu or at Monjo, which is the entrance gate to Sagarmatha National Park',
                },
              ],
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'TIMS Card' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'The Trekkers\' Information Management System (TIMS) Card was designed to enhance trekkers\' safety. From May 2024, for individual trekkers, the TIMS card is no longer needed and is primarily for agencies.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Important Notes' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Green Getaways includes the costs for all necessary trekking permits within the package prices. This means that for those booking through us, you do not need to worry about it, as we handle the paperwork on behalf of our guests.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'It is advisable to click a picture of your permits on your mobile as there are multiple checkpoints along the trail where you might need to show them, and a penalty could be imposed if you lose them.',
            },
          ],
        },
      ],
    },
  },
  guideRequirement: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Guide Requirement and Solo Trekking Policies' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'As of now, the EBC trek can be completed without hiring a guide as well. However, hiring a guide is highly recommended and is officially mandatory for most trekking routes in Nepal since 2023.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Guides enhance safety, offer valuable cultural and trail information, and assist with logistics such as accommodation and food. Although the Nepal Tourism Board enforces guide requirements, the Khumbu local government recommends but does not mandate guides for the Everest region, allowing many solo trekkers.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Porters are also highly recommended as they carry heavy bags, easing the trek and supporting the local economy. Many porters eventually become guides themselves, adding value to the community.',
            },
          ],
        },
      ],
    },
  },
  acclimatizationInfo: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Acclimatization During EBC Trek' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Acclimatization is a crucial aspect of the Everest Base Camp trek. Proper acclimatization is essential for minimizing the risk of Acute Mountain Sickness (AMS) and ensuring a safe and successful journey.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Acclimatization Days' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Trekking itineraries to EBC are specifically designed to include rest days and gradual ascents. Typically, the first acclimatization day is spent in Namche Bazaar (3,440 meters), and the second acclimatization day is at Dingboche (4,410 meters).',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Activities during these days often include short hikes to higher elevations to help the body adjust, following the principle of "climb high, sleep low".',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Prevention and Management of AMS' }],
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
                  text: 'Gradual Ascent: It is crucial to ascend slowly and avoid rushing. Walk at your own pace and listen to your body.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Hydration: Stay well-hydrated by drinking at least 3 liters of water daily. Avoid alcohol and caffeine.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Medication: Diamox (acetazolamide) can aid in acclimatization. Consultation with a doctor is advised.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Nutrition: Consume a balanced diet rich in carbohydrates, proteins, and vitamins. Eat small, frequent meals.',
                },
              ],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'Guide\'s Role: A licensed guide monitors trekkers\' health, provides advice, and assists with emergencies.',
                },
              ],
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Other Health Issues' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Beyond AMS, trekkers may experience Khumbu Cough (caused by dry air), stomach problems, sunburn, swelling of hands and feet, and physical exhaustion. Proper preparation and listening to your body are essential.',
            },
          ],
        },
      ],
    },
  },
  currencyExchangeInfo: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Currency Exchange and Cash Information' }],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Currency Exchange Location' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'You can exchange money in Namche Bazaar, where companies like Western Union and IME are available. A few banks in Lukla and Namche Bazaar also offer money exchange services. However, the exchange rate is generally low in these mountain towns, so it is better to exchange currencies in Kathmandu. You can find money exchange services at the airport or in Thamel, the tourist hub in Kathmandu.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Preferred Payment Method: Cash is King' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'It is strongly advised to always carry cash with you on the trek. Card payments are rarely accepted, and if they are, it\'s typically only up to Namche Bazaar. The higher you go in elevation, the more hotels and tea houses prefer cash payments.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'ATMs are available in Namche Bazaar and Lukla, but nowhere else on the EBC trekking route, so plan your withdrawals accordingly.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'How Much Cash to Carry' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'It is recommended to carry approximately $200 USD for personal expenses, such as hot showers, Wi-Fi, battery charging, drinks, and snacks. However, this depends upon your purchasing habits. Prices for services and goods generally increase as you go higher up the mountain due to logistical challenges.',
            },
          ],
        },
      ],
    },
  },
  requiredDocuments: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Required Documents for EBC Trek' }],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Trekking Permits' }],
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
                  text: 'Khumbu Pasang Lhamu Rural Municipality Entry Permit (NPR 3,000)',
                },
              ],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Sagarmatha National Park Entry Permit (NPR 3,000)' }],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'TIMS Card (not required for individual trekkers as of May 2024)',
                },
              ],
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Passport and ID Photos' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Your passport name, number, expiry, and country are required at the time of booking. We recommend having at least 4 passport-sized photos and 2 copies of your passport.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Visa to Nepal' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'A visa to Nepal is required and is not included in trek packages. Nepal offers a visa on arrival at Tribhuvan International Airport. The cost for a 15-day visa is around $30 USD, and $50 USD for 30 days.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Travel Insurance' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Travel insurance is strongly recommended. It should cover helicopter rescue and medical evacuation, especially for high-altitude trekking, with coverage up to 5,500m. A minimum value of USD 100,000 for medical and emergency evacuations is suggested.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Other Documents' }],
        },
        {
          type: 'list',
          listType: 'bullet',
          children: [
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Itinerary and insurance documents (bring copies)' }],
            },
            {
              type: 'listitem',
              children: [
                { type: 'text', text: 'Medical reports if you have pre-existing health conditions' },
              ],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Emergency contact information' }],
            },
          ],
        },
      ],
    },
  },
  womenParticipation: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Women/ Ladies Participation' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'When women or ladies book the EBC Trek package with us, we prioritize their comfort and safety by appointing an experienced women\'s guide (if required) to accompany the group.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Our Women\'s Special EBC Trek includes:' }],
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
                  text: 'Appointment of a dedicated women\'s guide for female trekkers (if required)',
                },
              ],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Priority booking and special arrangements for women' }],
            },
            {
              type: 'listitem',
              children: [
                {
                  type: 'text',
                  text: 'A supportive and safe trekking environment, exclusively or prioritizing women participants',
                },
              ],
            },
            {
              type: 'listitem',
              children: [{ type: 'text', text: 'Tailored trekking pace and rest days to suit women trekkers' }],
            },
          ],
        },
      ],
    },
  },
  // FAQs
  faqs: [
    {
      question: 'How long does the Everest Base Camp Trek take?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The standard EBC trek itinerary typically takes 14 to 16 days from Kathmandu, with about 11 days dedicated to actual trekking. This includes two crucial acclimatization days to help your body adjust to the high altitude. The trek distance from Lukla to Base Camp and return is approximately 130 kilometers (81 miles).',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: 'How difficult is the Everest Base Camp Trek?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The EBC trek is considered challenging but equally rewarding. It requires a good level of physical fitness, as you will be walking an average of 5-6 hours per day through varied terrain, including steep ascents and descents, rocky paths, and glacial moraines. While it doesn\'t require technical climbing skills, the high altitude (reaching up to 5,545 meters / 18,192 feet at Kala Patthar) makes it physically demanding and presents a risk of altitude sickness. However, with proper training, preparation, and the assistance of trained guides, even beginners with good physical fitness can complete the trek.',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: 'When is the best time to trek to Everest Base Camp?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The best seasons for the EBC trek are spring (March to May) and autumn (September to November). During these months, the weather is generally stable, and the skies are clear, offering stunning views of the mountains. Spring also brings blooming rhododendrons, while autumn offers vibrant clouds and a refreshing atmosphere. Trekking in winter (December to February) is possible and less crowded, but temperatures are much colder. The monsoon season (June to August) is generally not advised due to heavy rainfall and slippery trails.',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: 'What is the cost of the Everest Base Camp Trek?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The cost of an EBC trek varies significantly depending on the package, inclusions, and group size. Generally, the price can range from $1,000 to $4,000 USD per person. Many packages we offer are all-inclusive, covering airport transfers, domestic flights (Kathmandu-Lukla-Kathmandu), permits, guide and porter services, accommodation in tea houses, and meals during the trek.',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: 'Do I need a guide and porter for the EBC Trek?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'As of 2023, solo trekking in Nepal is generally not allowed, and guides are mandatory for most popular trekking routes. However, you can trek to Everest Base Camp without a guide as well. But hiring a guide is highly recommended for safety, navigation, local insights, and making arrangements for accommodation and food. Porters are also highly recommended to carry your main luggage (typically 1 porter for 2 trekkers, carrying up to 15 kg/33 lbs per person), making the trek much easier and supporting the local economy. Our Everest Base Camp trek package includes both a guide and a porter.',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: 'What about altitude sickness on the EBC Trek?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Altitude sickness, or Acute Mountain Sickness (AMS), is a serious concern on the EBC trek due to the high elevations. Prevention is key: It is crucial to acclimatize properly by ascending slowly, taking rest days (usually at Namche Bazaar and Dingboche), staying well-hydrated, and listening to your body. Common symptoms include headaches, nausea, dizziness, and shortness of breath. If symptoms worsen, it is important to descend to a lower altitude immediately and consult your guide. Some trekkers take Diamox as a prophylactic measure.',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: 'What gear should I pack for the EBC Trek?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Packing wisely is essential; bring only the necessities. Essential items include: warm clothing in layers (moisture-wicking base layers, fleece, down jacket, waterproof outer layers), good quality hiking boots with ankle support, sleeping bag (rated for cold temperatures), headlamp with extra batteries, first aid kit, water bottles or hydration bladder (2-3 liters) and water purification tablets, sun protection (sunglasses, sun hat, sunscreen, lip balm), trekking poles, and cash (Nepalese Rupees) for personal expenses.',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: 'What kind of food and accommodation can I expect during the EBC Trek?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Accommodation: Trekkers typically stay in tea houses run by local Sherpa families, offering a cozy and traditional atmosphere. Rooms are usually small, clean, and comfortable, often twin-sharing. Hot showers are available at an extra charge. Wi-Fi and charging facilities are available but usually for a fee.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Food: Meals are generally healthy, covering breakfast, lunch, and dinner. Dal Bhat (steamed rice, lentil soup, and vegetable curry) is highly nutritious and offered with unlimited servings. Other common dishes include momos (dumplings), Thukpa (noodle soup), chapati, and Tibetan bread. Non-vegetarian options might be available but consumption is often advised against at higher altitudes.',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: 'Is the Everest Base Camp Trek safe?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The EBC trek is generally considered safe and enjoyable, especially when done with an experienced guide and proper preparation. While risks like altitude sickness are present, they are manageable with proper acclimatization and immediate action. Our guides are trained in high-altitude trekking and first aid, and can assist in emergencies, including arranging helicopter rescues (which require travel insurance coverage).',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: 'Can you see Mount Everest from Everest Base Camp?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Ironically, you cannot see Mount Everest directly from Everest Base Camp itself because you are too close, and it is obscured by surrounding peaks like Nuptse. However, the trek offers stunning views of Everest from various points along the trail. Kala Patthar, at 5,545 meters (18,192 feet), is the highest accessible point on the trek and offers the best panoramic sunrise views of Mount Everest and other Himalayan giants like Lhotse, Nuptse, and Ama Dablam.',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: 'What permits are required for the EBC Trek?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'You will generally need two permits for the EBC trek: 1) Khumbu Pasang Lhamu Rural Municipality Entry Permit (NPR 3,000), and 2) Sagarmatha National Park Entry Permit (NPR 3,000 for foreigners). A TIMS Card was previously required but recent information indicates that in the Everest region, a local "Khumbu Trek Card" replaces the TIMS card for individual trekkers.',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: 'How crowded is the Everest Base Camp Trek?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The EBC trek route can get fairly crowded, especially during peak seasons (Spring and Autumn), due to its growing popularity. Up to 40,000 adventurers take on this journey annually, with up to 500 trekkers starting daily during the busiest times. This can lead to competition for accommodation in tea houses, particularly at higher altitudes. Some trekkers choose less-traveled routes or off-peak seasons to avoid crowds.',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: 'Does EBC Trek need insurance?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Travel insurance is highly recommended for the EBC trek, although it is not legally mandatory. It is crucial that your policy covers high-altitude trekking (above 5,500m) and includes provisions for medical costs and helicopter evacuation in case of an emergency.',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: 'Is it difficult to breathe when trekking to Everest Base Camp?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Yes, it can be difficult to breathe when trekking to EBC due to the thinner air and lower oxygen availability at high altitudes. This can cause shortness of breath, fatigue, and headaches. The best way to manage this is to ascend slowly, breathe deeply and slowly, stay hydrated, eat healthily, and get plenty of rest.',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: 'Can I add extra days to my trip?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Of course, you are free to add extra days. We can add extra days on the basis of your requests with additional costs to cover guides, porters, accommodation, and food. There are plenty of options and choices to extend your holiday before and after your previously booked trip. Please talk to your personal travel consultant about it.',
                },
              ],
            },
          ],
        },
      },
    },
    {
      question: 'Do I need to book the Everest Base Camp trek in advance?',
      answer: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'It is strongly advised to reserve your Everest Base Camp trek ahead of time, particularly during the busy spring and autumn seasons. Booking early helps secure your flights to Lukla, accommodations, and allows sufficient time to organize permits, guides, and all other necessary arrangements.',
                },
              ],
            },
          ],
        },
      },
    },
  ],
}

async function seed() {
  console.log('Starting EBC Trek seed...')

  const payload = await getPayload({ config })

  // Look up the destination by slug
  const destinations = await payload.find({
    collection: 'destinations',
    where: {
      slug: { equals: 'everest-region' },
    },
    limit: 1,
  })

  if (destinations.docs.length === 0) {
    console.error(
      'Error: Destination with slug "everest-region" not found. Please run the main seed first.'
    )
    console.log('Run: npm run seed')
    process.exit(1)
  }

  const destinationId = destinations.docs[0].id

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
      'Error: Activity Category with slug "trekking" not found. Please run the main seed first.'
    )
    console.log('Run: npm run seed')
    process.exit(1)
  }

  const activityCategoryId = activityCategories.docs[0].id

  // Check if tour already exists
  const existingTours = await payload.find({
    collection: 'tours',
    where: {
      slug: { equals: ebcTrekData.slug },
    },
    limit: 1,
  })

  if (existingTours.docs.length > 0) {
    console.log(`Tour "${ebcTrekData.title}" already exists. Updating...`)

    await payload.update({
      collection: 'tours',
      id: existingTours.docs[0].id,
      data: {
        ...ebcTrekData,
        destination: [destinationId],
        activityCategory: [activityCategoryId],
      } as any,
    })

    console.log(`Tour updated successfully!`)
  } else {
    console.log(`Creating new tour: ${ebcTrekData.title}`)

    await payload.create({
      collection: 'tours',
      data: {
        ...ebcTrekData,
        destination: [destinationId],
        activityCategory: [activityCategoryId],
      } as any,
    })

    console.log(`Tour created successfully!`)
  }

  console.log('EBC Trek seed completed!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
