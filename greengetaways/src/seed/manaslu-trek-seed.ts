import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Seed script for Manaslu Circuit Trek with Tsum Valley 26 Days
 *
 * Prerequisites:
 * 1. Create a Destination with slug: 'manaslu-region' (run main seed first)
 * 2. Create an Activity Category with slug: 'trekking' (run main seed first)
 *
 * Run with: npx tsx src/seed/manaslu-trek-seed.ts
 */

type MealType = 'breakfast' | 'lunch' | 'dinner'

const manasluTrekData = {
  title: 'Manaslu Circuit Trek with Tsum Valley (26 Days)',
  slug: 'manaslu-circuit-trek-26-days',
  tourType: ['adventure', 'cultural'],
  shortDescription:
    'Experts consider the Manaslu Circuit Trek among the best treks in Nepal. Despite its recent rise in popularity, the Manaslu Trek remains remote and off-the-beaten-path. The trek takes you around Manaslu, the world\'s eighth highest mountain at 8,163 meters (26,781 ft.).',
  region: 'Manaslu',
  maxAltitude: {
    meters: 5167,
    feet: 16952,
    location: 'at Larkya La Pass',
  },
  bestSeason: 'Sep-Nov (Autumn), Mar-May (Spring)',
  accommodationType: 'Hotel/ Lodge/ Tea House, During the Trek',
  adventureWalkHours: '5 to 9 Hrs per Day',
  totalMeals: {
    breakfast: 25,
    lunch: 23,
    dinner: 24,
  },
  duration: {
    days: 26,
    nights: 25,
  },
  pricing: {
    basePrice: 2499,
    currency: 'USD',
    priceIncludes: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Accommodation and Meals Included' }],
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
                    text: '4 nights in a premium hotel in vibrant Kathmandu with spacious twin-sharing rooms',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: '22 nights on the trail in cozy guesthouses or tea houses on a twin-sharing basis',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Lavish welcome dinner featuring authentic Nepali flavors',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Nourishing lunch during detailed preparation at Day 2',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Celebratory farewell dinner to toast your achievements',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Breakfast, lunch, and dinner included daily during trek with vegetarian and non-vegetarian options',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Unlimited servings of Dal Bhat (steamed rice, lentil soup, vegetable curry) for energy',
                  },
                ],
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Transportation Included' }],
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
                    text: 'Road transfers from Kathmandu to the trek\'s starting point (typically via private jeep or bus)',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Transportation from the trek\'s endpoint back to Kathmandu',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Complimentary private airport pick-up and drop-off services in Kathmandu',
                  },
                ],
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Guides, Porters, and Safety Included' }],
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
                    text: 'Seasoned, licensed mountain guides with high-altitude expertise and deep knowledge of Manaslu Trail',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'One porter provided for every two trekkers to carry main gear (up to 25kg) - porters\' meals, lodging, pay, and equipment fully included',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Guides carry first-aid kits and oximeters to monitor vital signs at high altitudes',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Emergency rescue coordination assistance available',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Accident insurance provided for all staff',
                  },
                ],
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Permits and Other Essentials Included' }],
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
                    text: 'Manaslu Restricted Area Permit',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Tsum Valley Restricted Area Permit',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Annapurna Conservation Area Permit (ACAP)',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Chumnubri Rural Municipality Permit',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Trekkers\' Information Management System (TIMS) Card',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Complimentary duffel bag, cozy sleeping bag, and insulating down jacket',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Detailed trekking map and stylish trekking hat',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Complimentary secure locker storage available in Kathmandu',
                  },
                ],
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h3',
            children: [{ type: 'text', text: 'Special Touches' }],
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
                    text: 'All service charges and VAT included',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: '24/7 support from the team throughout your trek',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Guaranteed Departure - Trip confirmed to operate on scheduled dates',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Lifetime Deposit Policy - Deposit can be applied to future trips',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'No Booking Fee',
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
                    text: '1 Breakfast, 3 Lunch and 2 Dinner',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Extra night accommodation and meal costs in Kathmandu',
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
                children: [
                  {
                    type: 'text',
                    text: 'Visa fees for entry into Nepal (arranged online or on arrival)',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'International flights to/from Nepal',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Personal travel insurance (strongly advised for high-altitude helicopter evacuations, medical emergencies, trip cancellations, and altitude sickness protection)',
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
                children: [
                  {
                    type: 'text',
                    text: 'Beverages (alcoholic drinks, soft drinks, tea, coffee, mineral water, hot/cold drinks) - tend to be pricier at higher altitudes',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Additional dishes, snacks, or gourmet meal upgrades beyond standard meals',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Fees for hot showers, device charging, and Wi-Fi at tea houses (usually increase with altitude)',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Everyday personal costs like laundry, phone calls, and internet usage',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Gratuities for guides, porters, and drivers (highly recommended, typically $10-15 per day per person)',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Single room upgrades beyond twin-sharing',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Any personal hiking gear beyond the complimentary duffel bag, sleeping bag, and down jacket',
                  },
                ],
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
                children: [
                  {
                    type: 'text',
                    text: 'Additional porters for solo travelers or extra gear carrying available for a fee',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Extra nights in Kathmandu for acclimation, relaxation, or weather delays',
                  },
                ],
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    text: 'Any service or item not listed in the "What\'s Included" section',
                  },
                ],
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Note: If the duration goes longer due to External Forces like Natural Disaster and Strike, additional costs won\'t be included',
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
      title: 'Arrival in Kathmandu (1,300m)',
      description:
        'Flying to Kathmandu is in itself an exciting and memorable experience. On a clear day, you will get a panoramic view of the snow-capped mountains. After completing the visa formalities, collect your luggage downstairs. As you exit the terminal, you will be welcomed by our representatives. From the airport, you will be transferred to your booked hotel in Kathmandu. In the evening, we host a welcome dinner with cultural entertainments.',
      meals: ['dinner'] as MealType[],
      accommodation: 'Hotel in Kathmandu',
    },
    {
      day: 2,
      title: 'Preparation Day in Kathmandu',
      description:
        'The managing Director of our company will meet you at the hotel and provide more information about the adventure. Your dues must be cleared before commencing the trip. Later in the afternoon, you are free to roam around the city. We will finalize all the paperwork and make a final check of the equipment. In case you are interested in guided sightseeing in heritage sites, we are pleased to offer the service.',
      meals: ['breakfast', 'lunch'] as MealType[],
      accommodation: 'Hotel in Kathmandu',
    },
    {
      day: 3,
      title: 'Road Trip to Soti Khola (730m)',
      description:
        'Early morning breakfast at the hotel, we head towards Soti Khola driving along the Trishuli River, famous for white water rafting. The road to Aarughat is well pitched and after Aarughat, you will drive off-road. On the way, we will see the view of Mt. Langtang, Ganesh and Manaslu. Also, you will cross through the villages with their unique settlements and culture.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Soti Khola',
    },
    {
      day: 4,
      title: 'Trek to Machha Khola (930m)',
      description:
        'The next morning, you will enjoy the warm breakfast at the teahouse at Soti Khola while enjoying the scenic landscape. Unlike other trekking trails, the road from Soti Khola to Machha Khola is quite rocky and narrow. Despite the uneven road, you will have the most amazing walk on the first day of this trek. The stunning countryside views will keep you engaged throughout the trail.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Machha Khola',
    },
    {
      day: 5,
      title: 'Machha Khola to Jagat (1,340m)',
      description:
        'The following day, you will start walking across the twisting road on the bank of the Budi Gandaki River. As you enter the forest trail, you will witness many monkeys and langurs. After the forest, you will walk to the Gurung villages. You will reach Tatopani "hot water" where you can take warm showers and relax. Following the waves, you will find the river flattening at Yaru from where you cross a long cantilever bridge to reach Jagat. You will have to verify your trekking permits at the check post. From this day, you will officially enter Manaslu Conservation Area.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Jagat',
    },
    {
      day: 6,
      title: 'Jagat to Lokpa (2,240m)',
      description:
        'A series of striking suspension bridges dominate our path today as we steadily make our way up the trail past numerous waterfalls towards the Gurung village of Philim and its pretty setting. From there the trail climbs again and branches away into Tsum Valley, with the striking image of Ganesh Himal and Shringi Himal drawing our attention as we make our approach to Lokpa to end our day on the trail.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Lokpa',
    },
    {
      day: 7,
      title: 'Lokpa to Chumling (2,386m)',
      description:
        'Lush jungle and three more suspension bridges usher us into the mystical Buddhist valley, and after an initial sharp climb the rest of our hike to Chumling is a fairly leisurely one that allows us to relax and take in the beauty of the valley.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Chumling',
    },
    {
      day: 8,
      title: 'Chumling to Chhekampar (3,031m)',
      description:
        'Glorious views of the Ganesh Himal serve as our backdrop during the day as we steadily ease higher along the Shiar Khola, a minor tributary of the Budhi Gandaki, a small Tibetan monastery along our path reminding us of the valley\'s strong Tibetan influences. The day finishes off with our arrival at Chhekampar, the largest settlement in the valley.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Chhekampar',
    },
    {
      day: 9,
      title: 'Chhekampar to Mu Gompa (3,700m)',
      description:
        'With the tributary still acting as our guide we make our way deeper and higher into the valley, following the ancient trade route to Tibet as we make our way past chortens, stupas, mani walls, monasteries and nunneries. We can pause briefly to inspect Milarepa cave before our arrival at the monastery of Mu Gompa where we\'ll stay the night and enjoy the hospitality of the resident monks — truly one of the cultural highlights of the trek.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge at Mu Gompa',
    },
    {
      day: 10,
      title: 'Mu Gompa to Chhekampar (3,031m)',
      description:
        'We retrace our steps from Mu Gompa as far as the village of Lar then take an alternate route back to Chhekampar via Rachen Gompa, home to the valley\'s most famous nunnery.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Chhekampar',
    },
    {
      day: 11,
      title: 'Chhekampar to Lungdang Gompa (3,400m)',
      description:
        'Our day begins with a descent to the village of Dumji, after which we change direction and take a steep trail through dense pine and rhododendron forests until we reach Gompa Lungdang and its serenely situated monastery below Ganesh Himal.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge at Lungdang Gompa',
    },
    {
      day: 12,
      title: 'Ganesh Himal Base Camp (4,900m)',
      description:
        'The ascent to the base camp takes approximately four hours, and once there our efforts are rewarded with some of the finest views on offer of towering Ganesh Himal and the surrounding alpine wilderness. After quality time to savor the view we retreat back down the trail to Gompa Lungdang.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge at Monastery',
    },
    {
      day: 13,
      title: 'Way back to Ripchet (2,400m)',
      description:
        'Our return path takes the alternative route towards Ripchet, which gives us a new and rewarding perspective on the landscape as we make overnight.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Ripchet',
    },
    {
      day: 14,
      title: 'Way to Manaslu Circuit Once Again',
      description:
        'As we leave behind our stay in the magical Tsum Valley our attention refocuses on the trail through the Manaslu region and our ultimate goal of Larke La pass. Our old friend, the Budhi Gandaki River, greets us and leads us westward towards Pewa and on up the steep sided valley to Deng (1804M), our destination.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge',
    },
    {
      day: 15,
      title: 'Deng to Namrung (2,660m)',
      description:
        'Moving further from your local lodge, you will cross a suspension bridge to climb to Rana and Bihi Phedi. The trail then proceeds to Ghap through several landslide zones. After the landslide zone, you will follow the trail up to Namrung. After about 1hr on the uneven trail, you will climb a zigzag from the river to the neat village of Namrung (2660m). The place has some of the best teashops, a restaurant, and rest houses on the trek.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Namrung',
    },
    {
      day: 16,
      title: 'Lho Gaon (3,180m)',
      description:
        'Witnessing the lifestyles of Nubri people, you will start the day. Exploring their Tibet-influenced typical lifestyle you will walk past several mani walls, lush terraces and houses through Banjam to enter the fir, rhododendron and oak forest before climbing to Lihi then to Sho. As you start walking, you will see most of the locals clad in traditional Tibetan dress. From the place, you can catch the stunning views of Manaslu (8163m) and Manaslu North (7157m).',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Lho Gaon',
    },
    {
      day: 17,
      title: 'Trek to Punggen Monastery (4,050m) - Samagaon',
      description:
        'The next morning, you will start with a short trek because of the altitude reasons. On walking, the picturesque view of Mt. Manaslu accompanies you. You will walk across the easy trail to Shyapla on passing through pine and rhododendron gully with moss and gin-clear stream. Once you enter the village, mountain views fade, however, the yak pastures and typical settlements will attract you. Sama Gaon is the principal village of the Nubri people which holds a large gompa, many shops, a health post, heliport and telephone/wifi access.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Samagaon',
    },
    {
      day: 18,
      title: 'Acclimatization in Samagaon',
      description:
        'This is the day of acclimatization at Samagaon to prevent altitude-related illness. As an acclimatization hike, you will walk to Pungyen Gompa on the east of the Nubri Valley. Once at the hilltop, you will get the enticing views of Manaslu. Or, you can hike to Manaslu Base Camp which is on the north of Sama Gaon. You can follow the trail past Birendra Tal (Lake) and turn left onto the base camp track.',
      meals: ['breakfast'] as MealType[],
      accommodation: 'Local Lodge in Samagaon',
    },
    {
      day: 19,
      title: 'Trek to Samdo (3,875m)',
      description:
        'Today is relatively a short walk passing through Birendra Lake and heading northwest of the valley as we encounter the chortens and mani walls along the way. We arrive at Samdo in about 4 hours after which you have the rest of the day to yourself.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Samdo',
    },
    {
      day: 20,
      title: 'Acclimatization Day in Samdo',
      description:
        'Another crucial acclimatization day. Hike to the Tibet Border Viewpoint (5,000m / 16,404 ft) for stunning views of the Tibetan plateau and Manaslu. Alternatively, explore Samdo Ridge.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Samdo',
    },
    {
      day: 21,
      title: 'Trek to Larke La Phedi (4,460m)/Dharamsala',
      description:
        'This is another adventurous day in the high altitude. So, you must watch your body signs properly. Enjoying the scenic views of the chain of Himalayas you will walk slowly across the rugged terrains of the Manaslu region before you reach Dharmasala. Dharmasala is a beautiful village that offers the best place for relaxation. The views are marvelous.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Dharamsala',
    },
    {
      day: 22,
      title: 'Trek to Larke La Pass (5,106m)',
      description:
        'This is a special day as you will walk to the highest point of the Manaslu Circuit Trekking. You will walk to Larkya La Pass (5106m) on this day. In bad weather and in the snow, the walk could be quite challenging yet, it is doable. The stunning views you will witness once you stand at the pass makes the trip more enlightened. You will catch views of Himlung (7126m) near Tibet and Kang Guru (6981m) and Annapurna II (7937m) in the Annapurna Range. Spending your special time at the pass, you will walk down for around 3 hours towards Bimthang (3590M) for an overnight stay.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Bimthang',
    },
    {
      day: 23,
      title: 'Trek from Bimthang to Dharapani (1,963m) to Taal (1,400m)',
      description:
        'This is the final day you will be walking on the trails of the Manaslu region. On climbing downhill, you will walk through the lush forests full of flora and fauna including rhododendron bushes. Walking back across the Dudh Khola, you will walk to Karche for lunch. The valley becomes more agricultural and lush as you pass fields and copses of oak and rhododendron. From there, you will continue your stroll towards Dharapani and continue to Taal.',
      meals: ['breakfast', 'lunch', 'dinner'] as MealType[],
      accommodation: 'Local Lodge in Taal',
    },
    {
      day: 24,
      title: 'Drive to Besisahar and then to Kathmandu - 10 hours',
      description:
        'If you feel extreme tiredness, you can take a jeep from Taal to Besi Sahar. From there, you can take a ride back to Kathmandu. Or, you can take a bus back to Kathmandu from Tal. After the 7-8 hours\' drive, you will get to rest in one of the sophisticated hotels in Kathmandu.',
      meals: ['breakfast'] as MealType[],
      accommodation: 'Hotel in Kathmandu',
    },
    {
      day: 25,
      title: 'Free Day in Kathmandu',
      description:
        'Today we will have a de-briefing at the Ministry of Tourism. The remaining day is at leisure. In the evening, we host a farewell dinner with all of our crew members to celebrate the successful summit of the mountain.',
      meals: ['breakfast', 'dinner'] as MealType[],
      accommodation: 'Hotel in Kathmandu',
    },
    {
      day: 26,
      title: 'Final Departure',
      description:
        'In the morning, you will be transferred to the international airport for your flight back. The check in time is 3 hours prior to your departure. We hope you had an amazing time in Nepal.',
      meals: ['breakfast'] as MealType[],
      accommodation: null,
    },
  ],
  highlights: [
    {
      highlight:
        'Circumnavigation of Mount Manaslu & Tsum Valley: Embark on a journey that encircles Mount Manaslu (8,163m), the world\'s eighth-highest peak, and extends into the sacred Tsum Valley',
    },
    {
      highlight:
        'Conquering High-Altitude Passes: Experience the challenge of traversing the Larkya La Pass (5,106m to 5,167m) with breathtaking panoramic views',
    },
    {
      highlight:
        'Deep Cultural Immersion: Delve into rich Tibetan-Buddhist culture in remote villages like Lho, Samagaon, and Samdo, and the Tsum Valley',
    },
    {
      highlight:
        'Untouched Wilderness & Diverse Ecosystems: Trek along less-crowded, off-the-beaten trails providing genuine connection with nature',
    },
    {
      highlight:
        'Authentic Village Experiences: Engage with friendly local communities and witness traditional lifestyles including agriculture and yak herding',
    },
    {
      highlight:
        'Strategic Acclimatization Plan: Essential acclimatization days at Samagaon (3,530m) and Samdo (3,875m) with optional side hikes',
    },
    {
      highlight:
        'Exclusive Restricted Area Access: The Manaslu and Tsum Valley regions are designated restricted areas ensuring a more exclusive adventure',
    },
    {
      highlight:
        'Commitment to Responsible Tourism: Conducted with strong focus on sustainable and eco-friendly practices within the Manaslu Conservation Area Project',
    },
    {
      highlight:
        'Ancient Monasteries: Visit Pungyen Gompa, Mu Gompa, and Rachen Gompa showcasing the spiritual landscape',
    },
    {
      highlight:
        'Rich Biodiversity: Opportunities to spot rare wildlife including snow leopards, red pandas, Himalayan tahr, and blue sheep',
    },
  ],
  groupSize: {
    min: 2,
    max: 12,
  },
  difficulty: 'challenging' as const,
  ageRequirement: {
    minimum: 10,
    maximum: 70,
  },
  status: 'active' as const,
  featured: true,
  popularityScore: 88,
  metaTitle: 'Manaslu Circuit Trek with Tsum Valley 26 Days | Sacred Himalayas | Green Getaways',
  metaDescription:
    'Trek the Manaslu Circuit with Tsum Valley in 26 days. Experience Mount Manaslu, Tibetan-Buddhist culture, Larkya La Pass, and pristine wilderness. From USD 2,499.',
  description: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Introduction to the Manaslu Circuit Trek with Tsum Valley' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'We invite you to discover the breathtaking and culturally rich adventure of the Manaslu and Tsum Valley Trek. Nestled around Mount Manaslu, the world\'s eighth-highest mountain (8,163m / 26,781ft), this trek offers a unique, off-the-beaten-path journey into Nepal\'s wild Himalayas.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'The Manaslu Circuit Trek, known for its serenity and rugged beauty, is a less crowded alternative to more popular routes like Everest Base Camp and Annapurna Circuit. It traverses diverse landscapes, from lush subtropical forests and terraced fields to high alpine terrain, culminating in the challenging Larkya La Pass (5,106m to 5,167m / 16,751ft to 16,952ft).',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'An optional detour, the Tsum Valley Trek, extends this adventure into a sacred Himalayan journey, known for its profound spiritual culture and ancient monasteries, remaining largely untouched by modern development. Combined, these treks offer an even deeper immersion into the region\'s natural and cultural heritage.',
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
          children: [{ type: 'text', text: 'Commitment to Sustainable and Eco-Friendly Trekking' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'As our name suggests, Green Getaways is deeply committed to sustainable and eco-friendly tourism. The Manaslu region, including the Tsum Valley, is a protected conservation area. We actively support local communities through waste management initiatives, promote eco-friendly accommodations, and ensure our treks minimize environmental impact.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Unparalleled Local Expertise and Personalized Service' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Our team comprises highly experienced, licensed, and knowledgeable local guides, many of whom are from the Manaslu region itself. They possess a deep understanding of the terrain, weather patterns, and the rich local culture, including Tibetan Buddhism. Our guides are not just navigators; they are storytellers and cultural ambassadors.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Hassle-Free Permit and Group Arrangements' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'The Manaslu and Tsum Valley regions are restricted areas, requiring special permits and a mandatory licensed guide. Green Getaways handles all the bureaucratic complexities of obtaining the Manaslu Restricted Area Permit (RAP), Manaslu Conservation Area Permit (MCAP), Tsum Valley Restricted Area Permit, and Annapurna Conservation Area Permit (ACAP) on your behalf.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Prioritizing Your Safety and Well-being' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'We understand that the Manaslu Circuit is a challenging trek, ascending to high altitudes like Larkya La Pass (5,106m to 5,160m). Our carefully designed itineraries include essential acclimatization days, such as in Samagaun (3,530m) and Samdo (3,875m), utilizing the "hike high, sleep low" strategy to help your body adjust safely.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h2',
          children: [{ type: 'text', text: 'Our Commitment to Sustainability' }],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Environmental Pledge: Leaving No Trace' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'We are dedicated to Zero Waste Trekking, focusing on minimizing our environmental footprint. This means actively reducing plastic waste by encouraging the use of reusable water bottles, utensils, and food containers. Our commitment extends to carrying out all non-biodegradable waste, ensuring that delicate ecosystems are not burdened by litter.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Community & Cultural Promise: Authentic Immersion' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Your journey with Green Getaways is a profound cultural exchange. We exclusively hire licensed local guides and porters from the Manaslu region, directly supporting local livelihoods and empowering communities. We encourage staying in family-run teahouses and purchasing locally-made crafts and products.',
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          children: [{ type: 'text', text: 'Ethical Operations: Transparency and Safety' }],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'As the Manaslu region is a restricted area, obtaining permits is a multi-step process. Green Getaways handles all necessary permits on your behalf, ensuring full compliance with Nepalese government regulations. These permit fees contribute directly to local development, conservation efforts, and the construction of schools and health facilities in remote areas.',
            },
          ],
        },
      ],
    },
  },
}

async function seed() {
  console.log('Starting Manaslu Trek seed...')

  const payload = await getPayload({ config })

  // Look up the destination by slug
  const destinations = await payload.find({
    collection: 'destinations',
    where: {
      slug: { equals: 'manaslu-region' },
    },
    limit: 1,
  })

  if (destinations.docs.length === 0) {
    console.error(
      'Error: Destination with slug "manaslu-region" not found. Creating it now...',
    )

    const destination = await payload.create({
      collection: 'destinations',
      data: {
        name: 'Manaslu Region',
        slug: 'manaslu-region',
        description:
          'The Manaslu region is a pristine trekking destination in Nepal, featuring Mount Manaslu (8,163m), the world\'s eighth-highest mountain. This restricted area offers off-the-beaten-path adventures with rich Tibetan-Buddhist culture.',
        featured: true,
      },
    })

    console.log('Destination created successfully!')
  }

  const destinationResult = await payload.find({
    collection: 'destinations',
    where: {
      slug: { equals: 'manaslu-region' },
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
      slug: { equals: manasluTrekData.slug },
    },
    limit: 1,
  })

  if (existingTours.docs.length > 0) {
    console.log(`Tour "${manasluTrekData.title}" already exists. Updating...`)

    await payload.update({
      collection: 'tours',
      id: existingTours.docs[0].id,
      data: {
        ...manasluTrekData,
        destination: [destinationId],
        activityCategory: [activityCategoryId],
      } as any,
    })

    console.log(`Tour updated successfully!`)
  } else {
    console.log(`Creating new tour: ${manasluTrekData.title}`)

    await payload.create({
      collection: 'tours',
      data: {
        ...manasluTrekData,
        destination: [destinationId],
        activityCategory: [activityCategoryId],
      } as any,
    })

    console.log(`Tour created successfully!`)
  }

  console.log('Manaslu Trek seed completed!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
