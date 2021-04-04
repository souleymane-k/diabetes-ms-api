require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const { response } = require('express')
const monthsRouter = require('./months/months-router')
const resultsRouter = require('./months/months-router')

const app = express()




const morganOption = (NODE_ENV === 'development')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))

app.use(helmet())
app.use(cors())
app.use(monthsRouter)
app.use(monthsRouter)
app.use('/api/months', monthsRouter)
app.use('/api/results', resultsRouter)


app.get('/', (req, res)=>{
    res.send('Hello, diabetes-ms-api!')
})
app.use(function errorHandler(error, req, res, next){
    let response
    if(NODE_ENV ==='development'){
        response = { error: { message: 'server error' } }
    }else{
        console.error(error)
        response = {message: error.message.error}
    }
    res.status(500).json(response)
})

module.exports = app