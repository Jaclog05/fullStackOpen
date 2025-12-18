import { useState, useEffect } from 'react'
import personService from './services/persons'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

    const personAlreadyAdded = persons.find((person) => person.name === newName);

    if(personAlreadyAdded) {
      if(newNumber === personAlreadyAdded.number) return alert(`${newName} is already added to phonebook`);

      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = personAlreadyAdded.id
        const newPersonObject = { ...personAlreadyAdded, number: newNumber }

        personService
          .updatePerson(id, newPersonObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          })
          .then(() => {
            setSuccessMessage(`Updated ${newPersonObject.name}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${newPersonObject.name} has already been removed from the server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
      return;
    }

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
      .then(() => {
        setSuccessMessage(`Added ${personObject.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)

    if(window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(personToDelete.id)
        .then(() => {
            setPersons(persons.filter(person => person.id !== personToDelete.id))
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
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
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