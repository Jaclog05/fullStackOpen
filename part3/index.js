const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())
morgan.token('post', function (req, res) {
  if(req.method === 'POST'){
    return JSON.stringify(req.body)
  } else {
    return ""
  }
})
app.use(cors())
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :post")
)

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if(person){
    response.json(person)
  }else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if(!body.name) return response.status(400).json({ error: 'missing name'})
  if(!body.number) return response.status(400).json({ error: 'missing number'})

  const newPerson = new Person({
    name: body.name,
    number: body.number
  })

  newPerson.save().then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

app.get('/info', (request, response) => {
  response.send(`
    <p>Phone book has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})