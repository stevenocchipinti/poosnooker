import React from 'react'
import styled from 'styled-components'
import Paper from 'material-ui/Paper'
import {LinearProgress} from 'material-ui/Progress'

const StyledPaper = styled(Paper)`
  margin: 10px;
  position: relative;
`

const ProgressBar = ({progress}) => (
  <div style={{position: 'absolute', bottom: 0, width: '100%'}}>
    <LinearProgress variant="determinate" value={progress * 100} />
  </div>
)

export const Card = ({progress, children, className, ...props}) => (
  <StyledPaper {...props} className={className}>
    {children}
    <ProgressBar progress={progress} />
  </StyledPaper>
)

export const SmallCard = styled(Card)`
  width: 220px;
`
