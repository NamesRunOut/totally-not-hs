import {usePlayer} from "../../contexts/PlayerContext";
import {BasicCurrency, RareCurrency} from "../../patterns/Money";
import {useEffect, useState} from "react";
import {Inline, TestButton, Wrapper} from "./styles";
import {Link, useNavigate} from "react-router-dom";
import SecondaryButton from "../SecondaryButton";
import NavButton from "../NavButton";

const Index = () => {
    const {state, dispatch} = usePlayer()
    const navigate = useNavigate()

    const addBasicMoney = () => dispatch({type: "addBasicMoney"})
    const addRareMoney = () => dispatch({type: "addRareMoney"})

    return(<Wrapper>
        <Inline>
            <NavButton onClick={() => navigate(`/`)} text={"Home"} />
            <NavButton onClick={() => navigate(`/cards`)} text={"Cards"} />
            <NavButton onClick={() => navigate(`/deck`)} text={"Deck"} />
        </Inline>

        <Inline>
            <TestButton onClick={addBasicMoney}>+B</TestButton>
            <TestButton onClick={addRareMoney}>+R</TestButton>

            <div>{state.wallet.basic.getStringRepr()}</div>
            <div>{state.wallet.rare.getStringRepr()}</div>
        </Inline>
    </Wrapper>)
}

export default Index