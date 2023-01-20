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
import { ServerConnectionContext } from '../../contexts/ServerConnection';
import styled from "styled-components"
import { usePlayer } from '../../contexts/PlayerContext';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Droppable from "./components/Droppable";
import Item from "./components/Item";
import { arrayMove, insertAtIndex, removeAtIndex } from "./utils/array";
import { CardRegistryContext } from '../../patterns/CardRegistry';

const ContainersWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-basis: 400%;
    gap: 0.5rem;
`

function Dnd({isMe, gameId}) {
    const socket = useContext<any>(ServerConnectionContext)
    const [, getCard, registry] = useContext(CardRegistryContext)
    const [prev, setPrev] = useState({ 
        slot0: [1, 2, 3],
        slot1: [4, 5, 6],
        slot2: [7, 8, 9],
        slot3: [10],
        hand: [12,13,14,15,16,17]})
  const [itemGroups, setItemGroups] = useState({
    slot0: [1, 2, 3],
    slot1: [4, 5, 6],
    slot2: [7, 8, 9],
    slot3: [10],
    hand: [12,13,14,15,16,17]
  });
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    for (let [en, slot] of Object.entries(itemGroups)){
        if (slot.length > prev[en].length) {
            console.log(slot)
            socket.emit('putCardInSlot', {cardName, slotNumber, gameId})
        }
    }
    setPrev(itemGroups)
  }, [itemGroups])

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragCancel = () => setActiveId(null);

  const handleDragOver = ({ active, over }) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer !== overContainer) {
      setItemGroups((itemGroups) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex =
          over.id in itemGroups
            ? itemGroups[overContainer].length + 1
            : over.data.current.sortable.index;

        return moveBetweenContainers(
          itemGroups,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      });
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      setActiveId(null);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex =
        over.id in itemGroups
          ? itemGroups[overContainer].length + 1
          : over.data.current.sortable.index;

      setItemGroups((itemGroups) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...itemGroups,
            [overContainer]: arrayMove(
              itemGroups[overContainer],
              activeIndex,
              overIndex
            ),
          };
        } else {
          newItems = moveBetweenContainers(
            itemGroups,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id
          );
        }

        return newItems;
      });
    }

    setActiveId(null);
  };

  const moveBetweenContainers = (
    items,
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item
  ) => {
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
    };
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <ContainersWrapper>
        {Object.keys(itemGroups).map((group) => (
          <Droppable
            id={group}
            items={itemGroups[group]}
            activeId={activeId}
            key={group}
            isMe={isMe}
          />
        ))}
      </ContainersWrapper>
      <DragOverlay>{activeId ? <Item id={activeId} dragOverlay /> : null}</DragOverlay>
    </DndContext>
  );
}


const Homepage = () => {
    const socket = useContext<any>(ServerConnectionContext)
    const {state} = usePlayer()
    const [myTurn, setMyTurn] = useState(false)
    const [gameId, setGameId] = useState(-1)
    const [canPlay, setCanPlay] = useState(false)

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
    const [showReward, setShowReward] = useState(false)
    const constraintsRef = useRef(null)
    const handconstraintsRef = useRef(null)

    const [isOpen, setIsOpen] = useState(false);

    const nextTurn = () => {
        socket.emit("endOfRound", {name: state.name, gameId: gameId})
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
        socket.on('start', (e: any) => {
            console.log('start', e, e === socket.id)
            setCanPlay(true)
            if (e === socket.id) setMyTurn(true)
            else setMyTurn(false)
        });
        return () => {
            socket.off('start')
        };
    }, [socket]);

    useEffect(() => {
        socket.on('join', (e: any) => {
            setGameId(e.gameID)
        });
        return () => {
            socket.off('join')
        };
    }, [socket]);

    function onClose() {
        setIsOpen(false);
    }

    function onOpen() {
        setIsOpen(true);
    }

    useEffect(() => {
        console.log('myTurn', myTurn)
        if (myTurn) socket.emit('beginRound', {name: state.name, gameId: gameId})
    }, [myTurn])

    useEffect(() => {
        socket.on('beginRound', (e: any) => {
            console.log(e)
        });
        return () => {
            socket.off('beginRound')
        };
    }, [socket]);

    useEffect(() => {
        console.log('gameId', gameId)
    }, [gameId])

    useEffect(() => {
        if (game?.victor) setNotification(new InfoNotificationCreator(game?.victormessage).getNotification())
    }, [game?.victor, game?.victormessage, setNotification]);

    if (!canPlay) return (<WaitMessage>Please wait for the game to start</WaitMessage>)

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
                <p style={{color: myTurn ? 'green' : 'red'}}>Player: {myTurn ? 'You' : 'Opponent'}</p>
            </Config>

            <Player1>
                <Info>
                    <h3>{game.player1._username}</h3>
                    <Avatar src={`https://avatars.dicebear.com/api/bottts/:${game.player1._username}.svg`}/>
                    <Desc>
                        <h3>Score: {game.player1._score}</h3>
                        <h3>Cards in hand: {game.player1._hand.length}</h3>
                        <h3>Cards remaining in deck: {game.player1._deck.length}</h3>
                    </Desc>
                    <PlayerMana amount={game.player1._mana}/>
                </Info>
                <Board1>
                    <Dnd isMe={false} />
                </Board1>
            </Player1>

            <Line/>

            <Player2>
                <Info>
                    <h3>{state.name}</h3>
                    <Avatar src={`https://avatars.dicebear.com/api/bottts/:${state.name}.svg`}/>
                    <Desc>
                        <h3>Score: {game.player2._score}</h3>
                        <h3>Cards in hand: {game.player2._hand.length}</h3>
                        <h3>Cards remaining in deck: {game.player2._deck.length}</h3>
                    </Desc>
                    <PlayerMana amount={game.player2._mana}/>
                    <Endturn onClick={nextTurn} disabled={myTurn}>End turn</Endturn>
                </Info>
                <Board2> 
                    <Dnd isMe={true} />
                </Board2>
            </Player2>
        </Wrapper>
    );
}

export default Homepage;
