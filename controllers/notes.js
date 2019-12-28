const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (req, res) => {
    const notes = await Note.find({}).populate('user')
    res.json(notes.map(note => note.toJSON()))
})

notesRouter.get('/:id', async (req, res, next) => {
	const note = await Note.findById(req.params.id)
	if(note) {
		res.json(note.toJSON())
	} else {
		res.status(404).end()
	}
	// Note.findById(req.params.id)
	// 	.then(note => {
	// 		if (note) res.json(note.toJSON())
	// 		else res.status(404).end()
	// 	})
	// 	.catch(error => next(error))
})

notesRouter.post('/', async (req, res, next) => {
    body = req.body
    const user = await User.findById(req.body.userid)
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
    // note.save()
    //     .then(savedNote => {
    //         res.json(savedNote.toJSON())
    //     })
    //     .catch(error => next(error))
})

notesRouter.delete('/:id', (req, res, next) => {
	Note.findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(204).end()
      })
      .catch(error => next(error))
})

notesRouter.put('/:id', (req, res, next) => {
    const body = req.body
    const note = {
      content: body.content,
      important: body.important,
	}
	const updatedNote = Note.findByIdAndUpdate(req.params.id, note, {new:true})
	res.json(updatedNote.toJSON())
    // Note.findByIdAndUpdate(req.params.id, note, { new: true })
    //   .then(updatedNote => {
    //     res.json(updatedNote.toJSON())
    //   })
    //   .catch(error => next(error))
  })

module.exports = notesRouter
