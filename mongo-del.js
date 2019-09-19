const mongoose = require('mongoose')
if(process.argv.length<3){
    console.log('not enough arugments ')
    console.log('example   node mongo.js password 1')
    process.exit(1)
}
const password = process.argv[2]
const id = process.argv[3]
const name = process.argv[4]
const phonenumber = process.argv[5]
const logAndClose = (x,i) =>{
  console.log(x)
  mongoose.connection.close()
  process.exit(i)
}
const findId = (phoneSchema)=>{
  console.log('called from findid')
  const Record = mongoose.model('record',phoneSchema)
  Record.find({'id':id})
  .then(x =>{logAndClose(x,0)})
  .catch(error =>{logAndClose(error,1)})
}
const findall = (phoneSchema)=>{
  console.log('called from findall')
  const Record = mongoose.model('record', phoneSchema)
  Record.find({})
   .then(pn =>{logAndClose(pn,0)})
   .catch(error =>{logAndClose(error,1)})
}

const url =`mongodb+srv://jacobinmt47:${password}@cluster0-cekgn.mongodb.net/test?retryWrites=true&w=majority`
console.log(url)
mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true})
const phoneSchema = new mongoose.Schema({
    id:Number,
    name:String,
    phonenumber:String,
  })
 if(process.argv.length ===3){findall(phoneSchema)}
 if(process.argv.length ===4){findId(phoneSchema)} 
 