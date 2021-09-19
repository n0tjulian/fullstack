import React, { useState } from 'react'

const Button = (props) => {
  return(
    <div>
      <button onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  )
}
const StatisticLine = (props) => {

  return(

    <tr>

      <td>
        {props.text} 
      </td>

      <td>
        {props.value}
      </td>

    </tr>
     
  )
}
const Statistics = (props) => {

  const totalVotes = props.good+props.bad+props.neutral
  const positive = props.good/totalVotes
  const average = ((props.good+((-1)*props.bad))/totalVotes)*100
  const positiveString = String(positive*100) + " %"
  
  if(totalVotes>0){
    return(
      <div>
        <table>
          <tbody>
            
              <StatisticLine text="good" value={props.good}/>
              <StatisticLine text="neutral" value={props.neutral}/>
              <StatisticLine text="bad" value={props.bad}/>
              <StatisticLine text="all" value={totalVotes}/>  
              <StatisticLine text="average" value={average}/>
              <StatisticLine text="positive" value={positiveString}/>
            
          </tbody>
        </table>
      </div>
    )}

  return(
    <div>
      no feedback given
    </div>

  )
}

const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  const goodInc = () => {
    setGood(good+1)
  }
  const neutralInc = () => {
    setNeutral(neutral+1)
  }
  const badInc = ()=> {
    setBad(bad+1)
  }

  //confitional render based on totalVotes
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodInc} text='good' />
      <Button onClick={neutralInc} text='neutral' />
      <Button onClick={badInc} text='bad' />

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad}/>
      
      
    </div>
  )
}

export default App