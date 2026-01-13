import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import { clearAllCollections } from './utils'
import { seedUsers } from './seeders/users'
import { seedMedia } from './seeders/media'
import { seedActivityCategories } from './seeders/activityCategories'
import { seedDestinations } from './seeders/destinations'
import { seedTours } from './seeders/tours'
import { seedTeamMembers } from './seeders/teamMembers'
import { seedTestimonials } from './seeders/testimonials'
import { seedCSRProjects } from './seeders/csrProjects'
import { seedSpecialServices } from './seeders/specialServices'
import { seedFleet } from './seeders/fleet'
import { seedBlog } from './seeders/blog'
import { seedBookings } from './seeders/bookings'

async function seed() {
  console.log('========================================')
  console.log('  Green Getaways Database Seeder')
  console.log('========================================')
  console.log('')

  try {
    // Initialize Payload
    console.log('Initializing Payload...')
    const payload = await getPayload({ config })
    console.log('Payload initialized successfully!')

    // Clear existing data
    await clearAllCollections(payload)

    // Seed data in dependency order
    console.log('\n--- Starting data seeding ---\n')

    // 1. Users (no dependencies)
    const userIds = await seedUsers(payload)
    console.log(`  -> Got ${userIds.length} user IDs: [${userIds.join(', ')}]`)

    // 2. Media placeholder (no dependencies)
    const mediaId = await seedMedia(payload)
    console.log(`  -> Got media ID: ${mediaId}`)

    // 3. Activity Categories (depends on media for icons, but we skip that)
    const categoryIds = await seedActivityCategories(payload)
    console.log(`  -> Got ${categoryIds.length} category IDs`)

    // 4. Destinations (depends on media)
    const destinationIds = await seedDestinations(payload, mediaId)
    console.log(`  -> Got ${destinationIds.length} destination IDs`)

    // 5. Tours (depends on destinations, categories, media)
    const tourIds = await seedTours(payload, mediaId, destinationIds, categoryIds)
    console.log(`  -> Got ${tourIds.length} tour IDs`)

    // 6. Team Members (depends on media)
    await seedTeamMembers(payload, mediaId)

    // 7. Testimonials (depends on tours)
    const testimonialIds = await seedTestimonials(payload, tourIds)

    // 8. CSR Projects (depends on media)
    await seedCSRProjects(payload, mediaId)

    // 9. Special Services (depends on media, testimonials)
    await seedSpecialServices(payload, mediaId, testimonialIds)

    // 10. Fleet (depends on media)
    await seedFleet(payload, mediaId)

    // 11. Blog (depends on users, media, destinations, tours)
    await seedBlog(payload, mediaId, userIds, destinationIds, tourIds)

    // 12. Bookings (depends on tours, users)
    await seedBookings(payload, tourIds, userIds)

    console.log('\n========================================')
    console.log('  Seeding completed successfully!')
    console.log('========================================')
    console.log('\nAdmin credentials:')
    console.log('  Email: admin@greengetaways.com')
    console.log('  Password: admin123')
    console.log('\nYou can now access the admin panel at:')
    console.log('  http://localhost:3000/admin')
    console.log('')

    process.exit(0)
  } catch (error) {
    console.error('\n========================================')
    console.error('  Seeding failed!')
    console.error('========================================')
    console.error(error)
    process.exit(1)
  }
}

// Run the seed function
seed()
