import * as React from 'react'
import {BasicCurrency, Money, RareCurrency} from "../patterns/Money";
import {useReducer} from "react";

type Action = any//{type: 'increment'} | {type: 'decrement'}
type Dispatch = (action: Action) => void
type State = any//{count: number, money: Money}
type PlayersProviderProps = {children: React.ReactNode}

const PlayersStateContext = React.createContext<{state: State; dispatch: Dispatch} | undefined>(undefined)

function playersReducer(state: State, action: Action) {
    switch (action.type) {
        case 'addBasicMoney': {
            return {...state}
        }
        case 'addRareMoney': {
            return {...state}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function PlayersProvider({children}: PlayersProviderProps) {
    let initArgs = {count: 0, players: [{name: "unnamed", basicCurrencyValue: 0, rareCurrencyValue: 0}]}
    const [state, dispatch] = useReducer(playersReducer, initArgs)
    const value = {state, dispatch}
    return (
        <PlayersStateContext.Provider value={value}>
            {children}
        </PlayersStateContext.Provider>
    )
}

function usePlayers() {
    const context = React.useContext(PlayersStateContext)
    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider')
    }
    return context
}

export {PlayersProvider, usePlayers}