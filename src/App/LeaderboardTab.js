import React, {Fragment} from 'react'
import {PlayerCardItem} from '../PlayerCard'

export default ({players, currentPlayerIndex}) => {
  return (
    <Fragment>
      {players.map(player => (
        <PlayerCardItem key={player.name} player={player} />
      ))}
    </Fragment>
  )
}
