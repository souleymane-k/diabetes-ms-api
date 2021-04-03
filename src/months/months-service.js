const MonthsService = {
    getAllMonths(knex){
        return knex
        .select('*')
        .from('diabetes_months')
    },
    
   insertMonths(knex, newMonth) {
             return knex
              .insert(newMonth)
              .into('diabetes_months')
              .returning('*')
              .then(rows =>{
                  return rows[0]
              })
           },
     getById(knex, id) {
               return knex
               .from('diabetes_months')
               .select('*')
               .where('id', id)
               .first()
            },
    
     deleteMonth(knex, id) {
             return knex('diabetes_months')
                .where({ id })
                .delete()
                 },

                 
     updateMonth(knex, id, newMonthFields) {
                return knex('diabetes_months')
                    .where({ id })
                    .update(newMonthFields)
                     },
    
     
        }
    
    
    module.exports = MonthsService