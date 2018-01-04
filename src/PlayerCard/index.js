import React from 'react'
import styled from 'styled-components'
import ProgressPaper from './ProgressPaper'
import PlayerHistory from './PlayerHistory'

const PlayerInfoGrid = styled.div`
  display: grid;
  padding: 10px;
  align-items: center;
  grid-row-gap: 10px;
`
const PlayerNameCell = styled.div`
  grid-column: 1;
  grid-row: 1;
  font-weight: bold;
  font-size: 1.6em;
`
const PlayerScoreCell = styled.div`
  grid-column: 2;
  grid-row: 1;
  justify-self: end;
`
const PlayerHistoryCell = styled.div`
  grid-column: 1/3;
  grid-row: 2;
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

        <PlayerHistoryCell visible={!!player.history.length}>
          <PlayerHistory history={player.history} />
        </PlayerHistoryCell>
      </PlayerInfoGrid>
    </ProgressPaper>
  )
}
