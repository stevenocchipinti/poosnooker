import React from 'react'
import styled from 'styled-components'
import ScoringButtons from './ScoringButtons'
import WinningButtons from './WinningButtons'
import {largeBreakpointWidth} from '../../config-constants'

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 4}, 1fr);
  background-color: #333;
  padding: 20px;

  // Copied and slightly modified from material-ui's AppBar
  box-shadow: 0px 0px 6px -1px rgba(0, 0, 0, 0.2),
    0px 0px 9px 0px rgba(0, 0, 0, 0.14), 0px 0px 10px 0px rgba(0, 0, 0, 0.12);

  @media (min-width: ${largeBreakpointWidth}px) {
    grid-area: action-panel;
    grid-template-columns: 1fr;
    grid-column: 2 / 3;
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
