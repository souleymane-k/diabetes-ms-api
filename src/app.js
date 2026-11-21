const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, CLIENT_ORIGIN } = require('./config')
const monthsRouter = require('./months/months-router')
const resultsRouter = require('./results/results-router')
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')

const app = express()
const origins = CLIENT_ORIGIN === '*' ? '*' : CLIENT_ORIGIN.split(',').map(origin => origin.trim())

app.use(morgan(NODE_ENV === 'development' ? 'tiny' : 'common'))
app.use(helmet())
app.use(cors({ origin: origins }))
app.use(express.json({ limit: '100kb' }))
app.get('/', (req, res) => res.json({ ok: true, service: 'diabetes-ms-api' }))
app.use('/api/months', monthsRouter)
app.use('/api/results', resultsRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error)
  if (NODE_ENV !== 'production') console.error(error)
  const status = error.status || 500
  const message = NODE_ENV === 'production' && status >= 500 ? 'server error' : (error.message || 'server error')
  res.status(status).json({ error: { message } })
})

module.exports = app
