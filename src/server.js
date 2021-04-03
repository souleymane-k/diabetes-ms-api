const app = require('./app');
const { PORT } = require('./config');
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);



 app.get('/api/*', (req, res) => {
   res.json({ok: true});
 });
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

module.exports = {app};





// const PORT = process.env.PORT || 3000;

