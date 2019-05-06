export default class PickAreaController {
  constructor (cardDeck) {
    this.cardDeck = cardDeck
  }

  addNewPile () {
    const pickAreacards = []

    for (let i = 0; i <= 10; i++) {
      const randCard = this.cardDeck.pullCard()
      pickAreacards.push(randCard)
    }

    return pickAreacards
  }

  resetPile (pickPileCards, pickAreaCards, cardAddedCallback) {
    for (let i = 0; i < pickPileCards.length; i++) {
      setTimeout(() => {
        pickAreaCards.push(pickPileCards.pop())
        cardAddedCallback(pickPileCards, pickAreaCards)
      }, 60 * i)
    }
  }
}
