export default {
  beginDrag (props) {
    return {
      cards: props.cards
    }
  },
  endDrag (props, monitor, component) {
    const dropResult = monitor.getDropResult()

    if (dropResult) {
      dropResult.addCards(props.cards)
      props.onDropped(props.cards.length)
    }
  }
}
