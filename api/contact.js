const requests = new Map()

function allowOrigin(request, response) {
  const allowed = ['https://lavkushmaurya.vercel.app', 'https://lavkush25031207-maker.github.io', 'http://localhost:5173']
  if (request.headers.origin && allowed.includes(request.headers.origin)) response.setHeader('Access-Control-Allow-Origin', request.headers.origin)
  response.setHeader('Vary', 'Origin')
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function isRateLimited(request) {
  const address = String(request.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim()
  const now = Date.now()
  const recent = (requests.get(address) || []).filter((time) => now - time < 60_000)
  recent.push(now)
  requests.set(address, recent)
  return recent.length > 5
}

export default async function handler(request, response) {
  allowOrigin(request, response)
  if (request.method === 'OPTIONS') return response.status(204).end()
  if (request.method !== 'POST') return response.status(405).json({ message: 'Method not allowed.' })
  if (!process.env.WEB3FORMS_ACCESS_KEY) return response.status(503).json({ message: 'Email service is not configured on this deployment.' })
  if (isRateLimited(request)) return response.status(429).json({ message: 'Please wait before sending another message.' })

  const { name, email, subject, message, botcheck } = request.body || {}
  const validEmail = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (botcheck || typeof name !== 'string' || !name.trim() || name.length > 100 || !validEmail || typeof subject !== 'string' || !subject.trim() || subject.length > 200 || typeof message !== 'string' || !message.trim() || message.length > 5000) {
    return response.status(400).json({ message: 'Please check the form fields and try again.' })
  }
  const result = await fetch('https://api.web3forms.com/submit', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: process.env.WEB3FORMS_ACCESS_KEY, name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim(), from_name: 'Lavkush Maurya Portfolio' }),
  })
  const body = await result.json().catch(() => ({}))
  if (!result.ok || !body.success) return response.status(502).json({ message: body.message || 'Email service could not send your message.' })
  return response.status(200).json({ message: 'Message sent successfully.' })
}
