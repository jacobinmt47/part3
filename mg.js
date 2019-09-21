const m = require('./service/mongo-db')

const id = process.argv[2]
const name = process.argv[3]
const phonenumber = process.argv[4]

const ret = (x) =>{x.forEach(y=>{ console.log(y.name,'  ',y.phonenumber)})}
m.findAll(ret)
//m.deleteId(id)
//m.addPerson(id,name,phonenumber)
