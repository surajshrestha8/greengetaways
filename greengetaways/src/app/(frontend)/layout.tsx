import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import './styles.css'

export const metadata = {
  description: 'Green Getaways - Travel for Sustainability. Discover eco-friendly tours and adventures.',
  title: 'Green Getaways - Travel for Sustainability',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
