import React from 'react';
import {Atk, BaseInfo, Description, Hp, Img, Index, Mana, Name, Owned, PriceB, PriceR, Stats, Word} from './styles';
import {useNavigate, useParams} from "react-router-dom";
import {cardList} from "../../utils/card_list";

const Cards = () => {
    const {id} = useParams()

    const card: any = cardList[id ? parseInt(id) : 0]

    return (<Index>
        <Img src={card.image} />
        <BaseInfo>
            <Name>{card.name.split(" ").map((word: string) => <Word key={word}>{word}</Word>)}</Name>
            <Stats>
                <Mana>Mana cost {card.mana || 0}</Mana>
                <Atk>Attack power {card.atk || 0}</Atk>
                <Hp>Health points {card.hp || 0}</Hp>
            </Stats>
        </BaseInfo>

        <Description>{card.description || "This is an example description that doesnt do a thing"}</Description>

        <BaseInfo>
            {card.owned ? <Owned>Owned</Owned> :
            <>
                <Stats>
                    <PriceB>Buy using B: 420</PriceB>
                </Stats>
                <Stats>
                    <PriceR>Buy using R: 69</PriceR>
                </Stats>
            </>}

        </BaseInfo>
    </Index>);
}

export default Cards;
