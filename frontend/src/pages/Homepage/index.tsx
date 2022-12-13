import React, {useContext, useEffect, useState} from 'react';
// import {socket} from "../../wzorce/singleton";
import CardsList from "./components/CardsList";
import {NotificationContext, NotificationContextType} from "../../contexts/Notification";
import {useNavigate} from "react-router-dom";
import Classes from "./components/ClassPicker";
import selectAll from "./utils/selectAll";
import deselectAll from "./utils/deselectAll";
import {adjectives, animals, uniqueNamesGenerator} from 'unique-names-generator';
import {Button, Input, Play, Wrapper} from "./styles";
import {AlertNotificationCreator} from "../../patterns/factory-method";

const characterName: string = uniqueNamesGenerator({
    dictionaries: [adjectives, animals]
});

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

    return (
        <Wrapper>
            <Play onClick={play}>Play</Play>
            <Input value={username} onChange={(e: any) => setUsername(e.target.value)}/>
            <Classes tabs={tabs} setTabs={setTabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
            <div>
                <Button onClick={() => selectAll(cards, setCards)}>Select all</Button>
                <Button onClick={() => deselectAll(cards, setCards)}>Deselect all</Button>
            </div>
            <CardsList cards={cards} setCards={setCards}/>
        </Wrapper>
    );
}

export default Homepage;
