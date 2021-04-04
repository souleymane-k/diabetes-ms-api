require("dotenv").config();
const knex=require('knex');
const app =require('./app');
const { PORT, DATABASE_URL } = require('./config');
const pg = require('pg');


const { PORT, DATABASE_URL } = require('./config')
const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
  })

// pg.defaults.ssl = process.env.NODE_ENV ==="development"?
// {rejectUnauthorized:false}:false
// const db = knex({
//   client:"pg",
//   connection:DATABASE_URL,
//   ssl: true,
//     extra: {
//       ssl: {
//         rejectUnauthorized: false
//       },
//     },
// });



app.set("db", db);

app.listen(PORT,() =>{
  console.log(`server listening at http://localhost:${PORT}`);
})

















// const app = require('./app');
// const { PORT } = require('./config');
// const cors = require('cors');
// const {CLIENT_ORIGIN} = require('./config');

// app.use(
//     cors({
//         origin: CLIENT_ORIGIN
//     })
// );



//  app.get('/api/*', (req, res) => {
//    res.json({ok: true});
//  });
// app.listen(PORT, () => {
//   console.log(`Server listening at http://localhost:${PORT}`)
// })

// module.exports = {app};





// const PORT = process.env.PORT || 3000;

