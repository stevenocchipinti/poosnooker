import React from 'react'
import styled from 'styled-components'
import {EventEmitter} from '../fire-event-store'
import Button from 'material-ui/Button'

const StyledButton = styled(Button)`
  margin: 10px;
`

export default ({currentPlayer}) => {
  const ScoreButton = ({value, children}) => {
    return (
      <EventEmitter stream="game-events">
        {emit => (
          <StyledButton
            onClick={() =>
              emit({type: 'SCORE', player: currentPlayer.name, reason: value})
            }
            color="primary"
            raised
          >
            {children}
          </StyledButton>
        )}
      </EventEmitter>
    )
  }

  const ResetButton = ({value, children}) => {
    return (
      <EventEmitter stream="game-events">
        {emit => (
          <StyledButton
            onClick={() =>
              emit({
                type: 'RESET_SCORE',
                player: currentPlayer.name,
                reason: value,
              })
            }
            color="accent"
            raised
          >
            {children}
          </StyledButton>
        )}
      </EventEmitter>
    )
  }

  return (
    <section>
      <ScoreButton value="CANNON">Cannon</ScoreButton>
      <ScoreButton value="YELLOW">2</ScoreButton>
      <ScoreButton value="GREEN">3</ScoreButton>
      <ScoreButton value="BLUE">5</ScoreButton>
      <ScoreButton value="PINK">6</ScoreButton>
      <ScoreButton value="BLACK">7</ScoreButton>
      <ResetButton value="FOUL">Foul</ResetButton>
      <ResetButton value="POO">Poo</ResetButton>
    </section>
  )
}
