import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BasicCurrency, RareCurrency} from "./patterns/Money";
import {PlayerProvider} from "./contexts/PlayerContext";
import PlayerSummary from "./components/PlayerSummary";
import {PlayersProvider} from "./patterns/EmbeddedValue";

function App() {
  return (
      <PlayersProvider>
          <PlayerProvider>
              <PlayerSummary />
              <div className="App">
                  <header className="App-header">
                      <img src={logo} className="App-logo" alt="logo" />
                      <p>
                          Edit <code>src/App.tsx</code> and save to reload.
                      </p>
                      <a
                          className="App-link"
                          href="https://reactjs.org"
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                          Learn React
                      </a>
                  </header>
              </div>
          </PlayerProvider>
      </PlayersProvider>
  );
}

export default App;
