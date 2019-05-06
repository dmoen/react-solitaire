export default class PickPileController {
  addNewPile () {
    const pickAreacards = []

    for (let i = 0; i <= 10; i++) {
      const randCard = this.cardDeck.pullCard()
      pickAreacards.push(randCard)
    }

    return pickAreacards
  }

  addPileCards (pickPileCards, pickAreaCards, cardAddedCallback) {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        if (!pickAreaCards.length) {
          return
        }

        pickPileCards.push(pickAreaCards.pop())
        cardAddedCallback(pickPileCards, pickAreaCards)
      }, 150 * i)
    }
  }

  removeTopCard (pickPileCards, afterCardRemoved) {
    pickPileCards.pop()
    afterCardRemoved(pickPileCards)
  }
}
