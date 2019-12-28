const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')

const initialNotes = [
    {
      content: 'HTML is easy',
      date: new Date(),
      important: false,
    },
    {
      content: 'Browser can execute only Javascript',
      date: new Date(),
      important: true,
    },
]

beforeEach(async() => {
    await Note.deleteMany({})

    let newObject = new Note(initialNotes[0])
    await newObject.save()

    newObject = new Note(initialNotes[1])
    await newObject.save()

})

test('All notes are reutnred ', async () => {
    const response = await api.get('/api/notes')
  
    expect(response.body.length).toBe(initialNotes.length)
  })

test('the specified note is within the given not ', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(r => r.content)
    expect(contents).toContain('Browser can execute only Javascript')
})

test('a valid note can be added or note?', async () => {
    const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
    }
    await api 
        .post('/api/notes/')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/notes')
    const contents = response.body.map(r => r.content)
    
    expect(response.body.length).toBe(initialNotes+1)
    expect(contents.length).toBe(initialNotes)
})

afterAll(()=> {
    mongoose.connection.close()
})