const selectAll = (cards: any, setCards: any) => {
    let tmp = cards
    tmp.forEach((card: any) => card.selected = true)
    setCards([...tmp])
}

export default selectAll