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

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then(returnedPerson => {
      if(returnedPerson) {
        return response.json(returnedPerson)
      }else {
        return response.status(404).send({ message: 'Person not found' })
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
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
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const newPersonObject = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(
    id,
    newPersonObject,
    { new: true, runValidators: true, context: 'query' }
  )
    .then(newPerson => {
      response.json(newPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.send(`
        <p>Phone book has info for ${persons.length} people</p>
        <p>${new Date()}</p>
      `)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === "CastError") {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})