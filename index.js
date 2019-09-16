const express = require('express')
const app = express()

let persons =
     [
    {
      "name": "Arto Hellas",
      "phoneNumber": "040-123456",
      "id": 0
    },
    {
      "name": "Ada Lovelace",
      "phoneNumber": "39-44-5323523",
      "id": 1
    },
    {
      "name": "Dan Abramov",
      "phoneNumber": "12-43-234345",
      "id": 2
    },
    {
      "name": "Mary Poppendieck",
      "phoneNumber": "39-23-6423122",
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
  const body = request.query
   if(!body.name){
    console.log("name is missing from query")
    return response.status(400).json({error:'name is missing '})
  }
  if(!body.phoneNumber){
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
    phoneNumber:body.phoneNumber,
    id:Math.round( Math.random()*1000000)
  } 
 
  persons = persons.concat(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`listening from port ${PORT}`)
})