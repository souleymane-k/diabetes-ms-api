require('dotenv').config()
const knex = require('knex')
const app = require('./app')
const { PORT, DATABASE_URL, NODE_ENV, AUTH_SECRET } = require('./config')

if (NODE_ENV === 'production' && !AUTH_SECRET) {
  throw new Error('AUTH_SECRET must be set in production')
}

const connection = { connectionString: DATABASE_URL }
if (process.env.PGSSLMODE === 'require' || process.env.DATABASE_SSL === 'true') {
  connection.ssl = { rejectUnauthorized: process.env.PGSSL_REJECT_UNAUTHORIZED !== 'false' }
}
const db = knex({ client: 'pg', connection })
app.set('db', db)

const server = app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
const shutdown = () => server.close(async () => { await db.destroy(); process.exit(0) })
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
