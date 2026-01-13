import type { Payload } from 'payload'

// Collection slugs in order they should be cleared (reverse of seeding order)
export const COLLECTION_SLUGS = [
  'bookings',
  'blog',
  'testimonials',
  'fleet',
  'special-services',
  'csr-projects',
  'team-members',
  'tours',
  'destinations',
  'activity-categories',
  'media',
  // Don't clear users to preserve admin account
] as const

export async function clearCollection(payload: Payload, collectionSlug: string): Promise<void> {
  try {
    const result = await payload.delete({
      collection: collectionSlug as any,
      where: {
        id: { exists: true },
      },
    })
    console.log(`  Cleared ${collectionSlug}: ${result.docs?.length || 0} documents deleted`)
  } catch (error) {
    console.error(`  Error clearing ${collectionSlug}:`, error)
  }
}

export async function clearAllCollections(payload: Payload): Promise<void> {
  console.log('\n--- Clearing existing data ---')
  for (const slug of COLLECTION_SLUGS) {
    await clearCollection(payload, slug)
  }
  console.log('--- Clearing complete ---\n')
}

// Helper to create Lexical rich text format
export function createRichText(text: string): {
  root: {
    type: string
    children: {
      type: string
      version: number
      children: { type: string; text: string; version: number }[]
      direction: 'ltr'
      format: ''
      indent: number
    }[]
    direction: 'ltr'
    format: ''
    indent: number
    version: number
  }
} {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          version: 1,
          children: [
            {
              type: 'text',
              text: text,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

// Helper to create multi-paragraph rich text
export function createMultiParagraphRichText(paragraphs: string[]): ReturnType<typeof createRichText> {
  return {
    root: {
      type: 'root',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        version: 1,
        children: [
          {
            type: 'text',
            text: text,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

// Helper to generate a URL-friendly slug
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Helper to get a random item from an array
export function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

// Helper to get random items from an array
export function randomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(count, array.length))
}

// Helper to generate a random number in range
export function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Helper to generate future dates
export function getFutureDate(daysFromNow: number): string {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date.toISOString()
}

// Helper to generate past dates
export function getPastDate(daysAgo: number): string {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString()
}

// Logging helpers
export function logProgress(collection: string, current: number, total: number): void {
  process.stdout.write(`\r  Seeding ${collection}... ${current}/${total}`)
  if (current === total) {
    console.log(' - Done!')
  }
}

export function logStart(collection: string): void {
  console.log(`\nSeeding ${collection}...`)
}

export function logComplete(collection: string, count: number): void {
  console.log(`  ${collection}: ${count} documents created`)
}
