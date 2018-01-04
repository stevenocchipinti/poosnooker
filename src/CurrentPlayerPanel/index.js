import React from 'react'
import styled from 'styled-components'
import Button from 'material-ui/Button'
import {EventEmitter} from '../fire-event-store'
import PlayerCard from '../PlayerCard'

const EventEmitterButton = ({event, children}) => {
  return (
    <EventEmitter stream="game-events">
      {emit => (
        // Using inline-style here because styled components won't override MUI
        <Button style={{fontSize: '2em'}} dense onClick={() => emit(event)}>
          {children}
        </Button>
      )}
    </EventEmitter>
  )
}

const CurrentPlayerPanel = styled.div`
  display: flex;
  justify-content: center;
`

export default ({currentPlayer, players}) => {
  if (!currentPlayer || !players.length) return <section />
  return (
    <CurrentPlayerPanel>
      <EventEmitterButton event={{type: 'PREVIOUS_PLAYER'}}>
        &#x27E8;
      </EventEmitterButton>

      <div style={{flexGrow: 1}}>
        <PlayerCard key={currentPlayer.name} player={currentPlayer} />
      </div>

      <EventEmitterButton event={{type: 'NEXT_PLAYER'}}>
        &#x27E9;
      </EventEmitterButton>
    </CurrentPlayerPanel>
  )
}
