import { faker } from '@faker-js/faker'
import type { Payload } from 'payload'
import {
  createMultiParagraphRichText,
  generateSlug,
  getPastDate,
  logComplete,
  logStart,
  randomInRange,
  randomItem,
  randomItems,
} from '../utils'

interface BlogPostData {
  title: string
  excerpt: string
  content: string[]
  category: ('travel-tips' | 'destination-guides' | 'travel-stories' | 'travel-news' | 'photography' | 'culture' | 'food' | 'adventure')[]
  tags: string[]
  readTime: number
}

const BLOG_POSTS: BlogPostData[] = [
  {
    title: '10 Essential Tips for Your First Trek in Nepal',
    excerpt: 'Planning your first Himalayan trek? Here are expert tips to ensure a safe, enjoyable, and memorable adventure in the mountains of Nepal.',
    content: [
      'Trekking in Nepal is a dream for adventurers worldwide. The combination of stunning mountain scenery, rich culture, and well-established trekking infrastructure makes it an ideal destination for both beginners and experienced trekkers. However, proper preparation is key to a successful trek.',
      'First and foremost, physical preparation is essential. Start training at least 2-3 months before your trek with cardio exercises, strength training, and practice hikes with a loaded backpack. The better prepared you are, the more you\'ll enjoy the experience.',
      'Choosing the right season is crucial. The best months for trekking are October-November (post-monsoon) and March-May (pre-monsoon). These periods offer stable weather and clear mountain views. Avoid monsoon season (June-September) when trails are slippery and views obscured.',
      'Acclimatization cannot be rushed. Altitude sickness can affect anyone regardless of fitness level. Follow the golden rule: climb high, sleep low. Include rest days in your itinerary and listen to your body.',
      'Pack wisely - layering is essential in the mountains where temperatures vary dramatically. Bring moisture-wicking base layers, insulating mid-layers, and a waterproof outer layer. Don\'t forget sunscreen, sunglasses, and a good quality headlamp.',
    ],
    category: ['travel-tips', 'adventure'],
    tags: ['trekking', 'nepal', 'beginners guide', 'hiking tips', 'mountains'],
    readTime: 8,
  },
  {
    title: 'The Ultimate Guide to Everest Base Camp Trek',
    excerpt: 'Everything you need to know about trekking to the base of the world\'s highest mountain, from preparation to daily itinerary.',
    content: [
      'The Everest Base Camp trek is the most iconic trek in the world. Standing at the foot of Mount Everest (8,848m) is a bucket-list experience that attracts thousands of trekkers each year. This comprehensive guide will help you plan your own EBC adventure.',
      'The classic EBC trek takes 12-14 days from Lukla, covering approximately 130km with elevation gains of over 3,000 meters. The trek passes through Sherpa villages, ancient monasteries, and some of the most dramatic mountain scenery on Earth.',
      'The journey begins with a thrilling flight from Kathmandu to Lukla (2,840m), one of the world\'s most exciting airport approaches. From Lukla, the trail winds through Namche Bazaar, the Sherpa capital, before continuing to Tengboche, home to the region\'s most important monastery.',
      'Proper acclimatization is built into the itinerary with rest days at Namche and Dingboche. These days aren\'t for lounging - use them for short high-altitude hikes to help your body adjust to the thin air.',
      'The final push to Base Camp (5,364m) and the early morning climb to Kala Patthar (5,545m) for sunrise views of Everest are unforgettable moments that make every step worthwhile.',
    ],
    category: ['destination-guides', 'adventure'],
    tags: ['everest', 'trekking', 'nepal', 'base camp', 'sherpa'],
    readTime: 12,
  },
  {
    title: 'Best Time to Visit Nepal: A Month-by-Month Guide',
    excerpt: 'Nepal\'s diverse geography means different seasons suit different activities. Find out when to visit based on your interests.',
    content: [
      'Nepal\'s incredible diversity - from tropical jungles to frozen peaks - means there\'s no single "best time" to visit. The ideal timing depends entirely on what you want to experience. This guide breaks down each season\'s pros and cons.',
      'October and November are considered peak season for good reason. Post-monsoon brings crystal clear skies, comfortable temperatures, and the most spectacular mountain views. This is the best time for trekking and mountaineering.',
      'Spring (March-May) is another excellent window. Rhododendrons bloom across the hills, adding splashes of red and pink to the trekking trails. Temperatures are warmer but haze can sometimes obscure mountain views.',
      'Monsoon season (June-September) deters most visitors, but it\'s actually a great time for certain activities. Rafting is at its best with higher water levels, and Hindu temples like Pashupatinath are vibrant with local pilgrims.',
      'Winter (December-February) offers fewer crowds and lower prices. While high altitude treks are extremely cold, lower elevation destinations like Chitwan and Pokhara are pleasant. It\'s also a great time for bird watching.',
    ],
    category: ['travel-tips', 'destination-guides'],
    tags: ['nepal', 'travel planning', 'seasons', 'weather', 'timing'],
    readTime: 7,
  },
  {
    title: 'My Solo Trek to Annapurna Base Camp: A Journey Within',
    excerpt: 'A personal account of trekking solo to Annapurna Base Camp and the unexpected lessons learned along the way.',
    content: [
      'I never expected a trek to change my life. When I set off alone for Annapurna Base Camp, I was seeking adventure and mountain views. What I found was something much more profound.',
      'The first few days were harder than I expected - not physically, but emotionally. Walking in silence with my thoughts for hours each day forced me to confront things I\'d been avoiding. By day three, I\'d made peace with some old demons.',
      'The teahouse culture along the trail creates instant community. Each evening I\'d share dal bhat with fellow trekkers from around the world, exchanging stories by candlelight when the power went out.',
      'Standing at Annapurna Base Camp at dawn, surrounded by 7,000m+ peaks glowing golden in the sunrise, I felt an overwhelming sense of gratitude. Small problems seemed insignificant compared to these ancient mountains.',
      'Solo trekking isn\'t for everyone, but for me, it was the reset button I needed. Sometimes you have to get lost in the mountains to find yourself.',
    ],
    category: ['travel-stories', 'adventure'],
    tags: ['solo travel', 'annapurna', 'personal story', 'trekking', 'mindfulness'],
    readTime: 6,
  },
  {
    title: 'Capturing the Himalayas: Photography Tips for Trekkers',
    excerpt: 'Professional photography advice for capturing stunning mountain images during your Nepal trek.',
    content: [
      'The Himalayas offer endless photographic opportunities, from sweeping mountain panoramas to intimate cultural portraits. Here\'s how to come home with images that do justice to this incredible region.',
      'Golden hour is king in the mountains. Wake early for sunrise and be ready to shoot during the last hour of daylight. The warm light on snow-capped peaks is simply magical. Midday light is harsh and flattens the dramatic terrain.',
      'Don\'t just photograph mountains - tell stories. Include local people (with permission), prayer flags, monasteries, and everyday life. The human element makes images relatable and emotionally compelling.',
      'Gear considerations are important at altitude. Batteries drain quickly in cold temperatures, so carry spares close to your body. Lightweight mirrorless cameras are ideal for trekking. A polarizing filter helps cut haze and deepen blue skies.',
      'Finally, put the camera down sometimes. The most important memories are the ones you experience fully present. No photo can capture the feeling of standing among the world\'s highest peaks.',
    ],
    category: ['photography', 'travel-tips'],
    tags: ['photography', 'mountains', 'camera tips', 'landscape', 'himalayas'],
    readTime: 9,
  },
  {
    title: 'Understanding Sherpa Culture: More Than Mountain Guides',
    excerpt: 'Dive deep into the rich culture of the Sherpa people, from Buddhist traditions to everyday life in the high Himalayas.',
    content: [
      'The Sherpa people are world-famous as mountaineers, but their culture extends far beyond climbing. These highland Buddhists have inhabited the Everest region for centuries, developing a unique culture adapted to life at extreme altitude.',
      'Buddhism permeates every aspect of Sherpa life. Mani walls inscribed with prayers line every trail. Monasteries like Tengboche serve as spiritual centers. The rhythm of life follows the Buddhist calendar of festivals and ceremonies.',
      'Traditional Sherpa houses are designed for the harsh climate - thick stone walls, small windows, and a central hearth for cooking and heating. Yak products play a central role in the economy and cuisine.',
      'The tourism boom has brought both opportunities and challenges. Many Sherpas have prospered, but traditional practices are evolving. Younger generations balance modern education with cultural preservation.',
      'As visitors to Sherpa lands, we have a responsibility to engage respectfully. Learn a few words of greeting, observe monastery etiquette, and show appreciation for the culture that makes our mountain adventures possible.',
    ],
    category: ['culture', 'destination-guides'],
    tags: ['sherpa', 'culture', 'buddhism', 'everest region', 'traditions'],
    readTime: 8,
  },
  {
    title: 'A Food Lover\'s Guide to Nepali Cuisine',
    excerpt: 'From dal bhat to momos, discover the delicious diversity of Nepal\'s culinary traditions.',
    content: [
      'Nepali cuisine is a delicious blend of influences from India, Tibet, and indigenous traditions. While you\'ll never go hungry on dal bhat, there\'s so much more to explore in Nepal\'s food scene.',
      'Dal bhat, the national dish, is eaten twice daily by most Nepalis. Don\'t underestimate its simplicity - properly prepared dal bhat with multiple sides (tarkari, achaar, papad) is a perfectly balanced meal.',
      'Momos have become Nepal\'s unofficial national snack. These Tibetan-origin dumplings come steamed, fried, or in soup, filled with vegetables, chicken, or buffalo meat. Finding your favorite momo spot is a rite of passage.',
      'Newari cuisine from the Kathmandu Valley is Nepal\'s most distinctive regional food. Try chatamari (Newari pizza), bara (lentil pancakes), and the elaborate feast called samay baji.',
      'For adventurous eaters, thakali food from the Annapurna region and Sherpa dishes like shakpa (meat stew) offer hearty mountain fare. And don\'t leave without trying sel roti, sweet rice donuts served during festivals.',
    ],
    category: ['food', 'culture'],
    tags: ['nepali food', 'cuisine', 'dal bhat', 'momos', 'culinary'],
    readTime: 6,
  },
  {
    title: 'Wildlife Safari in Chitwan: What to Expect',
    excerpt: 'Your complete guide to experiencing Nepal\'s premier national park, from jungle safaris to cultural encounters.',
    content: [
      'Chitwan National Park offers one of Asia\'s best wildlife viewing experiences. This UNESCO World Heritage Site protects one-horned rhinoceros, Bengal tigers, and over 500 bird species in its subtropical wilderness.',
      'Most visits involve 2-3 days based at a jungle lodge near the park. Activities include jeep safaris, canoe rides on the Rapti River, elephant interaction programs, and nature walks with trained naturalists.',
      'Rhino sightings are almost guaranteed - Chitwan hosts over 600 of these prehistoric-looking creatures. Tigers are present but elusive; consider yourself lucky if you spot one. Other wildlife includes deer, wild boar, monkeys, and crocodiles.',
      'The Tharu people are the indigenous inhabitants of this region. Cultural programs featuring traditional dance and music offer insight into their unique heritage. Visiting a Tharu village is highly recommended.',
      'Best visiting time is October to March when lower grass makes wildlife easier to spot. Avoid the hot summer months and monsoon season. Book accommodation and activities in advance during peak season.',
    ],
    category: ['destination-guides', 'adventure'],
    tags: ['chitwan', 'wildlife', 'safari', 'national park', 'rhino'],
    readTime: 7,
  },
  {
    title: 'Nepal Reopens: Post-Pandemic Travel Update 2024',
    excerpt: 'The latest information on entry requirements, safety measures, and what\'s changed for travelers visiting Nepal.',
    content: [
      'Nepal has fully reopened to international tourism with minimal restrictions. Here\'s everything you need to know about visiting Nepal in the current travel landscape.',
      'Entry requirements are straightforward - most nationalities receive visa on arrival at Tribhuvan International Airport. No COVID vaccination or testing requirements remain in place for general entry.',
      'The tourism infrastructure has used the quiet pandemic years to upgrade. Many trekking lodges have improved facilities, trails have been maintained, and new routes have opened.',
      'Some positive changes from the pandemic have stuck. Many teahouses continue enhanced hygiene practices. Digital permits can now be obtained online. Helicopter evacuations have improved protocols.',
      'Tourism numbers are recovering but haven\'t yet reached pre-pandemic levels. This means slightly smaller crowds on popular treks and more availability at hotels. It\'s actually an excellent time to visit.',
    ],
    category: ['travel-news', 'travel-tips'],
    tags: ['travel updates', 'nepal 2024', 'entry requirements', 'covid', 'news'],
    readTime: 5,
  },
  {
    title: 'Pokhara: Adventure Capital of Nepal',
    excerpt: 'Discover why Pokhara is the perfect base for adventure activities, from paragliding to trekking, in this lakeside paradise.',
    content: [
      'Pokhara is Nepal\'s second city but feels nothing like Kathmandu. This laid-back lakeside town sits at the doorstep of the Annapurna range, offering unbeatable mountain views and endless adventure opportunities.',
      'Paragliding over Phewa Lake with the Annapurna range as backdrop is the quintessential Pokhara experience. Tandem flights require no experience and provide 20-30 minutes of soaring bliss. The best conditions are typically in the morning.',
      'The area boasts several "extreme" attractions including one of the world\'s highest bungee jumps, an impressive zip line, and ultralight flights. Adventure junkies can easily fill a week here.',
      'Beyond thrills, Pokhara is the gateway to the Annapurna region treks. The Annapurna Circuit, ABC trek, and shorter options like Poon Hill all start from nearby trailheads.',
      'The lakeside tourist area has a distinctly relaxed vibe - think cafes, boutiques, and sunset views over the lake. It\'s the perfect place to recover after a trek or gear up for the next adventure.',
    ],
    category: ['destination-guides', 'adventure'],
    tags: ['pokhara', 'adventure', 'paragliding', 'annapurna', 'lakeside'],
    readTime: 6,
  },
  {
    title: 'Responsible Trekking: Leave No Trace in the Himalayas',
    excerpt: 'How to minimize your environmental impact while trekking in Nepal and support sustainable mountain tourism.',
    content: [
      'The Himalayas face increasing pressure from tourism. As trekkers, we have a responsibility to minimize our impact and help preserve these mountains for future generations.',
      'The Leave No Trace principles apply in the Himalayas: pack out all trash, stay on established trails, respect wildlife, and leave what you find. Bring a stuff sack for your waste and dispose of it properly in towns.',
      'Single-use plastics are a major problem. Bring a reusable water bottle with purification tablets or a filter. Refuse plastic bags. Some lodges now offer filtered water refills - support them.',
      'Support locally owned teahouses and hire local guides and porters. The more tourism benefits local communities, the more incentive they have to protect their environment.',
      'Carbon offsetting your flights is one way to address the unavoidable emissions of getting to Nepal. Several reputable organizations offer verified offset programs.',
    ],
    category: ['travel-tips', 'adventure'],
    tags: ['responsible travel', 'sustainability', 'leave no trace', 'eco-tourism', 'environment'],
    readTime: 6,
  },
  {
    title: 'Altitude Sickness: Prevention, Recognition, and Treatment',
    excerpt: 'Essential health information for trekkers heading to high altitude in Nepal.',
    content: [
      'Altitude sickness (AMS) is a real risk for anyone ascending above 2,500m. Understanding this condition is essential for safe trekking in Nepal. Here\'s what every trekker needs to know.',
      'AMS occurs when the body cannot adapt quickly enough to reduced oxygen at altitude. Symptoms include headache, nausea, fatigue, and disturbed sleep. More severe forms (HACE and HAPE) are life-threatening emergencies.',
      'Prevention is about proper acclimatization. Ascend gradually - the general rule is "climb high, sleep low." Above 3,000m, increase sleeping altitude by no more than 300-500m per day. Take rest days every 3-4 days of climbing.',
      'Stay hydrated (3-4 liters daily), avoid alcohol, eat well, and listen to your body. Some trekkers use Diamox (acetazolamide) prophylactically - consult a travel medicine doctor before your trip.',
      'If symptoms develop, stop ascending. If they worsen or don\'t improve with rest, descend immediately. HACE and HAPE require urgent descent and medical attention. Carry adequate insurance that covers helicopter evacuation.',
    ],
    category: ['travel-tips', 'adventure'],
    tags: ['altitude sickness', 'health', 'safety', 'trekking', 'AMS'],
    readTime: 8,
  },
  {
    title: 'Nepal on a Budget: How to Travel Cheaply Without Missing Out',
    excerpt: 'Practical tips for experiencing the best of Nepal without breaking the bank.',
    content: [
      'Nepal is one of the world\'s most affordable travel destinations. With some smart planning, you can experience world-class trekking, incredible culture, and unforgettable adventures on a shoestring budget.',
      'Accommodation ranges from $3 guesthouses in Thamel to $5-15 teahouses on trekking routes. Budget travelers can get by on $30-40 per day including food, accommodation, and local transport.',
      'Eat where locals eat. Dal bhat in a local restaurant costs 150-250 rupees ($1-2). Tourist restaurants charge 5-10x more for similar food. Street food like momos and samosas are cheap and delicious.',
      'Independent trekking saves money compared to organized tours. The Annapurna region doesn\'t require a guide, so you can trek solo or with other travelers you meet. Everest region requires a guide but group trips are affordable.',
      'Bargain for taxis, souvenirs, and unlisted prices. Download offline maps to avoid roaming charges. Travel in shoulder season for lower prices. The savings add up quickly!',
    ],
    category: ['travel-tips'],
    tags: ['budget travel', 'cheap travel', 'backpacking', 'money saving', 'nepal'],
    readTime: 7,
  },
  {
    title: 'Celebrating Dashain: Nepal\'s Greatest Festival',
    excerpt: 'An insider\'s guide to experiencing Dashain, the 15-day Hindu festival that brings Nepal to life.',
    content: [
      'Dashain is Nepal\'s biggest and longest festival, a 15-day celebration of the victory of good over evil. For travelers fortunate enough to be in Nepal during Dashain (usually October), it offers a window into Nepali culture and family life.',
      'The festival commemorates the goddess Durga\'s victory over the demon Mahishasura. Families reunite, elders give blessings and tika (rice, yogurt, and vermillion paste), and animal sacrifices are made at temples.',
      'For travelers, Dashain can be challenging - many businesses close, domestic flights are packed, and tourist services are limited. But the cultural experience is priceless if you\'re prepared.',
      'If invited to a Nepali home during Dashain, accept! You\'ll witness the tika ceremony, enjoy special feast foods, and experience genuine Nepali hospitality. It\'s a privilege few tourists experience.',
      'Practical tips: book transport well in advance, expect closures, and embrace the festive atmosphere. Kathmandu Durbar Square hosts special celebrations, and temple visits are particularly meaningful during this time.',
    ],
    category: ['culture', 'travel-news'],
    tags: ['dashain', 'festival', 'hindu', 'culture', 'celebrations'],
    readTime: 6,
  },
  {
    title: 'Upper Mustang: Nepal\'s Last Forbidden Kingdom',
    excerpt: 'Journey to the ancient walled city of Lo Manthang in the restricted region of Upper Mustang.',
    content: [
      'Upper Mustang is Nepal\'s best-kept secret - a restricted region that only opened to foreigners in 1992. This former Tibetan kingdom offers landscapes and culture unlike anywhere else in Nepal.',
      'The journey to Lo Manthang, the walled capital, passes through an otherworldly landscape of eroded cliffs, hidden caves, and ancient monasteries. The region lies in the rain shadow of the Himalayas, creating a high-altitude desert.',
      'Tibetan Buddhist culture remains remarkably intact here. The royal family still resides in Lo Manthang, monks chant in centuries-old monasteries, and the annual Tiji festival attracts visitors from across the Buddhist world.',
      'The region requires a special restricted area permit ($500 for 10 days), which must be obtained through a registered agency. This keeps visitor numbers low and helps preserve the fragile culture and environment.',
      'Trek options range from the classic 10-12 day route to longer explorations including the sacred caves of Choser. The best time to visit is April-October when the weather is favorable and the spectacular Tiji festival occurs (usually May).',
    ],
    category: ['destination-guides', 'culture', 'adventure'],
    tags: ['mustang', 'forbidden kingdom', 'tibet', 'trekking', 'lo manthang'],
    readTime: 9,
  },
  {
    title: 'Yoga and Meditation Retreats in Nepal',
    excerpt: 'Find inner peace in the birthplace of Buddha with Nepal\'s best yoga and meditation experiences.',
    content: [
      'Nepal\'s spiritual heritage makes it a natural destination for yoga and meditation. From ashrams in Kathmandu to retreat centers overlooking the Himalayas, options abound for seekers of inner peace.',
      'Pokhara has emerged as Nepal\'s yoga capital. Centers along the lakeside offer drop-in classes, multi-day retreats, and teacher training programs. The combination of mountain views and laid-back atmosphere is ideal for practice.',
      'For deeper immersion, consider a silent meditation retreat at one of Nepal\'s Vipassana centers. These 10-day courses follow the tradition of S.N. Goenka and are offered on a donation basis.',
      'Buddhist meditation is taught at numerous monasteries. Kopan Monastery near Kathmandu welcomes visitors for courses in Tibetan Buddhist meditation. Lumbini, Buddha\'s birthplace, offers a uniquely sacred setting for practice.',
      'Combine your spiritual practice with trekking - many yoga practitioners do the Annapurna Circuit or ABC trek, finding that the physical challenge complements their inner journey. Sunrise yoga at altitude is transformative.',
    ],
    category: ['culture', 'destination-guides'],
    tags: ['yoga', 'meditation', 'retreats', 'spiritual', 'wellness'],
    readTime: 7,
  },
  {
    title: 'Bird Watching in Nepal: A Birder\'s Paradise',
    excerpt: 'With over 900 species, Nepal is one of the world\'s top bird watching destinations. Here\'s where to find them.',
    content: [
      'Nepal\'s dramatic elevation range - from 60m in the Terai to 8,848m at Everest\'s summit - creates an incredible diversity of habitats and bird species. Over 900 species have been recorded, including 35+ endemics.',
      'Chitwan National Park is the most accessible birding destination, with over 500 species including Bengal florican, giant hornbill, and numerous waterfowl. Winter months bring migrant species from Tibet and Central Asia.',
      'The Kathmandu Valley itself hosts impressive birds. Phulchowki, the valley\'s highest point, is famous for the satyr tragopan. Shivapuri National Park on the valley rim offers good forest birding.',
      'High altitude species are special. Look for Himalayan monal (Nepal\'s national bird), blood pheasant, snow partridge, and lammergeier on treks. The Upper Mustang region hosts unique high-altitude species.',
      'Best times for birding are October-November for migrant arrivals and March-April for resident species and clearer weather. Hire a knowledgeable guide - local expertise makes a huge difference for finding special birds.',
    ],
    category: ['adventure', 'destination-guides'],
    tags: ['bird watching', 'wildlife', 'birding', 'nature', 'chitwan'],
    readTime: 8,
  },
  {
    title: 'Planning Your Nepal Trip: A Step-by-Step Checklist',
    excerpt: 'From visas to vaccinations, here\'s everything you need to organize before your Nepal adventure.',
    content: [
      'Planning a trip to Nepal requires some preparation, but it\'s straightforward with the right information. This checklist covers everything you need to arrange before departure.',
      'Passport and visa: Ensure your passport is valid for 6+ months. Most nationalities can obtain visa on arrival at Kathmandu airport - bring passport photos and USD cash for the fee ($30 for 15 days, $50 for 30 days).',
      'Health preparations: Consult a travel medicine clinic 6-8 weeks before travel. Recommended vaccinations include Hepatitis A & B, Typhoid, and Japanese Encephalitis (for jungle areas). Altitude medication may be advised.',
      'Insurance is essential: Ensure your policy covers trekking to your maximum planned altitude and emergency helicopter evacuation. Most general travel policies exclude high-altitude trekking.',
      'Gear considerations: Unless undertaking a technical climb, most equipment can be rented or bought cheaply in Kathmandu\'s Thamel area. Bring well-worn hiking boots and your own sleeping bag liner.',
    ],
    category: ['travel-tips'],
    tags: ['planning', 'preparation', 'visa', 'health', 'checklist'],
    readTime: 6,
  },
  {
    title: 'The Sacred Lakes of Nepal: Pilgrimage Destinations',
    excerpt: 'Explore the spiritual significance of Nepal\'s high-altitude lakes, from Gosainkunda to Rara.',
    content: [
      'Nepal\'s high-altitude lakes hold deep spiritual significance for Hindus and Buddhists alike. Pilgrimages to these sacred waters combine stunning trekking with profound cultural experiences.',
      'Gosainkunda (4,380m) is the most famous sacred lake, believed to have been created by Lord Shiva\'s trident. During the Janai Purnima festival, thousands of pilgrims brave the challenging trek to bathe in its holy waters.',
      'Rara Lake in remote northwestern Nepal is the country\'s largest lake, set in an alpine meadow surrounded by snow-capped peaks. The journey there is an adventure in itself through rarely-visited terrain.',
      'Phoksundo Lake in Dolpo is famed for its otherworldly turquoise color. This sacred Buddhist site features in the classic book "The Snow Leopard" and remains one of Nepal\'s most pristine destinations.',
      'The Gokyo Lakes in the Everest region offer both spiritual significance and spectacular mountain views. Reaching Gokyo Ri for sunrise views over the lakes and Everest is a highlight of any Himalayan trek.',
    ],
    category: ['destination-guides', 'culture', 'adventure'],
    tags: ['sacred lakes', 'pilgrimage', 'gosainkunda', 'rara', 'trekking'],
    readTime: 7,
  },
  {
    title: 'Night Photography in the Himalayas: Capturing the Milky Way',
    excerpt: 'Technical tips for photographing stars and the Milky Way during your Nepal trek.',
    content: [
      'The high altitude and minimal light pollution of Nepal\'s mountains create exceptional conditions for astrophotography. With the right technique, you can capture stunning images of the night sky with Himalayan peaks in the foreground.',
      'Timing is crucial. The Milky Way core is best photographed from March to October, with April-May and September-October being ideal in Nepal (avoiding monsoon). New moon phases provide the darkest skies.',
      'Essential gear includes a sturdy tripod, a wide-angle lens (f/2.8 or faster), and a camera with good high-ISO performance. Remote shutter release prevents camera shake during long exposures.',
      'Basic settings to start: ISO 3200-6400, aperture wide open (f/2.8), shutter speed 15-25 seconds (depending on focal length to avoid star trails). Use manual focus on a bright star or distant light.',
      'Location scouting during daylight is essential - identify foreground elements that will work with the night sky. At altitude, dress warmly and protect your batteries from the cold. Bring a headlamp with red light mode.',
    ],
    category: ['photography', 'travel-tips'],
    tags: ['astrophotography', 'night sky', 'milky way', 'photography tips', 'mountains'],
    readTime: 9,
  },
]

export async function seedBlog(
  payload: Payload,
  mediaId: number,
  userIds: number[],
  destinationIds: number[],
  tourIds: number[]
): Promise<number[]> {
  logStart('Blog Posts')
  const blogIds: number[] = []

  // Validate required data
  if (!userIds || userIds.length === 0) {
    throw new Error('No user IDs provided for blog authors')
  }
  if (!destinationIds || destinationIds.length === 0) {
    throw new Error('No destination IDs provided for blog relations')
  }
  if (!tourIds || tourIds.length === 0) {
    throw new Error('No tour IDs provided for blog relations')
  }

  console.log(`  Using ${userIds.length} users, ${destinationIds.length} destinations, ${tourIds.length} tours`)

  for (const post of BLOG_POSTS) {
    const status = Math.random() > 0.15 ? 'published' : Math.random() > 0.5 ? 'draft' : 'archived'
    const publishedDate = status === 'published' ? getPastDate(randomInRange(1, 180)) : undefined

    const blog = await payload.create({
      collection: 'blog',
      data: {
        title: post.title,
        slug: generateSlug(post.title),
        author: randomItem(userIds),
        category: post.category,
        excerpt: post.excerpt,
        featuredImage: mediaId,
        content: createMultiParagraphRichText(post.content),
        relatedDestinations: randomItems(destinationIds, randomInRange(1, 3)),
        relatedTours: randomItems(tourIds, randomInRange(1, 3)),
        tags: post.tags.map((tag) => ({ tag })),
        readTime: post.readTime,
        status,
        publishedDate,
        featured: blogIds.length < 6 && status === 'published',
        metaTitle: post.title,
        metaDescription: post.excerpt,
      },
    })
    blogIds.push(blog.id)
  }

  logComplete('Blog Posts', blogIds.length)
  return blogIds
}
