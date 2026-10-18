import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const configured = Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY)

  return {
    plugins: [
      react(),
      {
        name: 'local-feedback-api',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (request, response) => {
            response.setHeader('Content-Type', 'application/json')
            if (request.method !== 'POST') {
              response.statusCode = 405
              response.end(JSON.stringify({ message: 'Method not allowed.' }))
              return
            }
            if (!env.WEB3FORMS_ACCESS_KEY) {
              response.statusCode = 503
              response.end(JSON.stringify({ message: 'Email service is not configured. Add WEB3FORMS_ACCESS_KEY to .env and restart Vite.' }))
              return
            }
            const chunks: Buffer[] = []
            for await (const chunk of request) chunks.push(Buffer.from(chunk))
            const body = JSON.parse(Buffer.concat(chunks).toString() || '{}') as Record<string, unknown>
            const name = typeof body.name === 'string' ? body.name.trim() : ''
            const email = typeof body.email === 'string' ? body.email.trim() : ''
            const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
            const message = typeof body.message === 'string' ? body.message.trim() : ''
            if (body.botcheck || !name || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !subject || subject.length > 200 || !message || message.length > 5000) {
              response.statusCode = 400
              response.end(JSON.stringify({ message: 'Please check the form fields and try again.' }))
              return
            }
            const result = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ access_key: env.WEB3FORMS_ACCESS_KEY, name, email, subject, message, from_name: 'Lavkush Maurya Portfolio' }) })
            const resultBody = await result.json().catch(() => ({})) as { success?: boolean; message?: string }
            response.statusCode = result.ok && resultBody.success ? 200 : 502
            response.end(JSON.stringify({ message: result.ok && resultBody.success ? 'Message sent successfully.' : resultBody.message || 'Email service could not send your message.' }))
          })
          server.middlewares.use('/api/feedback', async (request, response) => {
            response.setHeader('Content-Type', 'application/json')
            if (!configured) {
              if (request.method === 'GET') {
                response.statusCode = 200
                response.end(JSON.stringify({ reviews: [], configured: false }))
                return
              }
              response.statusCode = 503
              response.end(JSON.stringify({ message: 'Feedback is not configured. Add Supabase variables to .env and restart Vite.' }))
              return
            }
            const headers = { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`, 'Content-Type': 'application/json' }
            if (request.method === 'GET') {
              const result = await fetch(`${env.SUPABASE_URL}/rest/v1/public_reviews?select=id,display_name,rating,message,created_at&order=created_at.desc&limit=12`, { headers })
              response.statusCode = result.status
              response.end(await result.text())
              return
            }
            if (request.method !== 'POST') {
              response.statusCode = 405
              response.end(JSON.stringify({ message: 'Method not allowed.' }))
              return
            }
            const chunks: Buffer[] = []
            for await (const chunk of request) chunks.push(Buffer.from(chunk))
            const body = JSON.parse(Buffer.concat(chunks).toString() || '{}') as Record<string, unknown>
            const displayName = typeof body.displayName === 'string' ? body.displayName.trim() : ''
            const message = typeof body.message === 'string' ? body.message.trim() : ''
            const email = typeof body.email === 'string' ? body.email.trim() : null
            const rating = body.rating === '' || body.rating === undefined ? null : Number(body.rating)
            if (body.website || !displayName || displayName.length > 80 || !message || message.length > 1500 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || (rating !== null && (!Number.isInteger(rating) || rating < 1 || rating > 5))) {
              response.statusCode = 400
              response.end(JSON.stringify({ message: 'Please check the feedback form and try again.' }))
              return
            }
            const result = await fetch(`${env.SUPABASE_URL}/rest/v1/visitor_reviews`, { method: 'POST', headers: { ...headers, Prefer: 'return=minimal' }, body: JSON.stringify({ display_name: displayName, message, email, rating, public_consent: body.publicConsent === 'true', status: 'pending' }) })
            response.statusCode = result.ok ? 201 : 502
            response.end(JSON.stringify(result.ok ? { message: 'Feedback submitted for review.' } : { message: 'Supabase rejected the submission. Confirm the migration and server keys.' }))
          })
        },
      },
    ],
    base: './',
  }
})
