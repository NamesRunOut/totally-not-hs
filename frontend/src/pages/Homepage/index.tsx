import React, {useContext, useEffect, useState} from 'react';
// import {socket} from "../../wzorce/singleton";
import CardsList from "./components/CardsList";
import {NotificationContext, NotificationContextType} from "../../contexts/Notification";
import {useNavigate} from "react-router-dom";
import Classes from "./components/ClassPicker";
import {adjectives, animals, colors, uniqueNamesGenerator} from 'unique-names-generator';
import {
    Avatar,
    ClassSelector,
    Input,
    PageWrapper,
    Param,
    Play,
    PlayerInfo,
    PlayerProfile,
    PlayGlitch,
    Wrapper
} from "./styles";
import {AlertNotificationCreator} from "../../patterns/factory-method";
import Index from "../../components/Navbar";
import SecondaryButton from "../../components/SecondaryButton";
import {rand} from "./utils/rand";
import {cardList} from "../../utils/card_list";
import {usePlayer} from "../../contexts/PlayerContext";
import PrimaryButton from "../../components/NavButton";
import {motion, Variants} from "framer-motion";
import { ServerConnectionContext } from '../../contexts/ServerConnection';

const characterName: string = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    seed: rand(0, 100)
});

const Homepage = () => {
    const [username, setUsername] = useState<string>(characterName)
    // const [pclass, setPClass] = useState("Class1")
    const [setNotification] = useContext<NotificationContextType>(NotificationContext)
    const {state, dispatch} = usePlayer()
    const socket = useContext<any>(ServerConnectionContext)
    let navigate = useNavigate()

    const play = () => {
        let deck: any = []
        let deckLength = state.deck.size

        if (deckLength < 1) {
            setNotification(new AlertNotificationCreator('Deck size must be greater than 0').getNotification())
            return
        }
        dispatch({type: 'setName', name: username})
        navigate('./game')
        socket.emit('join', {name: username, email: `${username}@totallynoths.com`})
    }

    return (<Wrapper>
        <Play onClick={play}><PlayGlitch />Play</Play>
        <PlayerProfile>
            <Avatar src={`https://avatars.dicebear.com/api/bottts/:${username}.svg`}/>
            <PlayerInfo>
                <Param>Name</Param><Input value={username} onChange={(e: any) => setUsername(e.target.value)}/>
                {/* <Param>Class</Param><ClassSelector value={pclass} onChange={e => setPClass(e.target.value)}><option value="Class1">Class 1 </option><option value="Class2">Class 2 </option><option value="Class3">Class 3 </option></ClassSelector> */}
                <Param>Owned</Param><Param>{Array.from(state.ownedCards).length} cards</Param>
                <Param>Deck</Param><Param>{Array.from(state.deck).length} cards</Param>
            </PlayerInfo>
        </PlayerProfile>
    </Wrapper>);
}

export default Homepage;
