import React, { Component } from 'react'
import './style/pick-area.scss'
import Card from './Card'

class PickArea extends Component {
  cards () {
    let cards = []

    this.props.cards.forEach((element, i) => {
      cards.push(
        <Card
          canDrag={false}
          background={element.background}
          key={i}
          style={this.getStyles(i)}
        />
      )
    })

    return cards.reverse()
  }

  getStyles (order) {
    return {
      zIndex: order,
      top: '-' + order + 'px',
      left: '-' + order + 'px'
    }
  }

  render () {
    const styles = {
      top: this.cardCount,
      left: this.cardCount
    }

    return (
      <div
        onClick={() => this.props.onClick()}
        style={styles}
        className="pick-area"
      >
        {this.cards()}
      </div>
    )
  }
}

export default PickArea
