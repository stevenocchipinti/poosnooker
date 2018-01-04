import React, {Fragment} from 'react'
import styled from 'styled-components'
import {LinearProgress} from 'material-ui/Progress'
import {FireEventStore} from './fire-event-store'
import reducer from './reducer'
import CurrentPlayerPanel from './CurrentPlayerPanel'
import OtherPlayersPanel from './OtherPlayersPanel'
import ScorePanel from './ScorePanel'

const Layout = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;

  grid-template-columns: 1fr;
  grid-template-areas:
    'current-player'
    'controls';

  @media (min-width: 700px) {
    grid-template-columns: auto 100px;
    grid-template-areas:
      'current-player controls'
      'other-players controls';
  }
`

export default () => (
  <FireEventStore
    stream="game-events"
    firebaseKey="/groups/founders/sessions/qjIs6NZLOXvDC435C5Af/events"
    reducer={reducer}
  >
    {(state, loaded) => {
      const currentPlayer = state.players[state.currentPlayerIndex]
      const otherPlayers = state.players.filter(
        p => p.name !== currentPlayer.name,
      )
      return (
        <Fragment>
          {loaded || <LinearProgress />}
          <Layout>
            <CurrentPlayerPanel
              currentPlayer={currentPlayer}
              players={state.players}
            />
            <OtherPlayersPanel players={otherPlayers} />
            <ScorePanel currentPlayer={currentPlayer} />
          </Layout>
        </Fragment>
      )
    }}
  </FireEventStore>
)
