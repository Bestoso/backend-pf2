require('dotenv').config()
const express = require('express')
const cors = require('cors')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const path = require('path')
require('./config/dbConfig')

const PORT = process.env.PORT || 8080   
const app = express()

// middlewares

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use('/statics', express.static(path.resolve(__dirname, '../public')))
app.use(cors())

app.engine('handlebars', handlebars.engine())
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'handlebars');

// router

app.use('/api', require('./routers/app.routers'))
app.use('/', require('./routers/views/views.routes'))

// server connections

const httpServer = app.listen(PORT, () => {
    console.log('Server running at http://localhost:' + PORT)
})

const io = new Server(httpServer)


io.on('connection',  socket => {
    console.log("new client connected", socket.id);
    app.set('socket', socket)
    app.set('io', io)
    socket.on('login', user =>{
        socket.emit('welcome', user)
        socket.broadcast.emit('new-user', user)
    })
})