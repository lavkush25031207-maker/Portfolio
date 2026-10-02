import { usePortfolio } from '../../context/PortfolioContext'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ExperienceCard from './ExperienceCard'
import layout from '../../styles/layout.module.css'
import styles from './Experience.module.css'

export default function WorkExperience() {
  const { sections, workExperiences } = usePortfolio()
  return (
    <section id="work" tabIndex={-1} className={layout['section']}>
      <div className={layout['container']}>
        <SectionHeading {...sections.work} />
        <div className={styles['experience-list']}>
          {workExperiences.map((experience, index) => (
            <Reveal key={`${experience.organization}-${experience.title}-${experience.date}`} delay={index * 100}>
              <ExperienceCard experience={experience} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
