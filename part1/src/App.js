import React from 'react'

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/n0tjulian">n0tjulian</a>
    </div>
  )
}
const Hello = (props) => {
  return(
    <div>
      <p>Hello {props.name} , you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  console.log("hello from component")
  const now = new Date()
  const a = 10
  const b = 20
  return(
  <div>
    <p>Hello world it is {now.toString()}</p>
    <p> {a} plus {b} is {a+b}</p>
    <Hello name="Jeoffrey" age="32"/>
    <Hello name="David" age="24"/>
    <Footer />
  </div>
  )
  
  }

export default App