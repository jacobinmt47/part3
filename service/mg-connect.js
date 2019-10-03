const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('mongoose-unique-validator')

const password = process.env.DBPASS
const url =`mongodb+srv://jacobinmt47:${password}@cluster0-cekgn.mongodb.net/test?retryWrites=true&w=majority`
mongoose.set('useFindAndModify', false)
mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true})
let phoneSchema = mongoose.Schema(
{
  id:String,
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