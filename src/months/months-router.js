const path = require('path')
const express = require('express')
//const xss = require('xss')
const MonthsService = require('./months-service')

const monthsRouter = express.Router()
const jsonParser = express.json()

const serializeMonth = month => ({
  id: month.id,
  // name: xss(folder.name),
  name:month.name,
})

monthsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    MonthsService.getAllMonths(knexInstance)
      .then(months => {
        res.json(months.map(serializeMonth))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const {name} = req.body
    const newMonth = {name}

    for (const [key, value] of Object.entries(newMonth)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    newMonth.name = name;
  

    MonthsService.insertMonth(
      req.app.get('db'),
      newMonth
    )
      .then(month => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${month.id}`))
          .json(serializeMonth(month))
      })
      .catch(next)
  })

  monthsRouter
  .route('/:month_id')
  .all((req, res, next) => {
    MonthsService.getById(
      req.app.get('db'),
      req.params.month_id
    )
      .then(month => {
        if (!month) {
          return res.status(404).json({
            error: { message: `Month doesn't exist` }
          })
        }
        res.month = month
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeMonth(res.month))
  })
  .delete((req, res, next) => {
    MonthsService.deleteMonth(
      req.app.get('db'),
      req.params.month_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const {name} = req.body
    const monthToUpdate = {name }

    const numberOfValues = Object.values(monthToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain  'name'`
        }
      })

      MonthsService.updateMonth(
      req.app.get('db'),
      req.params.month_id,
      monthToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = monthsRouter


















////////////////////////////////
const path = require('path')
const express = require('express')
const store = require('../store')


const monthsRouter = express.Router()
// const bodyParser = express.json()
const jsonParser = express.json()



monthsRouter
.route('/months')
  .get((req, res) => {
    res.json(store.months)
  })
  

  // monthsRouter
  // .route('/:monthName')
  // .get((req, res) => {
  //   const {monthName} = req.params
  //   const month = store.months.find(i => i.monthName == monthName)
    
  //   res.json(month)
  // })

  monthsRouter
  .route('/:monthId')
  .get((req, res) => {
    const{monthId} = req.params
    const month = store.months.find(i => i.monthId == monthId)
    res.json(month)
  })

  


  // monthsRouter
  // .route('/:month_id')
  // .all((req, res, next) => {
  //   const { month_id } = req.params
  //   MonthsService.getById(req.app.get('store'), month_id)
  //     .then(month => {
  //       if (!month) {
  //         logger.error(`Month with id ${month_id} not found.`)
  //         return res.status(404).json({
  //           error: { message: `Month Not Found` }
  //         })
  //       }

  //       res.month = month
  //       next()
  //     })
  //     .catch(next)

  // })
  // .get((req, res) => {
  //   const {monthName} = req.params
  //   const month = store.months.find(i => i.monthName == monthName)
    
  //   res.json(serializeMonth(res.month))
  // })



module.exports = monthsRouter

// const month =() => ({
    //     id: month.id,
    //     monthName:month.name,
    //     mealName: month.mealName,
    //     result: month.result,
    //     date: month.date,
    //     description: month.description,
    //     dtype: month.dtype,
    
    //   }

    // const serializeMonth = month => ({
//   id: month.id,
//   // title: xss(bookmark.title),
//   monthName: month.monthName,
//   mealName: month.mealName,
//   result:month.result,
//   date:month.date,
//   description:month.description,
//   dtype:month.dtype
//   // description: xss(month.description),
  
// })

// monthsRouter
// .route('/months/monthName')
// .get((req,res)=>{
//   const {monthName} = req.params
//   let array = [];
//   for(let i=0; i<store.months.length; i++){
//     if(months[i].monthName === monthName){
//       array.push(months[i].monthName)
//     }
//   }
//   res.json(array)
// })

// monthsRouter
  // .route('/:monthName')
  // .get((req, res) => {
  //   const {monthName} = req.params
  //   const month = store.months.find(i => i.monthName == monthName)
    
  //   res.json(month)
  // })
