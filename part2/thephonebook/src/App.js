import React, { useState, useEffect} from 'react'
import peopleService from './services/people'

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newSearch,setNewSearch] = useState('')

  useEffect(() => {
    peopleService.getAll().then(retrievedPeople => {
      setPersons(retrievedPeople)
    })
  },[])


  const addPerson = (event) => {

    event.preventDefault()
    const foundFunction = (person) => person.name === newName

    let newPerson = {
      name:newName,
      number:newNumber,
    }

    let foundPersonBoolean = persons.some(foundFunction)
    if(!foundPersonBoolean){

      peopleService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      }
      )

    }else{

      const foundPerson = persons.filter(person => person.name === newName)
      alert(`${newName} is already in the phonebook, would you like to replace the number?`)
      
      peopleService.update(foundPerson[0].id,newPerson).then(response => {
        console.log(`${newName}'s number has been changed'`)
      })

      const newPersonsList = persons.map(person => {
        if(person.id === foundPerson[0].id){
          person = {...newPerson,id:foundPerson[0].id}
        }
        return person
      })
      
      setPersons(newPersonsList)
      setNewName('')
      setNewNumber('')

      }

  }

  const updateInputField = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const updateNumberField = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const updateSearchField = (event) => {
    event.preventDefault()
    setNewSearch(event.target.value)
  }

  const deletePerson = (event) => {
    const foundPerson = persons.find(found => {
      if(parseInt(found.id) === parseInt(event.target.value)){
        return found
      }
    })
      
    alert(`do you want to delete ${foundPerson.name}`)
    peopleService.deletePerson(foundPerson.id).then(response=>{
      console.log(`${foundPerson.name} has been deleted`)
    })

    const newPersonArray = persons.filter(person => person.id !==foundPerson.id)
    setPersons(newPersonArray)
  }

  const calculateSearchResults = () => {
    const result = persons.filter((person) => {
      return person.name.toLowerCase().includes(newSearch.toLowerCase())
    }
    )
    console.log(result)
    return result
  }

  const resultsToShow = calculateSearchResults()
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchFilter={newSearch} filterFunction={updateSearchField}/>
      
      <Form newNameValue={newName} updateInputFieldFunction={updateInputField}
        newNumberValue={newNumber} updateNumberFieldFunction={updateNumberField} addPersonFunction={addPerson}/>
      
      <Numbers people={resultsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

const Form = ({newNameValue,updateInputFieldFunction,newNumberValue,updateNumberFieldFunction,addPersonFunction}) => {
  return (
    <form onSubmit={addPersonFunction}>
    <h3>Add someone new:</h3>
    <div>
      Name: <input value={newNameValue} onChange={updateInputFieldFunction}/>
    </div>
    <div>
      Number: <input value={newNumberValue} onChange={updateNumberFieldFunction}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

  )
}
const Filter = ({searchFilter,filterFunction}) => {
  return(
    <div>
      <input value={searchFilter} onChange={filterFunction}/>
    </div>
  )
}

const Numbers = (props) => {
  return(
    <div>
      <h3>
        Numbers
      </h3>
      {props.people.map((person) => <Person key={person.id} person={person} deletePerson={props.deletePerson}/>)}
    </div>
  )

}

const Person = ({person,deletePerson}) => {
  return(
    <div>
      <p>{person.name} {person.number} <button value={person.id} onClick={deletePerson}>delete</button></p>
    </div> 
  )
}

export default App