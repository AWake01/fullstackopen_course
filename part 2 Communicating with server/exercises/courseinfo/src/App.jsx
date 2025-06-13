import { useState } from "react"

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  const [total, setTotal] = useState(0)

  return (
    <div>
      {/* <Course course={course}/>  */}
      {courses.map(course => <Course key={course.id} course={course}></Course>)}
    </div>
  )
}

const Course = ({course}) => {
  const calcTotal = ({course}) => {
    const content = course.parts
    const newTotal = content.reduce((acc, part) => acc + part.exercises, 0)
    console.log(newTotal)
    return newTotal
  }

  return (
    <div>
      <h1>{course.name}</h1>
      <Content content={course.parts}/>
      <Total total={calcTotal({course})}/>
    </div>
  )
}

const Content = ({content}) => {
  return (
    <div>
      {content.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}></Part>)}
    </div>
  )
}

const Part = ({id, name, exercises}) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Total = ({total}) => {
  return (
    <h4>total of {total} exercises</h4>
  )
}

export default App