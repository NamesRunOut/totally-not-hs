import React, {useEffect} from 'react';
import styled from "styled-components";
import Card from "../../../components/Card";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  
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

    return (
        <Wrapper>
            {cards.map((card: any) => <Card key={card.id} card={card} selected={card.selected || false} onSelect={() => selectCard(card.id)} empty={false}/>)}
        </Wrapper>
    );
}

export default CardsList;
