const mongoose = require('mongoose')
require('dotenv').config()

const password = process.env.DBPASS
const url =`mongodb+srv://jacobinmt47:${password}@cluster0-cekgn.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true})
let phoneSchema = mongoose.Schema(
{
  id:Number,
  name:String,
  phonenumber:String
})
phoneSchema.set('toJSON',{
  transform(document,returnedObject){
    returnedObject.id =returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
  }
})

module.exports ={phoneSchema}