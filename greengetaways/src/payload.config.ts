import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Destinations } from './collections/Destinations'
import { Tours } from './collections/Tours'
import { ActivityCategories } from './collections/ActivityCategories'
import { Testimonials } from './collections/Testimonials'
import { Bookings } from './collections/Bookings'
import { Blog } from './collections/Blog'
import { TeamMembers } from './collections/TeamMembers'
import { CSRProjects } from './collections/CsrProjects'
import { SpecialServices } from './collections/SpecialServices'
import { Fleet } from './collections/Fleet'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers'
import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [
    Users,
    Media,
    Destinations,
    Tours,
    ActivityCategories,
    Testimonials,
    Bookings,
    Blog,
    TeamMembers,
    CSRProjects,
    SpecialServices,
    Fleet,
    NewsletterSubscribers,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL || '',
      // Enable SSL for Supabase connections (connection string contains 'supabase.com')
      ssl: (process.env.DATABASE_URI || process.env.DATABASE_URL || '').includes('supabase.com')
        ? { rejectUnauthorized: false }
        : false,
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.SUPABASE_BUCKET_NAME || '',
      config: {
        credentials: {
          accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY || '',
          secretAccessKey: process.env.SUPABASE_S3_SECRET_KEY || '',
        },
        region: process.env.SUPABASE_REGION || 'ap-northeast-2',
        endpoint: process.env.SUPABASE_S3_ENDPOINT,
        forcePathStyle: true, // required for Supabase
      },
    }),
  ],
})
