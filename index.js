// const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
var port = process.env.PORT || 3001
// convert json obejct of req.body into javascript object and attaches it again to req.body 
// before its route handle app.post is called 
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

var notes =  [
      {
        "id": 1,
        "content": "HTML is easy",
        "date": "2019-05-30T17:30:31.098Z",
        "important": false
      },
      {
        "id": 2,
        "content": "Browser can execute only Javascript",
        "date": "2019-05-30T18:39:34.091Z",
        "important": true
      },
      {
        "id": 3,
        "content": "GET and POST are the most important methods of HTTP protocol",
        "date": "2019-05-30T19:20:14.298Z",
        "important": false
      }
    ]

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0;
    return maxId + 1
}

app.get('/', (req, res) => {
    console.log('Hey it s a home page!')
    res.send('<h1>Hello world!!</h1>')
})

app.get('/api/notes', (req, res) => {
    console.log('Hey i got a get request')
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    // console.log(note);
    if(note)
        res.json(note)
    else 
        res.status(404).end()
}) 

app.post('/api//notes', (req, res) => {
    console.log('Hey i got a post request')
    const body = req.body
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        })
        
    }
    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date().toISOString(),
        id: generateId()
    }
    console.log(note);
    notes.concat(note)
    res.json(note)
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    // const dummy_notes = notes
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

app.listen(port, () => {
    console.log(`server listening at port ${port}`)
})