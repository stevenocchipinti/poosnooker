import React from 'react'
import styled from 'styled-components'
import Paper from 'material-ui/Paper'
import {LinearProgress} from 'material-ui/Progress'

const PlayerPaper = styled(Paper)`
  margin: 10px;
  position: relative;
`

const PlayerInfoGrid = styled.div`
  display: grid;
  padding: 10px;
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
  direction: rtl;
  text-align: left;
`

const ProgressBar = styled(LinearProgress)`
  position: absolute;
  bottom: 0;
`

export default ({player}) => {
  return (
    <PlayerPaper>
      <PlayerInfoGrid>
        <PlayerNameCell>{player.name}</PlayerNameCell>
        <PlayerScoreCell>
          <strong>{player.score}</strong> / {player.target}
        </PlayerScoreCell>
        <PlayerHistoryCell>{JSON.stringify(player.history)}</PlayerHistoryCell>
      </PlayerInfoGrid>

      <ProgressBar
        mode="determinate"
        value={player.score / player.target * 100}
      />
    </PlayerPaper>
  )
}
