import React from 'react'
import TabPanel from './TabPanel'
import CurrentPlayerPanel from '../CurrentPlayerPanel'
import OtherPlayersPanel from '../OtherPlayersPanel'
import ActionPanel from '../ActionPanel'
import {largeBreakpointWidth} from '../../config-constants'

const TabPanelContainer = TabPanel.extend`
  display: flex;
  flex-direction: column;

  @media (min-width: ${largeBreakpointWidth}px) {
    display: grid;
    grid-template-columns: 5fr 1fr;
    grid-template-areas:
      'current-player action-panel'
      'other-players  action-panel';
  }
`

export default ({players, currentPlayerIndex}) => {
  const currentPlayer = players[currentPlayerIndex]
  const otherPlayers = players.filter(p => p.name !== currentPlayer.name)

  return (
    <TabPanelContainer>
      <CurrentPlayerPanel currentPlayer={currentPlayer} players={players} />
      <OtherPlayersPanel players={otherPlayers} />
      <ActionPanel currentPlayer={currentPlayer} />
    </TabPanelContainer>
  )
}
