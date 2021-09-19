import React, {useState} from 'react'


const Header =  (props) => {
  return(
    <div>
      <h1>{props.course}</h1>
    </div>

  )
}
const Part = (props) => {
  return(
    <div>
      <p>{props.part} : {props.exercise}</p>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>total number of exercises is {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}</p>

    </div>
  )

}
const App = () => {

  const [counter,setCounter] = useState(0)

  const handleClick = () => {
    console.log("clicked")
    console.log(`counter : ${counter}`)
    setCounter(counter+1)
  }
  const resetClicks = () => {
    setCounter(0)
  }
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
      <button onClick={handleClick}>
        plus : {counter}
      </button>
      <button onClick={resetClicks}>
        reset
      </button>

    </div>
  )
}

export default App