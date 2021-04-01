const path = require('path')
const express = require('express')
const store = require('../store')


const monthsRouter = express.Router()
// const bodyParser = express.json()
const jsonParser = express.json()



monthsRouter
.route('/')
  .get((req, res) => {
    res.json(store.months)
  })
  

  monthsRouter
  .route('/monthName')
  .get((req, res) => {
    const {monthName} = req.params
    const month = store.months.find(i => i.monthName == monthName)
    
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
