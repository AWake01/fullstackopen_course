import { useState, useEffect} from 'react'
import axios from 'axios'
import personsService from './services/persons'

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },Arto Hellas
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }Arto Hellas
  // ]) 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initalPersons => {
        setPersons(initalPersons)
      })
  }, [])

  const addClick = (event) => {
    event.preventDefault()
    console.log(newName)
    const newPerson = { name : newName , number : newNumber}
    const foundPerson = persons.find(person => person.name === newPerson.name)
    const updatedPerson = { ...foundPerson, number: newPerson.number}

    if(foundPerson) { 
      if(confirm(`${foundPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .updatePerson(foundPerson.id, newPerson)
          .then(personToUpdate => {
            setPersons(persons.map(person => person.id === foundPerson.id ? personToUpdate : person))
            showErrorMessage(`Changed ${personToUpdate.name} number to ${personToUpdate.number}`)
        })
      }
    }
    else{ 
      personsService
        .createPerson(newPerson)
        .then(personToAdd => {
          console.log(personToAdd)
          setPersons(persons.concat(personToAdd))
          showErrorMessage(`Added ${personToAdd.name}`)
        })

      setSearchValue('')
    }
  }

  const deleteClick = (name, id) => {
    console.log('delete ', id)
    if(window.confirm(`Delete ${name} ?`))
    {
      personsService
          .deletePerson(id)
          .then(personToDelete => {
            console.log(personToDelete)
            setPersons(persons.filter((person) => person.id !== id))
            showErrorMessage(`Deleted ${personToDelete.name}`)
          })
    }
  }

  const handleNameChange = (event) => {
    const newName = event.target.value
    setNewName(newName)
  }

  const handleNumberChange = (event) => {
    const newNumber = event.target.value
    setNewNumber(newNumber)
  }

  //Show all numbers if search box is empty
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
    if(searchValue === '') {
      setShowAll(true)
      return
    }
    else{
      setShowAll(false)
    }
  }

  const filterPersons = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase()))  //Case insensitive

  const showErrorMessage = (message) =>
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={errorMessage}></Error>
      <Filter onChange={handleSearchChange} value={searchValue}></Filter>
      <h2>Add a new</h2>
      <PersonForm onClick={addClick} handleName={handleNameChange} handleNumber={handleNumberChange}></PersonForm>
      <h2>Numbers</h2>
      <Numbers people={filterPersons} onClick={deleteClick}></Numbers>
    </div>
  )
}

const Filter = ({onChange, value}) => {
  return (
    <div>filter shown with: <input onChange={onChange} value={value} placeholder=''/></div>
  )
}

const PersonForm = ({onClick, handleName, handleNumber}) => {
  return (
    <div>
      <form onSubmit={onClick}>
          <div>name: <input onChange={handleName}/></div>
          <div>number: <input onChange={handleNumber}/></div>
          <div>
            <button type="submit">add</button>
          </div>
      </form>
    </div>
  )
}

const Numbers = ({people, onClick}) => {
  return (
    <div>
      {people.map(person => 
        <Number key={person.id} name={person.name} number={person.number} id={person.id} onClick={() => onClick(person.name, person.id)}/>)
      }
    </div>
  )
}

const Number = ({name, number, onClick}) => {
  return(
    <div>
      <p>{name} {number} <button onClick={onClick}>Delete</button></p>
    </div>
  )
}

const Error = ({message}) => {
  if(message === null) {
    return null
  }

  return(
    <div className='error'>
      {message}
    </div>
  )
}

export default App