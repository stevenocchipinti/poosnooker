import React from 'react'
import styled from 'styled-components'
import {EventEmitter} from '../fire-event-store'
import Button from 'material-ui/Button'

const Section = styled.section`
  grid-area: controls;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media (min-width: 700px) {
    grid-template-columns: 1fr;
  }
`

export default ({currentPlayer}) => {
  const ScoreButton = ({value, children}) => {
    return (
      <EventEmitter stream="game-events">
        {emit => (
          <Button
            onClick={() =>
              emit({type: 'SCORE', player: currentPlayer.name, reason: value})
            }
            color="primary"
            dense
            raised
          >
            {children}
          </Button>
        )}
      </EventEmitter>
    )
  }

  const ResetButton = ({value, children}) => {
    return (
      <EventEmitter stream="game-events">
        {emit => (
          <Button
            onClick={() =>
              emit({
                type: 'RESET_SCORE',
                player: currentPlayer.name,
                reason: value,
              })
            }
            color="accent"
            dense
            raised
          >
            {children}
          </Button>
        )}
      </EventEmitter>
    )
  }

  return (
    <Section>
      <ScoreButton value="CANNON">Cannon</ScoreButton>
      <ScoreButton value="YELLOW">2</ScoreButton>
      <ScoreButton value="GREEN">3</ScoreButton>
      <ScoreButton value="BLUE">5</ScoreButton>
      <ScoreButton value="PINK">6</ScoreButton>
      <ScoreButton value="BLACK">7</ScoreButton>
      <ResetButton value="FOUL">Foul</ResetButton>
      <ResetButton value="POO">Poo</ResetButton>
    </Section>
  )
}
