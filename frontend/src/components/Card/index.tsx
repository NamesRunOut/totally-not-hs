import React from 'react';
import styled from "styled-components";
// @ts-ignore
import {motion} from "framer-motion";
import {Atk, BlankCard, Description, Hp, Img, Index, Mana, Name, Word } from './styles';

const CardsList: React.FC<{ card: any, selected: boolean, onSelect: any, empty: boolean }> = ({card, selected, onSelect, empty}) => {
    if (empty)
        return (
            <BlankCard/>
        );

    return (
        <Index
            onClick={onSelect}
            //@ts-ignore
            selected={selected}>
            <Img src={card.image} />
            <Name>{card.name.split(" ").map((word: string) => <Word key={word}>{word}</Word>)}</Name>
            <Description>{card.description || "This is an example description that doesnt do a thing"}</Description>
            <Mana>{card.mana || 0}</Mana>
            <Atk>{card.atk || 0}</Atk>
            <Hp>{card.hp || 0}</Hp>
        </Index>
    );
}

export default CardsList;
