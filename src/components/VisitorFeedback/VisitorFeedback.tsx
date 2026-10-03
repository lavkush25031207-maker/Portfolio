import { useEffect, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'
import layout from '../../styles/layout.module.css'
import styles from './VisitorFeedback.module.css'
import { submitWeb3Form } from '../../config/forms'

type Review = { id: string; display_name: string; rating: number | null; message: string; created_at: string }
const feedbackApiUrl = import.meta.env.VITE_FEEDBACK_API_URL || (window.location.hostname.endsWith('github.io') ? 'https://lavkushmaurya.vercel.app/api/feedback' : '/api/feedback')

export default function VisitorFeedback() {
  const { sections } = usePortfolio()
  const [reviews, setReviews] = useState<Review[]>([])
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [loadMessage, setLoadMessage] = useState('')
  const [emailModeration, setEmailModeration] = useState(false)
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    fetch(feedbackApiUrl).then(async (response) => {
      const body = await response.json() as { reviews?: Review[]; message?: string; configured?: boolean }
      if (!response.ok) throw new Error(body.message || 'Unable to load feedback.')
      setReviews(body.reviews || []); setEmailModeration(body.configured === false); setLoadMessage(body.configured === false ? 'Feedback is sent to Lavkush by email for moderation.' : ''); setState('ready')
    }).catch((error: unknown) => { setLoadMessage(error instanceof Error ? error.message : 'Unable to load feedback.'); setState('error') })
  }, [])

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmitState('sending'); setNotice('')
    const formElement = event.currentTarget
    const payload = Object.fromEntries(new FormData(formElement))
    try {
      if (emailModeration) {
        await submitWeb3Form({ ...payload, subject: 'New portfolio visitor feedback', from_name: 'Portfolio Visitor Feedback' })
      } else {
        const response = await fetch(feedbackApiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        const body = await response.json() as { message?: string }
        if (!response.ok) throw new Error(body.message || 'Unable to submit feedback.')
      }
      formElement.reset(); setSubmitState('success'); setNotice('Thanks. Your feedback is pending review.')
    } catch (error) { setSubmitState('error'); setNotice(error instanceof Error ? error.message : 'Network error. Please try again.') }
  }

  return <section id="feedback" tabIndex={-1} className={[layout.section, layout.tinted].join(' ')}>
    <div className={layout.container}>
      <SectionHeading {...sections.feedback} />
      <div className={styles.grid}>
        <div className={styles.reviewArea} aria-live="polite">
          {state === 'loading' && <p>Loading published feedback…</p>}
          {state === 'error' && <p>{loadMessage}</p>}
          {state === 'ready' && reviews.length === 0 && <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>â˜†</span>
            <h3>Be the first to share feedback</h3>
            <p>{loadMessage || 'Your thoughts help shape future work and are reviewed before publication.'}</p>
            <span>It takes less than a minute.</span>
          </div>}
          {reviews.map((review) => <article key={review.id} className={styles.review}><div><strong>{review.display_name}</strong>{review.rating && <span aria-label={`${review.rating} out of 5 stars`}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>}</div><p>{review.message}</p></article>)}
        </div>
        <form className={styles.form} onSubmit={submit}>
          <h3>Leave feedback</h3>
          <input className={styles.honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <label>Display name<input name="displayName" required maxLength={80} autoComplete="name" /></label>
          <label>Rating <span>(optional)</span><select name="rating" defaultValue=""><option value="">No rating</option>{[1, 2, 3, 4, 5].map((rating) => <option key={rating} value={rating}>{rating} star{rating > 1 ? 's' : ''}</option>)}</select></label>
          <label>Feedback<textarea name="message" required maxLength={1500} rows={4} /></label>
          <label>Email <span>(optional, private)</span><input name="email" type="email" maxLength={254} autoComplete="email" /></label>
          <label className={styles.consent}><input name="publicConsent" type="checkbox" value="true" /> I give permission to display this feedback publicly.</label>
          <Button type="submit" disabled={submitState === 'sending'}>{submitState === 'sending' ? 'Submitting…' : 'Submit Feedback'}</Button>
          <p className={submitState === 'error' ? styles.error : ''} role="status">{notice || 'Submissions are moderated before publication.'}</p>
        </form>
      </div>
    </div>
  </section>
}
