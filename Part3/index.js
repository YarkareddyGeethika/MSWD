require('dotenv').config()
const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(cors())


app.use(express.static('build'))


morgan.token('data', function (req) {
    var out = ' '
    if (req.method === 'POST') { out = JSON.stringify(req.body) }
    return out
})
app.use(morgan(':method :url :status - :response-time ms :data'))


const Person = require('./models/person')


const errorHandler = (error, _, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}
const unknownEndpoint = (_, response) => { response.status(404).send({ error: 'Unknown endpoint' }) }


app.get('/', (_, res) => { res.send('<h1>My phonebook backend</h1> See /info for info.') })
app.get('/api/persons', (_, res) => { Person.find({}).then(persons => { res.json(persons) }) })
app.get('/info', (_, res) => {
    Person.find({}).then(persons => {
        const n = persons.length
        let content = '<h1>Info</h1>'
        content += `<p>The phonebook has info about ${n} persons.<p>`
        content += '<p>' + (new Date()).toString() + '<p>'
        res.send(content)
    })
})


app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id).then(Person => {
        if (Person) {
            response.json(Person)
        } else {
            response.status(404).end()
        }
    }).catch(error => { next(error) })
})


app.delete('/api/persons/:id', (request, response, next) => {
   Person.findByIdAndRemove(request.params.id)
        .then(() => { response.status(204).end() })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (!body.name) { return response.status(400).json({ error: 'name missing' }) }
    if (!body.number) { return response.status(400).json({ error: 'number missing' }) }
    const newPerson = new Person({ name: body.name, number: body.number })
    newPerson.save()
        .then(savedPerson => { response.json(savedPerson) })
        .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    if (!body.name) { return response.status(400).json({ error: 'name missing' }) }
    if (!body.number) { return response.status(400).json({ error: 'number missing' }) }


    const newPerson = { name: body.name, number: body.number }
    Person.findByIdAndUpdate(request.params.id, newPerson, { new: true })
        .then(updatedPerson => { response.json(updatedPerson) })
        .catch(error => next(error))
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use(unknownEndpoint)
app.use(errorHandler)