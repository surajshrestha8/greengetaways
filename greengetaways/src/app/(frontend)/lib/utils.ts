import type { Media } from '@/payload-types'

/**
 * Resolves a Payload media object to a public URL.
 * Prefers the Supabase storage URL when env vars are available,
 * falls back to the stored `url` field, then to a provided fallback string.
 */
export function getImageUrl(media: Media | number | null | undefined, fallback = ''): string {
  if (!media || typeof media === 'number') return fallback
  if (media.filename && process.env.SUPABASE_PUBLIC_URL && process.env.SUPABASE_BUCKET_NAME) {
    return `${process.env.SUPABASE_PUBLIC_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET_NAME}/${media.filename}`
  }
  return media.url || fallback
}

/**
 * Formats a numeric price with currency symbol.
 * e.g. formatPrice(3500, 'USD') → '$3,500'
 */
export function formatPrice(amount: number, currency = 'USD'): string {
  const symbol = currency === 'USD' ? '$' : currency
  return `${symbol}${amount.toLocaleString()}`
}

/**
 * Capitalizes the first letter of a string.
 * e.g. capitalize('adventure') → 'Adventure'
 */
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Formats an ISO date string into a human-readable date.
 * e.g. formatDate('2025-10-01T00:00:00.000Z') → 'October 1, 2025'
 */
export function formatDate(isoString: string | null | undefined): string | null {
  if (!isoString) return null
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
