const express = require('express')
const AuthService = require('../auth/auth-service')
const { issueToken } = require('../auth/token-service')

const usersRouter = express.Router()

usersRouter.post('/', async (req, res, next) => {
  const { username, email, password } = req.body || {}
  if (typeof username !== 'string' || !username.trim() || typeof email !== 'string' || !email.trim() || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ error: { message: 'Username, a valid email, and a password of at least 8 characters are required' } })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: { message: 'Enter a valid email address' } })
  }
  try {
    const user = await AuthService.createUser(req.app.get('db'), { username, email, password })
    res.status(201).json({ authToken: issueToken(user), user: AuthService.serializeUser(user) })
  } catch (error) {
    if (error.code === '23505') return res.status(409).json({ error: { message: 'An account with that email or username already exists' } })
    next(error)
  }
})

module.exports = usersRouter
