const ResultsService = {
  getAllResults(db, userId) {
    return db('diabetes_results').select('*').where({ user_id: userId }).orderBy('resultDate', 'desc')
  },

  insertResult(db, result) {
    return db('diabetes_results').insert(result).returning('*').then(rows => rows[0])
  },

  getById(db, id, userId) {
    return db('diabetes_results').select('*').where({ id, user_id: userId }).first()
  },

  deleteResult(db, id, userId) {
    return db('diabetes_results').where({ id, user_id: userId }).delete()
  },

  updateResult(db, id, userId, changes) {
    return db('diabetes_results').where({ id, user_id: userId }).update(changes)
  },
}

module.exports = ResultsService
