import React from 'react'
import styled from 'styled-components'
import {SmallPlayerCard} from '../PlayerCard'
import AddPlayerButton from '../AddPlayerButton'

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

export default ({players}) => {
  return (
    <Section>
      {players.map(player => (
        <SmallPlayerCard key={player.name} player={player} />
      ))}
      <AddPlayerButton />
    </Section>
  )
}
