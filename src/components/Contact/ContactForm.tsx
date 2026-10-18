import { useState } from 'react'
import type { FormEvent } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import Icon from '../ui/Icon'
import Button from '../ui/Button'
import { submitWeb3Form } from '../../config/forms'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const { form, profile } = usePortfolio()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending'); setMessage('')
    const formElement = event.currentTarget
    const data = Object.fromEntries(new FormData(formElement))
    try {
      await submitWeb3Form({ ...data, from_name: 'Lavkush Maurya Portfolio', to_name: profile.name })
      formElement.reset(); setStatus('success'); setMessage('Thanks — your message has been sent successfully.')
    } catch (error) { setStatus('error'); setMessage(error instanceof Error ? error.message : 'Network error. Please try again.') }
  }

  return <form className={styles['contact-form']} onSubmit={sendMessage}>
    <h3>{form.title}</h3>
    <input className={styles.honeypot} type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <div className={styles['form-row']}>
      <label>{form.nameLabel}<input name="name" placeholder={form.namePlaceholder} autoComplete="name" required maxLength={100} /></label>
      <label>{form.emailLabel}<input name="email" type="email" placeholder={form.emailPlaceholder} autoComplete="email" required maxLength={254} /></label>
    </div>
    <label>{form.subjectLabel}<input name="subject" placeholder={form.subjectPlaceholder} required maxLength={200} /></label>
    <label>{form.messageLabel}<textarea name="message" rows={5} placeholder={form.messagePlaceholder} required maxLength={5000} /></label>
    <Button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send Message'} <Icon name="arrow" size={17} /></Button>
    <p className={`${styles['form-note']} ${status === 'error' ? styles.error : ''}`} role="status" aria-live="polite">{message || 'Your details are used only to respond to your message.'}</p>
  </form>
}
