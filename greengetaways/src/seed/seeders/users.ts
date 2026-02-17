import type { Payload } from 'payload'
import { logComplete, logStart } from '../utils'

const USERS_TO_SEED = [
  { email: 'admin@greengetaways.com', password: 'admin123', isAdmin: true },
  { email: 'ramesh@greengetaways.com', password: 'agent123', isAdmin: false },
  { email: 'sita@greengetaways.com', password: 'agent123', isAdmin: false },
  { email: 'bikash@greengetaways.com', password: 'agent123', isAdmin: false },
  { email: 'maya@greengetaways.com', password: 'agent123', isAdmin: false },
]

export async function seedUsers(payload: Payload): Promise<number[]> {
  logStart('Users')
  const userIds: number[] = []

  for (const userData of USERS_TO_SEED) {
    // First, check if user already exists
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: userData.email } },
    })

    if (existing.docs.length > 0) {
      // User exists, use their ID
      userIds.push(existing.docs[0].id)
      console.log(`  User ${userData.email} already exists (ID: ${existing.docs[0].id})`)
    } else {
      // Create new user
      try {
        const user = await payload.create({
          collection: 'users',
          data: {
            email: userData.email,
            password: userData.password,
          },
        })
        userIds.push(user.id)
        console.log(`  Created user: ${userData.email} (ID: ${user.id})`)
      } catch (error: unknown) {
        console.error(`  Error creating user ${userData.email}:`, error instanceof Error ? error.message : error)
      }
    }
  }

  if (userIds.length === 0) {
    throw new Error('No users were created or found. Cannot proceed with seeding.')
  }

  logComplete('Users', userIds.length)
  return userIds
}
