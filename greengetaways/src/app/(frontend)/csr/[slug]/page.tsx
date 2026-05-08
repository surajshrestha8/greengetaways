import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import configPromise from '@payload-config'
import type { CsrProject, Media } from '@/payload-types'
import { formatDate, getImageUrl } from '../../lib/utils'
import '../csr.css'
import './csr-detail.css'

interface CSRDetailPageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

const categoryLabels: Record<CsrProject['category'], string> = {
  'child-sponsorship': 'Child Sponsorship',
  environmental: 'Environmental Conservation',
  cultural: 'Cultural Preservation',
  community: 'Community Development',
  'porter-guide': 'Porter & Guide Welfare',
  'responsible-tourism': 'Responsible Tourism',
}

const statusLabels: Record<CsrProject['status'], string> = {
  planning: 'Planning',
  active: 'Active',
  completed: 'Completed',
  'on-hold': 'On Hold',
}

async function fetchCSRProject(slug: string): Promise<CsrProject | null> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'csr-projects',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })

  return (docs[0] as CsrProject | undefined) ?? null
}

export async function generateMetadata({ params }: CSRDetailPageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const project = await fetchCSRProject(slug)

    if (!project) {
      return { title: 'CSR Project Not Found' }
    }

    const imageUrl = getImageUrl(project.featuredImage as Media | null)
    const description =
      project.shortDescription ||
      `Learn more about ${project.projectName}, a Green Getaways CSR initiative.`

    return {
      title: `${project.projectName} | CSR`,
      description,
      openGraph: {
        title: `${project.projectName} | Green Getaways CSR`,
        description,
        images: imageUrl
          ? [{ url: imageUrl, width: 1200, height: 630, alt: project.projectName }]
          : [],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${project.projectName} | CSR`,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
    }
  } catch {
    return { title: 'CSR Project' }
  }
}

export default async function CSRDetailPage({ params }: CSRDetailPageProps) {
  const { slug } = await params

  let project: CsrProject | null = null

  try {
    project = await fetchCSRProject(slug)
  } catch {
    // Database may be unavailable during first deployment.
  }

  if (!project) {
    notFound()
  }

  const featuredImage = project.featuredImage as Media
  const featuredImageUrl = getImageUrl(featuredImage)
  const startDate = formatDate(project.timeline.startDate)
  const endDate = formatDate(project.timeline.endDate)
  const beneficiaries = project.impact?.beneficiaries
  const stats = project.impact?.statistics?.filter((stat) => stat.metric && stat.value) ?? []
  const gallery: Array<
    NonNullable<CsrProject['gallery']>[number] & { alt: string; imageUrl: string }
  > = []

  for (const item of project.gallery ?? []) {
    const image = item.image as Media
    const imageUrl = getImageUrl(image)

    if (imageUrl) {
      gallery.push({
        ...item,
        alt: image.alt || item.caption || project.projectName,
        imageUrl,
      })
    }
  }

  return (
    <div className="csr-detail-page">
      <section className="csr-detail-hero">
        {featuredImageUrl && (
          <Image
            src={featuredImageUrl}
            alt={featuredImage?.alt || project.projectName}
            fill
            priority
            sizes="100vw"
            className="csr-detail-hero-image"
          />
        )}
        <div className="csr-detail-hero-overlay" />
        <div className="csr-detail-hero-inner">
          <Link href="/csr" className="csr-detail-back-link">
            Back to CSR
          </Link>
          <div className="csr-detail-badges">
            <span className="csr-detail-category">{categoryLabels[project.category]}</span>
            <span className={`csr-status csr-status-${project.status}`}>
              {statusLabels[project.status]}
            </span>
          </div>
          <h1>{project.projectName}</h1>
          {project.shortDescription && <p>{project.shortDescription}</p>}
        </div>
      </section>

      <section className="csr-detail-summary">
        {typeof beneficiaries === 'number' && (
          <div>
            <strong>{beneficiaries.toLocaleString()}</strong>
            <span>Beneficiaries</span>
          </div>
        )}
        {startDate && (
          <div>
            <strong>{startDate}</strong>
            <span>Start Date</span>
          </div>
        )}
        <div>
          <strong>{endDate || 'Ongoing'}</strong>
          <span>{endDate ? 'End Date' : 'Timeline'}</span>
        </div>
        {project.location?.region && (
          <div>
            <strong>{project.location.region}</strong>
            <span>Region</span>
          </div>
        )}
      </section>

      <main className="csr-detail-layout">
        <div className="csr-detail-main">
          <section className="csr-detail-section">
            <h2>Project Overview</h2>
            <div className="csr-detail-rich-text">
              <RichText data={project.description} />
            </div>
          </section>

          {project.objectives && project.objectives.length > 0 && (
            <section className="csr-detail-section">
              <h2>Objectives</h2>
              <ul className="csr-objective-list">
                {project.objectives.map((item) => (
                  <li key={item.id || item.objective}>{item.objective}</li>
                ))}
              </ul>
            </section>
          )}

          {project.impact?.description && (
            <section className="csr-detail-section">
              <h2>Impact</h2>
              <div className="csr-detail-rich-text">
                <RichText data={project.impact.description} />
              </div>
            </section>
          )}

          {project.howToContribute && (
            <section className="csr-detail-section">
              <h2>How to Contribute</h2>
              <div className="csr-detail-rich-text">
                <RichText data={project.howToContribute} />
              </div>
            </section>
          )}
        </div>

        <aside className="csr-detail-sidebar">
          {stats.length > 0 && (
            <section className="csr-detail-panel">
              <h2>Key Results</h2>
              <div className="csr-stat-list">
                {stats.map((stat) => (
                  <div key={`${stat.metric}-${stat.value}`}>
                    <strong>{stat.value}</strong>
                    <span>{stat.metric}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.location?.specificLocation && (
            <section className="csr-detail-panel">
              <h2>Location</h2>
              <p>{project.location.specificLocation}</p>
            </section>
          )}

          {project.timeline.milestones && project.timeline.milestones.length > 0 && (
            <section className="csr-detail-panel">
              <h2>Timeline</h2>
              <ol className="csr-milestone-list">
                {project.timeline.milestones.map((milestone) => (
                  <li key={milestone.id || milestone.milestone}>
                    <span className={milestone.completed ? 'completed' : ''} />
                    <div>
                      <strong>{milestone.milestone}</strong>
                      {milestone.date && <small>{formatDate(milestone.date)}</small>}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {project.partners && project.partners.length > 0 && (
            <section className="csr-detail-panel">
              <h2>Partners</h2>
              <div className="csr-partner-list">
                {project.partners.map((partner) => (
                  <div key={partner.id || partner.partnerName}>{partner.partnerName}</div>
                ))}
              </div>
            </section>
          )}
        </aside>
      </main>

      {gallery.length > 0 && (
        <section className="csr-detail-gallery-section">
          <div className="csr-detail-gallery-inner">
            <h2>Project Gallery</h2>
            <div className="csr-detail-gallery">
              {gallery.map((item) => (
                <figure key={item.id || item.imageUrl}>
                  <div className="csr-detail-gallery-image">
                    <Image
                      src={item.imageUrl}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="csr-detail-gallery-img"
                    />
                  </div>
                  {item.caption && <figcaption>{item.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
