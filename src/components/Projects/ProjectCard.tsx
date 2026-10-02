import { usePortfolio } from '../../context/PortfolioContext'
import Tags from '../ui/Tags'
import ProjectArtwork from './ProjectArtwork'
import type { Project } from '../../types/portfolio'
import layout from '../../styles/layout.module.css'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { projectLabels } = usePortfolio()
  const destination = project.liveUrl ?? project.repositoryUrl
  const actionLabel = project.liveUrl ? projectLabels.visitSite : projectLabels.viewRepository

  return (
    <article className={styles['project-card']}>
      <ProjectArtwork project={project} index={index} />
      <div className={styles['project-body']}>
        <span className={layout['eyebrow']}>{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <Tags items={project.tags} />
        <a
          className={styles.visitSite}
          href={destination}
          target="_blank"
          rel="noreferrer"
          aria-label={`${actionLabel}: ${project.title}`}
        >
          {actionLabel} <span aria-hidden="true">↗</span>
        </a>
        <details>
          <summary>
            {projectLabels.details} <span>+</span>
          </summary>
          <ul>
            {project.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </details>
      </div>
    </article>
  )
}
