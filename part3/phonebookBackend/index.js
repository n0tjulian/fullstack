/* eslint-disable no-undef */
require('dotenv').config()

const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', function (req, res) { return JSON.stringify(req.body)})

app.use(morgan(':method :url :response-time ms :body'))

app.get('/info',(request,response,next) => {
	Person.find({}).then(allPeople => {
		response.send(`<h1>Phonebook has info for ${allPeople.length} people</h1><p>${new Date()}</p>`)
	}).catch(error => next(error))

})

app.get('/',(request,response) => {
	response.send('<h1> hello world! </h1>')
})

app.get('/api/persons',(request,response,next) => {
	Person.find({}).then(people => {
		response.json(people)
	}).catch(
		error => next(error)
	)
})

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body

	const person = {
		name: body.name,
		number: body.number,
	}

	Person.findByIdAndUpdate(request.params.id, person, { new: true })
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request,response,next) => {
	const body = request.body

	const person = new Person({
		name:body.name,
		number: body.number,
	})

	person.save().then(savedPerson => {
		response.json(savedPerson)
	}).catch(error => next(error))

})

app.get('/api/persons/:id',(request,response,next) => {
	console.log(request.params.id)
	Person.findById(request.params.id).then(person => {
		if(person !== null){
			return response.json(person)
		}else{
			response.status(404).send({error:'this person doesnt exist'})
		}
	}

	).catch(error => next(error))
})

app.delete('/api/persons/:id',(request,response,next) => {
	Person.findByIdAndRemove(request.params.id).then(result => {
		console.log(result)
		response.status(204).end()
	}).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}if(error.name === 'ValidationError'){
		return response.status(404).send({ error:error.message })
	}
	next(error)
}


app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
