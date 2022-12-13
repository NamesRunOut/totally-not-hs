import React from 'react';
import styled from "styled-components";
// @ts-ignore
import {motion} from "framer-motion";

const Img = styled.img`
  width: 75px;
  height: 75px;
  border: 2px solid #282c34;
  background: #282c34;
  border-radius: 0.5rem;

  margin-bottom: 0.5rem;
`

const Card = styled.div`
  background: azure;
  color: #282c34;

  border-radius: 0.5rem;
  border: ${props =>
          //@ts-ignore
          props.selected ? '2px solid red' : '2px solid #282c34'};
  padding: 1rem 1rem 0 1rem;

  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  font-size: 1rem;
`

const BlankCard = styled(Card)`
  width: 113.033px;
  height: 156px;
  opacity: 0.1;
`

const Name = styled.div`
  font-size: 1.25rem;
`

const Mana = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: dodgerblue;
  padding: 0.25rem;
`

const Stats = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const Hp = styled.div`
  background: lightgreen;
  padding: 0.25rem;
`

const Atk = styled.div`
  background: indianred;
  padding: 0.25rem;
`

const Description = styled.div`
  font-size: 0.85rem;
`

const CardsList: React.FC<{ card: any, selected: boolean, onSelect: any, empty: boolean }> = ({card, selected, onSelect, empty}) => {
    if (empty)
        return (
            <BlankCard/>
        );

    return (
        <Card
            onClick={onSelect}
            //@ts-ignore
            selected={selected}>
            <Img src={`https://avatars.dicebear.com/api/jdenticon/${card.id}.svg`}/>
            <Name>{card.name}</Name>
            <Description>{card.description}</Description>
            <Mana>{card.mana}</Mana>
            <Stats>
                <Atk>{card.atk}</Atk>
                <Hp>{card.hp}</Hp>
            </Stats>
        </Card>
    );
}

export default CardsList;
