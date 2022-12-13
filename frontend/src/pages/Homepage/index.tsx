import React, {useContext, useEffect, useState} from 'react';
// import {socket} from "../../wzorce/singleton";
import CardsList from "./components/CardsList";
import {NotificationContext, NotificationContextType} from "../../contexts/Notification";
import {useNavigate} from "react-router-dom";
import Classes from "./components/ClassPicker";
import selectAll from "./utils/selectAll";
import deselectAll from "./utils/deselectAll";
import {adjectives, animals, colors, uniqueNamesGenerator} from 'unique-names-generator';
import {Avatar, Input, PageWrapper, Param, Play, PlayerInfo, PlayerProfile, Wrapper} from "./styles";
import {AlertNotificationCreator} from "../../patterns/factory-method";
import Index from "../../components/Navbar";
import SecondaryButton from "../../components/SecondaryButton";
import {rand} from "./utils/rand";
import {cardList} from "../../utils/card_list";

const characterName: string = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    seed: rand(0, 100)
});

// const cardName: string = uniqueNamesGenerator({
//     dictionaries: [colors, adjectives, animals],
//     separator: ' ',
//     seed: rand(0, 100)
// });

const Homepage = () => {
    const [cards, setCards] = useState<any>([])
    const [tabs, setTabs] = useState<any>([])
    const [username, setUsername] = useState<string>(characterName)
    const [selectedTab, setSelectedTab] = useState<any>({id: '0', desc: "Your units receive +2hp", label: "Defensive"});
    const [setNotification] = useContext<NotificationContextType>(NotificationContext)
    let navigate = useNavigate()

    // useEffect(() => {
    //     socket.emit('getClasses')
    //     socket.on('enterLobby', () => navigate('./game'));
    //     socket.on('classesList', (classes: any) => setTabs(classes));
    //
    //     return () => {
    //         socket.off('classesList')
    //     };
    // }, [socket]);

    const play = () => {
        let deck: any = []
        cards.forEach((card: any) => {
            if (card.selected) deck.push(card.id)
        })

        if (deck.length <= 0) {
            setNotification(new AlertNotificationCreator('Deck size must be greater than 0').getNotification())
            return
        }
        // socket.emit('play', deck, selectedTab.id, username)
    }

    return (<Wrapper>
        <Play onClick={play}>Play</Play>
        <PlayerProfile>
            <Avatar src={`https://avatars.dicebear.com/api/bottts/:${username}.svg`}/>
            <PlayerInfo>
                <Param>Name</Param><Input value={username} onChange={(e: any) => setUsername(e.target.value)}/>
                <Param>Class</Param><Input value={username} onChange={(e: any) => setUsername(e.target.value)}/>
                <Param>Deck</Param><Param>69 cards</Param>
            </PlayerInfo>
        </PlayerProfile>
        <Classes tabs={tabs} setTabs={setTabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
        <div>
            <SecondaryButton onClick={() => selectAll(cards, setCards)} text={"Select all"} />
            <SecondaryButton onClick={() => deselectAll(cards, setCards)} text={"Deselect all"} />
        </div>
        {/*<CardsList cards={cards} setCards={setCards}/>*/}
    </Wrapper>);
}

export default Homepage;
