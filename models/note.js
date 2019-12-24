require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
console.log(url)

mongoose.connect(url, {useNewUrlParser: true})
    .then(response => {
        console.log('connected to database')
    })
    .catch(error => {
        console.log('error connecting to database, ', error.message)
    })

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minlength: 5,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)