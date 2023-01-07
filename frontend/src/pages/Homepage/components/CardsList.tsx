import React, {useEffect} from 'react';
import styled from "styled-components";
import Card from "../../../components/Card";
//@ts-ignore
import bg from "../../../assets/bg.png";
import { PageWrapper } from '../styles';

const CardsList: React.FC<{ cards: any, setCards: any }> = ({cards, setCards}) => {
    return (<>
        {cards.map((card: any) => <Card key={card.id} card={card}/>)}
    </>)
}

export default CardsList;
