import React, {Fragment} from 'react'
import {FireEventStore} from './fire-event-store'
import {LinearProgress} from 'material-ui/Progress'
import ScorePanel from './ScorePanel'
import PlayerCard from './PlayerCard'
import reducer from './reducer'

export default () => (
  <FireEventStore
    stream="game-events"
    firebaseKey="/groups/founders/sessions/qjIs6NZLOXvDC435C5Af/events"
    reducer={reducer}
  >
    {(state, loaded) => (
      <Fragment>
        {loaded || <LinearProgress />}
        <section>
          {state.players.map(player => (
            <PlayerCard key={player.name} player={player} />
          ))}
        </section>
        <ScorePanel />
        <section>
          <pre>{JSON.stringify(state, true, 2)}</pre>
        </section>
      </Fragment>
    )}
  </FireEventStore>
)
