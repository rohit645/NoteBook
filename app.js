const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(cors())    
app.use(express.static('build'))
app.use(bodyParser.json())

console.log('connecting to..', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true})
    .then(response => {
        console.log('connected to database')
    })
    .catch(error => {
        console.log('error connecting to database, ', error.message)
})

app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app