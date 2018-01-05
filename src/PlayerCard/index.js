import React from 'react'
import styled from 'styled-components'
import ProgressPaper from './ProgressPaper'
import PlayerHistory from './PlayerHistory'

const PlayerInfoGrid = styled.div`
  display: grid;
  padding: 10px;
  align-items: center;
  grid-row-gap: 10px;
  grid-template-areas:
    'name     score'
    'history  history';
`
const PlayerNameCell = styled.div`
  grid-area: name;
  font-weight: bold;
  font-size: 1.6em;
`
const PlayerScoreCell = styled.div`
  grid-area: score;
  justify-self: end;
`
const PlayerHistoryCell = styled.div`
  grid-area: history;
  overflow: hidden;
  display: ${props => (props.visible ? 'initial' : 'none')};
`

export default ({player}) => {
  return (
    <ProgressPaper progress={player.score / player.target}>
      <PlayerInfoGrid>
        <PlayerNameCell>{player.name}</PlayerNameCell>

        <PlayerScoreCell>
          <strong>{player.score}</strong> / {player.target}
        </PlayerScoreCell>

        <PlayerHistoryCell>
          <PlayerHistory history={player.history} />
        </PlayerHistoryCell>
      </PlayerInfoGrid>
    </ProgressPaper>
  )
}
