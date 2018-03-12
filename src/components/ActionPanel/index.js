import React from 'react'
import styled from 'styled-components'
import ScoringButtons from './ScoringButtons'
import WinningButtons from './WinningButtons'

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 4}, 1fr);
  justify-items: center;
  background-color: #333;
  padding: 20px;

  @media (min-width: 700px) {
    grid-template-columns: 1fr;
  }
`

export default ({currentPlayer}) => {
  const {score, target} = currentPlayer || {}
  const targetReached = score && target && score === target

  return (
    <Section columns={targetReached ? 2 : 4}>
      {targetReached ? (
        <WinningButtons currentPlayer={currentPlayer} />
      ) : (
        <ScoringButtons currentPlayer={currentPlayer} />
      )}
    </Section>
  )
}
