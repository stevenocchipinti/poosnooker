import React from 'react'
import styled from 'styled-components'
import {EventEmitter} from '../fire-event-store'
import MuiButton from 'material-ui/Button'

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  background-color: #333;
  padding: 20px;

  @media (min-width: 700px) {
    grid-template-columns: 1fr;
  }
`

const Button = styled(MuiButton)`
  padding: 15px;
`

const EmitterButton = ({player, event, children, ...props}) => (
  <EventEmitter stream="game-events">
    {emit => (
      <Button
        onClick={() => emit({player: player.name, ...event})}
        size="small"
        style={{color: 'white'}}
        {...props}
      >
        {children}
      </Button>
    )}
  </EventEmitter>
)

const ScoreButton = ({player, reason, children, ...props}) => (
  <EmitterButton event={{type: 'SCORE', reason}} player={player} {...props}>
    {children}
  </EmitterButton>
)

const ResetButton = ({player, reason, children, ...props}) => (
  <EmitterButton
    event={{type: 'RESET_SCORE', reason}}
    player={player}
    style={{color: 'red'}}
    {...props}
  >
    {children}
  </EmitterButton>
)

export default ({currentPlayer}) => {
  const hasPoints = currentPlayer && currentPlayer.score > 0
  return (
    <Section>
      <ScoreButton player={currentPlayer} reason="CANNON">
        Cannon
      </ScoreButton>
      <ScoreButton disabled={!hasPoints} player={currentPlayer} reason="YELLOW">
        2
      </ScoreButton>
      <ScoreButton disabled={!hasPoints} player={currentPlayer} reason="GREEN">
        3
      </ScoreButton>
      <ScoreButton disabled={!hasPoints} player={currentPlayer} reason="BLUE">
        5
      </ScoreButton>
      <ScoreButton disabled={!hasPoints} player={currentPlayer} reason="PINK">
        6
      </ScoreButton>
      <ScoreButton disabled={!hasPoints} player={currentPlayer} reason="BLACK">
        7
      </ScoreButton>
      <ResetButton player={currentPlayer} reason="FOUL">
        Foul
      </ResetButton>
      <ResetButton player={currentPlayer} reason="POO">
        Poo
      </ResetButton>
    </Section>
  )
}
