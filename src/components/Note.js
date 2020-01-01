import react from 'react'

const Note = ({note, changeimportance}) => {
    const label = note.important ? 'make not important' : 'make important'
    if(!showAll && !note.important) return null

    return(
	<li className="note">{note.content}
	    <button onClick = {() => changeimportance(note.id)}> {label} </button>
	</li>
    )	
}

export default Note