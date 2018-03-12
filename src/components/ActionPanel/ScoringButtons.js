import React, {Fragment} from 'react'
import EmitterButton from './EmitterButton'

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
    <Fragment>
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
    </Fragment>
  )
}
