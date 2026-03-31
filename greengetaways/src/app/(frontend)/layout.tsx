import React from 'react'
import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Header from './components/Header'
import Footer from './components/Footer'
import './styles.css'
import { SITE_URL, SITE_NAME } from '@/config'

const defaultTitle = `${SITE_NAME} - Travel for Sustainability`
const defaultDescription =
  'Discover eco-friendly tours and sustainable travel adventures with Green Getaways. Explore breathtaking destinations while preserving nature.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: '%s | Green Getaways',
  },
  description: defaultDescription,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: defaultTitle,
    description: defaultDescription,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  let tours: import('@/payload-types').Tour[] = []
  let logoUrl: string | null = null

  try {
    const payload = await getPayload({ config: configPromise })

    // Fetch active tours for the header dropdown
    const result = await payload.find({
      collection: 'tours',
      where: {
        status: { equals: 'active' },
      },
      limit: 10,
      sort: '-featured,-createdAt',
    })
    tours = result.docs

    // Fetch main logo from Media collection
    const logoResult = await payload.find({
      collection: 'media',
      where: { filename: { contains: 'main-logo' } },
      limit: 1,
    })
    const logo = logoResult.docs[0]
    if (logo?.filename && process.env.SUPABASE_PUBLIC_URL) {
      logoUrl = `${process.env.SUPABASE_PUBLIC_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET_NAME}/${logo.filename}`
    } else if (logo?.url) {
      logoUrl = logo.url
    }
  } catch (_error) {
    // Database not ready yet (first deployment) - continue with empty data
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=atyp-text@400,600&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header tours={tours} logoUrl={logoUrl} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
