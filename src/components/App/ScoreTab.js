import React from 'react'
import TabPanel from './TabPanel'
import CurrentPlayerPanel from '../CurrentPlayerPanel'
import OtherPlayersPanel from '../OtherPlayersPanel'
import ActionPanel from '../ActionPanel'
import ChartPanel from '../ChartPanel'
import {largeBreakpointWidth} from '../../config-constants'

const TabPanelContainer = TabPanel.extend`
  display: flex;
  flex-direction: column;

  @media (min-width: ${largeBreakpointWidth}px) {
    display: grid;
    grid-template-columns: 5fr 1fr;
    grid-template-areas:
      'current-player action-panel'
      'chart-panel    action-panel'
      'other-players  action-panel';
  }
`
export default ({players, currentPlayerIndex, onPlayerSelect}) => {
  const currentPlayer = players[currentPlayerIndex]
  const otherPlayers = [
    ...players.slice(currentPlayerIndex + 1),
    ...players.slice(0, currentPlayerIndex),
  ]

  return (
    <TabPanelContainer>
      <CurrentPlayerPanel currentPlayer={currentPlayer} players={players} />
      <ChartPanel
        cumulativeScore={currentPlayer && currentPlayer.cumulativeScore}
      />
      <OtherPlayersPanel
        onPlayerSelect={onPlayerSelect}
        players={otherPlayers}
      />
      <ActionPanel currentPlayer={currentPlayer} />
    </TabPanelContainer>
  )
}
