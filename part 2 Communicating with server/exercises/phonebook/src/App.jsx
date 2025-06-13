import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

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
    const newName = event.target.values
    setNewName(newName)
  }

  const handleNumberChange = (event) => {
    const newNumber = event.target.value
    setNewNumber(newNumber)
  }

   const handleSearchChange = (event) => {
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))  //Case sensitvie
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>name: <input onChange={handleSearchChange}/></div>
      <h2>Add a new</h2>
      <form onSubmit={addClick}>
        <div>name: <input onChange={handleNameChange}/></div>
        <div>number: <input onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person => <Number key={person.name} name={person.name} number={person.number}/>)} 
    </div>
  )
}

const Number = ({name, number}) => {
  return( 
    <p>{name} {number}</p>
  )
}

export default App