const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')

console.log('connecting to..', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true})
    .then(response => {
        console.log('connected to MONGODB')
    })
    .catch(error => {
        console.log('error connecting to mongoDB', error.message)
    })

app.use(cors())    
app.use(express.static('build'))
app.use(bodyParser.json())

app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app