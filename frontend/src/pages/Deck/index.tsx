import React, {useContext, useEffect, useState} from "react"
import Card from "../../components/Card";
import styled from "styled-components";
import {CardRegistryContext} from "../../patterns/CardRegistry";
import {usePlayer} from "../../contexts/PlayerContext";
import {OptionButtons, Wrapper} from "./styles";
import SecondaryButton from "../../components/SecondaryButton";

const Deck = () => {
    const [, getCard, registry] = useContext(CardRegistryContext)
    const {state, dispatch} = usePlayer()

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

    const select = (id: number) => {
        dispatch({type: "select", id: id})
    }

    return (<Wrapper>
        <OptionButtons>
            <SecondaryButton onClick={() => dispatch({type: 'selectAll'})} text={"Select all"} />
            <SecondaryButton onClick={() => dispatch({type: 'deselectAll'})} text={"Deselect all"} />
        </OptionButtons>
        {/*@ts-ignore*/}
        {Array.from(state.ownedCards).map((id: number) => <Card key={toString(id)} card={getCard(id)} onClick={() => select(id)} selected={state.deck.has(id)} />)}
    </Wrapper>);
}

export default Deck