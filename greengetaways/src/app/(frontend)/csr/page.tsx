import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { CsrProject, Media } from '@/payload-types'
import { getImageUrl, formatDate } from '../lib/utils'
import './csr.css'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'CSR',
  description:
    'Community, conservation, and responsible tourism projects supported by Green Getaways.',
  openGraph: {
    title: 'CSR | Green Getaways',
    description:
      'Community, conservation, and responsible tourism projects supported by Green Getaways.',
    type: 'website' as const,
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'CSR | Green Getaways',
    description:
      'Community, conservation, and responsible tourism projects supported by Green Getaways.',
  },
}

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

function ProjectCard({ project, priority }: { project: CsrProject; priority: boolean }) {
  const featuredImage = project.featuredImage as Media
  const imageUrl = getImageUrl(featuredImage)
  const beneficiaries = project.impact?.beneficiaries
  const startDate = formatDate(project.timeline.startDate)
  const region = project.location?.region
  const stats = project.impact?.statistics?.filter((stat) => stat.metric && stat.value).slice(0, 2)

  return (
    <article className="csr-project-card">
      <a href={`/csr/${project.slug}`} className="csr-project-card-link">
        <div className="csr-project-image">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={featuredImage?.alt || project.projectName}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="csr-project-img"
            />
          )}
          <div className="csr-project-image-overlay" />
          <span className={`csr-status csr-status-${project.status}`}>
            {statusLabels[project.status]}
          </span>
        </div>

        <div className="csr-project-content">
          <div className="csr-project-meta">
            <span>{categoryLabels[project.category]}</span>
            {region && <span>{region}</span>}
          </div>

          <h2 className="csr-project-title">{project.projectName}</h2>

          {project.shortDescription && (
            <p className="csr-project-description">{project.shortDescription}</p>
          )}

          <div className="csr-project-details">
            {typeof beneficiaries === 'number' && (
              <div>
                <strong>{beneficiaries.toLocaleString()}</strong>
                <span>Beneficiaries</span>
              </div>
            )}
            {startDate && (
              <div>
                <strong>{startDate}</strong>
                <span>Started</span>
              </div>
            )}
          </div>

          {stats && stats.length > 0 && (
            <div className="csr-project-stats">
              {stats.map((stat) => (
                <span key={`${project.id}-${stat.metric}`}>
                  {stat.value} {stat.metric}
                </span>
              ))}
            </div>
          )}
        </div>
      </a>
    </article>
  )
}

export default async function CSRPage() {
  let projects: CsrProject[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'csr-projects',
      depth: 1,
      limit: 100,
      sort: ['-featured', '-updatedAt'],
    })
    projects = result.docs as CsrProject[]
  } catch (_error) {
    console.log('Could not fetch CSR projects')
  }

  const featuredProjects = projects.filter((project) => project.featured)
  const totalBeneficiaries = projects.reduce(
    (total, project) => total + (project.impact?.beneficiaries ?? 0),
    0,
  )

  return (
    <div className="csr-page">
      <section className="csr-hero">
        <div className="csr-hero-inner">
          <p className="csr-eyebrow">Corporate Social Responsibility</p>
          <h1 className="csr-hero-title">Travel that gives back to Nepal</h1>
          <p className="csr-hero-subtitle">
            We support education, conservation, cultural heritage, and fair opportunities in the
            communities that make every journey possible.
          </p>
        </div>
      </section>

      <section className="csr-impact-band">
        <div className="csr-impact-item">
          <strong>{projects.length}</strong>
          <span>Projects</span>
        </div>
        <div className="csr-impact-item">
          <strong>{featuredProjects.length}</strong>
          <span>Featured</span>
        </div>
        <div className="csr-impact-item">
          <strong>{totalBeneficiaries.toLocaleString()}</strong>
          <span>Beneficiaries</span>
        </div>
      </section>

      <section className="csr-projects-section">
        <div className="csr-section-heading">
          <p className="csr-eyebrow">Our Initiatives</p>
          <h2>CSR Projects</h2>
        </div>

        {projects.length > 0 ? (
          <div className="csr-project-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} priority={index < 2} />
            ))}
          </div>
        ) : (
          <div className="csr-empty">
            <h2>No CSR projects published yet</h2>
            <p>Once projects are added in Payload, they will appear here automatically.</p>
          </div>
        )}
      </section>
    </div>
  )
}
