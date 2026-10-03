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
          {projects.slice(0, 4).map((project, index) => (
            <Reveal key={project.title} delay={index * 130}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
        {projects.length > 4 && (
          <div className={styles.moreProjects}>
            <h3>More Projects</h3>
            <div className={styles['projects-grid']}>
              {projects.slice(4).map((project, index) => (
                <Reveal key={project.title} delay={index * 100}>
                  <ProjectCard project={project} index={index + 4} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
