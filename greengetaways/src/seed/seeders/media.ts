import type { Payload } from 'payload'
import { logComplete, logStart } from '../utils'
import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'

// Download a file from URL
function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location
        if (redirectUrl) {
          file.close()
          fs.unlinkSync(dest)
          downloadFile(redirectUrl, dest).then(resolve).catch(reject)
          return
        }
      }
      response.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve()
      })
    }).on('error', (err) => {
      fs.unlink(dest, () => {}) // Delete partial file
      reject(err)
    })
  })
}

export async function seedMedia(payload: Payload): Promise<number> {
  logStart('Media (placeholder)')

  // Check if placeholder already exists
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: 'Placeholder Image' } },
  })

  if (existing.docs.length > 0) {
    console.log('  Placeholder media already exists')
    return existing.docs[0].id
  }

  // Create temp directory if it doesn't exist
  const tempDir = path.join(process.cwd(), 'temp')
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }

  const tempFilePath = path.join(tempDir, 'placeholder.jpg')

  try {
    // Download a placeholder image from picsum
    console.log('  Downloading placeholder image...')
    await downloadFile('https://picsum.photos/1200/800', tempFilePath)

    // Upload to Payload
    const placeholder = await payload.create({
      collection: 'media',
      data: {
        alt: 'Placeholder Image',
      },
      filePath: tempFilePath,
    })

    // Clean up temp file
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath)
    }

    logComplete('Media', 1)
    return placeholder.id
  } catch (error) {
    console.error('  Error creating placeholder media:', error)

    // Clean up temp file on error
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath)
    }

    throw error
  }
}
