import {usePlayer} from "../contexts/PlayerContext";
import {BasicCurrency, RareCurrency} from "../patterns/Money";
import {useEffect, useState} from "react";

const Navbar = () => {
    const {state, dispatch} = usePlayer()
    const [basicCurrency, setBasicCurrency] = useState(BasicCurrency())
    const [rareCurrency, setRareCurrency] = useState(RareCurrency())

    const addBasicMoney = () => dispatch({type: "addBasicMoney"})
    const addRareMoney = () => dispatch({type: "addRareMoney"})

    useEffect(() => {
        setBasicCurrency(state.wallet.basic)
        setRareCurrency(state.wallet.rare)
    }, [state.wallet])

    return(<>
        <div>{basicCurrency.getStringRepr()}</div>
        <div>{rareCurrency.getStringRepr()}</div>

        <button onClick={addBasicMoney}>Add Basic Currency</button>
        <button onClick={addRareMoney}>Add Rare Currency</button>
    </>)
}

export default Navbar