import React, {useEffect} from 'react';
import styled from "styled-components";
import Card from "../../../components/Card";
//@ts-ignore
import bg from "../../../assets/bg.png";
import { PageWrapper } from '../styles';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1.5rem;
  
  padding: 2rem;
`

const CardsList: React.FC<{ cards: any, setCards: any }> = ({cards, setCards}) => {

    // useEffect(() => {
    //     socket.emit('getCards');
    //     socket.on('cardsList', (e: any) => setCards([...e]));
    //
    //     return () => {
    //         socket.off('cardsList');
    //     };
    // }, [setCards]);

    const selectCard = (id: string) => {
        let tmp = cards
        let index = tmp.findIndex((card: any) => card.id === id)
        tmp[index].selected = !tmp[index].selected
        setCards([...tmp])
    }

    return (<PageWrapper style={{backgroundImage: `url(${bg})`}}>
        <Wrapper>
            {/*{cards.map((card: any) => <Card key={card.id} card={card} selected={card.selected || false} onSelect={() => selectCard(card.id)} empty={false}/>)}*/}
            {cards.map((card: any) => <Card key={card.id} card={card}/>)}
        </Wrapper>
    </PageWrapper>);
}

export default CardsList;
