import React from 'react';
import './App.css';
import GameCanvas from './components/GameCanvas';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Pac-Man</h1>
                <GameCanvas />
            </header>
        </div>
    );
}

export default App;
