import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import './style/card-row.scss'
import Card from './Card'
import RowChunk from './RowChunk'

const canDropChunk = (props, monitor) => {
  const topCardInPile = props.cards[props.cards.length - 1]
  const cardsToBeDropped = monitor.getItem()
  const firstCardInChunk = cardsToBeDropped.cards[0]
  const blackSuitNeeded = topCardInPile && (topCardInPile.suit === 'Diamonds' || topCardInPile.suit === 'Hearts')
  const firstCardInChunkRedSuit = firstCardInChunk.suit === 'Diamonds' || firstCardInChunk.suit === 'Hearts'

  if (
    topCardInPile && (topCardInPile.value - 1) === firstCardInChunk.value &&
    (firstCardInChunkRedSuit && !blackSuitNeeded || !firstCardInChunkRedSuit && blackSuitNeeded)
  ) {
    return true
  } else if (!topCardInPile && firstCardInChunk.value === 13) {
    return true
  }

  return false
}

const canDropCard = (props, monitor) => {
  const topCardInPile = props.cards[props.cards.length - 1]
  const cardToBeDropped = monitor.getItem()
  const blackSuitNeeded = topCardInPile && (topCardInPile.suit === 'Diamonds' || topCardInPile.suit === 'Hearts')
  const droppedCardRedSuit = cardToBeDropped.suit === 'Diamonds' || cardToBeDropped.suit === 'Hearts'

  if (
    topCardInPile && (topCardInPile.value - 1) === cardToBeDropped.value &&
    (droppedCardRedSuit && !blackSuitNeeded || !droppedCardRedSuit && blackSuitNeeded)
  ) {
    return true
  } else if (!topCardInPile && cardToBeDropped.value === 13) {
    return true
  }

  return false
}

const boxTarget = {
  drop (props, monitor, component) {
    const itemType = monitor.getItemType()

    if (itemType === 'card') {
      return { addCard: props.onDrop }
    }

    return { addCards: props.onMultipleDrop }
  },
  canDrop (props, monitor) {
    const itemType = monitor.getItemType()

    if (itemType === 'card') {
      return canDropCard(props, monitor)
    }

    return canDropChunk(props, monitor)
  }
}

class CardRow extends Component {
  isChunkCard (card, colIndex) {
    if (!card.flipped) {
      return false
    }

    if (this.props.cards[colIndex - 1] && this.props.cards[colIndex - 1].flipped || this.props.cards[colIndex + 1] && this.props.cards[colIndex + 1].flipped) {
      return true
    }

    return false
  }

  addCards () {
    let cards = []
    this.props.cards.forEach((card, i) => {
      if (this.isChunkCard(card, i)) {
        return
      }

      const cardComponent =
        <Card
          key={i}
          onDropped={this.props.onCardRemove}
          onDblClick={() => this.props.onCardDblClick(card)}
          background={card.background}
          suit={card.suit}
          value={card.value}
          flipped={card.flipped}
          style={this.getStyles(i)}
          canDrag={i === this.props.cards.length - 1}
        />

      cards.push(cardComponent)
    })

    return cards
  }

  addCardChunks () {
    let cards = []
    this.props.cards.forEach((card, i) => {
      if (!this.isChunkCard(card, i)) {
        return
      }

      cards.push(card)
    })

    return cards.length
      ? <RowChunk
        cards={cards}
        style={this.getStyles(this.props.cards.length - cards.length)}
        onDropped={this.props.onMultipleCardRemove}
        onDblClick={this.props.onCardDblClick}
      /> : []
  }

  getStyles (order) {
    return {
      zIndex: order,
      top: (order * 20) + 'px'
    }
  }

  render () {
    const { connectDropTarget } = this.props

    return connectDropTarget(
      <div
        className={ 'card-row card-row--' + this.props.numb }
        style={ { height: this.props.cards.length + 150 + 20 + 'px' } }
      >
        {this.addCards()}
        {this.addCardChunks()}
      </div>
    )
  }
}

export default DropTarget(['card', 'rowChunk'], boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(CardRow)
