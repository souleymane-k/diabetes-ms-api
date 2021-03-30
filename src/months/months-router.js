const path = require('path')
const express = require('express')
const store = require('../store')


const monthsRouter = express.Router()
const bodyParser = express.json()


// const month =() => ({
//     id: month.id,
//     monthName:month.name,
//     mealName: month.mealName,
//     result: month.result,
//     date: month.date,
//     description: month.description,
//     dtype: month.dtype,

//   })

monthsRouter
.route('/months')
  .get((req, res) => {
    res.json(store.months)
  })
  .post(bodyParser, (req, res) => {
    for (const field of ['monthName','mealName', 'result', 'date', 'description', 'dtype']) {
      if (!req.body[field]) {
        return res.status(400).send(`'${field}' is required`)
      }
    }


    if (!Number.isInteger(result) || result < 60 || result > 300) {
      return res.status(400).send(`'result' must be a number between  60 and 300`)
    }


    if (!isWebUri(url)) {
      logger.error(`Invalid url '${url}' supplied`)
      return res.status(400).send(`'url' must be a valid URL`)
    }

    const month = { id: uuid(), monthName,mealName, result, date, description, dtype }

    store.months.push(month)

    res
      .status(201)
      .location(`http://localhost:8002/months/${month.id}`)
      .json(month)
  })

//   monthsRouter
// .route('/months/:monthName')
//   .get((req, res) => {
//     res.json(store.months)
//   })

  monthsRouter
  .route('/months/:monthName')
  .get((req, res) => {
    const {monthName} = req.params

    // const month =() => ({
    //     id: month.id,
    //     monthName:month.name,
    //     mealName: month.mealName,
    //     result: month.result,
    //     date: month.date,
    //     description: month.description,
    //     dtype: month.dtype,
    
    //   }


    // const month = store.months.map((monthName, _i)=>{
    //     res.json(monthName)
    // })
    

    const month = store.months.find(i => i.monthName == monthName)

    // if (!month) {
    //   return res
    //     .status(404)
    //     .send('month Not Found')
    // }

    res.json(month)
  })

//   .route('/monthName')
//   .get((req, res) => {
//     const {monthName}  = req.params

//     const month = store.months.find(c => c.monthName == monthName)

//     //const month = store.months.find(monthName)

//     if (!month) {
//       return res
//         .status(404)
//         .send('month Not Found')
//     }

//     res.json(month)
//   })
   




// const MonthsService = require('./months-service')

// const monthsRouter = express.Router()
// const jsonParser = express.json()

// const serializeNote = month => ({
//   id: month.id,
//   name:month.name,
//   modified: month.modified,
//   content: month.content,
//   folderid: month.folderid
// })

// //id, name, modified, folderid, content

// monthsRouter
//   .route('/')
//   .get((req, res, next) => {
//     const knexInstance = req.app.get('db')
//     NotesService.getAllNotes(knexInstance)
//       .then(notes => {
//         res.json(notes.map(serializeNote))
//       })
//       .catch(next)
//   })

//   // start here
//   .post(jsonParser, (req, res, next) => {
//     const { name, modified, folderid, content } = req.body
//     const newNote = { name, modified, folderid, content}

//     for (const [key, value] of Object.entries(newNote))
//       if (value == null)
//         return res.status(400).json({
//           error: { message: `Missing '${key}' in request body` }
//         })

//     newNote.modified = modified;

//     NotesService.insertNote(
//       req.app.get('db'),
//       newNote
//     )
//       .then(note => {
//         res
//           .status(201)
//           .location(path.posix.join(req.originalUrl, `/${note.id}`))
//           .json(serializeNote(note))
//       })
//       .catch(next)
//   })

// notesRouter
//   .route('/:note_id')
//   .all((req, res, next) => {
//     NotesService.getById(
//       req.app.get('db'),
//       req.params.note_id
//     )
//       .then(note => {
//         if (!note) {
//           return res.status(404).json({
//             error: { message: `Note doesn't exist` }
//           })
//         }
//         res.note = note
//         next()
//       })
//       .catch(next)
//   })
//   .get((req, res, next) => {
//     res.json(serializeNote(res.note))
//   })
//   .delete((req, res, next) => {
//     NotesService.deleteNote(
//       req.app.get('db'),
//       req.params.note_id
//     )
//       .then(numRowsAffected => {
//         res.status(204).end()
//       })
//       .catch(next)
//   })
//   .patch(jsonParser, (req, res, next) => {
//     const { content, modified } = req.body
//     const noteToUpdate = {content, modified }

//     const numberOfValues = Object.values(noteToUpdate).filter(Boolean).length
//     if (numberOfValues === 0)
//       return res.status(400).json({
//         error: {
//           message: `Request body must contain either 'content' or 'modified'`
//         }
//       })

//     NotesService.updateNote(
//       req.app.get('db'),
//       req.params.note_id,
//       noteToUpdate
//     )
//       .then(numRowsAffected => {
//         res.status(204).end()
//       })
//       .catch(next)
//   })

module.exports = monthsRouter