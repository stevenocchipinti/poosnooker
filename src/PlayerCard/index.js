import React from 'react'
import styled from 'styled-components'
import Card from './Card'
import PlayerHistory from './PlayerHistory'

const PlayerInfoGrid = styled.div`
  display: grid;
  padding: 20px;
  align-items: center;
  font-size: 2em;
  overflow: hidden;
  grid-row-gap: 10px;
  grid-template-areas:
    'name'
    'score'
    'history';
`
const PlayerNameCell = styled.div`
  grid-area: name;
  font-weight: bold;
  font-size: 1.6em;
  justify-self: center;
  overflow: hidden;
`
const PlayerScoreCell = styled.div`
  grid-area: score;
  justify-self: center;
`
const PlayerHistoryCell = styled.div`
  grid-area: history;
  overflow: hidden;
`

const SmallCard = styled(Card)`
  width: 220px;
`
const SmallPlayerInfoGrid = PlayerInfoGrid.extend`
  padding: 20px;
  font-size: 1em;
  grid-row-gap: 10px;
  grid-template-areas:
    'name'
    'score';
`

export const PlayerCard = ({player}) => (
  <Card progress={player.score / player.target}>
    <PlayerInfoGrid>
      <PlayerNameCell>{player.name}</PlayerNameCell>

      <PlayerScoreCell>
        <strong>{player.score}</strong> / {player.target}
      </PlayerScoreCell>

      <PlayerHistoryCell>
        <PlayerHistory history={player.history} />
      </PlayerHistoryCell>
    </PlayerInfoGrid>
  </Card>
)

export const SmallPlayerCard = ({player}) => (
  <SmallCard progress={player.score / player.target}>
    <SmallPlayerInfoGrid>
      <PlayerNameCell>{player.name}</PlayerNameCell>

      <PlayerScoreCell>
        <strong>{player.score}</strong> / {player.target}
      </PlayerScoreCell>
    </SmallPlayerInfoGrid>
  </SmallCard>
)
