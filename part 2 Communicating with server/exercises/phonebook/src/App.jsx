import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Joe Blogs' }
  ]) 
  const [newName, setNewName] = useState('')

  const addClick = (event) => {
    event.preventDefault()
    console.log(newName)
    const newPerson = { name: newName }
    setPersons(persons.concat(newPerson))
  }

  const handleNameChange = (event) => {
    const newName = event.target.value
    setNewName(newName)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addClick}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Number key={person.name} name={person.name}/>)} 
    </div>
  )
}

const Number = ({name}) => {
  return( 
    <p>{name}</p>
  )
}

export default App