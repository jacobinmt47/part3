const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const phoneS = require('./service/mg-connect')

const app = express()
let body = {} //kept in global scope for logging purposes
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] :response-time ms :mytoken'))
morgan.token('mytoken', (req,res)=>{ return JSON.stringify(body)})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}
app.use(errorHandler)

const Record = mongoose.model('record',phoneS.phoneSchema)
console.log(Record)

app.get('/api/persons', (request, response) => {
  console.log('called from api/persons')
  Record.find({})
    .then(pn => { response.json(pn) })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'error' })
    })
})
app.get('/api/persons/:id', (request, response, next) => {
  console.log('called from api/persons/:id')
  const id = request.params.id
  Record.findById(id)
    .then(r => { response.json(r) })
    .catch(error => { next(error) })
})

app.get('/info', (request, response, next) => {
  Record.find({})
    .then(persons => {
      const l = persons.length
      const d = new Date()
      const msg = `<h3>Phone book has info for ${l} people </br>${d}`
      console.log(msg)
      response.send(msg)
    })
    .catch(error => { next(error) })
  
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  console.log('called from delete id:', id.toString())
  Record.findByIdAndRemove(id)
    .then(r => { response.status(204).end()
      console.log(r, ' was deleted')
    })
    .catch(error => { next(error) })
})

app.post('/api/persons/', (request, response, next) => {
  body = request.body
  if (!body.name) {
    console.log('name is missing from query')
    return response.status(400).json({ error: 'name is missing '})
  }
  if (!body.phonenumber) {
    console.log('phonenumber is missing from query')
    return response.status(400).json({ error: 'phonenumber is missing'})
  }
  // const record = mongoose.model('record',phoneSchema)
  const ps = new Record({
    id: Math.floor(Math.random() * 4000000000),
    name: body.name,
    phonenumber: body.phonenumber,
  })
  console.log(ps, ' called from post line 84')
  ps.save().then(sp => { response.json(sp.toJSON()) })
    .catch(error => { next(error) })
})

app.put('/api/persons/:id', (request, response, next) => {
  const bdy = request.body
  const name = bdy.name
  const phonenumber = bdy.phonenumber
  const id = request.params.id
  const phone = {
    id: id,
    name: name,
    phonenumber: phonenumber,
  }
  console.log(phone)
  Record.findByIdAndUpdate(id, phone, {new: true })
    .then(p => { response.json(p.toJSON()) })
    .catch(error => { next(error) })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`)
})
