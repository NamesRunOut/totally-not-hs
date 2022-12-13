const deselectAll = (cards: any, setCards: any) => {
    let tmp = cards
    tmp.forEach((card: any) => card.selected = false)
    setCards([...tmp])
}

export default deselectAll