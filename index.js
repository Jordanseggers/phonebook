const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const generateId = () => {
  const maxId = contacts.length > 0
    ? Math.max(...contacts.map(c => c.id))
    : 0
  return maxId + 1
}

let contacts = [
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

app.use(morgan('tiny'))
app.use(cors())

app.get('/info', (request, response) => {
  let numOfContacts = contacts.length;
  let timeOfProcess = new Date
  response.set('Content-Type', 'text/html')
  response.send(`<p>Phonebook has info for ${numOfContacts} people</p><p>${timeOfProcess}</p>`)
})

app.get('/api/contacts', (request, response) => {
  response.json(contacts)
})

app.get('/api/contacts/:id', (request, response) => {
  const id = Number(request.params.id)
  const contact = contacts.find(contact => contact.id === id)
  
  if (contact) {
    response.json(contact)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/contacts/:id', (request, response) => {
  const id = Number(request.params.id)
  contacts = contacts.filter(contact => contact.id !== id)

  response.status(204).end()
})

app.post('/api/contacts', (request, response) => {
  const body = request.body
  let matchName = contacts.filter(contact => contact.name === body.name)
  
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  if (matchName) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const contact = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generateId(),
  }

  contacts = contacts.concat(contact)

  response.json(contact)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})