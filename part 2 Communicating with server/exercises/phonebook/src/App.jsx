import { useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  // ]) 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [showAll, setShowAll] = useState(true)

  const initalDataHook = () => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }
  useEffect(initalDataHook, [])

  const addClick = (event) => {
    event.preventDefault()
    console.log(newName)
    const newPerson = { name : newName , number : newNumber}

    if(persons.find(person => person.name === newPerson.name)) { 
      alert(`${newName} is already added to phonebook`)
    }
    else{ 
      //alert(`added ${newName} ${newNumber} to phonebook`)
      //setPersons(persons.concat(newPerson))

      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          console.log(response.data)
          setPersons(persons.concat(response.data))
        })

      setSearchValue('')
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
  : persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase()))  //Case insensitivie

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleSearchChange} value={searchValue}></Filter>
      <h2>Add a new</h2>
      <PersonForm onClick={addClick} handleName={handleNameChange} handleNumber={handleNumberChange}></PersonForm>
      <h2>Numbers</h2>
      <Numbers people={filterPersons}></Numbers>
    </div>
  )
}

const Number = ({name, number}) => {
  return( 
    <p>{name} {number}</p>
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

const Numbers = ({people}) => {
  return (
    <div>{people.map(person => <Number key={person.name} name={person.name} number={person.number}/>)} </div>
  )
}


export default App