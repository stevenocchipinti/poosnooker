import React from 'react'
import styled from 'styled-components'
import Button from 'material-ui/Button'
import {EventEmitter} from '../fire-event-store'
import {PlayerCard} from '../PlayerCard'

const Paddle = styled(Button)`
  font-size: 2em;
`
const ChangePlayerPaddle = ({direction}) => {
  const events = {
    previous: {type: 'PREVIOUS_PLAYER'},
    next: {type: 'NEXT_PLAYER'},
  }
  return (
    <EventEmitter stream="game-events">
      {emit => (
        <Paddle dense onClick={() => emit(events[direction])}>
          {{previous: '\u27E8', next: '\u27E9'}[direction]}
        </Paddle>
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
      <ChangePlayerPaddle direction="previous" />

      <div style={{flexGrow: 1}}>
        <PlayerCard key={currentPlayer.name} player={currentPlayer} />
      </div>

      <ChangePlayerPaddle direction="next" />
    </Section>
  )
}
