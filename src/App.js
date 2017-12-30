import React, {Component} from 'react'
import {FireEventStore} from './fire-event-store'
import reducer from './reducer'

class App extends Component {
  render() {
    return (
      <FireEventStore
        stream="game-events"
        firebaseKey="/groups/founders/sessions/qjIs6NZLOXvDC435C5Af/events"
        reducer={reducer}
      >
        {(state, loaded) => (
          <header>
            <h1>Game on!</h1>
            {loaded || <p>Loading...</p>}
            <pre>{JSON.stringify(state, true, 2)}</pre>
          </header>
        )}
      </FireEventStore>
    )
  }
}

export default App
