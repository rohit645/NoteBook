import React, {useState, useEffect} from 'react'
import axios from 'axios'
import noteService from './services/Note'

const App = () => {
	const [notes, setnotes] = useState([])
	const [newNote, setnewNote] = useState('hey')
	console.log(notes)
	
	const fetchData = () => {
		console.log('inside fetch Data')
		noteService
		.getAll()
		.then(initialnotes => {
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
		console.log('inside add note', newNote)
		console.log('inside add note',notes)
		const newObject = {
			id: notes.length + 1,
			content: newNote,
			important: Math.random() > 0.5,
			date: new Date().toISOString()
		}
		
		noteService
		.create(newObject)
		.then(newData => {
			setnotes(notes.concat(newData))
			setnewNote('')
		})
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
			alert(`note with content "${note.content}" not found in our database`)
		})
	}

	const Note = ({note}) => {
		const label = note.important ? 'make not important' : 'make important'
		return(
			<li key={note.id}>{note.content}
				<button onClick = {() => changeimportance(note.id)}> {label} </button>
			</li>
		)	
	}
	
	return(
		<div>
		<p>Fetched data</p>
		<ul>
			{notes.map((note) => <Note note = {note} key = {note.id} />)}
		</ul>
		<form onSubmit={addNote}>
			<input value={newNote} onChange={handleNoteChange} id="first"/>
			<button type="submit"> 
				Add
			</button>
		</form>
	</div>)
}

export default App
