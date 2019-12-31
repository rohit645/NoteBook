const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (req) => {
	const authorization = require('authorization')
	if (authorization &&  authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7)
	}
	return null
}

notesRouter.get('/', async (req, res) => {
        const notes = await Note.find({}).populate('user', {notes: 1, username: 1})
        res.json(notes.map(note => note.toJSON()))
})

notesRouter.get('/:id', async (req, res, next) => {
        const note = await Note.findById(req.params.id)
        if(note) {
                res.json(note.toJSON())
        } else {
                res.status(404).end()
        }
})

notesRouter.post('/', async (req, res, next) => {
	const token = getTokenFrom(req)
	const body = req.body

	try {
		const decodedToken = jwt.verify(token, process.env.SECRET)
		if(!token || !decodedToken) {
			return res.status(401).json({
				error: 'Tokken missing or invalid!'
			})
		}
		const user = await User.findById(decodedToken.id)
	
		const note = new Note({
			content: body.content,
			important: Math.important > 0.5,
			date: new Date(),
			user: user._id
		})
		
		const savedNote = await note.save()
		user.notes = user.notes.concat(savedNote._id)
		await user.save()
		res.json(savedNote.toJSON())
	} catch(exception) {
		next(exception)
	}
})

notesRouter.delete('/:id', (req, res, next) => {
        Note.findByIdAndRemove(req.params.id)
          .then(() => {
                res.status(204).end()
          })
          .catch(error => next(error))
})

notesRouter.put('/:id', (req, res, next) => {
	console.log('Put request has been made!!')
	const body = req.body
        const note = {
          content: body.content,
          important: body.important,
        }
    console.log(note)
    Note.findByIdAndUpdate(req.params.id, note, {new:true})
        .then(updatedNote => {
            res.json(updatedNote.toJSON())
        })
        .catch(error => next(error))

        // Note.findByIdAndUpdate(req.params.id, note, { new: true })
        //   .then(updatedNote => {
        //     res.json(updatedNote.toJSON())
        //   })
        //   .catch(error => next(error))
  })

module.exports = notesRouter
