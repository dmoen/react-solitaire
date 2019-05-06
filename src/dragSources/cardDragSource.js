export default {
  canDrag (props, monitor) {
    return props.canDrag !== false
  },
  beginDrag (props) {
    return {
      flipped: props.flipped,
      suit: props.suit,
      value: props.value
    }
  },
  endDrag (props, monitor, component) {
    const dropResult = monitor.getDropResult()

    if (dropResult) {
      dropResult.addCard(props)
      props.onDropped()
    }
  }
}
