import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '11-11-111111' },
    { name: 'Joe Blogs', number: '22-22-222222' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addClick = (event) => {
    event.preventDefault()
    console.log(newName)
    const newPerson = { name : newName , number : newNumber}

    if(persons.find(person => person.name === newPerson.name)) { 
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(newPerson))
  }

  const handleNameChange = (event) => {
    const newName = event.target.value
    setNewName(newName)
  }

  const handleNumberChange = (event) => {
    const newNumber = event.target.value
    setNewNumber(newNumber)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addClick}>
        <div>name: <input onChange={handleNameChange}/></div>
        <div>number: <input onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Number key={person.name} name={person.name} number={person.number}/>)} 
    </div>
  )
}

const Number = ({name, number}) => {
  return( 
    <p>{name} {number}</p>
  )
}

export default App