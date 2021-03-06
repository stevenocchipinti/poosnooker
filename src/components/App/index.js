import React from 'react'
import {Route, Redirect, Link, Switch} from 'react-router-dom'
import styled from 'styled-components'
import {LinearProgress} from 'material-ui/Progress'
import BottomNavigation from 'material-ui/BottomNavigation'
import {BottomNavigationAction} from 'material-ui/BottomNavigation'
import PeopleIcon from 'material-ui-icons/People'
import ScoreIcon from 'material-ui-icons/Create'
import ChartIcon from 'material-ui-icons/ShowChart'

import AppBar from '../AppBar'
import ScoreTab from './ScoreTab'
import LeaderboardTab from './LeaderboardTab'
import ChartTab from './ChartTab'

import {FireEventStore, EventEmitter} from '../../fire-event-store'
import reducer from '../../reducer'
import {largeBreakpointWidth} from '../../config-constants'

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
  @media (min-width: ${largeBreakpointWidth}px) {
    display: none;
  }
`

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
        <EventEmitter stream="game-events">
          {emit => (
            <Layout>
              <LoadingIndicator visible={loaded} />

              <AppBar currentPlayer={currentPlayer} />

              <Switch>
                <Route
                  path={`${match.url}/leaderboard`}
                  render={() => (
                    <LeaderboardTab
                      players={state.players}
                      currentPlayerIndex={state.currentPlayerIndex}
                      onPlayerSelect={player => {
                        emit({type: 'SELECT_PLAYER', player: player.name})
                        history.push(`${match.url}/score`)
                      }}
                    />
                  )}
                />

                <Route
                  path={`${match.url}/score`}
                  render={() => (
                    <ScoreTab
                      players={state.players}
                      currentPlayerIndex={state.currentPlayerIndex}
                      onPlayerSelect={player =>
                        emit({type: 'SELECT_PLAYER', player: player.name})
                      }
                    />
                  )}
                />

                {hasPlayers && (
                  <Route
                    path={`${match.url}/chart`}
                    render={() => <ChartTab />}
                  />
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
          )}
        </EventEmitter>
      )
    }}
  </FireEventStore>
)
