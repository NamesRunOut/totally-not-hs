import React from 'react';
import {Atk, Description, Hp, Img, Index, Mana, Name, Word } from './styles';
import {useNavigate} from "react-router-dom";
import {cardList} from "../../utils/card_list";

const Cards: React.FC<{ card: any}> = ({card}) => {
    const navigate = useNavigate()

    const onClick = () => {
        navigate(`/card/${card.id}`)
    }

    return (
        <Index
            onClick={onClick}
            whileHover={{ scale: 1.3, rotate: 19, zIndex: 5 }}
            whileTap={{ scale: 1.3, rotate: -19, zIndex: 5 }}>
            {/* Tutaj jest lazy loading */}
            <Img src={cardList[card.id].image} alt={card.id} loading="lazy" />
            <Name>{card.name.split(" ").map((word: string) => <Word key={word}>{word}</Word>)}</Name>
            <Description>{card.description || "This is an example description that doesnt do a thing"}</Description>
            {/*<Price>{card.price.b}</Price>*/}
            <Mana>{card.mana || 0}</Mana>
            <Atk>{card.atk || 0}</Atk>
            <Hp>{card.hp || 0}</Hp>
        </Index>
    );
}

export default Cards;
