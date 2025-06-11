const App = () => {
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
      <Header title={course.name}/>
      <Content p1={course.parts[0].name} e1={course.parts[0].exercises} p2={course.parts[1].name} e2={course.parts[1].exercises} p3={course.parts[2].name} e3={course.parts[2].exercises}/>
      <Total value = {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}

const Header = (props) => {
  return(
    <h1>{props.title}</h1>
  )
}

const Content = (props) => {
  return(
    <p>
      <Part title={props.p1} exercises={props.e1}/>
      <Part title={props.p2} exercises={props.e2}/>
      <Part title={props.p3} exercises={props.e3}/>
    </p>
  )
}

const Part = (props) => {
  return(
    <p>
      {props.title} {props.exercises}
    </p>
  )
}

const Total = (props) => {
  return(
    <p><br/>Number of exercises {props.value}</p>
  )
}

export default App