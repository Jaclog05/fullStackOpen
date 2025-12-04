import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', newNumber: '040-123456' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const isPersonAlreadyAdded = persons.find((person) => person.name === newName);

    if(isPersonAlreadyAdded) return alert(`${newName} is already added to phonebook`);

    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div>
          <h4>{person.name} {person.number}</h4>
        </div>
      ))}
    </div>
  )
}

export default App