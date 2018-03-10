import React from 'react'
import TabPanel from './TabPanel'
import CurrentPlayerPanel from '../CurrentPlayerPanel'
import OtherPlayersPanel from '../OtherPlayersPanel'
import ScorePanel from '../ScorePanel'

export default ({players, currentPlayerIndex}) => {
  const currentPlayer = players[currentPlayerIndex]
  const otherPlayers = players.filter(p => p.name !== currentPlayer.name)

  return (
    <TabPanel>
      <CurrentPlayerPanel currentPlayer={currentPlayer} players={players} />
      <OtherPlayersPanel players={otherPlayers} />
      <ScorePanel currentPlayer={currentPlayer} />
    </TabPanel>
  )
}
