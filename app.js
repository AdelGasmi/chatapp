const express = require('express')
const app = express()


//Set the template engin ejs
app.set('view engine', 'ejs')

//Middleware for the static content
app.use(express.static('public'))

//Set the routes
app.get('/', (req, res) => {
    res.render('index')
})

//Listen on port 3000
server = app.listen(3000)

//socket.io instantiations 
const io = require("socket.io")(server)

//listen on every connection 
io.on('connection', (socket) => {
    console.log('New User Connected')

    //defaults username
    socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new _message 
    socket.on('new_message', (data) => {
        //broadcast the new mesage 
        io.sockets.emit('new_message', { message: data.message, username: socket.username });
    }
    )
})
