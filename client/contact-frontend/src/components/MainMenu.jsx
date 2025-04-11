import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

function MainMenu() {
    const [username, setUsername] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [lobbyCode, setLobbyCode] = useState('');

    useEffect(() => {
        socket.on('join-error', (message) => {
            alert(message.message);
        });
    
        socket.on('lobby-joined', ({ lobbyCode, players }) => {
            alert(`Joined lobby ${lobbyCode} with players: ${players.join(', ')}`);
        });
    
        return () => {
            socket.off('join-error');
            socket.off('lobby-joined');
        };
    }, []);

    const createLobby = () => {
        if (username) {
            socket.emit('create-lobby', { username });
        }
    }

    const joinLobby = () => {
        if (username && lobbyCode) {
            socket.emit('join-lobby', { username, lobbyCode });
        } else {
            alert('Please enter a username and lobby code');
        }
    }

    return (
        <>
            <div className="title">
                <h1>Contact</h1>
            </div>
            <div className="username">
                <input 
                    type="text" 
                    className="username-input" 
                    placeholder='Enter Username...' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
            </div>
            <div className="lobby-navigation">
                <button className="create-lobby" onClick={createLobby}>Create Lobby</button>
                <button className="join-lobby" onClick={() => setShowInput(true)}>Join Lobby</button>
                
                {showInput && (
                    <>
                        <input 
                            type="text" 
                            className="lobby-code" 
                            placeholder='Enter Lobby Code...' 
                            value={lobbyCode} 
                            onChange={(e) => setLobbyCode(e.target.value)} 
                        />
                        <button className="join-lobby-code" onClick={joinLobby}>Join</button>
                        <button className="cancel-lobby-code" onClick={() => setShowInput(false)}>Cancel</button>
                    </>
                )}
            </div>
        </>
    )
}

export default MainMenu;
