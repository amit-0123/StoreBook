// importing of the express
const connectToMongo = require('./db');
// Express. js (or simply Express) is a web application server framework for Node. js, and MongoDB is a general-purpose document database platform
// importing of the express
const express = require('express')
var cors = require('cors')

//connect to database
connectToMongo();

// Add Express middleware and parser:
// express middleware
const app = express()
const port = 5000

app.use(cors())

// middleware is used to use req.body
//body parser
app.use(express.json())  // To parse JSON bodies


// available Routes
// To use this router in your main server file, you would do something like this:

app.use('/api/auth',require('./routes/auth'))
      // or
// const authRouter = require('./routes/auth');   // Adjust the path as needed
// app.use('/api/auth', authRouter);

app.use('/api/notes',require('./routes/notes'))


// app.get('/api/v1/login', (req, res) => {
//   res.send('Hello login!')
// })

// app.get('/api/v1/signup', (req, res) => {
//     res.send('Hello signup!')
//   })

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})