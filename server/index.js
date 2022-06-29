const express = require('express');
const app = express();
const {Server} = require("socket.io");

const http = require('http');
const cors = require('cors')

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', methods: ['GET', 'POST']
    }
})

io.on("connection", (socket) => {
    console.log('User connected', socket.id);
    socket.on('send_message', (data)=> {
        socket.broadcast.emit('receive_message', data)

    })
    }
)

server.listen(3001, () => {
    console.log('SERVER IS RUNNING');
})