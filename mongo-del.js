const mongoose = require('mongoose')
if(process.argv.length<4){
    console.log('not enough arugments ')
    console.log('example   node mongo.js password 1')
    process.exit(1)
}
const password = process.argv[2]
const id = process.argv[3]
const name = process.argv[4]
const phonenumber = process.argv[5]
const findall = (phoneSchema)=>{
  const Record = mongoose.model('record', phoneSchema)
  Record.find({'id':id})
   .then(pn =>{console.log(pn)
     mongoose.connection.close()
     process.exit(0)
   })
   .catch(error =>{console.log(error)
    mongoose.connection.close()
    process.exit(0)
 })
}

const url =`mongodb+srv://jacobinmt47:${password}@cluster0-cekgn.mongodb.net/test?retryWrites=true&w=majority`
console.log(url)
mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true})
const phoneSchema = new mongoose.Schema({
    id:Number,
    name:String,
    phonenumber:String,
  })
 findall(phoneSchema) 
 