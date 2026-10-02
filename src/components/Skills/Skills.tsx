import { usePortfolio } from '../../context/PortfolioContext'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import SkillCard from './SkillCard'
import layout from '../../styles/layout.module.css'
import styles from './Skills.module.css'

export default function Skills() {
  const { sections, skillGroups } = usePortfolio()
  return (
    <section id="skills" tabIndex={-1} className={[layout['section'], layout['tinted']].join(' ')}>
      <div className={layout['container']}>
        <SectionHeading {...sections.skills} />
        <div className={styles['skills-grid']}>
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 100}>
              <SkillCard group={group} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
