import React from 'react';


const Form = ({addNote,updateTextField,text}) => {
    return(
      <div>
         <form onSubmit={addNote} >
          <input value={text} onChange = {updateTextField}/>
          <button type="submit">save</button>
        </form>
      </div>
    )
  }

export default Form;