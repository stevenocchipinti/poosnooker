import React from 'react'
import styled from 'styled-components'
import Button from 'material-ui/Button'
import PersonAddIcon from 'material-ui-icons/PersonAdd'
import {SmallPlayerCard} from '../PlayerCard'
import AddPlayerDialog from '../AddPlayerDialog'

const Section = styled.section`
  display: none;
  @media (min-width: 700px) {
    justify-self: center;
    align-items: center;
    align-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: scroll;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const PlaceholderButton = styled(Button)`
  width: 220px;
  height: 100px;
  background-color: #eee;
  color: #888;
  font-size: 3em;
  margin: 10px;
`

export default ({players}) => {
  return (
    <Section>
      {players.map(player => (
        <SmallPlayerCard key={player.name} player={player} />
      ))}

      <AddPlayerDialog>
        {showDialog => (
          <PlaceholderButton
            onClick={() => showDialog()}
            aria-label="Add Player"
          >
            <PersonAddIcon />
          </PlaceholderButton>
        )}
      </AddPlayerDialog>
    </Section>
  )
}
