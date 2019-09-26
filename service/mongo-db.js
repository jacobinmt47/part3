const mongoose = require('mongoose')
require('dotenv').config()
const password = process.env.DBPASS

const url =`mongodb+srv://jacobinmt47:${password}@cluster0-cekgn.mongodb.net/test?retryWrites=true&w=majority`
let pschema = null

const printNameNumber = (x) =>{
    console.log(x.name,'  ',x.phonenumber)
    mongoose.connection.close()
  }

  const logAndCloseError = (x) =>{
    console.log(x)
    mongoose.connection.close()
  }

const connect =() =>{
    //console.log(url)
    let phoneSchema = null
    mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true})
    if(pschema ===null){
     phoneSchema = new mongoose.Schema({
        id:Number,
        name:String,
        phonenumber:String,
      })
      pschema = phoneSchema
    }
    else{
      phoneSchema = pschema
    }

      return phoneSchema
}

const findId = (id,ret) =>{
  const phoneSchema = connect()
  const Record = mongoose.model('record',phoneSchema)
  Record.find({'id':id})
  .then(pn =>{ret(pn)
  mongoose.connection.close()})
  .catch(error =>{logAndCloseError(error)})
}

const findAll = (ret) =>{
    const phoneSchema = connect()
    const Record = mongoose.model('record',phoneSchema)
    Record.find({})
    .then(x =>{ret(x)
      mongoose.connection.close()})
    .catch(error =>{logAndCloseError(error)})
}

const addPerson = (id,name,phonenumber) =>{
    const phoneSchema = connect()
    const Record = mongoose.model('record',phoneSchema)
    const rec = new Record({
        id:id,
        name:name,
        phonenumber:phonenumber
    })
    rec.save().then(x =>{printNameNumber(x)})
    .catch(error =>{logAndCloseError(error)})
}

const deleteId = (id) =>{
    const phoneSchema = connect()
    const Record = mongoose.model('record',phoneSchema)
    Record.deleteOne({'id':id}).then(x =>{printNameNumber(x)})
    .catch(error =>{logAndCloseError(error)})
}
const update =(id,name,phonenumber) =>{
  const cb=() =>{console.log('called from update')} //callback to make findOneAndUpdate Happy
  const phoneSchema = connect()
  const Record = mongoose.model('record',phoneSchema)
  Record.findOneAndUpdate({'id':id},{'name':name,'phonenumber':phonenumber},cb)
}
module.exports = {findAll,findId,addPerson,deleteId,update}