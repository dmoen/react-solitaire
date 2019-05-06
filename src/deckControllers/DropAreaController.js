export default class DropAreaController {
  pileIsNotEmpty (dropAreaCards, nr) {
    return dropAreaCards[nr].length
  }

  pileIsEmpty (dropAreaCards, nr) {
    return dropAreaCards[nr].length === 0
  }

  getPileTopCard (dropAreaCards, nr) {
    return dropAreaCards[nr].slice(-1)[0]
  }

  cardIsFirstInPile (dropAreaCards, nr, card) {
    return this.pileIsEmpty(dropAreaCards, nr) &&
      card.value === 1
  }

  cardMatchesPile (dropAreaCards, nr, card) {
    const lastDropAreaCard = this.getPileTopCard(dropAreaCards, nr)

    return lastDropAreaCard &&
      lastDropAreaCard.value + 1 === card.value &&
      lastDropAreaCard.suit === card.suit
  }

  addCardToCorrectPile (dropAreaCards, card, after) {
    for (let i = 0; i <= 3; i++) {
      if (this.cardIsFirstInPile(dropAreaCards, i, card) ||
          this.cardMatchesPile(dropAreaCards, i, card)
      ) {
        dropAreaCards[i].push(card)
        after(dropAreaCards)
        break
      }
    }
  }

  addCard (dropAreaCards, pileNumber, card, after) {
    dropAreaCards[pileNumber].push(card)

    after(dropAreaCards)
  };

  removeTopCard (dropAreaCards, pileNumber, afterCardRemoved) {
    dropAreaCards[pileNumber].pop()
    afterCardRemoved(dropAreaCards)
  }
}
