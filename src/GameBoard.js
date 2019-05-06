import React, { Component } from 'react'
import './style/GameBoard.scss'
import PickArea from './PickArea'
import PickPile from './PickPile'
import CardRow from './CardRow'
import DropArea from './DropArea'
import CardDeck from './CardDeck'
import PickAreaController from './deckControllers/PickAreaController'
import PickPileController from './deckControllers/PickPileController'
import DropAreaController from './deckControllers/DropAreaController'
import CardRowsController from './deckControllers/CardRowsController'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Swal from 'sweetalert2'

export class GameBoard extends Component {
  componentWillMount () {
    this.newGame()
  }

  newGame () {
    this.cardDeck = new CardDeck()
    this.pickAreaController = new PickAreaController(this.cardDeck)
    this.pickPileController = new PickPileController()
    this.dropAreaController = new DropAreaController()
    this.cardRowsController = new CardRowsController(this.cardDeck)
    this.setState({
      pickAreaCards: this.pickAreaController.addNewPile(),
      dropAreaCards: [[], [], [], []],
      cardRowCards: this.cardRowsController.getCardRowsCards(),
      pickPileCards: []
    })
    this.finishedCards = 0
  }

  maybeFinishGame () {
    if (this.finishedCards === 52) {
      alert('finished')
    }
  }

  onPickPileCardRemove () {
    this.pickPileController.removeTopCard(
      this.state.pickPileCards.slice(),
      (pickPileCards) => {
        this.setState({
          pickPileCards: pickPileCards
        })
      }
    )
  }

  onPickAreaClick () {
    const pickAreaCards = this.state.pickAreaCards.slice()
    const pickPileCards = this.state.pickPileCards.slice()
    const onCardAddedToPile = (pickPileCards, pickAreaCards) => {
      this.setState({
        pickAreaCards: pickAreaCards,
        pickPileCards: pickPileCards
      })
    }

    if (!pickAreaCards.length) {
      this.pickAreaController.resetPile(
        pickPileCards,
        pickAreaCards,
        onCardAddedToPile
      )
      return
    }

    this.pickPileController.addPileCards(
      pickPileCards,
      pickAreaCards,
      onCardAddedToPile
    )
  }

  onCardRowCardDoubleClick (card, after) {
    this.dropAreaController.addCardToCorrectPile(
      this.state.dropAreaCards.slice(),
      card,
      (dropAreaCards) => {
        this.setState({
          dropAreaCards: dropAreaCards
        })
        after()
      }
    )
  }

  onDropAreaCardDrop (number, cardProps, after) {
    this.dropAreaController.addCard(
      this.state.dropAreaCards.slice(),
      number,
      cardProps,
      (dropAreaCards) => {
        this.finishedCards++
        console.log('adding')
        this.setState({
          dropAreaCards: dropAreaCards
        }, after())
      }
    )
  }

  removeDropAreaCard (number) {
    this.dropAreaController.removeTopCard(
      this.state.dropAreaCards.slice(),
      number,
      (dropAreaCards) => {
        this.setState({
          dropAreaCards: dropAreaCards
        })
      }
    )
  }

  onCardRowCardDrop (number, cards) {
    this.cardRowsController.addCards(
      this.state.cardRowCards.slice(),
      number,
      cards,
      (cardRowCards) => {
        this.setState({
          cardRowCards: cardRowCards
        })
      }
    )
  }

  removeCardRowCard (number, count) {
    this.cardRowsController.removeCards(
      count,
      this.state.cardRowCards.slice(),
      number,
      (cardRowCards) => {
        this.setState({
          cardRowCards: cardRowCards
        })
      }
    )
  }

  dropAreas () {
    const dropAreas = []

    for (let i = 0; i <= 3; i++) {
      dropAreas.push(
        <DropArea
          cards={this.state.dropAreaCards[i]}
          onCardRemove={() => this.removeDropAreaCard(i)}
          onDrop={(cardProps) => this.onDropAreaCardDrop(
            i,
            cardProps,
            this.maybeFinishGame.bind(this)
          )}
        />
      )
    }

    return dropAreas
  }

  cardRows () {
    const cardRows = []

    for (let i = 0; i <= 6; i++) {
      cardRows.push(
        <CardRow
          numb={i + 1}
          cards={this.state.cardRowCards[i]}
          onCardDblClick={(card) => {
            this.onCardRowCardDoubleClick(card, () => this.removeCardRowCard(i, 1))
          }}
          onCardRemove={() => this.removeCardRowCard(i, 1)}
          onMultipleCardRemove={(count) => this.removeCardRowCard(i, count)}
          onDrop={(cardProps) => this.onCardRowCardDrop(i, [cardProps])}
          onMultipleDrop={(cardPropsArr) => this.onCardRowCardDrop(i, cardPropsArr)}
        />
      )
    }

    return cardRows
  }

  render () {
    return (
      <div className="game-board">
        <PickArea
          cards={this.state.pickAreaCards}
          onClick={() => this.onPickAreaClick()}
        />
        <PickPile
          onCardDblClick={(card) => {
            this.onCardRowCardDoubleClick(card, () => this.onPickPileCardRemove())
          }}
          cards={this.state.pickPileCards}
          onCardRemove={() => this.onPickPileCardRemove()}
        />
        <div className="drop-areas">
          {this.dropAreas()}
        </div>
        {this.cardRows()}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(GameBoard)
