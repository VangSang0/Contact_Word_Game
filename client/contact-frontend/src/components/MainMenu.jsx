import React from 'react';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function MainMenu() {
    // Setting up Socket IO functions
    // States
    // join function
    // create function
    
    

    function createLobby() {

    }

    function joinLobby() {

    }


    function joinLobby() {
        // Logic to join a lobby
        console.log("Joining lobby...");
    }


    return (
        <>
            <div className="title">
                <h1>Contact</h1>
            </div>
            <div className="lobby-navigation">
                <button className="create-lobby">Create lobby</button>
                <button className="join-lobby">Join Lobby</button>
            </div>
        </>
    )
}