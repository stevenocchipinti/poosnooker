import React, {Component} from 'react'
import Firebase from 'firebase'
import 'firebase/firestore'
import {Broadcast, Subscriber} from 'react-broadcast'

export class FireEventStore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      projection: props.reducer(),
    }

    let detachListenerFn = undefined

    const reattachListenerWithCursor = (detachOldListenerFn, cursor) => {
      detachOldListenerFn()
      let query = Firebase.firestore()
        .collection(props.firebaseKey)
        .orderBy('timestamp')
      if (cursor) query = query.startAfter(cursor)
      detachListenerFn = query.onSnapshot(updateState)
    }

    const updateState = snapshot => {
      if (snapshot.empty) return

      let source = snapshot.metadata.hasPendingWrites ? 'Local' : 'Server'
      console.log(`${source} events: ${snapshot.docs.length}`)

      this.setState(
        {
          loaded: true,
          projection: snapshot.docChanges
            .filter(c => c.type === 'added')
            .map(e => e.doc.data())
            .reduce(this.props.reducer, this.state.projection),
        },
        () => {
          if (!snapshot.metadata.hasPendingWrites) {
            reattachListenerWithCursor(
              detachListenerFn,
              snapshot.docs[snapshot.docs.length - 1],
            )
          }
        },
      )
    }

    detachListenerFn = Firebase.firestore()
      .collection(props.firebaseKey)
      .orderBy('timestamp')
      .onSnapshot(updateState)
  }

  eventEmitter() {
    return event =>
      Firebase.firestore()
        .collection(this.props.firebaseKey)
        .add({
          ...event,
          timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
        })
  }

  render() {
    const {projection, loaded} = this.state
    const {stream, children: render} = this.props
    return (
      <Broadcast channel={stream} value={this.eventEmitter()}>
        {render(projection, loaded)}
      </Broadcast>
    )
  }
}

export class EventEmitter extends Component {
  render() {
    const {stream, children: render} = this.props
    return <Subscriber channel={stream}>{emit => render(emit)}</Subscriber>
  }
}
