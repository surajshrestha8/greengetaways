import type { Payload } from 'payload'
import { createRichText, generateSlug, logComplete, logStart } from '../utils'

interface SpecialServiceData {
  serviceName: string
  serviceType: 'mice' | 'wedding' | 'filming' | 'yoga' | 'team-building' | 'rock-climbing' | 'homestay' | 'educational' | 'custom'
  shortDescription: string
  description: string
  features: string[]
  whatWeOffer: string[]
  pricingModel: 'fixed' | 'per-person' | 'per-day' | 'custom'
  startingPrice?: number
  faq: { question: string; answer: string }[]
}

const SPECIAL_SERVICES: SpecialServiceData[] = [
  {
    serviceName: 'MICE Nepal - Corporate Events',
    serviceType: 'mice',
    shortDescription: 'Professional meetings, incentives, conferences, and exhibitions in Nepal\'s unique venues.',
    description: 'Transform your corporate event with Nepal\'s extraordinary backdrop. From boardroom meetings to large conferences, team incentive trips to product launches, we handle every detail. Unique venues include mountain lodges, heritage hotels, and custom-built event spaces with Himalayan views.',
    features: ['Venue selection and setup', 'AV equipment and tech support', 'Catering and accommodation', 'Team building activities', 'Transport logistics'],
    whatWeOffer: [
      'Conferences for up to 500 participants',
      'Incentive trips with adventure activities',
      'Product launches in unique venues',
      'Corporate retreats and strategy sessions',
      'Gala dinners and networking events',
    ],
    pricingModel: 'custom',
    faq: [
      { question: 'What is the maximum conference capacity?', answer: 'We can arrange conferences for up to 500 participants in Kathmandu hotels, or smaller exclusive events in mountain venues.' },
      { question: 'Can you handle international delegates?', answer: 'Absolutely! We provide full support including visa assistance, airport transfers, and multilingual staff.' },
      { question: 'What team building activities are available?', answer: 'Options include rafting, hiking, cultural tours, cooking classes, and customized activities.' },
    ],
  },
  {
    serviceName: 'Destination Weddings in Nepal',
    serviceType: 'wedding',
    shortDescription: 'Create magical moments with a destination wedding against the Himalayas.',
    description: 'Say "I do" with the majestic Himalayas as your backdrop. Whether you dream of an intimate ceremony at a mountain lodge or a grand celebration in a heritage palace, we craft unforgettable weddings that blend Nepali hospitality with your personal style.',
    features: ['Venue selection and decoration', 'Photography and videography', 'Catering and menus', 'Guest accommodation', 'Cultural experiences for guests'],
    whatWeOffer: [
      'Mountain lodge ceremonies with Himalayan views',
      'Heritage palace receptions',
      'Multi-day celebration itineraries',
      'Pre-wedding activities for guests',
      'Legal documentation assistance',
    ],
    pricingModel: 'custom',
    startingPrice: 5000,
    faq: [
      { question: 'Is a wedding in Nepal legally recognized?', answer: 'We can facilitate legal registration for Nepali nationals. For foreign nationals, we recommend completing legal formalities in your home country.' },
      { question: 'What\'s the best season for weddings?', answer: 'October to November and March to April offer the best weather and clearest mountain views.' },
      { question: 'Can guests do activities before/after the wedding?', answer: 'Absolutely! We can arrange treks, safaris, and cultural tours for wedding guests.' },
    ],
  },
  {
    serviceName: 'Film Production Services',
    serviceType: 'filming',
    shortDescription: 'Complete production support for films, documentaries, and commercial shoots.',
    description: 'Nepal\'s dramatic landscapes have attracted filmmakers from around the world. Our production services team provides comprehensive support including location scouting, permits, equipment rental, local crew, and logistics for feature films, documentaries, commercials, and photo shoots.',
    features: ['Location scouting', 'Permit acquisition', 'Equipment rental', 'Local crew hiring', 'Logistics and transport'],
    whatWeOffer: [
      'Feature film production support',
      'Documentary filming assistance',
      'Commercial and advertising shoots',
      'Drone filming permits',
      'Mountain and wilderness filming',
    ],
    pricingModel: 'per-day',
    startingPrice: 500,
    faq: [
      { question: 'What permits are required for filming?', answer: 'Requirements vary by location and project type. We handle all permit applications with relevant government bodies.' },
      { question: 'Is drone filming allowed?', answer: 'Yes, with proper permits. We can obtain drone filming permits for most locations except restricted areas.' },
      { question: 'Can you arrange filming at altitude?', answer: 'Yes, we have experience supporting film crews at high altitude including Everest region shoots.' },
    ],
  },
  {
    serviceName: 'Yoga and Wellness Retreats',
    serviceType: 'yoga',
    shortDescription: 'Transformative yoga retreats in Nepal\'s spiritual heartland.',
    description: 'Reconnect with yourself in the birthplace of Buddha and the land of ancient wisdom. Our yoga retreats combine daily practice with meditation, Ayurvedic treatments, and mindful adventures. Retreat venues range from serene lakeside centers to mountain ashrams.',
    features: ['Daily yoga sessions', 'Meditation guidance', 'Ayurvedic treatments', 'Healthy organic meals', 'Mindful excursions'],
    whatWeOffer: [
      '7-day yoga immersion programs',
      'Meditation and mindfulness retreats',
      'Yoga teacher training support',
      'Detox and wellness programs',
      'Trekking and yoga combinations',
    ],
    pricingModel: 'per-person',
    startingPrice: 850,
    faq: [
      { question: 'What style of yoga is taught?', answer: 'Our retreats typically offer Hatha, Vinyasa, and meditation. Specialized styles can be arranged on request.' },
      { question: 'Do I need yoga experience?', answer: 'Not at all! Our retreats welcome all levels from complete beginners to advanced practitioners.' },
      { question: 'What\'s included in the retreat?', answer: 'Accommodation, all meals, daily yoga sessions, meditation, and cultural activities are typically included.' },
    ],
  },
  {
    serviceName: 'Corporate Team Building',
    serviceType: 'team-building',
    shortDescription: 'Build stronger teams through adventure and challenge in Nepal.',
    description: 'Take your team out of the conference room and into the mountains. Our corporate team building programs use adventure activities, cultural challenges, and group experiences to build communication, trust, and leadership skills in unforgettable settings.',
    features: ['Customized challenge programs', 'Professional facilitators', 'Debrief and learning sessions', 'Accommodation and meals', 'Safety equipment and support'],
    whatWeOffer: [
      'Multi-day adventure challenges',
      'One-day team activities',
      'Leadership development treks',
      'Cross-cultural team experiences',
      'CSR team volunteering',
    ],
    pricingModel: 'per-person',
    startingPrice: 150,
    faq: [
      { question: 'What activities are included?', answer: 'Options include rafting, trekking, climbing, cultural challenges, problem-solving activities, and more.' },
      { question: 'How large can groups be?', answer: 'We can handle groups from 10 to 100+ participants with appropriate staffing and logistics.' },
      { question: 'Can you customize programs for our objectives?', answer: 'Absolutely! We design programs around your specific team development goals.' },
    ],
  },
  {
    serviceName: 'Rock Climbing Adventures',
    serviceType: 'rock-climbing',
    shortDescription: 'Discover Nepal\'s incredible rock climbing from beginner to expert.',
    description: 'Nepal isn\'t just about high altitude - it offers world-class rock climbing too. From beginner-friendly crags near Kathmandu to challenging multi-pitch routes, we provide guided climbing experiences with certified instructors and quality equipment.',
    features: ['Certified climbing guides', 'All climbing equipment', 'Instruction for all levels', 'Transport to climbing sites', 'Safety equipment'],
    whatWeOffer: [
      'Beginner climbing courses',
      'Multi-pitch climbing adventures',
      'Sport climbing sessions',
      'Climbing and trekking combinations',
      'Private instruction',
    ],
    pricingModel: 'per-day',
    startingPrice: 85,
    faq: [
      { question: 'Where are the main climbing areas?', answer: 'Popular areas include Nagarjun, Hattiban, Balaju, and the cliffs around Pokhara.' },
      { question: 'Do I need experience?', answer: 'No! We offer beginner courses and can teach you the basics in a safe environment.' },
      { question: 'What equipment is provided?', answer: 'All technical equipment including harness, helmet, shoes, ropes, and protection is provided.' },
    ],
  },
  {
    serviceName: 'Authentic Homestays',
    serviceType: 'homestay',
    shortDescription: 'Experience real Nepali life with local families in villages.',
    description: 'Step away from hotels and into Nepali homes. Our homestay program connects travelers with welcoming families in villages across Nepal. Share meals, learn cooking, participate in daily activities, and gain insights into local culture that hotels can never provide.',
    features: ['Vetted host families', 'Cultural orientation', 'Home-cooked meals', 'Cultural activities', 'Village experiences'],
    whatWeOffer: [
      'Village homestay experiences',
      'Cooking lessons with families',
      'Farm and agricultural activities',
      'Festival participation',
      'Longer-term cultural immersion',
    ],
    pricingModel: 'per-day',
    startingPrice: 45,
    faq: [
      { question: 'What are the sleeping arrangements?', answer: 'Accommodations vary but typically include a private room with local-style bedding. Facilities are basic but clean.' },
      { question: 'Are meals included?', answer: 'Yes, all meals with the family are included. You\'ll experience authentic home-cooked Nepali food.' },
      { question: 'Can I choose the location?', answer: 'Yes, we have host families in various regions including Kathmandu Valley, Pokhara, and trekking areas.' },
    ],
  },
  {
    serviceName: 'Educational Tours',
    serviceType: 'educational',
    shortDescription: 'Learning journeys for students exploring Nepal\'s nature and culture.',
    description: 'Bring textbooks to life with educational tours to Nepal. We design age-appropriate programs for school and university groups covering geography, ecology, culture, history, and development studies. Hands-on learning experiences make knowledge memorable.',
    features: ['Curriculum-aligned content', 'Experienced educational guides', 'Interactive activities', 'Safe group management', 'Comprehensive logistics'],
    whatWeOffer: [
      'Geography and geology tours',
      'Cultural and history programs',
      'Ecology and conservation studies',
      'Development studies field trips',
      'Service learning projects',
    ],
    pricingModel: 'per-person',
    startingPrice: 75,
    faq: [
      { question: 'What age groups do you cater to?', answer: 'We design programs for all ages from primary school to university level.' },
      { question: 'How do you ensure student safety?', answer: 'We maintain strict safety ratios, conduct risk assessments, and have emergency protocols in place.' },
      { question: 'Can programs align with our curriculum?', answer: 'Absolutely! We work with teachers to design programs that meet specific learning objectives.' },
    ],
  },
  {
    serviceName: 'Custom Nepal Experiences',
    serviceType: 'custom',
    shortDescription: 'Bespoke travel experiences designed around your unique interests.',
    description: 'Can\'t find exactly what you\'re looking for? We specialize in creating completely custom experiences. Whether you\'re a photography enthusiast, a history buff, a foodie, or have a special interest we haven\'t covered, we\'ll design the perfect Nepal experience for you.',
    features: ['Personal consultation', 'Itinerary design', 'Expert matching', 'Flexible scheduling', 'Dedicated support'],
    whatWeOffer: [
      'Photography-focused tours',
      'Culinary explorations',
      'Historical deep-dives',
      'Spiritual journeys',
      'Any special interest travel',
    ],
    pricingModel: 'custom',
    faq: [
      { question: 'How do I start planning a custom trip?', answer: 'Contact us with your interests, dates, and budget. We\'ll schedule a consultation to understand your vision.' },
      { question: 'How far in advance should I book?', answer: 'For custom trips, we recommend at least 2-3 months notice to properly design and arrange everything.' },
      { question: 'Is there a minimum group size?', answer: 'No minimum! We design custom experiences for solo travelers, couples, families, and groups.' },
    ],
  },
  {
    serviceName: 'Luxury Nepal Collection',
    serviceType: 'custom',
    shortDescription: 'Premium travel experiences with the finest accommodation and services.',
    description: 'Experience Nepal in ultimate comfort with our luxury collection. Stay in the finest heritage hotels and boutique lodges, travel by helicopter, enjoy private guides, and access exclusive experiences not available to regular tourists. Luxury doesn\'t mean less adventure - just more comfort.',
    features: ['5-star accommodations', 'Private vehicles and helicopters', 'Personal guides', 'Exclusive access', 'VIP services'],
    whatWeOffer: [
      'Luxury lodge trekking',
      'Helicopter tours and transfers',
      'Heritage hotel stays',
      'Private cultural experiences',
      'Gourmet dining experiences',
    ],
    pricingModel: 'custom',
    startingPrice: 500,
    faq: [
      { question: 'What makes this different from regular tours?', answer: 'Luxury tours feature premium accommodations, private services, exclusive access, and enhanced comfort at every step.' },
      { question: 'Can I do adventure activities in luxury style?', answer: 'Absolutely! We offer luxury lodge treks, helicopter-supported climbing, and premium safari experiences.' },
      { question: 'What is your highest-end offering?', answer: 'Our ultimate experience combines helicopter access to remote areas, luxury lodge stays, and private expert guides.' },
    ],
  },
]

export async function seedSpecialServices(payload: Payload, mediaId: number, testimonialIds: number[]): Promise<number[]> {
  logStart('Special Services')
  const serviceIds: number[] = []

  for (const service of SPECIAL_SERVICES) {
    const specialService = await payload.create({
      collection: 'special-services',
      data: {
        serviceName: service.serviceName,
        slug: generateSlug(service.serviceName),
        serviceType: service.serviceType,
        description: createRichText(service.description),
        shortDescription: service.shortDescription,
        featuredImage: mediaId,
        features: service.features.map((feature) => ({ feature })),
        whatWeOffer: service.whatWeOffer.map((offering) => ({ offering })),
        pricing: {
          pricingModel: service.pricingModel,
          startingPrice: service.startingPrice,
          currency: 'USD',
          pricingNote: service.pricingModel === 'custom' ? 'Contact us for a detailed quote based on your requirements.' : undefined,
        },
        testimonials: testimonialIds.slice(0, 3), // Link to first 3 testimonials
        contactInfo: {
          contactPerson: 'Maya Thapa',
          email: 'specialservices@greengetaways.com',
          phone: '+977 1 4567890',
        },
        faq: service.faq.map((item) => ({
          question: item.question,
          answer: createRichText(item.answer),
        })),
        featured: serviceIds.length < 4,
        status: 'active',
        metaTitle: `${service.serviceName} | Green Getaways`,
        metaDescription: service.shortDescription,
      },
    })
    serviceIds.push(specialService.id)
  }

  logComplete('Special Services', serviceIds.length)
  return serviceIds
}
