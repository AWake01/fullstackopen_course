const Course = ({course}) => {
  const calcTotal = ({course}) => {
    const content = course.parts
    const newTotal = content.reduce((acc, part) => acc + part.exercises, 0)
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

export default Course