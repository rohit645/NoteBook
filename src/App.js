import React, {useState, useEffect} from 'react'
import axios from 'axios'
import noteService from './services/Note'

const duplicate = (value, data) => {
	console.log('value', value);
	var ans = false
	data.forEach(ele => {
		console.log('ele.content',ele.content)
		if(ele.content.toLowerCase() === value.toLowerCase()) {
			ans = true
		}
	});
	return ans
}

const Error = (content, errorHandler, notehandler) => {
	errorHandler(content)
	notehandler('')
	setTimeout(() => {
		errorHandler(null)
	}, 3000);
}

const App = () => {
	const [notes, setnotes] = useState([])
	const [newNote, setnewNote] = useState('')
	const [errorMessage, seterrorMessage] = useState('')
	const [showAll, setshowAll] = useState(true)

	console.log(notes)
	
	const fetchData = () => {
		console.log('inside fetch Data')
		noteService
		.getAll()
		.then(initialnotes => {
			console.log('fetcing is finaly complete ugh!!')
			setnotes(initialnotes)
		})
	}
	useEffect(fetchData, [])
	
	const handleNoteChange = (event) => {
		console.log('handle note change', newNote)
		setnewNote(event.target.value)
	}
	
	const addNote = (event) => {
		event.preventDefault()
		if (duplicate(newNote, notes)) {
			const message = `note with content "${newNote}" is duplicate`
			Error(message, seterrorMessage, setnewNote)
			return
		}
		const newObject = {
			id: notes.length + 1,
			content: newNote,
			important: Math.random() > 0.5,
			date: new Date().toISOString()
		}
		console.log(newObject);
		noteService
		.create(newObject)
		.then(newData => {
			console.log('post request has been made to server')
			setnotes(notes.concat(newData))
			setnewNote('')
		})
	}

	const Notification = ({message}) => {
		if (message === null) {
		}
		
		return(
			<div className="error">
				{message}
			</div>
		)
	}

	const changeimportance = (id) => {
		const note = notes.find(note => note.id === id)
		const changedNote = {
			...note,
			important: !note.important
		}
		noteService
		.update(id, changedNote)
		.then(updatedData => {
			setnotes(notes.map(note => note.id === id ? updatedData : note))
		})
		.catch(error => {
			const message = `note with content "${note.content}" not found in our database`
			Error(message ,seterrorMessage, setnewNote)
		})
		setnotes(notes.filter(note => note.id !== id))	
	}

	const Note = ({note}) => {
		const label = note.important ? 'make not important' : 'make important'
		if(!showAll && !note.important) return null

		return(
			<li className="note">{note.content}
				<button onClick = {() => changeimportance(note.id)}> {label} </button>
			</li>
		)	
	}
							
	return(
		<div>
		<h1>Fetched data</h1>
			show important
		<button onClick={() => setshowAll(!showAll)}>
			Show Important 	
		</button>
		<ul>
			{notes.map((note) => <Note note = {note} key = {note.id} />)}
		</ul>
		<Notification message = {errorMessage} />
		<form onSubmit={addNote}>
			<h1>
				Add new notes here!
			</h1>
			<input value={newNote} onChange={handleNoteChange} id="first"/>
			<button type="submit"> 
				Add
			</button>
		</form>
	</div>)
}

export default App
