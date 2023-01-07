import React, {useContext, useEffect, useState} from "react"
import Card from "../../components/Card";
import styled from "styled-components";
import {CardRegistryContext} from "../../patterns/CardRegistry";
import {usePlayer} from "../../contexts/PlayerContext";
import {useNavigate} from "react-router-dom";
import {NotOwnedOverlay} from "../../components/Card/styles";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 2rem;
`

const Cards = () => {
    const [, getCard, registry] = useContext(CardRegistryContext)
    const {state} = usePlayer()
    const navigate = useNavigate()

    // useEffect(() => {
    //     socket.emit('getCards');
    //     socket.on('cardsList', (e: any) => setCards([...e]));
    //
    //     return () => {
    //         socket.off('cardsList');
    //     };
    // }, [setCards]);
    useEffect(() => {

    }, [])

    const onClick = (id: number) => {
        navigate(`/card/${id}`)
    }

    return (<Wrapper>
        {/*{cards.map((card: any) => <Card key={card.id} card={card} selected={card.selected || false} onSelect={() => selectCard(card.id)} empty={false}/>)}*/}
        {registry.map((card: any) => <Card key={card.id} card={getCard(card.id)} onClick={() => onClick(card.id)} owned={state.ownedCards.has(card.id)} />)}
    </Wrapper>);
}

export default Cards