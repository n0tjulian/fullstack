
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

  const Notification = ({message,positive}) => {
    if(message===null){
        return null
    }
    if(positive){
        return(
            <div className="success">
                {message}
            </div>
        )
    }else{
        return(
            <div className="error">
                {message}
            </div>
        )
    }
  }

  export {Numbers,Filter,Form,Notification}