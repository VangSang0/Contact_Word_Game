const io = require('socket.io')(3000)
const express = require('express')
const app = express()
const cors = require('cors')

app.use(
    cors({
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
        credentials: true,
    })
)


io.on ('connection', (socket) => {
    console.log('New user connected')
})