const path = require('path')
const express = require('express')
const store = require('../store')


const monthsRouter = express.Router()
// const bodyParser = express.json()
const jsonParser = express.json()

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


monthsRouter
.route('/')
  .get((req, res) => {
    res.json(store.months)
  })
  // .get((req, res, next) => {
  //   MonthsService.getAllMonths()
  //     .then(months => {
  //       res.json(months.map(serializeMonth('store')))
  //     })
  //     .catch(next)
  // })
  .post(jsonParser, (req, res, next) => {
      //'monthName','mealName', 'result', 'date', 'description', 'dtype'
    const { monthName, mealName, result, date, description,dtype } = req.body
    const newMonth = { monthName, mealName, result, date, description,dtype}

    for (const [key, value] of Object.entries(newMonth))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

      .then(month => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${month.monthName}`))
          .json(serializeNote(month))
      })
      .catch(next)
  })

  //
  //
//   .post(bodyParser, (req, res) => {
//     for (const field of ['monthName','mealName', 'result', 'date', 'description', 'dtype']) {
//       if (!req.body[field]) {
//         return res.status(400).send(`'${field}' is required`)
//       }
//     }
//     if (!Number.isInteger(result) || result < 60 || result > 300) {
//       return res.status(400).send(`'result' must be a number between  60 and 300`)
//     }
//     if (!isWebUri(url)) {
//       logger.error(`Invalid url '${url}' supplied`)
//       return res.status(400).send(`'url' must be a valid URL`)
//     }

//     const month = { id: uuid(), monthName,mealName, result, date, description, dtype }

//     store.months.push(month)

//     res
//       .status(201)
//       .location(`http://localhost:8002/months/${month.id}`)
//       .json(month)
//   })


  monthsRouter
  .route('/:monthName')
  .get((req, res) => {
    const {monthName} = req.params
    const month = store.months.find(i => i.monthName == monthName)
    (...monthName)
    res.json(month)
  })



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