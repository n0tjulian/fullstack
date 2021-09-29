const Course = ({course}) => {
    return(
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((sum,part) => {
      return sum+=part.exercises
    },0)
    return(
      <h4>Total of {sum} exercises</h4>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => { //maps all the courses parts to components
    return (
      <div>
        {course.parts.map((part) => {
          return <Part key={part.id} part={part} /> //key is used to avoid error
        })}
       
      </div>
    )
  }

  export default Course;