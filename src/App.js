import React, {Fragment} from 'react'
import {LinearProgress} from 'material-ui/Progress'
import {FireEventStore} from './fire-event-store'
import reducer from './reducer'
import ScorePanel from './ScorePanel'
import PlayerPanel from './PlayerPanel'

export default () => (
  <FireEventStore
    stream="game-events"
    firebaseKey="/groups/founders/sessions/qjIs6NZLOXvDC435C5Af/events"
    reducer={reducer}
  >
    {(state, loaded) => {
      const currentPlayer = state.players[state.currentPlayerIndex]
      return (
        <Fragment>
          {loaded || <LinearProgress />}
          <PlayerPanel currentPlayer={currentPlayer} players={state.players} />
          <ScorePanel currentPlayer={currentPlayer} />
        </Fragment>
      )
    }}
  </FireEventStore>
)
