import React from 'react'
import TabPanel from './TabPanel'
import CurrentPlayerPanel from '../CurrentPlayerPanel'
import OtherPlayersPanel from '../OtherPlayersPanel'
import ActionPanel from '../ActionPanel'

const TabPanelContainer = TabPanel.extend`
  display: flex;
  flex-direction: column;
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
