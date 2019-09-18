const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
let body ={}  //kept in global scope for logging purposes
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] :response-time ms :mytoken'))
morgan.token('mytoken',(req,res)=>{
  return JSON.stringify(body)
})

let persons =
     [
    {
      "name": "Arto Hellas",
      "phonenumber": "040-123456",
      "id": 0
    },
    {
      "name": "Ada Lovelace",
      "phonenumber": "39-44-5323523",
      "id": 1
    },
    {
      "name": "Dan Abramov",
      "phonenumber": "12-43-234345",
      "id": 2
    },
    {
      "name": "Mary Poppendieck",
      "phonenumber": "39-23-6423122",
      "id": 3
    }
  ]

app.get('/api/persons',(request,response) =>{
    console.log("called from api/persons")
    response.json(persons)
}
)
app.get('/api/persons/:id',(request,response) =>{
    console.log("called from api/persons/:id")
    const id = request.params.id
    const p = persons.filter(n => n.id === Number(id))
    if(!p){
      console.log("person undefined")
      response.status(404).end()
    }
    response.json(p)
}
)

app.get('/info',(request,response) =>{
    const l = persons.length
    const d = new Date()
    const msg =`<h3>Phone book has info for ${l} people </br>${d}`
    console.log(msg)
    response.send(msg)
})

app.get('/',(request,response)=>{
    response.send('<h1>hello world </h1>')
})

app.delete('/api/persons/:id',(request,response) =>{
  const id = Number(request.params.id)
  console.log("delete person with id = "+id)
  persons = persons.filter(n =>n.id !== id)
  response.status(204).end()
})

app.post('/api/persons/',(request,response) =>{
   body = request.body
   if(!body.name){
    console.log("name is missing from query")
    return response.status(400).json({error:'name is missing '})
  }
  if(!body.phonenumber){
    console.log("phonenumber is missing from query")
    return response.status(400).json({error:'phonenumber is missing'})
  }
  const notp = persons.find(x =>x.name ===body.name)
  if(notp){
    console.log('name alreay exists '+body.name)
    return response.status(400).json({error:'name alreay exists '+body.name})
  }
  const person ={
    name:body.name,
    phonenumber:body.phonenumber,
    id:Math.round( Math.random()*1000000)
  } 
  console.log(person)
  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
  console.log(`listening on port : ${PORT}`)
})