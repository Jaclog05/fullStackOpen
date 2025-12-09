import { useState, useEffect } from 'react'
import personService from './services/persons'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilterName(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()

    const isPersonAlreadyAdded = persons.find((person) => person.name === newName);

    if(isPersonAlreadyAdded) return alert(`${newName} is already added to phonebook`);

    const personObject = {
      id: `${persons.length + 1}`,
      name: newName,
      number: newNumber
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
      })
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)

    if(window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(personToDelete.id)
        .then(returnedPerson => {
            setPersons(persons.filter(person => person.id !== returnedPerson.id))
        })
    }
  }

  const filteredPersons = filterName
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter
        filterName={filterName}
        handleFilterChange={handleFilterChange}
      />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <PersonsList
        filteredPersons={filteredPersons}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App