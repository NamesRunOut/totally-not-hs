import * as React from 'react'
import {BasicCurrency, Money, RareCurrency} from "../patterns/Money";
import {useReducer} from "react";

type Action = any//{type: 'increment'} | {type: 'decrement'}
type Dispatch = (action: Action) => void
type State = any//{count: number, money: Money}
type PlayerProviderProps = {children: React.ReactNode}

const PlayerStateContext = React.createContext<{state: State; dispatch: Dispatch} | undefined>(undefined)

function playerReducer(state: State, action: Action) {
    switch (action.type) {
        case 'addBasicMoney': {
            return {...state, wallet: {...state.wallet, basic: state.wallet.basic.add(BasicCurrency(100))}}
        }
        case 'addRareMoney': {
            return {...state, wallet: {...state.wallet, rare: state.wallet.rare.add(RareCurrency(100))}}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function PlayerProvider({children}: PlayerProviderProps) {
    let initArgs = {count: 0, wallet: {basic: BasicCurrency(), rare: RareCurrency()}}
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