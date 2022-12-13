import React, {useContext, useEffect, useState} from 'react';
import {NotificationContext} from "../../contexts/Notification";
import {
    Avatar,
    Board1,
    Board2,
    Config,
    Desc,
    Endturn,
    Info,
    Line,
    Playarea,
    Player1,
    Player2,
    Reset,
    Wrapper
} from "./styles";
import {PlayerMana} from "./components/PlayerMana";
import {CardSlot} from "./components/CardSlot";
import {Set} from './components/Set'
import {InfoNotificationCreator} from "../../patterns/factory-method";
import {NotificationContextType} from "../../contexts/Notification";

const Homepage = () => {
    const [game, setGame] = useState<any>()
    const [selected, setSelected] = useState<any>(null)
    const [setNotification] = useContext<NotificationContextType>(NotificationContext)

    const nextTurn = () => {
        // socket.emit('nextTurn')
    }

    const placeCard = (isme: boolean, boardid: number) => {
        if (!isme || selected === null || game.player !== game.myid) return;
        // socket.emit('action', [selected.id, boardid])
        setSelected(null)
    }

    // useEffect(() => {
    //     socket.on('status', (game: any) => setGame(game));
    //
    //     return () => {
    //         socket.off('status')
    //     };
    // }, [socket]);

    useEffect(() => {
        if (game?.victor) setNotification(new InfoNotificationCreator(game?.victormessage).getNotification())
    }, [game?.victor, game?.victormessage, setNotification]);

    if (game === undefined) return (<p>Please wait for the game to start</p>);
    return (
        <Wrapper>
            {/*<Reset onClick={() => socket.emit('reset')}>Reset</Reset>*/}

            <Config>
                <p>Turn: {game.turncount}</p>
                <p style={{color: game.player === game.myid ? 'green' : 'red'}}>Player: {game.player === game.myid ? 'You' : 'Opponent'}</p>
            </Config>

            <Player1>
                <Info>
                    <h1>{game.player1._username}</h1>
                    <Avatar src={`https://avatars.dicebear.com/api/personas/:${game.player1._username}.svg`}/>
                    <Desc>
                        <h3>Score: {game.player1._score}</h3>
                        <h3>Cards in hand: {game.player1._hand.length}</h3>
                        <h3>Cards remaining in deck: {game.player1._deck.length}</h3>
                    </Desc>
                    <PlayerMana amount={game.player1._mana}/>
                    {game.myid === game.player1._id ?
                        <Endturn onClick={nextTurn} disabled={game.player !== game.myid}>End turn</Endturn> : <></>}
                </Info>
                <Board1>
                    <Playarea>
                        <CardSlot click={() => placeCard(game.myid === game.player1._id, 0)} card={game.board[0][0]}/>
                        <CardSlot click={() => placeCard(game.myid === game.player1._id, 1)} card={game.board[0][1]}/>
                        <CardSlot click={() => placeCard(game.myid === game.player1._id, 2)} card={game.board[0][2]}/>
                        <CardSlot click={() => placeCard(game.myid === game.player1._id, 3)} card={game.board[0][3]}/>
                    </Playarea>
                    <Set player={game.player1} isme={game.myid === game.player1._id} selected={selected} setSelected={setSelected}/>
                </Board1>
            </Player1>

            <Line/>

            <Player2>
                <Info>
                    <h1>{game.player2._username}</h1>
                    <Avatar src={`https://avatars.dicebear.com/api/personas/:${game.player2._username}.svg`}/>
                    <Desc>
                        <h3>Score: {game.player2._score}</h3>
                        <h3>Cards in hand: {game.player2._hand.length}</h3>
                        <h3>Cards remaining in deck: {game.player2._deck.length}</h3>
                    </Desc>
                    <PlayerMana amount={game.player2._mana}/>
                    {game.myid === game.player2._id ?
                        <Endturn onClick={nextTurn} disabled={game.player !== game.myid}>End turn</Endturn> : <></>}
                </Info>
                <Board2>
                    <Playarea>
                        <CardSlot click={() => placeCard(game.myid === game.player2._id, 0)} card={game.board[1][0]}/>
                        <CardSlot click={() => placeCard(game.myid === game.player2._id, 1)} card={game.board[1][1]}/>
                        <CardSlot click={() => placeCard(game.myid === game.player2._id, 2)} card={game.board[1][2]}/>
                        <CardSlot click={() => placeCard(game.myid === game.player2._id, 3)} card={game.board[1][3]}/>
                    </Playarea>
                    <Set player={game.player2} isme={game.myid === game.player2._id} selected={selected} setSelected={setSelected}/>
                </Board2>
            </Player2>
        </Wrapper>
    );
}

export default Homepage;
