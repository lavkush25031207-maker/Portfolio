const requests = new Map()
const WINDOW_MS = 60_000
const MAX_REQUESTS = 5

function getClientAddress(request) {
  const forwarded = request.headers['x-forwarded-for']
  return typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : 'unknown'
}

function rateLimited(request) {
  const address = getClientAddress(request)
  const now = Date.now()
  const recent = (requests.get(address) || []).filter((time) => now - time < WINDOW_MS)
  recent.push(now)
  requests.set(address, recent)
  return recent.length > MAX_REQUESTS
}

function configured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

function headers() {
  return { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`, 'Content-Type': 'application/json' }
}

export default async function handler(request, response) {
  const origin = request.headers.origin
  const allowedOrigins = ['https://lavkushmaurya.vercel.app', 'https://lavkush25031207-maker.github.io', 'http://localhost:5173']
  if (origin && allowedOrigins.includes(origin)) response.setHeader('Access-Control-Allow-Origin', origin)
  response.setHeader('Vary', 'Origin')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (request.method === 'OPTIONS') return response.status(204).end()
  if (!configured()) {
    if (request.method === 'GET') return response.status(200).json({ reviews: [], configured: false })
    return response.status(503).json({ message: 'Feedback is not configured yet. Add Supabase environment variables on Vercel.' })
  }
  if (request.method === 'GET') {
    const result = await fetch(`${process.env.SUPABASE_URL}/rest/v1/public_reviews?select=id,display_name,rating,message,created_at&order=created_at.desc&limit=12`, { headers: headers() })
    if (!result.ok) return response.status(502).json({ message: 'Unable to load feedback.' })
    return response.status(200).json({ reviews: await result.json() })
  }
  if (request.method !== 'POST') return response.status(405).json({ message: 'Method not allowed.' })
  if (rateLimited(request)) return response.status(429).json({ message: 'Please wait before submitting again.' })

  const { displayName, rating, message, email, publicConsent, website } = request.body || {}
  const cleanName = typeof displayName === 'string' ? displayName.trim() : ''
  const cleanMessage = typeof message === 'string' ? message.trim() : ''
  const cleanEmail = typeof email === 'string' ? email.trim() : null
  const parsedRating = rating === '' || rating === undefined ? null : Number(rating)
  if (website || !cleanName || cleanName.length > 80 || !cleanMessage || cleanMessage.length > 1500 || (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) || (parsedRating !== null && (!Number.isInteger(parsedRating) || parsedRating < 1 || parsedRating > 5))) {
    return response.status(400).json({ message: 'Please check the feedback form and try again.' })
  }
  const result = await fetch(`${process.env.SUPABASE_URL}/rest/v1/visitor_reviews`, {
    method: 'POST', headers: { ...headers(), Prefer: 'return=minimal' },
    body: JSON.stringify({ display_name: cleanName, rating: parsedRating, message: cleanMessage, email: cleanEmail, public_consent: publicConsent === 'true', status: 'pending' }),
  })
  if (!result.ok) return response.status(502).json({ message: 'Unable to submit feedback. Please try again later.' })
  return response.status(201).json({ message: 'Feedback submitted for review.' })
}
