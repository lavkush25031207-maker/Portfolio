import { usePortfolio } from '../../context/PortfolioContext'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ProjectCard from './ProjectCard'
import layout from '../../styles/layout.module.css'
import styles from './Projects.module.css'

export default function Projects() {
  const { sections, projects } = usePortfolio()
  return (
    <section
      id="projects"
      tabIndex={-1}
      className={[layout['section'], layout['tinted']].join(' ')}
    >
      <div className={layout['container']}>
        <SectionHeading {...sections.projects} />
        <div className={styles['projects-grid']}>
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 130}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
