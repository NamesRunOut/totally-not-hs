//@ts-nocheck
import React, {createContext, useContext, useEffect, useState} from 'react'
import {cardList} from "../utils/card_list";
import NullCard from "./special case/NullCard";
import Card from "./special case/Card";
import { ServerConnectionContext } from '../contexts/ServerConnection';

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
    const socket = useContext<any>(ServerConnectionContext)

    const addCard = (card: CardType) => {
        if (!registry.some(el => el.id === card.id)) setRegistry([...registry, card])
    }

    const getCard = (id: number) => {
        let card = registry.find(el => el.id === id)
        if (card === undefined) return new NullCard(-1, "unknown", "", 0, 0, "", 0, 0, 0)
        return new Card(card.id, card.name, card.image, card.basicPrice, card.rarePrice, card.description, card.mana, card.atk, card.hp)
    }

    useEffect(() => {
        socket.emit('getAllCards', {})

        socket.on('getAllCards', (r: any) => {
            let cards = []

            for (let [iter, card] of Object.entries(r)){
                let tmp = cardList.find(el => el.id === card.id) 
                if (tmp !== undefined) {
                    tmp.description = card.description
                    tmp.mana = 1//card.mana
                    tmp.hp = card.hp
                    tmp.atk = card.atk
                }
                //cards.push(tmp)
            }
            for (let el of cardList) el.mana = 1

            setRegistry(cardList)
            //setRegistry(cards)
        })

        return () => socket.off('getAllCards')
    }, [socket])

    return (
        <CardRegistryContext.Provider value={[addCard, getCard, registry]}>
            {props.children}
        </CardRegistryContext.Provider>
    )
}


export {CardRegistry}
