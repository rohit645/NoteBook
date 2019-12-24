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
    console.log('Got a get request!!')
    Note
    .find({})
    .then(notes => {
        res.json(notes.map(note => note.toJSON()))
    })
})

app.get('/api/notes/:id', (req, res, next) => {
    console.log('Got a get request for a particular ID !!')
    Note.findById(req.params.id)
    .then(note => {
        if(note)
            res.json(note.toJSON())
        else 
            res.status(404).end()
    })
    .catch(error => next(error))
}) 

app.post('/api/notes', (req, res) => {
    console.log('Got a POST request!!')
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
    .catch(error => {
        console.log('error occured!!', error.message)
        error => next(error)
    })
})

app.delete('/api/notes/:id', (req, res, next) => {
    console.log('Got a DELETE request!!')
    Note.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).send('Deleted successfully')
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (req, res, next) => {
    console.log('Got a UPDATE request!!')
    const body = req.body
    
    const note = {
        content: body.content,
        important: !body.important
    }
    Note.findByIdAndUpdate(req.params.id, note, {new: true})
        .then(updatedNote => updatedNote.toJSON())
        .then(savedAndFormattedNote => {
            res.json(savedAndFormattedNote)
        })
        .catch(error => next(error))
})

app.listen(port, () => {
    console.log(`server listening at port ${port}`)
})

const unknownEndPoint = (req, res) => {
    res.status(404).send({error: "unknown endpoint No route matched the request"})

}
app.use(unknownEndPoint)

const errorhandler = (error, req, res, next)  => {
    console.error(error.message)
    
    if(error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({error: 'malformatted id '})
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({error: error.message})
    }
    next(error)
}
app.use(errorhandler)
