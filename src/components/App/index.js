import React from 'react'
import {Route, Redirect, Link, Switch} from 'react-router-dom'
import styled from 'styled-components'
import {LinearProgress} from 'material-ui/Progress'
import BottomNavigation from 'material-ui/BottomNavigation'
import {BottomNavigationAction} from 'material-ui/BottomNavigation'
import PeopleIcon from 'material-ui-icons/People'
import ScoreIcon from 'material-ui-icons/Create'
import ChartIcon from 'material-ui-icons/ShowChart'

import IconButton from 'material-ui/IconButton'
import UndoIcon from 'material-ui-icons/Undo'
import ShuffleIcon from 'material-ui-icons/Shuffle'

import ScoreTab from './ScoreTab'
import LeaderboardTab from './LeaderboardTab'
import ChartTab from './ChartTab'

import {FireEventStore, EventEmitter} from '../../fire-event-store'
import reducer from '../../reducer'
import AppBar from '../AppBar'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
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
  min-height: 56px;
  @media (min-width: 700px) {
    display: none;
  }
`

const UndoButton = ({player}) => (
  <EventEmitter stream="game-events">
    {emit => (
      <IconButton
        onClick={() => emit({type: 'UNDO', player: player.name})}
        color="inherit"
        disabled={!player || player.history.length === 0}
      >
        <UndoIcon />
      </IconButton>
    )}
  </EventEmitter>
)

const ShuffleButton = () => (
  <EventEmitter stream="game-events">
    {emit => (
      <IconButton
        onClick={() => emit({type: 'SHUFFLE_PLAYERS', seed: Math.random()})}
        color="inherit"
      >
        <ShuffleIcon />
      </IconButton>
    )}
  </EventEmitter>
)

export default ({match, location, history}) => (
  <FireEventStore
    stream="game-events"
    firebaseKey={`/sessions/${match.params.sessionId}/events`}
    reducer={reducer}
  >
    {(state, loaded) => {
      const routeRegex = new RegExp(`${match.url}/([^/]*)`)
      const result = routeRegex.exec(location.pathname)
      const currentRoute = (result && result[1]) || ''

      const hasPlayers = state.players && state.players.length > 0
      const currentPlayer = state.players[state.currentPlayerIndex]

      return (
        <Layout>
          <LoadingIndicator visible={loaded} />

          <AppBar
            utilityButton={
              <Switch>
                <Route
                  path={`${match.url}/leaderboard`}
                  render={() => <ShuffleButton />}
                />
                <Route
                  path={match.url}
                  render={() => <UndoButton player={currentPlayer} />}
                />
              </Switch>
            }
          />

          <Switch>
            <Route
              path={`${match.url}/leaderboard`}
              render={() => (
                <EventEmitter stream="game-events">
                  {emit => (
                    <LeaderboardTab
                      players={state.players}
                      currentPlayerIndex={state.currentPlayerIndex}
                      onPlayerSelect={player => {
                        emit({type: 'SELECT_PLAYER', player: player.name})
                        history.push(`${match.url}/score`)
                      }}
                    />
                  )}
                </EventEmitter>
              )}
            />

            <Route
              path={`${match.url}/score`}
              render={() => (
                <ScoreTab
                  players={state.players}
                  currentPlayerIndex={state.currentPlayerIndex}
                />
              )}
            />

            {hasPlayers && (
              <Route path={`${match.url}/chart`} render={() => <ChartTab />} />
            )}

            <Redirect from={match.url} to={`${match.url}/leaderboard`} />
          </Switch>

          <NavBar value={currentRoute} showLabels>
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
              disabled={!hasPlayers}
            />
            <BottomNavigationAction
              value="chart"
              label="Chart"
              icon={<ChartIcon />}
              component={Link}
              to={`${match.url}/chart`}
              disabled={!hasPlayers}
            />
          </NavBar>
        </Layout>
      )
    }}
  </FireEventStore>
)
