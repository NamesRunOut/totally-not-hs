import React from 'react';
import {Atk, Description, Hp, Img, Index, Mana, Name, NotOwnedOverlay, Word } from './styles';
import {useNavigate} from "react-router-dom";
import {cardList} from "../../utils/card_list";
import BaseCard from "../../patterns/special case/BaseCard";

const Card: React.FC<{card: BaseCard, owned?: boolean, onClick?: any, selected?: boolean}> = ({card, owned, onClick, selected}) => {
    return (
        <Index
            style={{border: selected ? "2px solid red" : "none"}}
            onClick={onClick !== undefined ? onClick : () => {}}
            whileHover={{ scale: 1.3, rotate: 19, zIndex: 5 }}
            whileTap={{ scale: 1.3, rotate: -19, zIndex: 5 }}>
            {owned !== undefined && !owned && <NotOwnedOverlay />}
            {/* Tutaj jest lazy loading */}
            <Img src={card.image} alt={card.id.toString()} loading="lazy" />
            <Name>{card.name.split(" ").map((word: string) => <Word key={word}>{word}</Word>)}</Name>
            <Description>{card.description}</Description>
            <Mana>{card.mana}</Mana>
            <Atk>{card.atk}</Atk>
            <Hp>{card.hp}</Hp>
        </Index>
    );
}

export default Card;
