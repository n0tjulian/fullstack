import React, { useState, useEffect} from 'react'
import peopleService from './services/people'
import {Form,Numbers,Filter,Notification} from './components/phoneBookComponents'

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newSearch,setNewSearch] = useState('')
  const [errorMessage,setErrorMessage] = useState(null)
  const [successMessage,setSuccessMessage] = useState(null)

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
        setSuccessMessage(`${returnedPerson.name} has been added successfully`)
        
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        
        setNewName('')
        setNewNumber('')
      }
      )

    }else{

      const foundPerson = persons.filter(person => person.name === newName)
      alert(`${newName} is already in the phonebook, would you like to replace the number?`)
      
      peopleService.update(foundPerson[0].id,newPerson).then(response => {
          setSuccessMessage(`${newName}'s number has been changed`)
          setTimeout(()=>{
            setSuccessMessage(null)
          },5000)

          const newPersonsList = persons.map(person => {
            if(person.id === foundPerson[0].id){
              person = {...newPerson,id:foundPerson[0].id}
            }
            return person
          })
          
          setPersons(newPersonsList)
          setNewName('')
          setNewNumber('')
        
        }).catch(error => {
          setErrorMessage(`${newName} has been removed from the server`)
          setTimeout( () => {
            setErrorMessage(null)
          },5000)
          const newPersonsList = persons.filter(person => person.name !== newName)
          setPersons(newPersonsList)
          setNewName('')
          setNewNumber('')
        })
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
      setSuccessMessage(`${foundPerson.name} has been deleted`)
      setTimeout(() => {
        setSuccessMessage(null)
      },5000)
    }).catch(error => {
      setErrorMessage(`that entry has already been deleted`)
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    })

    const newPersonArray = persons.filter(person => person.id !==foundPerson.id)
    setPersons(newPersonArray)
  }

  const calculateSearchResults = () => {
    const result = persons.filter((person) => {
      return person.name.toLowerCase().includes(newSearch.toLowerCase())
    }
    )
    return result
  }

  const resultsToShow = calculateSearchResults()
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} positive={false}/>
      <Notification message={successMessage} positive={true}/>

      <Filter searchFilter={newSearch} filterFunction={updateSearchField}/>
      
      <Form newNameValue={newName} updateInputFieldFunction={updateInputField}
        newNumberValue={newNumber} updateNumberFieldFunction={updateNumberField} addPersonFunction={addPerson}/>
      
      <Numbers people={resultsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App