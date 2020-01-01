import React, {useState, useEffect} from 'react'
import noteService from './services/Note'
import loginService from './services/Login'
import Notification from './components/Notification'
import Note from './components/Note'

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
	const [username, setusername] = useState('')
	const [password, setpassword] = useState('')
	const [user, setuser] = useState(null)
	
	const loginform = () => (
		<form onSubmit={handleLogin}>
		<div>
			username 
			<input 
				type="text"
				value={username}
				name="username"
				onChange={handleusername}
			/>
		</div>
		<div>
			password 
			<input 
				type="password" value={password} name="password" onChange={handlepassword}
			/>
		</div>
		<button type="submit"> 
			login
		</button>
	</form>
	)

	const notesform = () => (
		<div>
			hello {user.username}
			<form onSubmit={addNote}>
				<h1>
					Add new notes here!
				</h1>
				<input value={newNote} onChange={handleNoteChange} id="first"/>
				<button type="submit"> 
					Add
				</button>
			</form>
		</div>
	)

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
	
	const handleusername = (event) => {
		console.log('handle username', username)
		setusername(event.target.value)
	}

	const handlepassword = (event) => {
		console.log('handle password',password)
		setpassword(event.target.value)
	}

	const addNote = (event) => {
		event.preventDefault()
		if (duplicate(newNote, notes)) {
			const message = `note with content "${newNote}" is duplicate`
			Error(message, seterrorMessage, setnewNote)
			return
		}
		const newObject = {
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
	// this part handles login 
	const handleLogin = async (event) => {
		event.preventDefault()
		console.log('started login process')
		try {
			const user = await loginService.login({username, password})
			setuser(user)
			setusername('')
			setpassword('')
		} catch(exception) {
			seterrorMessage('wrong credentials!')
			setTimeout(() => {
				seterrorMessage(null)
			}, 3000);
		}
	}

	const changeimportance = (id) => {
        console.log('id is',id)
		const note = notes.find(note => note.id === id)
		const changedNote = {
			...note,
			important: !note.important
		}
		noteService
		.update(id, changedNote)
		.then(updatedData => {
            console.log('now updating in frontend server has responded usually!!')
			setnotes(notes.map(note => note.id === id ? updatedData : note))
		})
		.catch(error => {
			const message = `note with content "${note.content}" not found in our database`
			Error(message ,seterrorMessage, setnewNote)
		})
		setnotes(notes.filter(note => note.id !== id))	
	}
							
	return(
		<div>
		<h1>Notes</h1>	
		<Notification message = {errorMessage} />
		<h2> 
			login
		</h2>
		{user === null ? loginform(): notesform()}
		{/* <button onClick={() => setshowAll(!showAll)}>
			Show Important 	
		</button> */}
		<ul>
			{notes.map((note) => <Note note = {note, changeimportance} key = {note.id} />)}
		</ul>
	</div>)
}

export default App
