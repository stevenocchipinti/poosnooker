import React from 'react'
import styled from 'styled-components'
import Button from 'material-ui/Button'
import {EventEmitter} from '../fire-event-store'
import PlayerCard from '../PlayerCard'

const StyledButton = styled(Button)`
  margin: 10px;
`

const EventEmitterButton = ({event, children}) => {
  return (
    <EventEmitter stream="game-events">
      {emit => (
        <StyledButton onClick={() => emit(event)}>{children}</StyledButton>
      )}
    </EventEmitter>
  )
}

const Div = styled.div`
  display: flex;
  justify-content: center;'
`

export default ({currentPlayer, players}) => {
  if (!currentPlayer || !players.length) return <section />
  const otherPlayers = players.filter(p => p.name !== currentPlayer.name)
  return (
    <section>
      <Div>
        <EventEmitterButton event={{type: 'PREVIOUS_PLAYER'}}>
          &#x27E8;
        </EventEmitterButton>
        <PlayerCard key={currentPlayer.name} player={currentPlayer} />
        <EventEmitterButton event={{type: 'NEXT_PLAYER'}}>
          &#x27E9;
        </EventEmitterButton>
      </Div>

      <div>
        {otherPlayers.map(player => (
          <PlayerCard key={player.name} player={player} />
        ))}
      </div>
    </section>
  )
}
