import React from "react";
import {Crystal, Mana} from "../styles";

const toArray = (num: number) => {
    let tmp = []
    for (let i = 0; i < num; i++) tmp.push(0)
    return tmp
}

export const PlayerMana: React.FC<{ amount: number }> = ({amount}) => {
    if (amount > 5)
        return (
            <Mana>
                <Crystal/>x {amount}
            </Mana>
        )
    return (
        <Mana>
            {toArray(amount).map(item => <Crystal/>)}
        </Mana>
    )
}