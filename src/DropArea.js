import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import dropAreaDropTarget from './dropTargets/dropAreaDropTarget'
import Card from './Card'
import './style/drop-area.scss'

class DropArea extends Component {
  cards () {
    let rows = []

    this.props.cards.forEach((randCard, i) => {
      rows.push(
        <Card
          onDropped={this.props.onCardRemove}
          suit={this.props.suit}
          value={this.props.value}
          background={randCard.background}
          key={i}
          flipped={true}
        />
      )
    })

    return rows
  }

  render () {
    const { connectDropTarget } = this.props

    return connectDropTarget(
      <div className="drop-areas__area">
        {this.cards()}
      </div>
    )
  }
}

export default DropTarget('card', dropAreaDropTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(DropArea)
