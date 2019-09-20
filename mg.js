const m = require('./service/mongo-db')

const id = process.argv[2]
const name = process.argv[3]
const phonenumber = process.argv[4]

const ret = (x) =>{console.log('called from ret')}
m.findAll(ret)

