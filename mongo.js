const mongoose = require('mongoose')
if(process.argv.length<5){
    console.log('not enough arugments ')
    console.log('example   node mongo.js password name 999-999-9999')
    process.exit(1)
}
const password = process.argv[2]
const name = process.argv[3]
const phonenumber =process.argv[4]

