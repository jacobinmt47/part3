const mongoose = require('mongoose')
const uniqueValadator = require('mongoose-unique-validator')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const password = process.env.DBPASS
// console.log(password)
const url = `mongodb+srv://jacobinmt47:${password}@cluster0-cekgn.mongodb.net/test?retryWrites=true&w=majority`
mongoose.set('useFindAndModify', false)
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
const phoneSchema = mongoose.Schema(
  {
    id: { type: String, require: true },
    name: {
      type: String, require: true, unique: true, minlength: 3,
    },
    phonenumber: { type: String, require: true, minlength: 8 },
  },
)
phoneSchema.set('toJSON', {
  transform(document, returnedObject) {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
  },
})
mongoose.plugin(uniqueValadator)
module.exports = { phoneSchema }
