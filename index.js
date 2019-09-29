const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const phoneSchema = require('./service/mg-connect')
let body ={}  //kept in global scope for logging purposes
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] :response-time ms :mytoken'))
morgan.token('mytoken',(req,res)=>{
  return JSON.stringify(body)
})


const Record = mongoose.model('record',phoneSchema)

app.get('/api/persons',(request,response) =>{
    console.log("called from api/persons")

    Record.find({})
    .then(pn =>{response.json(pn)})
    .catch(error =>{console.log(error)
      response.status(400).send({error:'error'})})
}
)
app.get('/api/persons/:id',(request,response) =>{
    console.log("called from api/persons/:id")
    const id = request.params.id
    Record.findById(id)
    .then(r =>{response.json(r)})    
    .catch(error =>{console.log(error)
      response.status(400).send({error:'error'})})
    }
)

app.get('/info',(request,response) =>{
    Record.find({})
    .then(persons =>{
      const l = persons.length
      const d = new Date()
      const msg =`<h3>Phone book has info for ${l} people </br>${d}`
      console.log(msg)
      response.send(msg)
    })
    .catch(error =>{console.log(error)
     response.status(400).send({error:'error'})})
  
})

//app.get('/',(request,response)=>{
//    response.send('<h1>hello world </h1>')
//})

app.delete('/api/persons/:id',(request,response) =>{
  const id = request.params.id
  console.log('called from delete id:',id.toString())
  Record.findByIdAndRemove(id)
  .then(r =>{response.status(204).end()})
  .catch(error =>{console.log(error)
     response.status(400).send({error:'error'})})
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
  //const record = mongoose.model('record',phoneSchema)
  const ps = new Record({
    id:Math.floor(Math.random()*4000000000),  //will be overwrote
    name:body.name,
    phonenumber:body.phonenumber
  })
  ps.save().then(sp =>{response.json(sp.toJSON())})
  .catch(error =>{console.log('error',error.toString())
  response.status(204).end})

})

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
  console.log(`listening on port : ${PORT}`)
})