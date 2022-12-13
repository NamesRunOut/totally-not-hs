import React from 'react';
import {BasicCurrency, RareCurrency} from "./Money";
import {PlayerProvider} from "../contexts/PlayerContext";
import PlayerSummary from "../components/PlayerSummary";
import {PlayersProvider} from "./EmbeddedValue";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import GlobalStyle from '../theme/Global';
import {Notification} from "../contexts/Notification";
import Popup from "../components/Notification/Popup";

import Homepage from '../pages/Homepage'
import Game from '../pages/Game'
import MissingPage from '../pages/404'

function PageController() {
  return (
      <Notification>
          <PlayersProvider>
              <PlayerProvider>
                  <PlayerSummary />
                  <Router>
                      <GlobalStyle/>
                      <Popup/>
                      <Routes>
                          <Route path="/" element={<Homepage/>}/>
                          <Route path="/game" element={<Game/>}/>
                          <Route element={<MissingPage/>}/>
                      </Routes>
                  </Router>
              </PlayerProvider>
          </PlayersProvider>
      </Notification>
  );
}

export default PageController;