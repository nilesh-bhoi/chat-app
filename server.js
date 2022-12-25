const express = require('express');
const path = require('path');
const { Socket } = require('socket.io');
const app = express();
const http = require('http').createServer(app)

const PORT = 3000 || process.env.PORT;

http.listen(PORT,()=> console.log(`Express is running on ${PORT} port`));

app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res) =>{
    res.sendFile(__dirname + "/index.html")
})

// socket


const io = require('socket.io')(http)

io.on('connection' , socket =>{
    console.log('connected...');


    socket.on('message' ,(msg)=>{
        socket.broadcast.emit('message', msg)
    })
})