require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  PORT: Number(process.env.PORT) || 8002,
  DATABASE_URL: process.env.DATABASE_URL || process.env.DB_URL || 'postgresql://dunder_mifflin@localhost/diabetes',
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || '*',
  AUTH_SECRET: process.env.AUTH_SECRET || (isProduction ? null : 'local-development-secret-change-me'),
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || process.env.TEST_DB_URL || 'postgresql://dunder_mifflin@localhost/diabetes-test',
}
