export default {
  drop (props, monitor, component) {
    if (monitor.canDrop()) {
      return {
        addCard: props.onDrop
      }
    }
  },
  canDrop (props, monitor) {
    const topCardInPile = props.cards[props.cards.length - 1]
    const cardToBeDropped = monitor.getItem()

    if (
      topCardInPile && (topCardInPile.value + 1) === cardToBeDropped.value &&
      topCardInPile.suit === cardToBeDropped.suit
    ) {
      return true
    } else if (!topCardInPile && cardToBeDropped.value === 1) {
      return true
    }

    return false
  }
}
