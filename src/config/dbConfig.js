const mongoose = require('mongoose')
const options = require('./options')

const mongoURI = options.mongoDB.url

mongoose.set('strictQuery', false)
mongoose.connect(mongoURI, (error) => {
    if(error) return console.log(`db connection failed: ${error}`)
    return console.log('connected to db');
})