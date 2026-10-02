import { usePortfolio } from '../../context/PortfolioContext'
import Icon from '../ui/Icon'
import Button from '../ui/Button'
import { useState } from 'react'
import type { FormEvent } from 'react'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const { form, profile } = usePortfolio()
  const [draft, setDraft] = useState(false)
  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = `${form.greeting} ${profile.name},\n\n${data.get('message')}\n\n${form.fromLabel}: ${data.get('name')}\n${form.bodyEmailLabel}: ${data.get('email')}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(String(data.get('subject')))}&body=${encodeURIComponent(body)}`
    setDraft(true)
  }

  return (
    <form className={styles['contact-form']} onSubmit={sendMessage}>
      <h3>{form.title}</h3>
      <div className={styles['form-row']}>
        <label>
          {form.nameLabel}
          <input
            name="name"
            placeholder={form.namePlaceholder}
            autoComplete="name"
            required
            maxLength={100}
          />
        </label>
        <label>
          {form.emailLabel}
          <input
            name="email"
            type="email"
            placeholder={form.emailPlaceholder}
            autoComplete="email"
            required
          />
        </label>
      </div>
      <label>
        {form.subjectLabel}
        <input name="subject" placeholder={form.subjectPlaceholder} required maxLength={200} />
      </label>
      <label>
        {form.messageLabel}
        <textarea
          name="message"
          rows={5}
          placeholder={form.messagePlaceholder}
          required
          maxLength={5000}
        />
      </label>
      <Button type="submit">
        {form.submitLabel} <Icon name="arrow" size={17} />
      </Button>
      <p className={styles['form-note']} role="status">
        {draft ? form.draftMessage : form.note}
      </p>
    </form>
  )
}
