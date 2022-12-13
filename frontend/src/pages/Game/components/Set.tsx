import React from "react";
import {TWrapper} from "../styles";
import CardsList from "../../../components/Card";

export const Set: React.FC<{ player: any, isme: boolean, selected: any, setSelected: any }> = ({
                                                                                                   player,
                                                                                                   isme,
                                                                                                   selected,
                                                                                                   setSelected
                                                                                               }) => {
    // let tmp = []
    // let nArray2: any = [...player._hand], numbers2 = new Cards(nArray2), it2 = numbers2.createIterator();
    // while (it2.hasNext()) {
    //     tmp.push(it2.next())
    // }
    return (<TWrapper>
        {/*{tmp.map(card => <CardsList key={`${isme ? 1 : 0}${card.id}`} card={card} selected={card.id === selected?.id}*/}
        {/*                            onSelect={() => setSelected(card)} empty={!isme}/>)}*/}
    </TWrapper>)
}