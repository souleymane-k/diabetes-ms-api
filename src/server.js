const app = require('./app');
const { PORT } = require('./config');

// const PORT = process.env.PORT || 3000;

 app.get('/api/*', (req, res) => {
   res.json({ok: true});
 });
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

//API_TOKEN: 2ad6cd5c-17ed-4b7a-9309-8252fb3eb820

//.env PORT=8001
//EXAMPLE="example-environment-variable"