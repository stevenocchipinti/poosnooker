import React from 'react'
import styled from 'styled-components'
import Button from 'material-ui/Button'
import {EventEmitter} from '../fire-event-store'
import {PlayerCard} from '../PlayerCard'

const EventEmitterButton = ({event, children}) => {
  return (
    <EventEmitter stream="game-events">
      {emit => (
        // Using inline-style here because styled components won't override MUI
        /* TODO: Find a better alternative to inline styles and the override in
        * AddPlayerButton. See here for more info:
        * https://material-ui-next.com/customization/css-in-js/#css-injection-order
        */
        <Button style={{fontSize: '2em'}} dense onClick={() => emit(event)}>
          {children}
        </Button>
      )}
    </EventEmitter>
  )
}

const Section = styled.section`
  grid-area: current-player;
  justify-self: center;

  display: flex;
  justify-content: center;
  align-items: center;
`

export default ({currentPlayer, players}) => {
  if (!currentPlayer || !players.length) return <Section />
  return (
    <Section>
      <EventEmitterButton event={{type: 'PREVIOUS_PLAYER'}}>
        &#x27E8;
      </EventEmitterButton>

      <div style={{flexGrow: 1}}>
        <PlayerCard key={currentPlayer.name} player={currentPlayer} />
      </div>

      <EventEmitterButton event={{type: 'NEXT_PLAYER'}}>
        &#x27E9;
      </EventEmitterButton>
    </Section>
  )
}
