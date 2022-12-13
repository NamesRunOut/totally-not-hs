import React from "react";
import {Slot} from "../styles";
import CardsList from "../../../components/Card";

export const CardSlot: React.FC<{ click: any, card: any }> = ({click, card}) => {
    return (
        <Slot onClick={click}>
            {/*{card !== undefined && card !== null ? <CardsList card={card} selected={false} onSelect={() => {*/}
            {/*}} empty={false}/> : <></>}*/}
        </Slot>
    )
}