import React from 'react'
import styled from 'styled-components'
import Paper from 'material-ui/Paper'
import {LinearProgress} from 'material-ui/Progress'

const StyledPaper = styled(Paper)`
  margin: 10px;
  position: relative;
`
const ProgressBar = styled(LinearProgress)`
  position: absolute;
  bottom: 0;
`

export default ({progress, children}) => (
  <StyledPaper>
    {children}
    <ProgressBar mode="determinate" value={progress * 100} />
  </StyledPaper>
)
