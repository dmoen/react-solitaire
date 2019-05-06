import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import Card from './Card'
import rowChunkDragSource from './dragSources/rowChunkDragSource'
import './style/row-chunk.scss'

class RowChunk extends Component {
  cards () {
    let cards = []

    this.props.cards.forEach((card, i) => {
      const cardComponent =
        <Card
          key={i}
          onDropped={this.props.onDropped}
          onDblClick={() => this.props.onDblClick(card)}
          background={card.background}
          suit={card.suit}
          value={card.value}
          flipped={card.flipped}
          style={this.getChunkCardStyles(cards.length)}
          canDrag={i === this.props.cards.length - 1}
        />

      cards.push(cardComponent)
    })

    return cards
  }

  getChunkCardStyles (order) {
    return {
      zIndex: order - 1,
      top: (order * 20) + 'px'
    }
  }

  render () {
    const { isDragging, connectDragSource } = this.props
    const opacity = isDragging ? 0 : 1

    return connectDragSource(
      <div className="row-chunk" style={ { ...this.props.style, opacity } }>
        {this.cards()}
      </div>
    )
  }
}

export default DragSource('rowChunk', rowChunkDragSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(RowChunk)
