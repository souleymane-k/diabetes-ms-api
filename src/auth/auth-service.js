const crypto = require('crypto')

const passwordHash = password => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

const verifyPassword = (password, saved) => {
  if (typeof saved !== 'string' || !saved.includes(':')) return false
  const [salt, hash] = saved.split(':')
  const actual = crypto.scryptSync(password, salt, 64)
  const expected = Buffer.from(hash, 'hex')
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected)
}

const AuthService = {
  async createUser(db, { username, email, password }) {
    const [user] = await db('diabetes_users')
      .insert({ username: username.trim(), email: email.trim().toLowerCase(), password_hash: passwordHash(password) })
      .returning(['id', 'username', 'email', 'created_at'])
    return user
  },
  findByLogin(db, login) {
    return db('diabetes_users').select('*').whereRaw('LOWER(email) = ?', [login.trim().toLowerCase()]).first()
  },
  verifyPassword,
  serializeUser(user) {
    return { id: user.id, username: user.username, email: user.email }
  },
}

module.exports = AuthService
