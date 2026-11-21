const express = require('express')
const AuthService = require('./auth-service')
const { issueToken } = require('./token-service')

const authRouter = express.Router()

authRouter.post('/login', async (req, res, next) => {
  const { email, username, password } = req.body || {}
  const login = email || username
  if (typeof login !== 'string' || typeof password !== 'string' || !password) {
    return res.status(400).json({ error: { message: 'Email and password are required' } })
  }
  try {
    const user = await AuthService.findByLogin(req.app.get('db'), login)
    if (!user || !AuthService.verifyPassword(password, user.password_hash)) {
      return res.status(401).json({ error: { message: 'Invalid email or password' } })
    }
    res.json({ authToken: issueToken(user), user: AuthService.serializeUser(user) })
  } catch (error) { next(error) }
})

module.exports = authRouter
