import React, { useState } from 'react'

const Button = (props) => {
  return(
    <div>
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  )
}
const MaxVotes = ({votes,anecdotes}) => {

  let maxIndex = 0
  let max = 0

  for(let i=0;i<votes.length-1;i++){
    if(votes[i] > max ){
      max = votes[i]
      maxIndex = i
    }
  }

  return (
    <div>
    <p>{anecdotes[maxIndex]}</p>
      <p>has {max}</p>
    </div>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState(Array(anecdotes.length-1).fill(0))

  const generateNewNumber = () => {
    const newIndex = Math.floor(Math.random()*(anecdotes.length-1))
    setSelected(newIndex)
  }

  const voteAnecdote = () => {//gets the current anecdotes index and creates a n
    const newVoteArray = [...votes]
    newVoteArray[selected]+=1
    setVotes(newVoteArray)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={generateNewNumber} text="new anecdote"/>
      <Button onClick={voteAnecdote} text="vote anecdote"/>

      <h1>anecdote with the most votes</h1>
      <MaxVotes votes={votes} anecdotes={anecdotes}/>
      
    </div>
  )
}

export default App