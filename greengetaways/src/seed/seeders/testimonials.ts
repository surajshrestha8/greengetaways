import { faker } from '@faker-js/faker'
import type { Payload } from 'payload'
import { getPastDate, logComplete, logStart, randomInRange, randomItem } from '../utils'

const TESTIMONIAL_TEMPLATES = [
  {
    title: 'A life-changing experience!',
    review: 'The Everest Base Camp trek was absolutely incredible. Our guide Tenzing was knowledgeable, patient, and made sure everyone in our group was comfortable. The views were breathtaking and the teahouses were better than expected. Green Getaways handled everything perfectly from start to finish.',
  },
  {
    title: 'Best safari experience ever',
    review: 'Our family spent 3 amazing days in Chitwan National Park. We saw rhinos, deer, and so many birds! The jungle lodge was comfortable and the staff was incredibly friendly. The Tharu cultural show was a highlight. Highly recommend for families!',
  },
  {
    title: 'Professional and caring team',
    review: 'From the moment we landed in Kathmandu, we felt taken care of. The cultural tours were insightful, our guide was passionate about Nepali history, and the hotels were excellent. This trip exceeded all our expectations.',
  },
  {
    title: 'Annapurna Circuit was a dream',
    review: 'I\'ve been dreaming of the Annapurna Circuit for years and Green Getaways made it happen flawlessly. The porters were hardworking and cheerful, the food was surprisingly good, and crossing Thorong La was an achievement I\'ll never forget.',
  },
  {
    title: 'Perfect honeymoon in Nepal',
    review: 'We chose Nepal for our honeymoon and it was the best decision ever. Pokhara was romantic, the mountain views were stunning, and the team arranged special touches that made our trip unforgettable. Thank you Green Getaways!',
  },
  {
    title: 'Summit success on Mera Peak!',
    review: 'I successfully summited Mera Peak thanks to the excellent support from the Green Getaways team. The guides were experienced, the equipment was good quality, and the acclimatization schedule was well-planned. Can\'t wait for my next climbing adventure!',
  },
  {
    title: 'Bhutan exceeded expectations',
    review: 'Bhutan was even more magical than I imagined. Tiger\'s Nest was awe-inspiring, the dzongs were beautiful, and experiencing Bhutanese culture was a privilege. Our guide Pema was wonderful and the included meals were delicious.',
  },
  {
    title: 'Great value for money',
    review: 'I was worried about booking a tour online, but Green Getaways proved to be legitimate and professional. The price included everything as promised, there were no hidden costs, and the quality was excellent. Will definitely book again.',
  },
  {
    title: 'Wildlife photography paradise',
    review: 'As a wildlife photographer, Chitwan was a dream come true. Our naturalist guide knew exactly where to find animals and was patient while I got my shots. The sunrise canoe ride was magical. Got amazing photos of rhinos and crocodiles!',
  },
  {
    title: 'Langtang touched my heart',
    review: 'The Langtang Valley trek was beautiful and meaningful. Seeing how the community has rebuilt after the earthquake was inspiring. The views of Langtang Lirung were spectacular and the Tamang hospitality was heartwarming.',
  },
  {
    title: 'Adventure of a lifetime',
    review: 'Paragliding over Pokhara, bungee jumping at The Last Resort, and rafting on the Trisuli - Green Getaways organized an action-packed adventure trip for our group. Everything was safe, well-organized, and incredibly fun!',
  },
  {
    title: 'Cultural immersion at its best',
    review: 'The heritage tour of Kathmandu Valley was fascinating. Our guide brought the history alive and took us to hidden gems away from the crowds. The sunrise at Nagarkot with Himalayan views was the perfect ending.',
  },
  {
    title: 'Solo female traveler - highly recommend!',
    review: 'As a solo female traveler, I felt completely safe throughout my trip. My guide Pemba Dolma was inspirational and the all-women trek group became like family. Green Getaways truly cares about women\'s travel.',
  },
  {
    title: 'Upper Mustang was like another world',
    review: 'The ancient kingdom of Lo is truly unique. The desert landscape, the cave dwellings, the Tibetan culture - it felt like stepping back in time. A challenging but incredibly rewarding trek.',
  },
  {
    title: 'Excellent communication throughout',
    review: 'From initial inquiry to trip completion, the communication was excellent. Quick email responses, clear information, and updates throughout the trek. It\'s clear they really care about their customers.',
  },
  {
    title: 'Perfect family holiday',
    review: 'We traveled with our two teenage kids and they loved every minute. The itinerary had a good mix of culture, nature, and adventure. The guides were patient with the kids and made everything fun and educational.',
  },
  {
    title: 'Responsible tourism done right',
    review: 'I chose Green Getaways because of their commitment to responsible tourism. They support local communities, minimize plastic use, and employ local guides. It\'s good to know my money is making a positive impact.',
  },
  {
    title: 'The helicopter tour was unforgettable',
    review: 'Flying past Everest by helicopter was a once-in-a-lifetime experience. The views were absolutely incredible, breakfast at Everest View Hotel was surreal, and it was perfect for travelers with limited time.',
  },
  {
    title: 'Yoga retreat was transformative',
    review: 'The yoga retreat in Pokhara was exactly what I needed. The setting was peaceful, the instructors were skilled, and the combination of yoga with Himalayan views was magical. Left feeling renewed and inspired.',
  },
  {
    title: 'Bird watching paradise',
    review: 'Nepal has incredible bird diversity and our expert guide helped us spot over 150 species! From the jungles of Chitwan to the mountains, every day brought new exciting sightings. A must for birders!',
  },
  {
    title: 'First trek - perfect experience',
    review: 'This was my first ever trek and Green Getaways made it perfect. They recommended the right difficulty level, the guide pace was comfortable, and I gained confidence every day. Now I\'m hooked on trekking!',
  },
  {
    title: 'Celebrating 50 in Nepal',
    review: 'I celebrated my 50th birthday at Everest Base Camp and it was the best gift I ever gave myself. The team made it special with a cake at base camp! Age is just a number when you have the right support.',
  },
  {
    title: 'Smooth booking process',
    review: 'The online booking was easy, the deposit system was secure, and the detailed trip information helped us prepare well. Everything was as described on the website. Trustworthy company!',
  },
  {
    title: 'Mountain biking adventure',
    review: 'The mountain biking tour through the Kathmandu Valley was thrilling! Great trails, good quality bikes, and our guide knew all the best routes. Saw parts of Nepal most tourists never see.',
  },
  {
    title: 'Three Passes trek - challenging but worth it',
    review: 'The Three Passes trek was tough but our guide kept us motivated. Crossing three 5,400m passes with views of Everest, Lhotse, and Makalu was absolutely worth the effort. For experienced trekkers only!',
  },
]

const LOCATIONS = [
  'London, UK',
  'New York, USA',
  'Sydney, Australia',
  'Toronto, Canada',
  'Berlin, Germany',
  'Tokyo, Japan',
  'Paris, France',
  'Amsterdam, Netherlands',
  'Singapore',
  'Melbourne, Australia',
  'San Francisco, USA',
  'Munich, Germany',
  'Barcelona, Spain',
  'Seoul, South Korea',
  'Dubai, UAE',
  'Los Angeles, USA',
  'Auckland, New Zealand',
  'Hong Kong',
  'Chicago, USA',
  'Milan, Italy',
]

export async function seedTestimonials(payload: Payload, tourIds: number[]): Promise<number[]> {
  logStart('Testimonials')
  const testimonialIds: number[] = []

  for (const template of TESTIMONIAL_TEMPLATES) {
    const rating = Math.random() > 0.3 ? 5 : Math.random() > 0.5 ? 4 : 3 // Weighted toward positive
    const status = Math.random() > 0.15 ? 'approved' : Math.random() > 0.5 ? 'pending' : 'rejected'

    const testimonial = await payload.create({
      collection: 'testimonials',
      data: {
        customerName: faker.person.fullName(),
        customerLocation: randomItem(LOCATIONS),
        tour: randomItem(tourIds),
        rating,
        title: template.title,
        review: template.review,
        travelDate: getPastDate(randomInRange(30, 365)),
        featured: testimonialIds.length < 8 && status === 'approved',
        status,
        verifiedBooking: Math.random() > 0.2,
      },
    })
    testimonialIds.push(testimonial.id)
  }

  logComplete('Testimonials', testimonialIds.length)
  return testimonialIds
}
