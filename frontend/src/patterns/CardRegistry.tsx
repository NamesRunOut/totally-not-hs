import React, {createContext, useState} from 'react'

type CardType = {
    id: number,
    name: string,
    image: any
}

export const CardRegistryContext = createContext([(card: CardType) => {}, (id: number) => {}])

const CardRegistry = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) => {
    const [registry, setRegistry] = useState<Array<CardType>>([])

    const addCard = (card: CardType) => {
        if (!registry.some(el => el.id === card.id)) setRegistry([...registry, card])
    }

    const setCard = (id: number) => {
        return registry.find(el => el.id === id)
    }

    return (
        <CardRegistryContext.Provider value={[addCard, setCard]}>
            {props.children}
        </CardRegistryContext.Provider>
    )
}


export {CardRegistry}
