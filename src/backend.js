import Firebase from 'firebase'
import 'firebase/firestore'

// Note: Most backend operations are handled by fire-event-store.js

const createNewGame = () =>
  Firebase.firestore()
    .collection('sessions')
    .add({startTime: Firebase.firestore.FieldValue.serverTimestamp()})
    .then(doc => `/sessions/${doc.id}`)

export {createNewGame}
