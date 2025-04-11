const http = require('http');
const { Server } = require('socket.io');
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);  // Create HTTP server
const io = new Server(server, {         // Attach Socket.IO to HTTP server
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

const MAXIMUM_PLAYERS = 10;
let lobbies = {};

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('create-lobby', ({ username }) => {
        const lobbyCode = uuidv4().slice(0, 6).toUpperCase();
        lobbies[lobbyCode] = {
            players: [],
            gameStarted: false,
            lobbyCode: lobbyCode,
            host: socket.id,  // FIX: 'username.socket.id' is incorrect
        };
        console.log(`Lobby created with code: ${lobbyCode}`);
        socket.join(lobbyCode);
        socket.emit('lobby-created', { lobbyCode });
    });

    socket.on('join-lobby', ({ username, lobbyCode }) => {
        console.log(`User ${username} is trying to join lobby ${lobbyCode}`);
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
        socket.join(lobbyCode);
        lobbies[lobbyCode].players.push(username);
        io.to(lobbyCode).emit('lobby-joined', { lobbyCode, players: lobbies[lobbyCode].players });
    });
});

server.listen(3001, () => {
    console.log('Server running on port 3001');
});
