import * as React from 'react'
import {BasicCurrency, Money, RareCurrency} from "../patterns/Money";
import {useReducer} from "react";

type Action = any//{type: 'increment'} | {type: 'decrement'}
type Dispatch = (action: Action) => void
type State = any//{count: number, money: Money}
type PlayerProviderProps = {children: React.ReactNode}

const PlayerStateContext = React.createContext<{state: State; dispatch: Dispatch} | undefined>(undefined)

const playerReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'addBasicMoney': {
            return {
                ...state,
                wallet: {
                    ...state.wallet,
                    basic: state.wallet.basic.add(BasicCurrency(100))
                }
            }
        }
        case 'addRareMoney': {
            return {
                ...state,
                wallet: {
                    ...state.wallet,
                    rare: state.wallet.rare.add(RareCurrency(100))
                }
            }
        }
        case 'addCard': {
            if (action.currency === "R") {
                return {
                    ...state,
                    wallet: {
                        ...state.wallet,
                        rare: state.wallet.rare.sub(RareCurrency(action.price))
                    },
                    ownedCards: state.ownedCards.add(action.id)
                }
            }

            return {
                ...state,
                wallet: {
                    ...state.wallet,
                    basic: state.wallet.basic.sub(BasicCurrency(action.price))
                },
                ownedCards: state.ownedCards.add(action.id)
            }
        }
        case 'select': {
            if (state.deck.has(action.id)) {
                let tmp = structuredClone(state.deck)
                tmp.delete(action.id)

                return {
                    ...state,
                    deck: tmp
                }
            }
            return {
                ...state,
                deck: state.deck.add(action.id)
            }
        }
        case 'deselectAll': {
            return {
                ...state,
                deck: new Set([])
            }
        }
        case 'selectAll': {
            return {
                ...state,
                deck: new Set(Array.from(state.ownedCards))
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function PlayerProvider({children}: PlayerProviderProps) {
    let initArgs = {
        count: 0,
        wallet: {basic: BasicCurrency(), rare: RareCurrency()},
        ownedCards: new Set([1,2,3,4,5,6,7,8,9,10,11,12,13,15,17,21]),
        deck: new Set([])
    }
    const [state, dispatch] = useReducer(playerReducer, initArgs)
    const value = {state, dispatch}
    return (
        <PlayerStateContext.Provider value={value}>
            {children}
        </PlayerStateContext.Provider>
    )
}

function usePlayer() {
    const context = React.useContext(PlayerStateContext)
    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider')
    }
    return context
}

export {PlayerProvider, usePlayer}