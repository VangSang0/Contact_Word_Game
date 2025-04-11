const io = require('socket.io')(3000)
const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    })
)

const MAXIMUM_PLAYERS = 10;
let lobbies = {};



io.on ('connection', (socket) => {
    console.log('New user connected');
    
    socket.on('create-lobby', ({ username }) => {
        const lobbyCode = uuidv4().slice(0, 6).toUpperCase();
        lobbies[lobbyCode] = {
            players: [],
            gameStarted: false,
            lobbyCode: lobbyCode,
            host: username.socket.id,
        };
        socket.join(lobbyCode)
        socket.emit('lobby-created', { lobbyCode })
    });

    socket.on('join-lobby', ({ username, lobbyCode }) => {
        // if there is no Username, then return error
        // if the lobby code is invalid, then return error
        // if the lobby is full, then return error
        // if the game has already started, then return error
        if (!lobbies[lobbyCode]) {
            socket.emit('join-error', { message: 'Invalid lobby code' });
            return;
        }
        if (lobbies[lobbyCode].players.length >= MAXIMUM_PLAYERS) {
            socket.emit('join-error', { message: 'Lobby is full' });
            return;
        }
        if (lobbies[lobbyCode].gameStarted) {
            socket.emit('join-error', { message: 'Game has already started' });
            return;
        }
        socket.join(lobbyCode)
        lobbies[lobbyCode].players.push(username);
        socket.emit('lobby-joined', { lobbyCode, players: lobbies[lobbyCode].players });
    })
})