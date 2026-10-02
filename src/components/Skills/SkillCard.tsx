import Icon from '../ui/Icon'
import Tags from '../ui/Tags'
import type { SkillGroup } from '../../types/portfolio'
import layout from '../../styles/layout.module.css'
import styles from './SkillCard.module.css'

export default function SkillCard({ group }: { group: SkillGroup }) {
  return (
    <article className={styles['skill-card']}>
      <span className={layout['tile-icon']}>
        <Icon name={group.icon} size={24} />
      </span>
      <h3>{group.title}</h3>
      <Tags items={group.skills} />
    </article>
  )
}
