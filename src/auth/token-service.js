const crypto = require('crypto')
const { AUTH_SECRET } = require('../config')

const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url')

function issueToken(user) {
  if (!AUTH_SECRET) throw new Error('AUTH_SECRET is not configured')
  const payload = encode({ userId: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 })
  const signature = crypto.createHmac('sha256', AUTH_SECRET).update(payload).digest('base64url')
  return `${payload}.${signature}`
}

function verifyToken(token) {
  if (!AUTH_SECRET || typeof token !== 'string') return null
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const expected = crypto.createHmac('sha256', AUTH_SECRET).update(parts[0]).digest()
  let actual
  try { actual = Buffer.from(parts[1], 'base64url') } catch (error) { return null }
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return null
  try {
    const payload = JSON.parse(Buffer.from(parts[0], 'base64url').toString())
    if (!Number.isInteger(payload.userId) || payload.exp <= Math.floor(Date.now() / 1000)) return null
    return payload
  } catch (error) { return null }
}

function requireAuth(req, res, next) {
  const header = req.get('authorization') || ''
  const match = header.match(/^Bearer\s+(.+)$/i)
  const payload = match && verifyToken(match[1])
  if (!payload) return res.status(401).json({ error: { message: 'A valid sign-in token is required' } })
  req.user = { id: payload.userId }
  next()
}

module.exports = { issueToken, verifyToken, requireAuth }
