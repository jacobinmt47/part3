const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://jacobinmt47:${password}@cluster0-cekgn.mongodb.net/test?retryWrites=true&w=majority`

const connect = () => {
  mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
  const phoneSchema = mongoose.Schema({
    id: Number,
    name: String,
    phonenumber: String,
  })
  const Record = mongoose.model('record', phoneSchema)
  return Record
}
if (process.argv.length < 3) {
  console.log('error need at least 3 arugments ie node mongo.js password name phonenumber')
}

if (process.argv.length === 3) {
  // get all items
  const Record = connect()
  Record.find({})
    .then((x) => {
      x.forEach((y) => { console.log(y.name, '  ', `${y.phonenumber}  ${y._id}`) })
      mongoose.connection.close()
    })
    .catch((error) => {
      console.log(error)
      mongoose.connection.close()
    })
}

if (process.argv.length === 5) {
  // add item
  console.log('adding item ---')
  const id = Math.floor(Math.random() * 4000000000)
  const Record = connect()
  const rec = new Record({
    id,
    name: process.argv[3],
    phonenumber: process.argv[4],
  })
  rec.save()
    .then((x) => {
      console.log(x)
      mongoose.connection.close()
    })
    .catch((error) => {
      console.log(error)
      mongoose.connection.close()
    })
}
