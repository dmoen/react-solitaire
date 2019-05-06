export default class CardRowsController {
  constructor (cardDeck) {
    this.cardDeck = cardDeck
  }

  getCardRowsCards () {
    let cardRows = []

    for (let cardRow = 0; cardRow <= 6; cardRow++) {
      const cards = []

      for (let crc = 0; crc <= cardRow; crc++) {
        cards.push(this.cardDeck.pullCard())
      }

      const lastCard = cards.pop()
      lastCard.flipped = true

      cardRows.push([...cards, lastCard])
    }

    return cardRows
  }

  addCard (cardRowCards, rowNumb, card, after) {
    cardRowCards[rowNumb].push(card)

    after(cardRowCards)
  }

  addCards (cardRowCards, rowNumb, cards, after) {
    console.log(cards)
    cards.forEach((card) => {
      console.log(card)
      cardRowCards[rowNumb].push(card)
    })

    after(cardRowCards)
  }

  removeCards (count, cardRowCards, rowNumb, after) {
    for (let i = 0; i < count; i++) {
      cardRowCards[rowNumb].pop()
    }

    if (cardRowCards[rowNumb].length) {
      cardRowCards[rowNumb][cardRowCards[rowNumb].length - 1].flipped = true
    }

    after(cardRowCards)
  }
}
