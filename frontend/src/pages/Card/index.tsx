import React, {useContext} from 'react';
import {Atk, BaseInfo, Description, Hp, Img, Index, Mana, Name, Owned, PriceB, PriceR, Stats, Word} from './styles';
import {useParams} from "react-router-dom";
import {usePlayer} from "../../contexts/PlayerContext";
import {CardRegistryContext} from "../../patterns/CardRegistry";
import {NotificationContext} from "../../contexts/Notification";

const Cards = () => {
    const {id} = useParams()
    const {state, dispatch} = usePlayer()
    const [, getCard] = useContext(CardRegistryContext)
    const card = getCard(id ? parseInt(id) : -1)
    const [setNotification] = useContext(NotificationContext)

    return (<Index>
        <Img src={card.image} />
        <BaseInfo>
            <Name>{card.name.split(" ").map((word: string) => <Word key={word}>{word}</Word>)}</Name>
            <Stats>
                <Mana>Mana cost {card.mana}</Mana>
                <Atk>Attack power {card.atk}</Atk>
                <Hp>Health points {card.hp}</Hp>
            </Stats>
        </BaseInfo>

        <Description>{card.description || "This is an example description that doesnt do a thing"}</Description>

        <BaseInfo>
            {state.ownedCards.has(card.id) ? <Owned>Owned</Owned> :
            <>
                <Stats>
                    <PriceB onClick={() => card.buyIt(dispatch, card.id, "B", setNotification, state.wallet.basic.amount)}>Buy using B: {card.basicPrice || 0}</PriceB>
                </Stats>
                <Stats>
                    <PriceR onClick={() => card.buyIt(dispatch, card.id, "R", setNotification, state.wallet.rare.amount)}>Buy using R: {card.rarePrice || 0}</PriceR>
                </Stats>
            </>}
        </BaseInfo>
    </Index>);
}

export default Cards;
