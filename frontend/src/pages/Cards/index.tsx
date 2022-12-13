import React, {useState} from "react"
import CardsList from "../Homepage/components/CardsList";
import {cardList} from "../../utils/card_list";

const Cards = () => {
    const [cards, setCards] = useState<any>(cardList)


    return(<>
        <CardsList cards={cards} setCards={setCards}/>
    </>)
}

export default Cards