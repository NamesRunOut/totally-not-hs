//@ts-nocheck
import React, {useContext, useEffect, useRef, useState} from 'react';
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
    Reset, RewardBG, RewardPic, WaitMessage,
    Wrapper
} from "./styles";
import {PlayerMana} from "./components/PlayerMana";
import {CardSlot} from "./components/CardSlot";
import {Set} from './components/Set'
import {InfoNotificationCreator} from "../../patterns/factory-method";
import {NotificationContextType} from "../../contexts/Notification";
import {motion, useAnimation} from "framer-motion";

function BottomSheet({ isOpen, onClose, onOpen }) {
    const prevIsOpen = usePrevious(isOpen);
    const controls = useAnimation();

    function onDragEnd(event, info) {
        const shouldClose =
            info.velocity.y > 20 || (info.velocity.y >= 0 && info.point.y > 45);
        if (shouldClose) {
            // controls.start("hidden");
            onClose();
        } else {
            // controls.start("visible");
            onOpen();
        }
    }

    useEffect(() => {
        if (prevIsOpen && !isOpen) {
            controls.start("hidden");
        } else if (!prevIsOpen && isOpen) {
            controls.start("visible");
        }
    }, [controls, isOpen, prevIsOpen]);

    return (
        <motion.div
            drag
            onDragEnd={onDragEnd}
            initial="hidden"
            animate={controls}
            transition={{
                type: "spring",
                damping: 40,
                stiffness: 400
            }}
            variants={{
                visible: { y: 0 },
                hidden: { y: "100%" }
            }}
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            style={{
                display: "inline-block",
                backgroundColor: "white",
                marginLeft: 20,
                width: 200,
                height: 100,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10
            }}
        />
    );
}

function usePrevious(value) {
    const previousValueRef = useRef();

    useEffect(() => {
        previousValueRef.current = value;
    }, [value]);

    return previousValueRef.current;
}

function Line2() {
    return <div style={{ backgroundColor: "white", height: 1 }} />;
}

const Homepage = () => {
    const [game, setGame] = useState<any>({
        myid: 0,
        player: 0,
        turncount: 0,
        player1: {
            _hand: [0,1,2],
            _deck: [12,3,4]
        },
        player2: {
            _hand: [0,1,2],
            _deck: [12,3,4]
        },
        board: [[0,1,2,3], [5,6,7,8]]
    })
    const [selected, setSelected] = useState<any>(null)
    const [setNotification] = useContext<NotificationContextType>(NotificationContext)
    const [showReward, setShowReward] = useState(true)
    const constraintsRef = useRef(null)
    const handconstraintsRef = useRef(null)

    const [isOpen, setIsOpen] = useState(false);

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

    function onClose() {
        setIsOpen(false);
    }

    function onOpen() {
        setIsOpen(true);
    }


    useEffect(() => {
        if (game?.victor) setNotification(new InfoNotificationCreator(game?.victormessage).getNotification())
    }, [game?.victor, game?.victormessage, setNotification]);

    if (game === undefined) return (<WaitMessage>Please wait for the game to start</WaitMessage>)

    return (
        <Wrapper ref={constraintsRef}>
            {/*<Reset onClick={() => socket.emit('reset')}>Reset</Reset>*/}
            {showReward && <RewardBG onClick={() => setShowReward(false)} initial={{ scale: 0 }} animate={{ rotate: 180, scale: 1 }}>
                <RewardPic
                    src={`https://cataas.com/cat/cute/says/you%20win`}
                    drag
                    dragConstraints={constraintsRef}
                    onClick={e => e.stopPropagation()}
                    initial={{ rotate: 0, scale: 0 }}
                    animate={{ rotate: 180, scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                />
                {/*<RewardPic*/}
                {/*    src={`https://cataas.com/cat/cute/says/what%20a%20loser`}*/}
                {/*    drag*/}
                {/*    dragConstraints={constraintsRef}*/}
                {/*    onClick={e => e.stopPropagation()}*/}
                {/*    initial={{ rotate: 0, scale: 0 }}*/}
                {/*    animate={{ rotate: 180, scale: 1 }}*/}
                {/*    transition={{*/}
                {/*        type: "spring",*/}
                {/*        stiffness: 260,*/}
                {/*        damping: 20*/}
                {/*    }}*/}
                {/*/>*/}
            </RewardBG>}

            <Config>
                <p>Turn: {game.turncount}</p>
                <p style={{color: game.player === game.myid ? 'green' : 'red'}}>Player: {game.player === game.myid ? 'You' : 'Opponent'}</p>
            </Config>

            <Player1>
                <Info>
                    <h1>{game.player1._username}</h1>
                    <Avatar src={`https://avatars.dicebear.com/api/bottts/:${game.player1._username}.svg`}/>
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
                    <Avatar src={`https://avatars.dicebear.com/api/bottts/:${game.player2._username}.svg`}/>
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

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: 100
                        }}
                    >
                        <BottomSheet onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
                        <Line2 />
                    </div>

                </Board2>
            </Player2>
        </Wrapper>
    );
}

export default Homepage;
