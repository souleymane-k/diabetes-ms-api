const ResultsService = {
    getAllResults(knex) {
      return knex.select('*').from('diabetes_results')
    },
  
    insertNote(knex, newResult) {
      return knex
        .insert(newResult)
        .into('diabetes_results')
        .returning('*')
        .then(rows => {
          console.log(rows[0])
          return rows[0]
        
        })
    },
  
    getById(knex, id) {
      return knex
        .from('diabetes_results')
        .select('*')
        .where('id', id)
        .first()
    },
  
    deleteNote(knex, id) {
      return knex('diabetes_results')
        .where({ id })
        .delete()
    },
  
    updateNote(knex, id, newResultFields) {
      return knex('diabetes_results')
        .where({ id })
        .update(newResultFields)
    },
  }
  
  module.exports = ResultsService