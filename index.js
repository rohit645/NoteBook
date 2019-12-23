// const http = require('http')
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT
const Note = require('./models/note')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

app.get('/api/notes', (req, res) => {
    Note
    .find({})
    .then(notes => {
        res.json(notes.map(note => note.toJSON()))
    })
})

app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id)
    .then(note => {
        res.json(note.toJSON())
    })
}) 

app.post('/api/notes', (req, res) => {
    const body = req.body
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        })   
    }
    const note = new Note({
        content: body.content,
        important: body.important || Math.random() > 0.5,
        date: new Date().toISOString()
    })
    note.save()
    .then(savedItem => {
        console.log('note saved successfully')
        res.json(savedItem.toJSON())
    })
})

// app.delete('/api/notes/:id', (req, res) => {
//     const id = Number(req.params.id)
//     notes = notes.filter(note => note.id !== id)
//     res.status(204).end()
// })

app.listen(port, () => {
    console.log(`server listening at port ${port}`)
})