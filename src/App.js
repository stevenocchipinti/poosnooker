import React, {Fragment} from 'react'
import {Route, Redirect, Link, Switch} from 'react-router-dom'
import styled from 'styled-components'
import {LinearProgress} from 'material-ui/Progress'
import {FireEventStore} from './fire-event-store'
import reducer from './reducer'
import AppBar from './AppBar'
import CurrentPlayerPanel from './CurrentPlayerPanel'
import OtherPlayersPanel from './OtherPlayersPanel'
import ScorePanel from './ScorePanel'

import BottomNavigation, {
  BottomNavigationAction,
} from 'material-ui/BottomNavigation'
import PeopleIcon from 'material-ui-icons/People'
import ScoreIcon from 'material-ui-icons/Create'
import ChartIcon from 'material-ui-icons/ShowChart'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;

  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: auto 100px;
    grid-template-rows: auto 1fr 1fr auto;
    grid-template-areas:
      'appbar         controls'
      'current-player controls'
      'other-players  controls'
      'nav            controls';
  }
`

const ProgressBar = styled.div`
  position: absolute;
  width: 100vw;
  display: ${props => (props.visible ? 'none' : 'block')};
`
const LoadingIndicator = ({visible}) => (
  <ProgressBar visible={visible}>
    <LinearProgress />
  </ProgressBar>
)

const NavBar = styled(BottomNavigation)`
  grid-area: 'nav';
  margin-top: 10px;

  @media (min-width: 700px) {
    display: none;
  }
`

const ScorePage = ({players, currentPlayerIndex}) => {
  const currentPlayer = players[currentPlayerIndex]
  const otherPlayers = players.filter(p => p.name !== currentPlayer.name)

  return (
    <Fragment>
      <CurrentPlayerPanel currentPlayer={currentPlayer} players={players} />
      <OtherPlayersPanel players={otherPlayers} />
      <ScorePanel currentPlayer={currentPlayer} />
    </Fragment>
  )
}

export default ({match}) => (
  <FireEventStore
    stream="game-events"
    firebaseKey="/groups/founders/sessions/qjIs6NZLOXvDC435C5Af/events"
    reducer={reducer}
  >
    {(state, loaded) => {
      return (
        <Layout>
          <LoadingIndicator visible={loaded} />
          <AppBar />

          <Switch>
            <Route
              path={`${match.url}/leaderboard`}
              render={() => <div>Leaderboard goes here</div>}
            />

            <Route
              path={`${match.url}/score`}
              render={() => (
                <ScorePage
                  players={state.players}
                  currentPlayerIndex={state.currentPlayerIndex}
                />
              )}
            />

            <Route
              path={`${match.url}/chart`}
              render={() => <div>Chart goes here</div>}
            />

            <Redirect from={match.url} to={`${match.url}/score`} />
          </Switch>

          <NavBar value="score" showLabels>
            <BottomNavigationAction
              value="leaderboard"
              label="Leaderboard"
              icon={<PeopleIcon />}
              component={Link}
              to={`${match.url}/leaderboard`}
            />
            <BottomNavigationAction
              value="score"
              label="Score"
              icon={<ScoreIcon />}
              component={Link}
              to={`${match.url}/score`}
            />
            <BottomNavigationAction
              value="chart"
              label="Chart"
              icon={<ChartIcon />}
              component={Link}
              to={`${match.url}/chart`}
            />
          </NavBar>
        </Layout>
      )
    }}
  </FireEventStore>
)
