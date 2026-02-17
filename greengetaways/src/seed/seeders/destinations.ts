import type { Payload } from 'payload'
import { createRichText, generateSlug, logComplete, logStart, randomInRange } from '../utils'

interface DestinationData {
  name: string
  country: string
  continent: 'africa' | 'asia' | 'europe' | 'north-america' | 'south-america' | 'oceania' | 'antarctica'
  shortDescription: string
  description: string
  climate: {
    bestTimeToVisit: string
    averageTemperature: string
    weatherDescription: string
  }
  travelInfo: {
    currency: string
    language: string
    timezone: string
    visaRequirements: string
  }
  highlights: string[]
}

const DESTINATIONS: DestinationData[] = [
  // Nepal Destinations
  {
    name: 'Kathmandu',
    country: 'Nepal',
    continent: 'asia',
    shortDescription: 'Ancient capital city with UNESCO World Heritage sites and vibrant culture.',
    description: 'Kathmandu, the capital of Nepal, is a city that seamlessly blends ancient history with modern life. Home to seven UNESCO World Heritage Sites including Durbar Square, Swayambhunath, and Pashupatinath Temple, it serves as the gateway to the Himalayas. The city offers bustling bazaars, traditional architecture, and a unique spiritual atmosphere.',
    climate: { bestTimeToVisit: 'October to May', averageTemperature: '20-30°C', weatherDescription: 'Subtropical climate with monsoon from June to September.' },
    travelInfo: { currency: 'Nepalese Rupee (NPR)', language: 'Nepali, English widely spoken', timezone: 'UTC+5:45', visaRequirements: 'Visa on arrival available for most nationalities.' },
    highlights: ['Durbar Square', 'Swayambhunath Temple', 'Boudhanath Stupa', 'Thamel District', 'Pashupatinath Temple'],
  },
  {
    name: 'Pokhara',
    country: 'Nepal',
    continent: 'asia',
    shortDescription: 'Lakeside paradise with stunning Annapurna views and adventure activities.',
    description: 'Pokhara is Nepal\'s adventure capital, nestled beside the serene Phewa Lake with breathtaking views of the Annapurna range. Known as the gateway to the Annapurna Circuit, it offers world-class paragliding, boating, and hiking. The laid-back atmosphere and stunning scenery make it a perfect blend of adventure and relaxation.',
    climate: { bestTimeToVisit: 'September to November, February to April', averageTemperature: '15-28°C', weatherDescription: 'Pleasant weather with clear mountain views in autumn and spring.' },
    travelInfo: { currency: 'Nepalese Rupee (NPR)', language: 'Nepali, English widely spoken', timezone: 'UTC+5:45', visaRequirements: 'Visa on arrival available for most nationalities.' },
    highlights: ['Phewa Lake', 'World Peace Pagoda', 'Paragliding', 'Davis Falls', 'Sarangkot Sunrise'],
  },
  {
    name: 'Everest Region',
    country: 'Nepal',
    continent: 'asia',
    shortDescription: 'Home to the world\'s highest peak and legendary Sherpa culture.',
    description: 'The Everest Region, also known as Khumbu, is home to Mount Everest (8,848m) and the legendary Sherpa people. This area offers some of the most iconic trekking routes in the world, including Everest Base Camp and Gokyo Lakes. Ancient monasteries, dramatic landscapes, and warm Sherpa hospitality await adventurers.',
    climate: { bestTimeToVisit: 'March to May, September to November', averageTemperature: '-17 to 20°C depending on altitude', weatherDescription: 'Cold temperatures at high altitude, clearest skies in autumn.' },
    travelInfo: { currency: 'Nepalese Rupee (NPR)', language: 'Nepali, Sherpa, English', timezone: 'UTC+5:45', visaRequirements: 'TIMS card and Sagarmatha National Park permit required.' },
    highlights: ['Everest Base Camp', 'Tengboche Monastery', 'Namche Bazaar', 'Gokyo Lakes', 'Kala Patthar Viewpoint'],
  },
  {
    name: 'Annapurna Region',
    country: 'Nepal',
    continent: 'asia',
    shortDescription: 'Diverse landscapes from subtropical forests to high alpine terrain.',
    description: 'The Annapurna Region offers incredible diversity, from lush rhododendron forests to arid high-altitude deserts. The Annapurna Circuit is considered one of the world\'s best long-distance treks, passing through traditional villages and crossing the challenging Thorong La Pass at 5,416m. The region showcases Nepal\'s remarkable biodiversity and cultural variety.',
    climate: { bestTimeToVisit: 'October to November, March to April', averageTemperature: 'Varies widely by altitude', weatherDescription: 'Monsoon affects lower elevations from June to September.' },
    travelInfo: { currency: 'Nepalese Rupee (NPR)', language: 'Nepali, Gurung, Thakali', timezone: 'UTC+5:45', visaRequirements: 'ACAP permit and TIMS card required.' },
    highlights: ['Annapurna Base Camp', 'Poon Hill Sunrise', 'Thorong La Pass', 'Muktinath Temple', 'Ghandruk Village'],
  },
  {
    name: 'Chitwan',
    country: 'Nepal',
    continent: 'asia',
    shortDescription: 'UNESCO-listed national park famous for rhinos and Bengal tigers.',
    description: 'Chitwan National Park is a UNESCO World Heritage Site and one of Asia\'s best wildlife viewing destinations. The park protects one of the last populations of one-horned rhinoceros and Bengal tigers. Visitors can enjoy jungle safaris, canoe rides, and cultural experiences with the indigenous Tharu community.',
    climate: { bestTimeToVisit: 'October to March', averageTemperature: '25-35°C', weatherDescription: 'Hot and humid, best visited in cooler winter months.' },
    travelInfo: { currency: 'Nepalese Rupee (NPR)', language: 'Nepali, Tharu', timezone: 'UTC+5:45', visaRequirements: 'National park entry fee required.' },
    highlights: ['Jungle Safari', 'Rhino Sighting', 'Elephant Bathing', 'Tharu Cultural Show', 'Canoe Ride'],
  },
  {
    name: 'Lumbini',
    country: 'Nepal',
    continent: 'asia',
    shortDescription: 'Birthplace of Buddha and UNESCO World Heritage pilgrimage site.',
    description: 'Lumbini is the birthplace of Siddhartha Gautama, who became the Buddha. This sacred pilgrimage site features the Maya Devi Temple marking his birth spot, numerous international Buddhist monasteries, and the Ashoka Pillar. The peaceful gardens provide a serene environment for meditation and reflection.',
    climate: { bestTimeToVisit: 'October to March', averageTemperature: '20-35°C', weatherDescription: 'Hot summers, pleasant winters.' },
    travelInfo: { currency: 'Nepalese Rupee (NPR)', language: 'Nepali, Hindi', timezone: 'UTC+5:45', visaRequirements: 'No special permit required.' },
    highlights: ['Maya Devi Temple', 'Ashoka Pillar', 'World Peace Pagoda', 'Monastery Zone', 'Sacred Garden'],
  },
  {
    name: 'Mustang',
    country: 'Nepal',
    continent: 'asia',
    shortDescription: 'Ancient forbidden kingdom with Tibetan Buddhist culture.',
    description: 'Upper Mustang, the former Kingdom of Lo, remained isolated until 1992. This rain-shadow region features dramatic desert landscapes, ancient cave dwellings, and pristine Tibetan Buddhist culture. The walled city of Lo Manthang preserves centuries-old monasteries, festivals, and traditions.',
    climate: { bestTimeToVisit: 'March to November', averageTemperature: '0-20°C', weatherDescription: 'Dry climate as it lies in rain shadow of Himalayas.' },
    travelInfo: { currency: 'Nepalese Rupee (NPR)', language: 'Nepali, Tibetan', timezone: 'UTC+5:45', visaRequirements: 'Special restricted area permit required (USD 500 for 10 days).' },
    highlights: ['Lo Manthang', 'Sky Caves', 'Tiji Festival', 'Ancient Monasteries', 'Desert Landscape'],
  },
  {
    name: 'Langtang Valley',
    country: 'Nepal',
    continent: 'asia',
    shortDescription: 'Beautiful valley close to Kathmandu with stunning mountain scenery.',
    description: 'Langtang Valley offers accessible Himalayan trekking just north of Kathmandu. Known as the valley of glaciers, it features stunning mountain scenery, traditional Tamang villages, and one of Nepal\'s most sacred lakes, Gosainkunda. The region is recovering beautifully since the 2015 earthquake.',
    climate: { bestTimeToVisit: 'March to May, September to November', averageTemperature: 'Varies by altitude', weatherDescription: 'Similar to Kathmandu but colder at higher elevations.' },
    travelInfo: { currency: 'Nepalese Rupee (NPR)', language: 'Nepali, Tamang', timezone: 'UTC+5:45', visaRequirements: 'Langtang National Park permit and TIMS card required.' },
    highlights: ['Kyanjin Gompa', 'Langtang Glacier', 'Gosainkunda Lake', 'Tamang Heritage Trail', 'Tserko Ri Viewpoint'],
  },
  // International Destinations
  {
    name: 'Bhutan',
    country: 'Bhutan',
    continent: 'asia',
    shortDescription: 'The last Shangri-La with Gross National Happiness and Tiger\'s Nest.',
    description: 'Bhutan, the Land of the Thunder Dragon, is a Himalayan kingdom that measures success by Gross National Happiness. This carbon-negative country preserves its Buddhist heritage, traditional architecture, and pristine environment. The iconic Tiger\'s Nest Monastery clings to a cliff 900m above the Paro Valley.',
    climate: { bestTimeToVisit: 'March to May, September to November', averageTemperature: '15-25°C', weatherDescription: 'Monsoon from June to August, cold winters.' },
    travelInfo: { currency: 'Bhutanese Ngultrum (BTN)', language: 'Dzongkha, English', timezone: 'UTC+6:00', visaRequirements: 'Must book through licensed tour operator. Sustainable Development Fee applies.' },
    highlights: ['Tiger\'s Nest Monastery', 'Punakha Dzong', 'Thimphu', 'Paro Valley', 'Traditional Festivals'],
  },
  {
    name: 'Tibet',
    country: 'China',
    continent: 'asia',
    shortDescription: 'The roof of the world with ancient monasteries and Mount Kailash.',
    description: 'Tibet, the Roof of the World, offers a unique blend of spiritual depth and dramatic landscapes. From the sacred Potala Palace in Lhasa to the remote pilgrimage site of Mount Kailash, Tibet provides profound cultural and natural experiences. The high-altitude plateau features ancient monasteries, nomadic communities, and stunning Himalayan vistas.',
    climate: { bestTimeToVisit: 'April to October', averageTemperature: '0-20°C', weatherDescription: 'High altitude means cool temperatures year-round.' },
    travelInfo: { currency: 'Chinese Yuan (CNY)', language: 'Tibetan, Mandarin', timezone: 'UTC+8:00', visaRequirements: 'Chinese visa and Tibet Travel Permit required through licensed agency.' },
    highlights: ['Potala Palace', 'Jokhang Temple', 'Mount Kailash', 'Namtso Lake', 'Everest North Face'],
  },
  {
    name: 'Ladakh',
    country: 'India',
    continent: 'asia',
    shortDescription: 'Little Tibet with dramatic landscapes and ancient Buddhist culture.',
    description: 'Ladakh, often called Little Tibet, is a high-altitude desert region in northern India. Known for its stunning landscapes, ancient Buddhist monasteries, and unique Ladakhi culture, it offers adventure seekers challenging mountain passes and pristine lakes. The region preserves Tibetan Buddhist traditions that have been lost elsewhere.',
    climate: { bestTimeToVisit: 'May to September', averageTemperature: '-10 to 25°C', weatherDescription: 'Extreme temperatures, very cold winters, pleasant summers.' },
    travelInfo: { currency: 'Indian Rupee (INR)', language: 'Ladakhi, Hindi, English', timezone: 'UTC+5:30', visaRequirements: 'Indian visa required. Inner Line Permit for some areas.' },
    highlights: ['Pangong Lake', 'Nubra Valley', 'Hemis Monastery', 'Khardung La Pass', 'Leh Palace'],
  },
  {
    name: 'Sri Lanka',
    country: 'Sri Lanka',
    continent: 'asia',
    shortDescription: 'Tropical island paradise with ancient ruins, wildlife, and beaches.',
    description: 'Sri Lanka, the Pearl of the Indian Ocean, packs incredible diversity into a compact island. From ancient Buddhist ruins at Anuradhapura to leopard-spotting in Yala, from misty tea plantations to palm-fringed beaches, Sri Lanka offers something for everyone. The warm hospitality and delicious cuisine complete the experience.',
    climate: { bestTimeToVisit: 'December to March (west coast), April to September (east coast)', averageTemperature: '25-32°C', weatherDescription: 'Tropical climate with regional monsoon variations.' },
    travelInfo: { currency: 'Sri Lankan Rupee (LKR)', language: 'Sinhala, Tamil, English', timezone: 'UTC+5:30', visaRequirements: 'ETA (Electronic Travel Authorization) required for most nationalities.' },
    highlights: ['Sigiriya Rock', 'Temple of the Tooth', 'Yala National Park', 'Galle Fort', 'Tea Plantations'],
  },
  {
    name: 'Maldives',
    country: 'Maldives',
    continent: 'asia',
    shortDescription: 'Ultimate tropical paradise with overwater villas and pristine reefs.',
    description: 'The Maldives is the ultimate tropical getaway, featuring 26 atolls of pristine white-sand beaches, crystal-clear waters, and vibrant coral reefs. Famous for luxury overwater villas, world-class diving, and romantic sunsets, this island nation offers unparalleled relaxation and marine adventures.',
    climate: { bestTimeToVisit: 'November to April', averageTemperature: '28-32°C', weatherDescription: 'Tropical climate with southwest monsoon from May to October.' },
    travelInfo: { currency: 'Maldivian Rufiyaa (MVR), USD widely accepted', language: 'Dhivehi, English', timezone: 'UTC+5:00', visaRequirements: '30-day visa on arrival for most nationalities.' },
    highlights: ['Overwater Villas', 'Snorkeling & Diving', 'Bioluminescent Beaches', 'Underwater Restaurant', 'Dolphin Cruises'],
  },
  {
    name: 'Japan',
    country: 'Japan',
    continent: 'asia',
    shortDescription: 'Perfect blend of ancient traditions and cutting-edge modernity.',
    description: 'Japan offers an extraordinary journey through time, from ancient temples and serene gardens to neon-lit cities and bullet trains. Experience tea ceremonies, cherry blossoms, and samurai history alongside technological marvels and culinary excellence. Every season brings unique beauty and cultural celebrations.',
    climate: { bestTimeToVisit: 'March to May (cherry blossom), October to November (autumn colors)', averageTemperature: '5-30°C depending on season', weatherDescription: 'Four distinct seasons with regional variations.' },
    travelInfo: { currency: 'Japanese Yen (JPY)', language: 'Japanese, limited English', timezone: 'UTC+9:00', visaRequirements: 'Visa-free for many nationalities for up to 90 days.' },
    highlights: ['Mount Fuji', 'Kyoto Temples', 'Tokyo', 'Cherry Blossoms', 'Traditional Ryokan'],
  },
  {
    name: 'Vietnam',
    country: 'Vietnam',
    continent: 'asia',
    shortDescription: 'Stunning landscapes, rich history, and incredible street food culture.',
    description: 'Vietnam captivates with its diverse landscapes, from the emerald waters of Ha Long Bay to the terraced rice fields of Sapa. The country\'s complex history is visible in its ancient temples, French colonial architecture, and war museums. Vietnamese cuisine, from pho to banh mi, is a highlight of any visit.',
    climate: { bestTimeToVisit: 'February to April, August to October', averageTemperature: '22-35°C', weatherDescription: 'Varies by region; north has distinct seasons, south is tropical.' },
    travelInfo: { currency: 'Vietnamese Dong (VND)', language: 'Vietnamese, English in tourist areas', timezone: 'UTC+7:00', visaRequirements: 'E-visa available for many nationalities.' },
    highlights: ['Ha Long Bay', 'Hoi An Ancient Town', 'Sapa Rice Terraces', 'Cu Chi Tunnels', 'Mekong Delta'],
  },
  // More diverse destinations
  {
    name: 'Tanzania',
    country: 'Tanzania',
    continent: 'africa',
    shortDescription: 'Home to Kilimanjaro and the Serengeti\'s Great Migration.',
    description: 'Tanzania offers Africa\'s greatest wildlife spectacles and adventure experiences. Climb Mount Kilimanjaro, Africa\'s highest peak, witness the Great Migration in the Serengeti, or relax on Zanzibar\'s spice island beaches. The Ngorongoro Crater provides unparalleled wildlife density in a stunning volcanic setting.',
    climate: { bestTimeToVisit: 'June to October (dry season for safaris)', averageTemperature: '20-30°C', weatherDescription: 'Tropical climate with dry and wet seasons.' },
    travelInfo: { currency: 'Tanzanian Shilling (TZS)', language: 'Swahili, English', timezone: 'UTC+3:00', visaRequirements: 'Visa on arrival or e-visa available.' },
    highlights: ['Mount Kilimanjaro', 'Serengeti National Park', 'Ngorongoro Crater', 'Zanzibar Beaches', 'Great Migration'],
  },
  {
    name: 'Peru',
    country: 'Peru',
    continent: 'south-america',
    shortDescription: 'Ancient Incan wonders, Amazon rainforest, and culinary excellence.',
    description: 'Peru is a land of extraordinary diversity, from the ancient citadel of Machu Picchu to the Amazon rainforest and the culinary capital of South America. Trek the Inca Trail, explore colonial Cusco, spot wildlife in Manu National Park, and discover why Lima has become a global gastronomic destination.',
    climate: { bestTimeToVisit: 'May to September (dry season in highlands)', averageTemperature: 'Varies greatly by region', weatherDescription: 'Coastal desert, Andean highlands, and Amazon rainforest each have distinct climates.' },
    travelInfo: { currency: 'Peruvian Sol (PEN)', language: 'Spanish, Quechua', timezone: 'UTC-5:00', visaRequirements: 'Visa-free for up to 183 days for most nationalities.' },
    highlights: ['Machu Picchu', 'Sacred Valley', 'Rainbow Mountain', 'Amazon Rainforest', 'Lima Food Scene'],
  },
  {
    name: 'New Zealand',
    country: 'New Zealand',
    continent: 'oceania',
    shortDescription: 'Adventure capital of the world with stunning natural landscapes.',
    description: 'New Zealand is a paradise for adventure seekers and nature lovers. From the geothermal wonders of Rotorua to the dramatic fjords of Milford Sound, the country offers incredible scenic diversity. Known as the adventure capital of the world, it offers bungee jumping, skydiving, hiking, and more in spectacular settings.',
    climate: { bestTimeToVisit: 'December to February (summer)', averageTemperature: '10-25°C', weatherDescription: 'Temperate climate with four seasons, weather can be changeable.' },
    travelInfo: { currency: 'New Zealand Dollar (NZD)', language: 'English, Maori', timezone: 'UTC+12:00', visaRequirements: 'Visa-free for many nationalities with NZeTA.' },
    highlights: ['Milford Sound', 'Queenstown Adventures', 'Hobbiton', 'Rotorua Geothermal', 'Franz Josef Glacier'],
  },
  {
    name: 'Iceland',
    country: 'Iceland',
    continent: 'europe',
    shortDescription: 'Land of fire and ice with Northern Lights and dramatic landscapes.',
    description: 'Iceland is a geological wonderland where glaciers meet volcanoes, geysers erupt, and the Northern Lights dance overhead. The Golden Circle, Blue Lagoon, and rugged highlands offer year-round adventures. This Nordic island nation combines dramatic natural beauty with Viking heritage and modern creativity.',
    climate: { bestTimeToVisit: 'June to August (midnight sun), September to March (Northern Lights)', averageTemperature: '-5 to 15°C', weatherDescription: 'Cool temperatures year-round, unpredictable weather.' },
    travelInfo: { currency: 'Icelandic Krona (ISK)', language: 'Icelandic, English widely spoken', timezone: 'UTC+0:00', visaRequirements: 'Schengen visa rules apply.' },
    highlights: ['Northern Lights', 'Golden Circle', 'Blue Lagoon', 'Glacier Hiking', 'Whale Watching'],
  },
  {
    name: 'Morocco',
    country: 'Morocco',
    continent: 'africa',
    shortDescription: 'Exotic medinas, Sahara dunes, and Atlas Mountain adventures.',
    description: 'Morocco enchants visitors with its colorful souks, intricate architecture, and diverse landscapes. Lose yourself in the medinas of Marrakech and Fes, trek through the Atlas Mountains, camp under stars in the Sahara, and explore coastal Essaouira. The country offers a sensory overload of sights, sounds, and flavors.',
    climate: { bestTimeToVisit: 'March to May, September to November', averageTemperature: '15-35°C depending on region', weatherDescription: 'Mediterranean coast, continental interior, and desert conditions vary greatly.' },
    travelInfo: { currency: 'Moroccan Dirham (MAD)', language: 'Arabic, French, Berber', timezone: 'UTC+1:00', visaRequirements: 'Visa-free for up to 90 days for many nationalities.' },
    highlights: ['Marrakech Medina', 'Sahara Desert', 'Fes Medina', 'Atlas Mountains', 'Blue City Chefchaouen'],
  },
]

export async function seedDestinations(payload: Payload, mediaId: number): Promise<number[]> {
  logStart('Destinations')
  const destinationIds: number[] = []

  for (const dest of DESTINATIONS) {
    const destination = await payload.create({
      collection: 'destinations',
      data: {
        name: dest.name,
        slug: generateSlug(dest.name),
        country: dest.country,
        continent: dest.continent,
        description: createRichText(dest.description),
        shortDescription: dest.shortDescription,
        featuredImage: mediaId,
        highlights: dest.highlights.map((h) => ({ highlight: h })),
        climate: dest.climate,
        travelInfo: dest.travelInfo,
        featured: destinationIds.length < 6, // First 6 are featured
        popularityScore: randomInRange(60, 100),
        metaTitle: `${dest.name} Travel Guide | Green Getaways`,
        metaDescription: dest.shortDescription,
      },
    })
    destinationIds.push(destination.id)
  }

  logComplete('Destinations', destinationIds.length)
  return destinationIds
}
