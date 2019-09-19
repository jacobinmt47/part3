const mongoose = require('mongoose')
if(process.argv.length<5){
    console.log('not enough arugments ')
    console.log('example   node mongo.js password name 999-999-9999')
    process.exit(1)
}
const password = process.argv[2]
const name = process.argv[3]
const phonenumber =process.argv[4]

const url =`mongodb+srv://jacobinmt47:${password}@cluster0-cekgn.mongodb.net/test?retryWrites=true&w=majority`
console.log(url)
mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true})
const phoneSchema = new mongoose.Schema({
    id:Number,
    name:String,
    phonenumber:String,
  })
  
  const Record = mongoose.model('record', phoneSchema)
  
  const rec = new Record({
    id:1,
    name:name,
    phonenumber:phonenumber,
  })
  
  rec.save().then(response => {
    console.log('phonenumber  saved!')
    mongoose.connection.close()
  })