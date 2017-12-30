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
    Firebase.firestore()
      .collection(props.firebaseKey)
      .onSnapshot(snapshot => {
        this.setState({
          loaded: true,
          projection: snapshot.docChanges
            .filter(c => c.type === 'added')
            .map(e => e.doc.data())
            .reduce(this.props.reducer, this.state.projection),
        })
      })
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
    const {stream} = this.props
    return (
      <Broadcast channel={stream} value={this.eventEmitter()}>
        {this.props.children(projection, loaded)}
      </Broadcast>
    )
  }
}

export class EventEmitter extends Component {
  render() {
    const {stream, children} = this.props
    return <Subscriber channel={stream}>{emit => children(emit)}</Subscriber>
  }
}
