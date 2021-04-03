const path = require('path')
const express = require('express')
// const xss = require('xss')
const ResultsService = require('./results-service')

const resultsRouter = express.Router()
const jsonParser = express.json()

const serializeResult = result => ({
  id:result.id,
  // name: xss(note.text),
  monthName: result.monthName,
  mealName: result.mealName,
  result:result.result,
  date: result.date,
  monthid:result.monthid,
  description: result.description,
  content:result.content,
  
})

monthName,mealName,result,date, monthid,description,dtype


resultsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ResultsService.getAllResults(knexInstance)
      .then(results => {
        res.json(results.map(serializeResult ))
      })
      .catch(next)
  })

  // start here
  .post(jsonParser, (req, res, next) => {
    const { monthName,mealName,result,date,description,dtype } = req.body
    const newResult = {monthName,mealName,result,date,description,dtype}


    for (const [key, value] of Object.entries(newResult))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    newResult.monthName = monthName;
   

    ResultsService.insertResult(
      req.app.get('db'),
      newResult
    )
      .then(result=> {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${result.id}`))
          .json(serializeResult (result))
      })
      .catch(next)
  })

  resultsRouter
  .route('/:result_id')
  .all((req, res, next) => {
    ResultsService.getById(
      req.app.get('db'),
      req.params.result_id
    )
      .then(result => {
        if (!result) {
          return res.status(404).json({
            error: { message: `Result doesn't exist` }
          })
        }
        res.result = result
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeResult (res.result))
  })
  .delete((req, res, next) => {
    ResultsService.deleteResult(
      req.app.get('db'),
      req.params.result_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const {monthName,mealName,result,date, monthid,description,dtype} = req.body
    const resultToUpdate = {monthName,mealName,result,date, monthid,description,dtype}
 


    const numberOfValues = Object.values(resultToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
         message: `Request body must contain 'monthName','mealName','result','date','description','dtype'`
         
        }
      })

      ResultsService.updateResult(
      req.app.get('db'),
      req.params.result_id,
      resultToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = resultsRouter