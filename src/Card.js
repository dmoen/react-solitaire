import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import cardDragSource from './dragSources/cardDragSource'
import './style/card.scss'

class Card extends Component {
  render () {
    const { isDragging, connectDragSource } = this.props
    const opacity = isDragging ? 0 : 1

    return connectDragSource(
      <div onDoubleClick={() => this.props.onDblClick()} style={ { ...this.props.style, opacity } } className={ 'card' + (this.props.flipped ? ' card--flipped' : '') }>
        <div className="card__background"></div>
        <div className="card__foreground" style={this.props.background}></div>
      </div>
    )
  }
}

export default DragSource('card', cardDragSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Card)
