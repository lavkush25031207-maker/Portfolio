import { usePortfolio } from '../../context/PortfolioContext'
import Tags from '../ui/Tags'
import ProjectArtwork from './ProjectArtwork'
import type { Project } from '../../types/portfolio'
import layout from '../../styles/layout.module.css'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { projectLabels } = usePortfolio()
  return (
    <article className={styles['project-card']}>
      <ProjectArtwork project={project} index={index} />
      <div className={styles['project-body']}>
        <span className={layout.eyebrow}>{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <Tags items={project.tags} />
        <div className={styles.actions}>
          {project.liveUrl && <a className={styles.primaryAction} href={project.liveUrl} target="_blank" rel="noreferrer">{projectLabels.visitSite} <span aria-hidden="true">↗</span></a>}
          <a className={styles.sourceAction} href={project.repositoryUrl} target="_blank" rel="noreferrer">{projectLabels.viewRepository} <span aria-hidden="true">↗</span></a>
        </div>
        <details>
          <summary>{projectLabels.details} <span>+</span></summary>
          <ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
        </details>
      </div>
    </article>
  )
}
