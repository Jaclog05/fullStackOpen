const mongoose = require('mongoose')

if(process.argv.length < 3) {
  console.log('give password as argument')
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://jaclog05:${password}@cluster0.m6axz1f.mongodb.net/peopleApp?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if(!name || !number) {
  Person.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name,
    number
  })

  person.save().then(result => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}