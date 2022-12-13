import {usePlayer} from "../../contexts/PlayerContext";
import {BasicCurrency, RareCurrency} from "../../patterns/Money";
import {useEffect, useState} from "react";
import {TestButton, Wrapper} from "./styles";

const Index = () => {
    const {state, dispatch} = usePlayer()

    const addBasicMoney = () => dispatch({type: "addBasicMoney"})
    const addRareMoney = () => dispatch({type: "addRareMoney"})

    return(<Wrapper>
        <TestButton onClick={addBasicMoney}>Add Basic Currency</TestButton>
        <TestButton onClick={addRareMoney}>Buy Rare Currency</TestButton>

        <div>{state.wallet.basic.getStringRepr()}</div>
        <div>{state.wallet.basic.getStringRepr()}</div>
    </Wrapper>)
}

export default Index