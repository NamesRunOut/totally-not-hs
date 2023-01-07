import React, {createContext, useEffect, useState} from 'react'
import {cardList} from "../utils/card_list";
import NullCard from "./special case/NullCard";
import Card from "./special case/Card";

type CardType = {
    id: number,
    name: string,
    image: any,
    basicPrice: number,
    rarePrice: number,
    description: string,
    mana: number,
    atk: number,
    hp: number
}

export const CardRegistryContext = createContext<[any, any, Array<CardType>]>([(card: CardType) => {}, (id: number) => {}, []])

const CardRegistry = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) => {
    const [registry, setRegistry] = useState<Array<CardType>>([])

    const addCard = (card: CardType) => {
        if (!registry.some(el => el.id === card.id)) setRegistry([...registry, card])
    }

    const getCard = (id: number) => {
        let card = registry.find(el => el.id === id)
        if (card === undefined) return new NullCard(-1, "unknown", "", 0, 0, "", 0, 0, 0)
        return new Card(card.id, card.name, card.image, card.basicPrice, card.rarePrice, card.description, card.mana, card.atk, card.hp)
    }

    useEffect(() => {
        setRegistry(cardList)
    }, [])

    return (
        <CardRegistryContext.Provider value={[addCard, getCard, registry]}>
            {props.children}
        </CardRegistryContext.Provider>
    )
}


export {CardRegistry}
