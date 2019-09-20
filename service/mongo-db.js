const mongoose = require('mongoose')
require('dotenv').config()
const password = process.env.DBPASS

const url =`mongodb+srv://jacobinmt47:${password}@cluster0-cekgn.mongodb.net/test?retryWrites=true&w=majority`

const printNameNumber = (x) =>{
    console.log(x.name,'  ',x.phonenumber)
    mongoose.connection.close()
  }

  const logAndCloseError = (x) =>{
    console.log(x)
    mongoose.connection.close()
  }

const connect =() =>{
    console.log(url)
    mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true})
    const phoneSchema = new mongoose.Schema({
        id:Number,
        name:String,
        phonenumber:String,
      })
      return phoneSchema
}

const findId = (id,ret) =>{
  const phoneSchema = connect()
  const Record = mongoose.model('record',phoneSchema)
  Record.find({'id':id})
  .then(pn =>{ pn.forEach(x =>{printNameNumber(x)
        ret(x) })})
  .catch(error =>{logAndCloseError(error)})
}

const findAll = (ret) =>{
    const phoneSchema = connect()
    const Record = mongoose.model('record',phoneSchema)
    Record.find({})
    .then(x =>{ret(x)})
    .catch(error =>{console.log(error)})
}

const addPerson = (id,name,phonenumber) =>{
    const phoneSchema = connect()
    const Record = mongoose.model('record',phoneSchema)
    const rec = new Record({
        id:id,
        name:name,
        phonenumber:phonenumber
    })
    rec.save().then(x =>{console.log(x)})
}

const deleteId = (id) =>{
    const phoneSchema = connect()
    const Record = mongoose.model('record',phoneSchema)
    Record.deleteOne({'id':id}).then(x =>console.log(x))
}

module.exports = {findAll,findId,addPerson,deleteId}