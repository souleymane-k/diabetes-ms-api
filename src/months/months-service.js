const MonthsService = {
    getAllMonths(knex){
        return knex
        .select('*')
        .from('months')
    },
    
   insertMonths(knex, newMonth) {
             return knex
              .insert(newMonth)
              .into('Months')
              .returning('*')
              .then(rows =>{
                  return rows[0]
              })
           },
     getById(knex, id) {
               return knex
               .from('months')
               .select('*')
               .where('id', id)
               .first()
            },
    
     deleteMonth(knex, id) {
             return knex('months')
                .where({ id })
                .delete()
                 },

                 
     updateMonth(knex, id, newMonthFields) {
                return knex('months')
                    .where({ id })
                    .update(newMonthFields)
                     },
    
     
        }
    
    
    module.exports = MonthsService