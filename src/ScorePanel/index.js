import React from 'react'
import styled from 'styled-components'
import {EventEmitter} from '../fire-event-store'
import Button from 'material-ui/Button'

const Section = styled.section`
  grid-area: controls;
  display: grid;
  grid-gap: 7px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;

  @media (min-width: 700px) {
    grid-template-columns: 1fr;
  }
`

const RoundButton = styled(Button)`
  border-radius: 50%;
  width: 20vw;
  height: 20vw;

  @media (min-width: 700px) {
    width: auto;
    height: auto;
  }
`

const ScoreButton = ({player, value, children}) => {
  return (
    <EventEmitter stream="game-events">
      {emit => (
        <RoundButton
          onClick={() =>
            emit({type: 'SCORE', player: player.name, reason: value})
          }
          color="primary"
          size="small"
          variant="raised"
        >
          {children}
        </RoundButton>
      )}
    </EventEmitter>
  )
}

const ResetButton = ({player, value, children}) => {
  return (
    <EventEmitter stream="game-events">
      {emit => (
        <RoundButton
          onClick={() =>
            emit({
              type: 'RESET_SCORE',
              player: player.name,
              reason: value,
            })
          }
          color="secondary"
          size="small"
          variant="raised"
        >
          {children}
        </RoundButton>
      )}
    </EventEmitter>
  )
}

export default ({currentPlayer}) => {
  return (
    <Section>
      <ScoreButton player={currentPlayer} value="CANNON">
        Cannon
      </ScoreButton>
      <ScoreButton player={currentPlayer} value="YELLOW">
        2
      </ScoreButton>
      <ScoreButton player={currentPlayer} value="GREEN">
        3
      </ScoreButton>
      <ScoreButton player={currentPlayer} value="BLUE">
        5
      </ScoreButton>
      <ScoreButton player={currentPlayer} value="PINK">
        6
      </ScoreButton>
      <ScoreButton player={currentPlayer} value="BLACK">
        7
      </ScoreButton>
      <ResetButton player={currentPlayer} value="FOUL">
        Foul
      </ResetButton>
      <ResetButton player={currentPlayer} value="POO">
        Poo
      </ResetButton>
    </Section>
  )
}
