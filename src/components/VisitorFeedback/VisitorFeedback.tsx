import { useEffect, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'
import layout from '../../styles/layout.module.css'
import styles from './VisitorFeedback.module.css'
import { submitWeb3Form } from '../../config/forms'

type Review = { id: string; display_name: string; rating: number | null; message: string; created_at: string }
const feedbackApiUrl = import.meta.env.VITE_FEEDBACK_API_URL || (window.location.hostname.endsWith('github.io') ? 'https://lavkushmaurya.vercel.app/api/feedback' : '/api/feedback')

function Stars({ rating }: { rating: number }) {
  return <span className={styles.stars} aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, index) => <span key={index} aria-hidden="true">{index < rating ? '\u2605' : '\u2606'}</span>)}
  </span>
}

export default function VisitorFeedback() {
  const { sections } = usePortfolio()
  const [reviews, setReviews] = useState<Review[]>([])
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [emailModeration, setEmailModeration] = useState(false)
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [notice, setNotice] = useState('')
  const [selectedRating, setSelectedRating] = useState(0)

  useEffect(() => {
    fetch(feedbackApiUrl).then(async (response) => {
      const body = await response.json() as { reviews?: Review[]; message?: string; configured?: boolean }
      if (!response.ok) throw new Error(body.message || 'Unable to load feedback.')
      setReviews(body.reviews || [])
      setEmailModeration(body.configured === false)
      setState('ready')
    }).catch(() => {
      setState('error')
    })
  }, [])

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitState('sending')
    setNotice('')
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
      formElement.reset()
      setSelectedRating(0)
      setSubmitState('success')
      setNotice('Thanks. Your feedback is pending review.')
    } catch (error) {
      setSubmitState('error')
      setNotice(error instanceof Error ? error.message : 'Network error. Please try again.')
    }
  }

  return <section id="feedback" tabIndex={-1} className={[layout.section, layout.tinted].join(' ')}>
    <div className={layout.container}>
      <SectionHeading {...sections.feedback} />
      <div className={styles.grid}>
        <div className={styles.leftColumn}>
          <div className={styles.introduction}>
            <span className={styles.eyebrow}>Visitor feedback</span>
            <h3>Your feedback helps me grow.</h3>
            <p>Have a suggestion about my design, projects, or your experience? I&apos;d love to hear your thoughts.</p>
          </div>
          <div className={styles.reviewArea} aria-live="polite">
            {state === 'loading' && <p className={styles.emptyMessage}>Loading feedback...</p>}
            {state === 'error' && <p className={styles.emptyMessage}>Feedback is temporarily unavailable.</p>}
            {state === 'ready' && reviews.length === 0 && <p className={styles.emptyMessage}><Icon name="message" size={18} /> Be the first to share your thoughts.</p>}
            {reviews.slice(0, 2).map((review) => <article key={review.id} className={styles.review}>
              <div><strong>{review.display_name}</strong>{review.rating && <Stars rating={review.rating} />}</div>
              <p>{review.message}</p>
            </article>)}
          </div>
        </div>
        <form className={styles.form} onSubmit={submit}>
          <h3>Leave feedback</h3>
          <input className={styles.honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <label>Display name<input name="displayName" required maxLength={80} autoComplete="name" /></label>
          <label>Rating <span>(optional)</span>
            <select name="rating" value={selectedRating || ''} onChange={(event) => setSelectedRating(Number(event.target.value))}>
              <option value="">No rating</option>
              {[1, 2, 3, 4, 5].map((rating) => <option key={rating} value={rating}>{rating} star{rating > 1 ? 's' : ''}</option>)}
            </select>
            {selectedRating > 0 && <Stars rating={selectedRating} />}
          </label>
          <label>Feedback<textarea name="message" required maxLength={1500} rows={4} /></label>
          <label>Email <span>(optional, private)</span><input name="email" type="email" maxLength={254} autoComplete="email" /></label>
          <label className={styles.consent}><input name="publicConsent" type="checkbox" value="true" /> I give permission to display this feedback publicly.</label>
          <Button type="submit" disabled={submitState === 'sending'}>{submitState === 'sending' ? 'Submitting...' : 'Submit Feedback'}</Button>
          <p className={submitState === 'error' ? styles.error : ''} role="status">{notice || 'Submissions are moderated before publication.'}</p>
        </form>
      </div>
    </div>
  </section>
}
