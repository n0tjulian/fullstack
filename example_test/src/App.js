import React, {useState,useEffect} from 'react'
import Note from './components/Note'
import axios from 'axios'


const App = () => {

  const [notes,setNotes] = useState([])
  const [text,setText] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/notes').then(response => {
      console.log('promise fulfilled, notes retrieved')
      setNotes(response.data)
    })
  },[])


  console.log('render' , notes.length, 'notes')


  const addNote = (event) => {
    event.preventDefault()
    console.log('button cicked', event.target)
    var newNoteObject = {
      id:notes.length+1,
      content:text,
      date: new Date().toISOString(),
      important:Math.random() < 0.5
    }
    var newNotes = notes.concat(newNoteObject)
    setNotes(newNotes)
    setText('')
  }


  const updateTextField = (event) => {
    event.preventDefault()
    setText(event.target.value)
  }

  const updateShowAll = () => { //caused by pressing button
    setShowAll(!showAll)
  }

  const notesToShow = showAll ? notes:notes.filter(note=>note.important)


  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map((note) => 
        <Note key={note.id} note={note}/> //key is added to the note component
        )}
      </ul>
      <form onSubmit={addNote} >
        <input value={text} onChange = {updateTextField}/>
        <button type="submit">save</button>
      </form>
      <button onClick={updateShowAll}>{showAll?'important' : 'all'}</button>
    </div>
  )
}

export default App