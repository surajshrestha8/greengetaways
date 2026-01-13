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
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
