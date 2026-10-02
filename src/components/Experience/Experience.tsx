import { usePortfolio } from '../../context/PortfolioContext'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ExperienceCard from './ExperienceCard'
import EducationTimeline from './EducationTimeline'
import layout from '../../styles/layout.module.css'
import styles from './Experience.module.css'

export default function Experience() {
  const { sections, experiences } = usePortfolio()
  return (
    <section id="experience" tabIndex={-1} className={[layout['section'], layout['tinted']].join(' ')}>
      <div className={layout['container']}>
        <SectionHeading {...sections.experience} />
        <div className={styles['journey-grid']}>
          <Reveal>
            <div>
              <h3 className={styles['column-heading']}>
                <Icon name="briefcase" /> {sections.experience.workLabel}
              </h3>
              {experiences.map((experience) => (
                <ExperienceCard
                  key={`${experience.organization}-${experience.title}-${experience.date}`}
                  experience={experience}
                />
              ))}
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div>
              <h3 className={styles['column-heading']}>
                <Icon name="book" /> {sections.experience.educationLabel}
              </h3>
              <EducationTimeline />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
