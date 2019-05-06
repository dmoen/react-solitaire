class CardDeck {
  static instance;

  constructor () {
    if (this.instance) {
      return this.instance
    }

    this.deck = []

    const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds']
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    for (let suit in suits) {
      for (let value in values) {
        this.deck.push(
          {
            suit: suits[suit],
            value: values[value],
            background: this.getBackground(values[value], suits[suit])
          }
        )
      }
    }

    this.instance = this
  }

  getBackground (value, suit) {
    let background = value +
      '_of_' + suit + '.svg'

    background = require('./cards/svg-cards/' + background.toLowerCase())

    return { backgroundImage: `url(${background})` }
  }

  pullCard () {
    let randCard = this.deck[Math.floor(Math.random() * this.deck.length)]

    this.deck.splice(this.deck.indexOf(randCard), 1)

    return randCard
  }
}

export default CardDeck
