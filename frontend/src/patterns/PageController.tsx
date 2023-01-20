import React from 'react';
import {PlayerProvider} from "../contexts/PlayerContext";
import Navbar from "../components/Navbar";
import {PlayersProvider} from "./EmbeddedValue";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import GlobalStyle from '../theme/Global';
import {Notification} from "../contexts/Notification";
import Popup from "../components/Notification/Popup";
import Homepage from '../pages/Homepage'
import Game from '../pages/Game'
import MissingPage from '../pages/404'
import Theme from "../theme/Theme";
import Cards from "../pages/Cards";
import Card from "../pages/Card";
//@ts-ignore
import bg from "../assets/bg.png";
import {PageWrapper} from "../pages/Homepage/styles";
import {CardRegistry} from "./CardRegistry";
import Deck from "../pages/Deck";
import { ServerConnection } from '../contexts/ServerConnection';

function PageController() {
  return (
      <Theme>
        <ServerConnection>
            <Notification>
            <PlayerProvider>
                <CardRegistry>
                  <PlayersProvider>                  
                          <Router>
                              <GlobalStyle/>
                              <Popup/>
                              <PageWrapper style={{backgroundImage: `url(${bg})`}}>
                                  <Navbar />
                                  <Routes>
                                      <Route path="/" element={<Homepage />}/>
                                      <Route path="/game" element={<Game/>}/>
                                      <Route path="/cards" element={<Cards/>}/>
                                      <Route path="/card/:id" element={<Card/>}/>
                                      <Route path="/deck" element={<Deck/>}/>
                                      <Route element={<MissingPage/>}/>
                                  </Routes>
                              </PageWrapper>
                          </Router>                
                  </PlayersProvider>
                </CardRegistry>
              </PlayerProvider>
          </Notification>
        </ServerConnection>
      </Theme>
  );
}

export default PageController;