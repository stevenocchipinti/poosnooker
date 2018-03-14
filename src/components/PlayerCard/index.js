import React from 'react'
import styled from 'styled-components'
import ProgressPaper from './ProgressPaper'
import PlayerHistory from './PlayerHistory'

const PlayerInfoGrid = styled.div`
  display: grid;
  font-size: ${({variant}) => (variant === 'large' ? '2em' : '1em')};
  padding: 20px;
  align-items: center;
  overflow: hidden;
  grid-row-gap: 10px;
  justify-content: stretch;
  grid-auto-flow: ${({variant}) =>
    variant === 'horizontal' ? 'column' : 'row'};
`

const PlayerNameCell = styled.div`
  font-weight: bold;
  font-size: 1.6em;
  justify-self: ${({variant}) =>
    variant === 'horizontal' ? 'flex-start' : 'center'};
  overflow: hidden;
`
const PlayerScoreCell = styled.div`
  justify-self: ${({variant}) =>
    variant === 'horizontal' ? 'flex-end' : 'center'};
`
const PlayerHistoryCell = styled.div`
  overflow: hidden;
`

export default ({player, variant, ...props}) => (
  <ProgressPaper
    variant={variant}
    progress={player.score / player.target}
    {...props}
  >
    <PlayerInfoGrid variant={variant}>
      <PlayerNameCell variant={variant}>{player.name}</PlayerNameCell>

      <PlayerScoreCell variant={variant}>
        <strong>{player.score}</strong> / {player.target}
      </PlayerScoreCell>

      {variant === 'large' && (
        <PlayerHistoryCell>
          <PlayerHistory history={player.history} />
        </PlayerHistoryCell>
      )}
    </PlayerInfoGrid>
  </ProgressPaper>
)
