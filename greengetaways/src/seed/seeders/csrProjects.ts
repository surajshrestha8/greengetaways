import type { Payload } from 'payload'
import { createRichText, generateSlug, logComplete, logStart, randomInRange } from '../utils'

interface CSRProjectData {
  projectName: string
  category: 'child-sponsorship' | 'environmental' | 'cultural' | 'community' | 'porter-guide' | 'responsible-tourism'
  shortDescription: string
  description: string
  objectives: string[]
  impact: {
    beneficiaries: number
    description: string
    statistics: { metric: string; value: string }[]
  }
  location: {
    region: string
    specificLocation: string
  }
  status: 'planning' | 'active' | 'completed' | 'on-hold'
}

const CSR_PROJECTS: CSRProjectData[] = [
  {
    projectName: 'Himalayan Children Education Fund',
    category: 'child-sponsorship',
    shortDescription: 'Supporting education for children in remote mountain villages.',
    description: 'The Himalayan Children Education Fund provides scholarships, school supplies, and educational support to children in remote mountain communities. Many families in trekking regions struggle to afford education. This program ensures children can attend school while their families continue working in tourism.',
    objectives: [
      'Provide scholarships to 50 students annually',
      'Supply books and school materials',
      'Build and maintain school infrastructure',
      'Train local teachers in modern teaching methods',
    ],
    impact: {
      beneficiaries: 250,
      description: 'Over the past 5 years, we have supported 250 students in completing their education. 30 scholarship recipients have gone on to university.',
      statistics: [
        { metric: 'Students Supported', value: '250+' },
        { metric: 'Scholarships Awarded', value: '85' },
        { metric: 'Schools Partnered', value: '12' },
      ],
    },
    location: {
      region: 'Solukhumbu District',
      specificLocation: 'Villages along the Everest Base Camp trail including Namche, Khumjung, and Phakding',
    },
    status: 'active',
  },
  {
    projectName: 'Mountain Clean-Up Initiative',
    category: 'environmental',
    shortDescription: 'Keeping Nepal\'s mountains and trails pristine for future generations.',
    description: 'Our Mountain Clean-Up Initiative organizes regular clean-up expeditions along popular trekking routes. We work with local communities, other tour operators, and volunteers to remove waste, establish proper waste management systems, and educate trekkers about Leave No Trace principles.',
    objectives: [
      'Conduct quarterly clean-up expeditions',
      'Install waste bins at key locations',
      'Train lodge owners in waste management',
      'Reduce single-use plastics on treks',
    ],
    impact: {
      beneficiaries: 5000,
      description: 'Our clean-up efforts benefit thousands of trekkers and local communities who depend on pristine mountain environments.',
      statistics: [
        { metric: 'Waste Collected', value: '15,000 kg' },
        { metric: 'Clean-up Events', value: '48' },
        { metric: 'Volunteers Engaged', value: '500+' },
      ],
    },
    location: {
      region: 'Multiple Regions',
      specificLocation: 'Everest, Annapurna, and Langtang trekking regions',
    },
    status: 'active',
  },
  {
    projectName: 'Traditional Arts Preservation',
    category: 'cultural',
    shortDescription: 'Preserving ancient Nepali crafts and artistic traditions.',
    description: 'Nepal\'s rich artistic heritage including thangka painting, wood carving, and metalwork is at risk as younger generations seek modern careers. This project supports master artisans in training apprentices, documents traditional techniques, and creates sustainable markets for authentic crafts.',
    objectives: [
      'Support 10 master artisans with workshops',
      'Train 30 young apprentices',
      'Document traditional techniques',
      'Connect artisans with fair trade markets',
    ],
    impact: {
      beneficiaries: 120,
      description: 'We have helped preserve valuable artistic traditions while creating sustainable livelihoods for artisan families.',
      statistics: [
        { metric: 'Master Artisans Supported', value: '15' },
        { metric: 'Apprentices Trained', value: '45' },
        { metric: 'Techniques Documented', value: '20+' },
      ],
    },
    location: {
      region: 'Kathmandu Valley',
      specificLocation: 'Bhaktapur, Patan, and surrounding Newari towns',
    },
    status: 'active',
  },
  {
    projectName: 'Women in Tourism Empowerment',
    category: 'community',
    shortDescription: 'Creating opportunities for women in Nepal\'s tourism industry.',
    description: 'This program trains women from rural areas to become trekking guides, hospitality staff, and tourism entrepreneurs. By providing skills training, certification support, and mentorship, we help women gain economic independence while enriching the tourism experience with diverse perspectives.',
    objectives: [
      'Train 20 female trekking guides annually',
      'Provide hospitality training to 50 women',
      'Support 10 women-led tourism businesses',
      'Establish mentorship network',
    ],
    impact: {
      beneficiaries: 180,
      description: 'Our women empowerment initiatives have created opportunities for women who previously had limited economic options.',
      statistics: [
        { metric: 'Women Trained', value: '180' },
        { metric: 'Female Guides Certified', value: '35' },
        { metric: 'Businesses Supported', value: '15' },
      ],
    },
    location: {
      region: 'Multiple Regions',
      specificLocation: 'Kathmandu, Pokhara, Chitwan, and rural trekking areas',
    },
    status: 'active',
  },
  {
    projectName: 'Porter Welfare Program',
    category: 'porter-guide',
    shortDescription: 'Ensuring fair treatment and safety for mountain porters.',
    description: 'Porters are essential to trekking in Nepal but often work in difficult conditions. Our Porter Welfare Program ensures fair wages, proper equipment, insurance coverage, and health support for all porters working with Green Getaways. We also advocate for industry-wide improvements.',
    objectives: [
      'Provide proper clothing and equipment',
      'Ensure fair wages above industry standard',
      'Offer health insurance coverage',
      'Limit load weights and ensure rest days',
    ],
    impact: {
      beneficiaries: 150,
      description: 'All porters working with us receive fair wages, proper equipment, and health coverage.',
      statistics: [
        { metric: 'Porters Covered', value: '150' },
        { metric: 'Insurance Claims Supported', value: '25' },
        { metric: 'Equipment Sets Distributed', value: '200' },
      ],
    },
    location: {
      region: 'All Trekking Regions',
      specificLocation: 'Everest, Annapurna, Langtang, and other trekking areas',
    },
    status: 'active',
  },
  {
    projectName: 'Solar Power for Lodges',
    category: 'responsible-tourism',
    shortDescription: 'Installing renewable energy in mountain teahouses.',
    description: 'Many mountain lodges rely on kerosene and wood for heating and cooking, contributing to deforestation and pollution. This project provides solar panels and energy-efficient equipment to teahouses along trekking routes, reducing environmental impact while improving comfort.',
    objectives: [
      'Install solar systems in 30 lodges',
      'Provide energy-efficient cooking stoves',
      'Train lodge owners in system maintenance',
      'Reduce firewood consumption by 50%',
    ],
    impact: {
      beneficiaries: 3000,
      description: 'Our solar installations benefit lodge owners, trekkers, and the environment through reduced emissions and deforestation.',
      statistics: [
        { metric: 'Solar Systems Installed', value: '25' },
        { metric: 'CO2 Reduction (Annual)', value: '50 tons' },
        { metric: 'Lodges Converted', value: '30' },
      ],
    },
    location: {
      region: 'Annapurna Region',
      specificLocation: 'Along the Annapurna Circuit and ABC trails',
    },
    status: 'active',
  },
  {
    projectName: 'Reforestation Nepal',
    category: 'environmental',
    shortDescription: 'Planting native trees to restore Nepal\'s forests.',
    description: 'Deforestation threatens Nepal\'s fragile mountain ecosystems. Through our reforestation program, we plant native tree species, establish community-managed nurseries, and educate local communities about forest conservation. Every trek contributes to this initiative.',
    objectives: [
      'Plant 10,000 native trees annually',
      'Establish 5 community nurseries',
      'Engage 100 community members',
      'Protect existing forest areas',
    ],
    impact: {
      beneficiaries: 500,
      description: 'Our reforestation efforts help restore ecosystems and provide long-term benefits to local communities.',
      statistics: [
        { metric: 'Trees Planted', value: '35,000' },
        { metric: 'Community Nurseries', value: '8' },
        { metric: 'Hectares Restored', value: '50' },
      ],
    },
    location: {
      region: 'Langtang Region',
      specificLocation: 'Buffer zones of Langtang National Park',
    },
    status: 'active',
  },
  {
    projectName: 'Earthquake Reconstruction Support',
    category: 'community',
    shortDescription: 'Helping communities rebuild after the 2015 earthquake.',
    description: 'The 2015 earthquake devastated many mountain communities. We continue to support reconstruction efforts by funding home repairs, school rebuilding, and trail restoration. This long-term commitment ensures affected communities can fully recover.',
    objectives: [
      'Support 20 families with home repairs',
      'Rebuild community facilities',
      'Restore damaged trails',
      'Provide economic recovery support',
    ],
    impact: {
      beneficiaries: 300,
      description: 'Our ongoing support has helped hundreds of families and several communities recover from the earthquake.',
      statistics: [
        { metric: 'Homes Repaired', value: '45' },
        { metric: 'Schools Rebuilt', value: '3' },
        { metric: 'Trail Sections Restored', value: '15 km' },
      ],
    },
    location: {
      region: 'Langtang Valley',
      specificLocation: 'Langtang village and surrounding areas',
    },
    status: 'active',
  },
  {
    projectName: 'Tharu Community Tourism',
    category: 'cultural',
    shortDescription: 'Supporting indigenous Tharu cultural preservation.',
    description: 'The Tharu people of the Terai have a unique culture that visitors to Chitwan can experience. This project ensures Tharu communities benefit directly from tourism while preserving their traditions, arts, and way of life.',
    objectives: [
      'Train Tharu guides and cultural performers',
      'Support Tharu homestays',
      'Document and preserve cultural practices',
      'Ensure fair revenue distribution',
    ],
    impact: {
      beneficiaries: 200,
      description: 'Tharu families earn direct income from cultural tourism while maintaining their traditions.',
      statistics: [
        { metric: 'Families Benefiting', value: '80' },
        { metric: 'Cultural Programs', value: '500+' },
        { metric: 'Homestays Supported', value: '15' },
      ],
    },
    location: {
      region: 'Chitwan',
      specificLocation: 'Tharu villages near Chitwan National Park',
    },
    status: 'active',
  },
  {
    projectName: 'Guide Training Academy',
    category: 'porter-guide',
    shortDescription: 'Professional development for trekking and tour guides.',
    description: 'Quality guides make the difference between a good trip and an unforgettable experience. Our Guide Training Academy provides comprehensive training in mountaineering skills, first aid, customer service, and cultural interpretation, raising industry standards while creating career opportunities.',
    objectives: [
      'Train 30 new guides annually',
      'Provide advanced training for experienced guides',
      'Certify guides in first aid and rescue',
      'Improve English language skills',
    ],
    impact: {
      beneficiaries: 120,
      description: 'Our trained guides provide better experiences for travelers while earning higher wages.',
      statistics: [
        { metric: 'Guides Trained', value: '120' },
        { metric: 'First Aid Certifications', value: '85' },
        { metric: 'Advanced Courses', value: '25' },
      ],
    },
    location: {
      region: 'Kathmandu',
      specificLocation: 'Green Getaways Training Center, Thamel',
    },
    status: 'active',
  },
]

export async function seedCSRProjects(payload: Payload, mediaId: number): Promise<number[]> {
  logStart('CSR Projects')
  const projectIds: number[] = []

  for (const project of CSR_PROJECTS) {
    const startYear = randomInRange(2018, 2023)
    const milestones = [
      { milestone: 'Project Planning Complete', date: `${startYear}-03-01`, completed: true },
      { milestone: 'First Phase Launch', date: `${startYear}-06-01`, completed: true },
      { milestone: 'Mid-term Review', date: `${startYear + 1}-01-01`, completed: true },
      { milestone: 'Community Feedback Session', date: `${startYear + 1}-06-01`, completed: project.status !== 'planning' },
      { milestone: 'Annual Impact Assessment', date: `${startYear + 2}-01-01`, completed: project.status === 'completed' },
    ]

    const csrProject = await payload.create({
      collection: 'csr-projects',
      data: {
        projectName: project.projectName,
        slug: generateSlug(project.projectName),
        category: project.category,
        description: createRichText(project.description),
        shortDescription: project.shortDescription,
        featuredImage: mediaId,
        objectives: project.objectives.map((objective) => ({ objective })),
        impact: {
          beneficiaries: project.impact.beneficiaries,
          description: createRichText(project.impact.description),
          statistics: project.impact.statistics,
        },
        timeline: {
          startDate: `${startYear}-01-01T00:00:00.000Z`,
          endDate: project.status === 'completed' ? `${startYear + 2}-12-31T00:00:00.000Z` : undefined,
          milestones,
        },
        location: project.location,
        partners: [
          { partnerName: 'Nepal Tourism Board' },
          { partnerName: 'Local Community Groups' },
        ],
        howToContribute: createRichText('You can support this initiative by booking a tour with Green Getaways. A portion of every booking goes toward our CSR programs. You can also make direct donations or volunteer your time and skills.'),
        status: project.status,
        featured: projectIds.length < 4,
      },
    })
    projectIds.push(csrProject.id)
  }

  logComplete('CSR Projects', projectIds.length)
  return projectIds
}
