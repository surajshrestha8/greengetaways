import { faker } from '@faker-js/faker'
import type { Payload } from 'payload'
import {
  createRichText,
  generateSlug,
  getFutureDate,
  logComplete,
  logStart,
  randomInRange,
  randomItem,
  randomItems,
} from '../utils'

interface TourTemplate {
  title: string
  shortDescription: string
  description: string
  tourType: ('adventure' | 'beach' | 'cultural' | 'wildlife' | 'city' | 'cruise' | 'honeymoon' | 'family' | 'luxury' | 'budget')[]
  days: number
  nights: number
  basePrice: number
  difficulty: 'easy' | 'moderate' | 'challenging' | 'difficult'
  maxGroupSize: number
  minAge: number
  priceIncludes: string[]
  priceExcludes: string[]
  itinerary: { title: string; description: string; meals: ('breakfast' | 'lunch' | 'dinner')[]; accommodation: string }[]
  highlights: string[]
}

const TOUR_TEMPLATES: TourTemplate[] = [
  {
    title: 'Everest Base Camp Trek',
    shortDescription: 'Classic trek to the base of the world\'s highest mountain through Sherpa villages.',
    description: 'Follow in the footsteps of legendary mountaineers on this iconic trek to Everest Base Camp. Walk through traditional Sherpa villages, visit ancient monasteries, and witness breathtaking Himalayan panoramas. This adventure culminates at the base of Mount Everest, the roof of the world.',
    tourType: ['adventure'],
    days: 14,
    nights: 13,
    basePrice: 1850,
    difficulty: 'challenging',
    maxGroupSize: 12,
    minAge: 16,
    priceIncludes: ['Airport transfers', 'Domestic flights to Lukla', 'Experienced guide', 'Porter service', 'Accommodation in teahouses', 'All meals on trek', 'Permits and fees', 'First aid kit'],
    priceExcludes: ['International flights', 'Travel insurance', 'Personal equipment', 'Tips and gratuities', 'Drinks and snacks', 'Hot showers', 'WiFi charges'],
    itinerary: [
      { title: 'Arrival in Kathmandu', description: 'Welcome to Nepal! Transfer to hotel and trek briefing.', meals: ['dinner'], accommodation: 'Hotel in Kathmandu' },
      { title: 'Fly to Lukla, Trek to Phakding', description: 'Scenic flight to Lukla and easy trek to Phakding village.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse in Phakding' },
      { title: 'Trek to Namche Bazaar', description: 'Climb to the Sherpa capital with first views of Everest.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse in Namche' },
      { title: 'Acclimatization Day', description: 'Explore Namche, visit Everest View Hotel and Sherpa museum.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse in Namche' },
      { title: 'Trek to Tengboche', description: 'Trek through forests to the famous Tengboche Monastery.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse in Tengboche' },
      { title: 'Trek to Dingboche', description: 'Enter high altitude terrain with stunning valley views.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse in Dingboche' },
      { title: 'Acclimatization Day', description: 'Hike to Nagarjun Hill for views of Island Peak and Makalu.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse in Dingboche' },
      { title: 'Trek to Lobuche', description: 'Walk along the Khumbu Glacier to Lobuche village.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse in Lobuche' },
      { title: 'Trek to Gorak Shep & EBC', description: 'Reach Everest Base Camp! Standing at the foot of Everest.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse in Gorak Shep' },
      { title: 'Kala Patthar & Pheriche', description: 'Early morning climb to Kala Patthar for sunrise, descend to Pheriche.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse in Pheriche' },
      { title: 'Trek to Namche', description: 'Retrace steps back to Namche Bazaar.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse in Namche' },
      { title: 'Trek to Lukla', description: 'Final day of trekking back to Lukla.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse in Lukla' },
      { title: 'Fly to Kathmandu', description: 'Return flight to Kathmandu, free afternoon.', meals: ['breakfast'], accommodation: 'Hotel in Kathmandu' },
      { title: 'Departure', description: 'Transfer to airport for departure.', meals: ['breakfast'], accommodation: 'N/A' },
    ],
    highlights: ['Everest Base Camp', 'Kala Patthar Viewpoint', 'Tengboche Monastery', 'Namche Bazaar', 'Sherpa Culture'],
  },
  {
    title: 'Annapurna Circuit Trek',
    shortDescription: 'Complete circuit around the Annapurna massif crossing Thorong La Pass.',
    description: 'The Annapurna Circuit is one of the world\'s greatest treks, offering incredible diversity from subtropical valleys to high-altitude desert. Cross the challenging Thorong La Pass at 5,416m, visit the sacred Muktinath Temple, and experience multiple ethnic cultures along the ancient trade route.',
    tourType: ['adventure'],
    days: 18,
    nights: 17,
    basePrice: 1650,
    difficulty: 'challenging',
    maxGroupSize: 12,
    minAge: 16,
    priceIncludes: ['Airport transfers', 'Transportation to trek start', 'Experienced guide', 'Porter service', 'Accommodation', 'All meals on trek', 'Permits', 'First aid kit'],
    priceExcludes: ['International flights', 'Travel insurance', 'Personal gear', 'Tips', 'Drinks', 'Hot showers', 'WiFi'],
    itinerary: [
      { title: 'Arrival in Kathmandu', description: 'Airport pickup and welcome dinner.', meals: ['dinner'], accommodation: 'Hotel in Kathmandu' },
      { title: 'Drive to Besisahar', description: 'Scenic drive through Nepali countryside to trek starting point.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Guesthouse in Besisahar' },
      { title: 'Trek to Bahundanda', description: 'Begin trek along the Marsyangdi River.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Chamje', description: 'Walk through terraced fields and waterfalls.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Dharapani', description: 'Enter the Manang district.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Chame', description: 'First views of Annapurna II and the district headquarters.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Upper Pisang', description: 'Enter the rain shadow with dramatic landscape change.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Manang', description: 'Walk through Braga to the fascinating village of Manang.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Acclimatization in Manang', description: 'Day hikes to Ice Lake or Gangapurna Lake.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Yak Kharka', description: 'Gradual climb into higher altitude.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Thorong Phedi', description: 'Base camp for the pass crossing.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Cross Thorong La to Muktinath', description: 'Early start to cross 5,416m pass, descend to sacred Muktinath.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Jomsom', description: 'Walk down the Kali Gandaki valley.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Kalopani', description: 'Continue through the world\'s deepest gorge.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Tatopani', description: 'Reach the hot springs village.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Ghorepani', description: 'Climb to Poon Hill viewpoint area.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Poon Hill & Trek to Nayapul', description: 'Sunrise from Poon Hill, descend to road head and drive to Pokhara.', meals: ['breakfast', 'lunch'], accommodation: 'Hotel in Pokhara' },
      { title: 'Return to Kathmandu', description: 'Drive or fly back to Kathmandu.', meals: ['breakfast'], accommodation: 'Hotel in Kathmandu' },
    ],
    highlights: ['Thorong La Pass', 'Muktinath Temple', 'Poon Hill Sunrise', 'Manang Valley', 'Kali Gandaki Gorge'],
  },
  {
    title: 'Chitwan Wildlife Safari',
    shortDescription: 'Explore Nepal\'s premier national park with jungle safaris and cultural experiences.',
    description: 'Immerse yourself in the wilderness of Chitwan National Park, a UNESCO World Heritage Site. Search for one-horned rhinoceros and Bengal tigers on jeep and elephant safaris, paddle through crocodile-inhabited rivers, and experience the unique culture of the Tharu people.',
    tourType: ['wildlife', 'adventure', 'family'],
    days: 4,
    nights: 3,
    basePrice: 450,
    difficulty: 'easy',
    maxGroupSize: 16,
    minAge: 6,
    priceIncludes: ['Return transfers from Kathmandu/Pokhara', 'Luxury jungle lodge', 'All meals', 'Jungle activities', 'Park fees', 'Naturalist guide', 'Cultural show'],
    priceExcludes: ['Personal expenses', 'Tips', 'Drinks', 'Travel insurance'],
    itinerary: [
      { title: 'Arrival in Chitwan', description: 'Drive to Chitwan, check into jungle lodge, afternoon nature walk and Tharu cultural show.', meals: ['lunch', 'dinner'], accommodation: 'Jungle Lodge' },
      { title: 'Full Day Safari', description: 'Early morning jeep safari, canoe ride on Rapti River, afternoon elephant interaction.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Jungle Lodge' },
      { title: 'Safari & Village Visit', description: 'Morning bird watching, jeep safari in community forest, visit Tharu village.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Jungle Lodge' },
      { title: 'Departure', description: 'Sunrise walk, breakfast and departure.', meals: ['breakfast'], accommodation: 'N/A' },
    ],
    highlights: ['Rhino Sighting', 'Jeep Safari', 'Canoe Ride', 'Tharu Cultural Show', 'Bird Watching'],
  },
  {
    title: 'Kathmandu Valley Heritage Tour',
    shortDescription: 'Discover UNESCO World Heritage sites and ancient culture of Kathmandu Valley.',
    description: 'Explore the incredible cultural heritage of the Kathmandu Valley with its seven UNESCO World Heritage Sites. Visit ancient royal palaces, sacred Hindu and Buddhist temples, and traditional Newari towns. This tour provides deep insight into Nepal\'s rich history and living traditions.',
    tourType: ['cultural', 'city'],
    days: 5,
    nights: 4,
    basePrice: 650,
    difficulty: 'easy',
    maxGroupSize: 12,
    minAge: 0,
    priceIncludes: ['Airport transfers', '4-star hotel', 'Daily breakfast', 'Private vehicle', 'Expert cultural guide', 'Monument entrance fees'],
    priceExcludes: ['Lunch and dinner', 'Personal expenses', 'Tips', 'Travel insurance'],
    itinerary: [
      { title: 'Arrival & Thamel', description: 'Airport pickup, hotel check-in, evening walk through Thamel.', meals: ['breakfast'], accommodation: 'Hotel in Kathmandu' },
      { title: 'Kathmandu Sightseeing', description: 'Visit Kathmandu Durbar Square, Swayambhunath, and Pashupatinath Temple.', meals: ['breakfast'], accommodation: 'Hotel in Kathmandu' },
      { title: 'Patan & Boudha', description: 'Explore Patan Durbar Square, Patan Museum, and Boudhanath Stupa.', meals: ['breakfast'], accommodation: 'Hotel in Kathmandu' },
      { title: 'Bhaktapur & Nagarkot', description: 'Day trip to Bhaktapur ancient city, sunset at Nagarkot.', meals: ['breakfast'], accommodation: 'Hotel in Nagarkot' },
      { title: 'Sunrise & Departure', description: 'Himalayan sunrise from Nagarkot, return to Kathmandu and departure.', meals: ['breakfast'], accommodation: 'N/A' },
    ],
    highlights: ['Durbar Squares', 'Swayambhunath Temple', 'Boudhanath Stupa', 'Pashupatinath', 'Bhaktapur'],
  },
  {
    title: 'Pokhara Adventure Package',
    shortDescription: 'Adrenaline-packed adventure in Nepal\'s lakeside paradise.',
    description: 'Experience the best of Pokhara\'s adventure activities with stunning Annapurna views as backdrop. Paraglide over Phewa Lake, try your luck at bungee jumping, and hike to scenic viewpoints. This package combines thrills with natural beauty.',
    tourType: ['adventure', 'family'],
    days: 5,
    nights: 4,
    basePrice: 850,
    difficulty: 'moderate',
    maxGroupSize: 10,
    minAge: 14,
    priceIncludes: ['Return flights from Kathmandu', 'Lakeside hotel', 'Paragliding', 'Zip-lining', 'Sarangkot sunrise tour', 'Boat ride', 'World Peace Pagoda hike'],
    priceExcludes: ['Meals', 'Bungee jumping (optional)', 'Tips', 'Personal expenses'],
    itinerary: [
      { title: 'Fly to Pokhara', description: 'Scenic flight to Pokhara, afternoon boat ride on Phewa Lake.', meals: [], accommodation: 'Lakeside Hotel' },
      { title: 'Paragliding & Sightseeing', description: 'Morning paragliding from Sarangkot, afternoon Davis Falls and caves.', meals: ['breakfast'], accommodation: 'Lakeside Hotel' },
      { title: 'Adventure Day', description: 'Zip-lining and World Peace Pagoda hike.', meals: ['breakfast'], accommodation: 'Lakeside Hotel' },
      { title: 'Sarangkot Sunrise', description: 'Early morning trip to Sarangkot for sunrise, free afternoon.', meals: ['breakfast'], accommodation: 'Lakeside Hotel' },
      { title: 'Return to Kathmandu', description: 'Morning flight back to Kathmandu.', meals: ['breakfast'], accommodation: 'N/A' },
    ],
    highlights: ['Paragliding', 'Phewa Lake', 'Sarangkot Sunrise', 'World Peace Pagoda', 'Mountain Views'],
  },
  {
    title: 'Upper Mustang Trek',
    shortDescription: 'Journey to the forbidden kingdom of Lo with Tibetan culture.',
    description: 'Explore the hidden kingdom of Lo in Upper Mustang, a restricted area that opened to tourists only in 1992. Trek through otherworldly landscapes of eroded cliffs and ancient caves to the walled city of Lo Manthang. Experience pristine Tibetan Buddhist culture unchanged for centuries.',
    tourType: ['adventure', 'cultural'],
    days: 12,
    nights: 11,
    basePrice: 2450,
    difficulty: 'moderate',
    maxGroupSize: 10,
    minAge: 16,
    priceIncludes: ['Kathmandu-Pokhara-Jomsom flights', 'All trek accommodation', 'Meals on trek', 'Restricted area permit', 'Guide and porter', 'ACAP permit'],
    priceExcludes: ['International flights', 'Travel insurance', 'Tips', 'Horse rental', 'Personal gear'],
    itinerary: [
      { title: 'Arrival in Kathmandu', description: 'Welcome and trip briefing.', meals: ['dinner'], accommodation: 'Hotel in Kathmandu' },
      { title: 'Fly to Jomsom', description: 'Via Pokhara, stunning mountain flight.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Guesthouse in Jomsom' },
      { title: 'Trek to Kagbeni', description: 'Enter the restricted area of Upper Mustang.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Guesthouse' },
      { title: 'Trek to Chele', description: 'Cross the Kali Gandaki and climb to Chele.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Guesthouse' },
      { title: 'Trek to Syangboche', description: 'Pass through colorful eroded formations.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Guesthouse' },
      { title: 'Trek to Ghami', description: 'Visit ancient monasteries en route.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Guesthouse' },
      { title: 'Trek to Lo Manthang', description: 'Reach the walled capital city.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Guesthouse in Lo Manthang' },
      { title: 'Explore Lo Manthang', description: 'Visit royal palace, monasteries, and caves.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Guesthouse in Lo Manthang' },
      { title: 'Trek to Dhakmar', description: 'Alternative route via red cliffs of Dhakmar.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Guesthouse' },
      { title: 'Trek to Chhuksang', description: 'Descend through varied landscapes.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Guesthouse' },
      { title: 'Trek to Jomsom', description: 'Complete the circuit back to Jomsom.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Guesthouse' },
      { title: 'Return to Kathmandu', description: 'Fly via Pokhara to Kathmandu.', meals: ['breakfast'], accommodation: 'Hotel in Kathmandu' },
    ],
    highlights: ['Lo Manthang', 'Tibetan Monasteries', 'Sky Caves', 'Desert Landscape', 'Ancient Culture'],
  },
  {
    title: 'Langtang Valley Trek',
    shortDescription: 'Beautiful valley trek close to Kathmandu with stunning scenery.',
    description: 'The Langtang Valley Trek offers a rewarding Himalayan experience without long travel times. Trek through beautiful forests to the glacier-carved Langtang Valley, meeting friendly Tamang villagers along the way. This area is recovering beautifully from the 2015 earthquake.',
    tourType: ['adventure'],
    days: 9,
    nights: 8,
    basePrice: 950,
    difficulty: 'moderate',
    maxGroupSize: 12,
    minAge: 14,
    priceIncludes: ['Transportation to/from trailhead', 'Guide and porter', 'Teahouse accommodation', 'All meals on trek', 'Permits and fees', 'First aid kit'],
    priceExcludes: ['Travel insurance', 'Tips', 'Personal equipment', 'Drinks', 'Hot showers'],
    itinerary: [
      { title: 'Kathmandu to Syabrubesi', description: 'Scenic drive to trek starting point.', meals: ['lunch', 'dinner'], accommodation: 'Guesthouse' },
      { title: 'Trek to Lama Hotel', description: 'Enter the national park and trek through forests.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Langtang Village', description: 'Enter the Langtang Valley proper.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Kyanjin Gompa', description: 'Reach the valley head with stunning glacier views.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Exploration Day', description: 'Climb Kyanjin Ri or Tserko Ri for panoramic views.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Lama Hotel', description: 'Begin descent through the valley.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Thulo Syabru', description: 'Alternative route to Tamang village.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Syabrubesi', description: 'Complete the trek loop.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Guesthouse' },
      { title: 'Return to Kathmandu', description: 'Drive back to Kathmandu.', meals: ['breakfast'], accommodation: 'N/A' },
    ],
    highlights: ['Kyanjin Gompa', 'Langtang Glacier', 'Tserko Ri Views', 'Tamang Culture', 'Rhododendron Forests'],
  },
  {
    title: 'Nepal Highlights Tour',
    shortDescription: 'Best of Nepal combining culture, nature, and wildlife in one trip.',
    description: 'This comprehensive tour showcases Nepal\'s incredible diversity - from the cultural treasures of Kathmandu Valley to the natural beauty of Pokhara and the wildlife of Chitwan. Perfect for first-time visitors wanting to experience the essence of Nepal.',
    tourType: ['cultural', 'wildlife', 'family'],
    days: 10,
    nights: 9,
    basePrice: 1450,
    difficulty: 'easy',
    maxGroupSize: 16,
    minAge: 0,
    priceIncludes: ['Airport transfers', 'Domestic flights', 'Quality hotels', 'Daily breakfast', 'All sightseeing', 'Chitwan safari package', 'Expert guides'],
    priceExcludes: ['International flights', 'Lunch and dinner (except Chitwan)', 'Tips', 'Personal expenses'],
    itinerary: [
      { title: 'Arrive Kathmandu', description: 'Airport pickup, welcome dinner.', meals: ['dinner'], accommodation: 'Hotel in Kathmandu' },
      { title: 'Kathmandu Sightseeing', description: 'Durbar Square, Swayambhunath, Pashupatinath.', meals: ['breakfast'], accommodation: 'Hotel in Kathmandu' },
      { title: 'More Kathmandu', description: 'Boudhanath, Patan Durbar Square.', meals: ['breakfast'], accommodation: 'Hotel in Kathmandu' },
      { title: 'Fly to Pokhara', description: 'Flight with mountain views, afternoon leisure.', meals: ['breakfast'], accommodation: 'Lakeside Hotel' },
      { title: 'Pokhara Sightseeing', description: 'Sarangkot sunrise, caves, Peace Pagoda.', meals: ['breakfast'], accommodation: 'Lakeside Hotel' },
      { title: 'Drive to Chitwan', description: 'Scenic drive through hills to jungle.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Jungle Lodge' },
      { title: 'Chitwan Safari', description: 'Jeep safari, canoe ride, cultural show.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Jungle Lodge' },
      { title: 'More Safari', description: 'Morning safari, elephant interaction.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Jungle Lodge' },
      { title: 'Return to Kathmandu', description: 'Drive back to capital, farewell dinner.', meals: ['breakfast', 'dinner'], accommodation: 'Hotel in Kathmandu' },
      { title: 'Departure', description: 'Airport transfer.', meals: ['breakfast'], accommodation: 'N/A' },
    ],
    highlights: ['Kathmandu Heritage', 'Pokhara Views', 'Chitwan Wildlife', 'Cultural Experiences', 'Scenic Flights'],
  },
  {
    title: 'Mera Peak Climbing',
    shortDescription: 'Nepal\'s highest trekking peak with stunning views of five 8000m peaks.',
    description: 'Mera Peak (6,476m) is Nepal\'s highest trekking peak, offering incredible summit views of five 8,000m mountains including Everest, Lhotse, and Makalu. This expedition provides an excellent introduction to high altitude mountaineering with a technically straightforward summit.',
    tourType: ['adventure'],
    days: 18,
    nights: 17,
    basePrice: 2850,
    difficulty: 'difficult',
    maxGroupSize: 8,
    minAge: 18,
    priceIncludes: ['All flights', 'Peak permit', 'Climbing guide', 'High altitude equipment', 'All meals on trek', 'Expedition tents at high camp'],
    priceExcludes: ['Personal climbing gear', 'Travel insurance with evacuation', 'Tips', 'Personal equipment'],
    itinerary: [
      { title: 'Arrive Kathmandu', description: 'Gear check and briefing.', meals: ['dinner'], accommodation: 'Hotel' },
      { title: 'Fly to Lukla', description: 'Trek to Chutanga.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Thuli Kharka', description: 'Gradual ascent through forests.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Cross Zatrwa La', description: 'First high pass crossing.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Kothe', description: 'Descend into Hinku Valley.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Thaknak', description: 'Continue up the Hinku Valley.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Khare', description: 'Reach Mera Peak base area.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Rest and Acclimatization', description: 'Gear preparation and rest.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'To Mera La High Camp', description: 'Establish high camp below the summit.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Tent' },
      { title: 'Summit Day', description: 'Early start for summit attempt, return to Khare.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Reserve Day', description: 'Weather contingency day.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Kothe', description: 'Begin return journey.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Thuli Kharka', description: 'Continue descent.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Cross Zatrwa La', description: 'Final pass crossing.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Trek to Lukla', description: 'Final trekking day.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Teahouse' },
      { title: 'Fly to Kathmandu', description: 'Return to capital.', meals: ['breakfast'], accommodation: 'Hotel' },
      { title: 'Free Day', description: 'Sightseeing or rest.', meals: ['breakfast'], accommodation: 'Hotel' },
      { title: 'Departure', description: 'Airport transfer.', meals: ['breakfast'], accommodation: 'N/A' },
    ],
    highlights: ['Mera Peak Summit', 'Five 8000m Peak Views', 'Hinku Valley', 'High Altitude Experience', 'Remote Wilderness'],
  },
  {
    title: 'Bhutan Cultural Tour',
    shortDescription: 'Explore the Land of the Thunder Dragon and its unique Buddhist culture.',
    description: 'Discover the magical kingdom of Bhutan, where Gross National Happiness matters more than GDP. Visit ancient dzongs, hike to the iconic Tiger\'s Nest Monastery, and experience a culture that has preserved its traditions while thoughtfully embracing modernity.',
    tourType: ['cultural', 'adventure'],
    days: 7,
    nights: 6,
    basePrice: 3200,
    difficulty: 'easy',
    maxGroupSize: 12,
    minAge: 10,
    priceIncludes: ['Bhutan visa', 'Sustainable Development Fee', 'All accommodation', 'All meals', 'Licensed guide', 'Transportation', 'Monument fees'],
    priceExcludes: ['International flights to Paro', 'Travel insurance', 'Tips', 'Personal expenses'],
    itinerary: [
      { title: 'Arrive Paro', description: 'Fly into Paro, visit Paro Dzong, evening at hotel.', meals: ['lunch', 'dinner'], accommodation: 'Hotel in Paro' },
      { title: 'Tiger\'s Nest', description: 'Hike to iconic Taktsang Monastery (Tiger\'s Nest).', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Hotel in Paro' },
      { title: 'Paro to Thimphu', description: 'Drive to capital, visit Memorial Chorten, Buddha Dordenma.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Hotel in Thimphu' },
      { title: 'Thimphu', description: 'Explore Tashichho Dzong, Folk Heritage Museum, handicraft markets.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Hotel in Thimphu' },
      { title: 'Thimphu to Punakha', description: 'Cross Dochula Pass, visit Punakha Dzong.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Hotel in Punakha' },
      { title: 'Punakha', description: 'Hike to Chimi Lhakhang (Fertility Temple), village walk.', meals: ['breakfast', 'lunch', 'dinner'], accommodation: 'Hotel in Punakha' },
      { title: 'Departure', description: 'Drive to Paro for departure flight.', meals: ['breakfast'], accommodation: 'N/A' },
    ],
    highlights: ['Tiger\'s Nest Monastery', 'Punakha Dzong', 'Dochula Pass', 'Thimphu', 'Buddhist Culture'],
  },
]

const tourTypeOptions: ('adventure' | 'beach' | 'cultural' | 'wildlife' | 'city' | 'cruise' | 'honeymoon' | 'family' | 'luxury' | 'budget')[] = ['adventure', 'beach', 'cultural', 'wildlife', 'city', 'cruise', 'honeymoon', 'family', 'luxury', 'budget']

export async function seedTours(
  payload: Payload,
  mediaId: number,
  destinationIds: number[],
  categoryIds: number[]
): Promise<number[]> {
  logStart('Tours')
  const tourIds: number[] = []

  for (const template of TOUR_TEMPLATES) {
    // Generate departure dates for next 6 months
    const departureDates = []
    for (let i = 0; i < 8; i++) {
      departureDates.push({
        date: getFutureDate(30 + i * 21), // Every 3 weeks
        availableSeats: randomInRange(4, template.maxGroupSize),
      })
    }

    const tour = await payload.create({
      collection: 'tours',
      data: {
        title: template.title,
        slug: generateSlug(template.title),
        destination: randomItems(destinationIds, randomInRange(1, 3)),
        activityCategory: randomItems(categoryIds, randomInRange(1, 3)),
        tourType: template.tourType,
        description: createRichText(template.description),
        shortDescription: template.shortDescription,
        featuredImage: mediaId,
        duration: {
          days: template.days,
          nights: template.nights,
        },
        pricing: {
          basePrice: template.basePrice,
          currency: 'USD',
          discountedPrice: Math.random() > 0.7 ? Math.floor(template.basePrice * 0.9) : undefined,
          priceIncludes: template.priceIncludes.map((item) => ({ item })),
          priceExcludes: template.priceExcludes.map((item) => ({ item })),
        },
        itinerary: template.itinerary.map((day, index) => ({
          day: index + 1,
          title: day.title,
          description: createRichText(day.description),
          meals: day.meals,
          accommodation: day.accommodation,
        })),
        highlights: template.highlights.map((h) => ({ highlight: h })),
        availability: {
          startDate: getFutureDate(7),
          endDate: getFutureDate(365),
          departureDates,
        },
        groupSize: {
          min: 2,
          max: template.maxGroupSize,
        },
        difficulty: template.difficulty,
        ageRequirement: {
          minimum: template.minAge,
        },
        status: 'active',
        featured: tourIds.length < 8,
        popularityScore: randomInRange(60, 100),
        metaTitle: `${template.title} | Green Getaways`,
        metaDescription: template.shortDescription,
      },
    })
    tourIds.push(tour.id)
  }

  // Add more tours to reach 30
  const additionalTours = [
    { title: 'Ghorepani Poon Hill Trek', days: 5, price: 550, type: ['adventure'] as const, difficulty: 'moderate' as const },
    { title: 'Manaslu Circuit Trek', days: 16, price: 1750, type: ['adventure'] as const, difficulty: 'challenging' as const },
    { title: 'Island Peak Climbing', days: 18, price: 2650, type: ['adventure'] as const, difficulty: 'difficult' as const },
    { title: 'Bardia Wildlife Safari', days: 4, price: 550, type: ['wildlife'] as const, difficulty: 'easy' as const },
    { title: 'Lumbini Pilgrimage Tour', days: 3, price: 350, type: ['cultural'] as const, difficulty: 'easy' as const },
    { title: 'Three Passes Trek', days: 20, price: 2250, type: ['adventure'] as const, difficulty: 'difficult' as const },
    { title: 'Tsum Valley Trek', days: 15, price: 1650, type: ['adventure', 'cultural'] as const, difficulty: 'moderate' as const },
    { title: 'Rafting on Trisuli River', days: 2, price: 150, type: ['adventure'] as const, difficulty: 'moderate' as const },
    { title: 'Helicopter Tour to Everest', days: 1, price: 1200, type: ['adventure', 'luxury'] as const, difficulty: 'easy' as const },
    { title: 'Nepal Honeymoon Package', days: 8, price: 1850, type: ['honeymoon', 'luxury'] as const, difficulty: 'easy' as const },
    { title: 'Annapurna Base Camp Trek', days: 12, price: 1250, type: ['adventure'] as const, difficulty: 'moderate' as const },
    { title: 'Makalu Base Camp Trek', days: 18, price: 2150, type: ['adventure'] as const, difficulty: 'challenging' as const },
    { title: 'Dolpo Trek', days: 21, price: 3500, type: ['adventure', 'cultural'] as const, difficulty: 'challenging' as const },
    { title: 'Kanchenjunga Base Camp Trek', days: 22, price: 2450, type: ['adventure'] as const, difficulty: 'challenging' as const },
    { title: 'Family Nepal Adventure', days: 10, price: 1650, type: ['family', 'cultural', 'wildlife'] as const, difficulty: 'easy' as const },
    { title: 'Photography Tour Nepal', days: 12, price: 2200, type: ['cultural', 'adventure'] as const, difficulty: 'moderate' as const },
    { title: 'Nepal Mountain Biking', days: 10, price: 1450, type: ['adventure'] as const, difficulty: 'challenging' as const },
    { title: 'Yoga Retreat in Nepal', days: 7, price: 850, type: ['cultural'] as const, difficulty: 'easy' as const },
    { title: 'Bird Watching Tour', days: 10, price: 1350, type: ['wildlife'] as const, difficulty: 'easy' as const },
  ]

  for (const tour of additionalTours) {
    const departureDates = []
    for (let i = 0; i < 6; i++) {
      departureDates.push({
        date: getFutureDate(14 + i * 28),
        availableSeats: randomInRange(4, 12),
      })
    }

    const created = await payload.create({
      collection: 'tours',
      data: {
        title: tour.title,
        slug: generateSlug(tour.title),
        destination: randomItems(destinationIds, randomInRange(1, 2)),
        activityCategory: randomItems(categoryIds, randomInRange(1, 2)),
        tourType: tour.type as any,
        description: createRichText(faker.lorem.paragraphs(3)),
        shortDescription: faker.lorem.sentence(),
        featuredImage: mediaId,
        duration: {
          days: tour.days,
          nights: tour.days - 1,
        },
        pricing: {
          basePrice: tour.price,
          currency: 'USD',
          priceIncludes: [
            { item: 'Professional guide' },
            { item: 'All transportation' },
            { item: 'Accommodation' },
            { item: 'Permits and fees' },
          ],
          priceExcludes: [
            { item: 'International flights' },
            { item: 'Travel insurance' },
            { item: 'Personal expenses' },
          ],
        },
        itinerary: Array.from({ length: tour.days }, (_, i) => ({
          day: i + 1,
          title: i === 0 ? 'Arrival' : i === tour.days - 1 ? 'Departure' : `Day ${i + 1}`,
          description: createRichText(faker.lorem.paragraph()),
          meals: i === 0 || i === tour.days - 1 ? ['breakfast'] : ['breakfast', 'lunch', 'dinner'],
          accommodation: i === tour.days - 1 ? 'N/A' : 'Hotel/Teahouse',
        })),
        highlights: Array.from({ length: 5 }, () => ({ highlight: faker.lorem.words(3) })),
        availability: {
          startDate: getFutureDate(7),
          endDate: getFutureDate(365),
          departureDates,
        },
        groupSize: {
          min: 2,
          max: 12,
        },
        difficulty: tour.difficulty,
        ageRequirement: {
          minimum: tour.difficulty === 'difficult' ? 18 : tour.difficulty === 'challenging' ? 16 : 10,
        },
        status: 'active',
        featured: false,
        popularityScore: randomInRange(50, 90),
        metaTitle: `${tour.title} | Green Getaways`,
        metaDescription: faker.lorem.sentence(),
      },
    })
    tourIds.push(created.id)
  }

  logComplete('Tours', tourIds.length)
  return tourIds
}
