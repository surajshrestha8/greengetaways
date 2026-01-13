import { faker } from '@faker-js/faker'
import type { Payload } from 'payload'
import { createRichText, logComplete, logStart, randomInRange, randomItem } from '../utils'

interface TeamMemberData {
  fullName: string
  position: string
  department: 'management' | 'operations' | 'sales-marketing' | 'guides' | 'support' | 'csr'
  bio: string
  expertise: string[]
  yearsExperience: number
  certifications: { certification: string; year: number }[]
  languages: string[]
}

const TEAM_MEMBERS: TeamMemberData[] = [
  {
    fullName: 'Prakash Shrestha',
    position: 'Managing Director',
    department: 'management',
    bio: 'With over 25 years in the tourism industry, Prakash founded Green Getaways with a vision to showcase Nepal\'s beauty while promoting sustainable tourism. His passion for the mountains and commitment to community development drives the company\'s mission.',
    expertise: ['Strategic Planning', 'Tourism Development', 'Sustainable Travel'],
    yearsExperience: 25,
    certifications: [{ certification: 'MBA in Tourism Management', year: 2005 }],
    languages: ['Nepali', 'English', 'Hindi', 'Japanese'],
  },
  {
    fullName: 'Sunita Gurung',
    position: 'Operations Manager',
    department: 'operations',
    bio: 'Sunita ensures every trip runs smoothly from start to finish. Her attention to detail and problem-solving skills have made her invaluable to the team. She personally vets all accommodations and routes.',
    expertise: ['Logistics Management', 'Quality Assurance', 'Vendor Relations'],
    yearsExperience: 12,
    certifications: [{ certification: 'Project Management Professional', year: 2018 }],
    languages: ['Nepali', 'English', 'Gurung'],
  },
  {
    fullName: 'Rajesh Tamang',
    position: 'Head Guide',
    department: 'guides',
    bio: 'Rajesh has summited Everest twice and led over 200 treks throughout Nepal. His deep knowledge of mountain safety and Sherpa culture makes him one of the most respected guides in the industry.',
    expertise: ['High Altitude Trekking', 'Mountain Safety', 'Sherpa Culture'],
    yearsExperience: 18,
    certifications: [
      { certification: 'UIAGM Mountain Guide', year: 2010 },
      { certification: 'Wilderness First Responder', year: 2015 },
    ],
    languages: ['Nepali', 'English', 'Tamang', 'Sherpa'],
  },
  {
    fullName: 'Maya Thapa',
    position: 'Sales & Marketing Director',
    department: 'sales-marketing',
    bio: 'Maya brings a fresh perspective to travel marketing with her digital-first approach. She has grown our online presence significantly and built strong partnerships with travel agencies worldwide.',
    expertise: ['Digital Marketing', 'Brand Strategy', 'Partnership Development'],
    yearsExperience: 8,
    certifications: [{ certification: 'Digital Marketing Certification - Google', year: 2020 }],
    languages: ['Nepali', 'English', 'German'],
  },
  {
    fullName: 'Tenzing Sherpa',
    position: 'Senior Trekking Guide',
    department: 'guides',
    bio: 'Born and raised in the Everest region, Tenzing knows the Khumbu trails like the back of his hand. His warm personality and extensive knowledge make every trek memorable.',
    expertise: ['Everest Region Expert', 'Altitude Sickness Prevention', 'Photography Spots'],
    yearsExperience: 15,
    certifications: [
      { certification: 'Nepal Mountain Guide License', year: 2009 },
      { certification: 'First Aid Certified', year: 2021 },
    ],
    languages: ['Nepali', 'English', 'Sherpa', 'Tibetan'],
  },
  {
    fullName: 'Dawa Lama',
    position: 'Mountaineering Guide',
    department: 'guides',
    bio: 'Dawa specializes in peak climbing expeditions and has guided clients on numerous trekking peaks including Island Peak, Mera Peak, and Lobuche East. His technical skills and calm demeanor inspire confidence.',
    expertise: ['Peak Climbing', 'Technical Mountaineering', 'Rescue Operations'],
    yearsExperience: 14,
    certifications: [
      { certification: 'UIAA Climbing Instructor', year: 2012 },
      { certification: 'High Altitude Rescue Training', year: 2019 },
    ],
    languages: ['Nepali', 'English', 'Tibetan'],
  },
  {
    fullName: 'Anita Rai',
    position: 'Customer Relations Manager',
    department: 'support',
    bio: 'Anita is the friendly voice behind Green Getaways. She handles all customer inquiries with patience and ensures every traveler feels supported before, during, and after their trip.',
    expertise: ['Customer Service', 'Travel Planning', 'Problem Resolution'],
    yearsExperience: 6,
    certifications: [{ certification: 'Customer Service Excellence', year: 2022 }],
    languages: ['Nepali', 'English', 'Hindi'],
  },
  {
    fullName: 'Bikram Magar',
    position: 'Wildlife Safari Expert',
    department: 'guides',
    bio: 'Bikram grew up near Chitwan National Park and has been tracking wildlife since childhood. His ability to spot rhinos and tigers is legendary among safari guests.',
    expertise: ['Wildlife Tracking', 'Bird Identification', 'Jungle Survival'],
    yearsExperience: 16,
    certifications: [
      { certification: 'Naturalist Certification', year: 2008 },
      { certification: 'Wildlife Photography Guide', year: 2017 },
    ],
    languages: ['Nepali', 'English', 'Tharu'],
  },
  {
    fullName: 'Pemba Dolma Sherpa',
    position: 'Female Trekking Guide',
    department: 'guides',
    bio: 'Pemba Dolma is one of Nepal\'s pioneering female mountain guides. She is passionate about empowering women in tourism and leads women-only trekking groups.',
    expertise: ['Women\'s Trekking', 'Annapurna Region', 'Cultural Interpretation'],
    yearsExperience: 10,
    certifications: [
      { certification: 'Nepal Trekking Guide License', year: 2014 },
      { certification: 'Women\'s Empowerment Training', year: 2020 },
    ],
    languages: ['Nepali', 'English', 'Sherpa', 'French'],
  },
  {
    fullName: 'Ramesh Basnet',
    position: 'CSR Coordinator',
    department: 'csr',
    bio: 'Ramesh manages our community development and environmental initiatives. His background in social work drives meaningful impact in the communities we visit.',
    expertise: ['Community Development', 'Environmental Conservation', 'Project Management'],
    yearsExperience: 9,
    certifications: [{ certification: 'Social Work Degree', year: 2015 }],
    languages: ['Nepali', 'English'],
  },
  {
    fullName: 'Karma Gyaltsen',
    position: 'Cultural Tour Specialist',
    department: 'guides',
    bio: 'Karma is an expert in Buddhist heritage and Tibetan culture. His tours of monasteries and sacred sites provide deep spiritual insights.',
    expertise: ['Buddhist Heritage', 'Tibetan Culture', 'Meditation Guidance'],
    yearsExperience: 12,
    certifications: [{ certification: 'Buddhist Studies Certificate', year: 2012 }],
    languages: ['Nepali', 'English', 'Tibetan', 'Mandarin'],
  },
  {
    fullName: 'Suman Adhikari',
    position: 'Finance Manager',
    department: 'management',
    bio: 'Suman keeps our finances in order and ensures transparent pricing for all our tours. His ethical approach to business aligns perfectly with our values.',
    expertise: ['Financial Management', 'Budgeting', 'Compliance'],
    yearsExperience: 11,
    certifications: [{ certification: 'Chartered Accountant', year: 2013 }],
    languages: ['Nepali', 'English'],
  },
  {
    fullName: 'Nirmala KC',
    position: 'Travel Consultant',
    department: 'sales-marketing',
    bio: 'Nirmala helps travelers design their perfect Nepal adventure. Her extensive travel experience and local knowledge ensure personalized recommendations.',
    expertise: ['Trip Planning', 'Custom Itineraries', 'Budget Optimization'],
    yearsExperience: 5,
    certifications: [{ certification: 'Travel & Tourism Diploma', year: 2019 }],
    languages: ['Nepali', 'English', 'Spanish'],
  },
  {
    fullName: 'Mingmar Sherpa',
    position: 'Expedition Leader',
    department: 'guides',
    bio: 'Mingmar has led expeditions to all 14 eight-thousanders including multiple Everest summits. He now mentors younger guides and leads our most challenging expeditions.',
    expertise: ['8000m Expeditions', 'Leadership', 'High Altitude Medicine'],
    yearsExperience: 22,
    certifications: [
      { certification: 'IFMGA Mountain Guide', year: 2006 },
      { certification: 'Expedition Medicine Course', year: 2018 },
    ],
    languages: ['Nepali', 'English', 'Sherpa', 'Korean'],
  },
  {
    fullName: 'Sarita Poudel',
    position: 'Digital Content Creator',
    department: 'sales-marketing',
    bio: 'Sarita captures the essence of Nepal through stunning photography and engaging content. Her work inspires travelers from around the world to explore Nepal.',
    expertise: ['Photography', 'Videography', 'Social Media Marketing'],
    yearsExperience: 4,
    certifications: [{ certification: 'Professional Photography Certificate', year: 2021 }],
    languages: ['Nepali', 'English'],
  },
  {
    fullName: 'Bir Bahadur Gurung',
    position: 'Helicopter Operations Coordinator',
    department: 'operations',
    bio: 'Bir Bahadur coordinates all our helicopter tours and emergency evacuations. His military background ensures the highest safety standards.',
    expertise: ['Aviation Coordination', 'Emergency Response', 'Safety Protocols'],
    yearsExperience: 15,
    certifications: [{ certification: 'Aviation Safety Management', year: 2017 }],
    languages: ['Nepali', 'English', 'Gurung'],
  },
  {
    fullName: 'Pema Wangdi',
    position: 'Bhutan Specialist',
    department: 'guides',
    bio: 'Pema is from Bhutan and brings authentic insights into the kingdom\'s unique culture. He ensures our Bhutan tours are culturally immersive and meaningful.',
    expertise: ['Bhutanese Culture', 'Buddhist Philosophy', 'Festival Tours'],
    yearsExperience: 8,
    certifications: [{ certification: 'Licensed Bhutan Tour Guide', year: 2016 }],
    languages: ['Dzongkha', 'English', 'Nepali', 'Hindi'],
  },
  {
    fullName: 'Ganga Devi Tharu',
    position: 'Cultural Program Coordinator',
    department: 'csr',
    bio: 'Ganga coordinates cultural experiences in Chitwan, ensuring authentic interactions with Tharu communities while supporting local livelihoods.',
    expertise: ['Tharu Culture', 'Community Tourism', 'Traditional Arts'],
    yearsExperience: 7,
    certifications: [{ certification: 'Community Tourism Certificate', year: 2018 }],
    languages: ['Nepali', 'Tharu', 'English'],
  },
]

export async function seedTeamMembers(payload: Payload, mediaId: number): Promise<number[]> {
  logStart('Team Members')
  const teamMemberIds: number[] = []
  let order = 1

  for (const member of TEAM_MEMBERS) {
    const teamMember = await payload.create({
      collection: 'team-members',
      data: {
        fullName: member.fullName,
        position: member.position,
        department: member.department,
        photo: mediaId,
        bio: createRichText(member.bio),
        expertise: member.expertise.map((skill) => ({ skill })),
        experience: {
          years: member.yearsExperience,
          description: `${member.yearsExperience} years of experience in ${member.expertise[0].toLowerCase()}`,
        },
        certifications: member.certifications.map((c) => ({
          certification: c.certification,
          year: c.year,
        })),
        languages: member.languages.map((language) => ({ language })),
        contact: {
          email: `${member.fullName.split(' ')[0].toLowerCase()}@greengetaways.com`,
          phone: `+977 ${randomInRange(980, 989)}${randomInRange(1000000, 9999999)}`,
        },
        socialMedia: {
          linkedin: `https://linkedin.com/in/${member.fullName.toLowerCase().replace(' ', '-')}`,
        },
        featured: order <= 6,
        order: order++,
      },
    })
    teamMemberIds.push(teamMember.id)
  }

  logComplete('Team Members', teamMemberIds.length)
  return teamMemberIds
}
