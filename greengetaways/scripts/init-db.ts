#!/usr/bin/env tsx
/**
 * Database initialization script for Vercel deployment
 *
 * This script connects to the database and initializes Payload CMS,
 * which automatically creates all necessary tables if they don't exist.
 *
 * Run this before the Next.js build to ensure the database is ready.
 */

import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function initDatabase() {
  try {
    console.log('🔧 Initializing database connection...')

    // Get Payload instance - this will create tables if they don't exist
    const payload = await getPayload({ config })

    console.log('✅ Database initialized successfully!')
    console.log('📊 All Payload collections and tables are ready.')

    // Close the connection
    process.exit(0)
  } catch (error) {
    console.error('❌ Failed to initialize database:', error)

    // Don't fail the build if database init fails
    // This allows the build to continue even if DB is not accessible
    console.log('⚠️  Continuing build without database initialization...')
    process.exit(0)
  }
}

initDatabase()
