const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const filesRoute = require('./routes/file')
const mongoose = require('mongoose');
const fileupload = require('express-fileupload')

const URI = 'mongodb+srv://mongo-user:mongo-user@cluster0-8vn6o.mongodb.net/file?retryWrites=true&w=majority'


mongoose
     .connect( URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));

app.use(bodyParser.json())
app.use(fileupload())
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl} ${req.body}`)
  next()
})

app.use(filesRoute)

// Handler for 404 - Resource Not Found
app.use((req, res, next) => {
    res.status(404).send({
      success: "false",
      message: "Endpoint does not exist!"
    })
})

// Handler for Error 500
app.use((err, req, res, next) => {
  res.status(500).send({
    success: "false",
    message: "Something went wrong!"
  })
    // res.sendFile(path.join(__dirname, '../public/500.html'))
}) 


const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.info(`Server started on port ${PORT}`))
