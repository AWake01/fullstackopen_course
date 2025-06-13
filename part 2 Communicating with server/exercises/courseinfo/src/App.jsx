const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
    ]
  }

  return <Course course={course} />
}

const Course = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
      <Content content={course.parts}></Content>
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

export default App