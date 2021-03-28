require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 8002,
    API_TOKEN: process.env.API_TOKEN || "2ad6cd5c-17ed-4b7a-9309-8252fb3eb820",
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3187/api"
  }