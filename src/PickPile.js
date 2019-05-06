import React, { Component } from 'react'
import './style/pick-pile.scss'
import Card from './Card'

class PickPile extends Component {
  cards () {
    let cards = []

    this.props.cards.forEach((card, i) => {
      cards.push(
        <Card
          key={i}
          onDblClick={() => this.props.onCardDblClick(card)}
          onDropped={this.props.onCardRemove}
          background={card.background}
          suit={card.suit}
          value={card.value}
          flipped={true}
          style={this.getStyles(i)}
        />
      )
    })

    return cards
  }

  getStyles (order) {
    return {
      zIndex: order
    }
  }

  render () {
    return (
      <div className="pick-pile">
        {this.cards()}
      </div>
    )
  }
}

export default PickPile
