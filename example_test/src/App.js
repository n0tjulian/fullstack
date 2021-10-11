import React, {useState,useEffect} from 'react'
import Note from './components/Note'
import Form from './components/Form'
import Notification from './components/Notification'
import noteService from './services/notes'


const App = () => {

  const [notes,setNotes] = useState([])
  const [text,setText] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage,setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    noteService.getAll().then(initialNotes => {
      console.log('promise fulfilled, notes retrieved')
      setNotes(initialNotes)
    }).catch(error => {
      console.log("error in getAll call in APP",error)
    })
  },[])


  const toggleImportanceOf = (id) => {
    console.log('importance of ' + id + ' needs to be toggled')
    const note = notes.find(n => n.id === id)
    const changedNote = {...note,important:!note.important}

    noteService.update(id,changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id !== id? note : returnedNote))
    }).catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter(n=>n.id!==id))
      })
          
  }

  const addNote = (event) => {
    event.preventDefault()
    console.log('button cicked', event.target)
    var newNoteObject = {
      // id:notes.length+1,
      content:text,
      date: new Date().toISOString(),
      important:Math.random() < 0.5
    }

    noteService.create(newNoteObject).then(
      returnedNote => {
        console.log(returnedNote)
        var newNotes = notes.concat(returnedNote)
        setNotes(newNotes)
        setText('')
      }
    ).catch(error => {
      console.log("error in create in App add note",error)
    })
    
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
      <Notification message={errorMessage} />
      <ul>
        {notesToShow.map((note) => 
        <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/> //key is added to the note component
        )}
      </ul>
      
      <Form addNote={addNote} updateTextField={updateTextField} updateShowAll={updateShowAll} notesToShow={notesToShow} showAll={showAll} text={text}/>
      <button onClick={updateShowAll}>{showAll?'important' : 'all'}</button>
      
    </div>
  )
}



export default App