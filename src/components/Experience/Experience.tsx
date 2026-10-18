import { usePortfolio } from '../../context/PortfolioContext'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ExperienceCard from './ExperienceCard'
import layout from '../../styles/layout.module.css'
import styles from './Experience.module.css'

export default function Experience() {
  const { sections, experiences, workExperiences } = usePortfolio()
  return (
    <section id="experience" tabIndex={-1} className={[layout['section'], layout['tinted']].join(' ')}>
      <div className={layout['container']}>
        <SectionHeading {...sections.experience} />
        <div className={styles['experience-list']}>
          {[...workExperiences, ...experiences].map((experience, index) => (
            <Reveal key={`${experience.organization}-${experience.title}-${experience.date}`} delay={index * 100}>
              <ExperienceCard experience={experience} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
