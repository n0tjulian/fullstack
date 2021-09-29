import React, { useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newSearch,setNewSearch] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3005/persons').then(response => {
      setPersons(response.data)
    })
  },[])


  const addPerson = (event) => {
    event.preventDefault()
    console.log(`adding person with name ${newName}`)
    const found = (person) => person.name === newName

    if(!(persons.some(found))){

      let newPerson = {
        name:newName,
        number:newNumber,
        id:persons.length+1
      }

      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')

    }else{
      alert(`${newName} is already in the phonebook`)
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
    console.log(newNumber)
    setNewNumber(event.target.value)
  }

  const updateSearchField = (event) => {
    event.preventDefault()
    console.log(newSearch)
    setNewSearch(event.target.value)
  }

  const calculateSearchResults = () => {
    console.log("inside calculating search results")
    console.log(`strings must contain ${newSearch}`)
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
      <Numbers people={resultsToShow}/>
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
  
      {props.people.map((person) => <Person key={person.id} name={person.name} number={person.number}/>)}
      
    </div>
  )

}

const Person = (props) => {
  return(
    
    <p>{props.name} {props.number}</p>
    
  )
}

export default App