import React from 'react'
import styled from 'styled-components'
import Paper from 'material-ui/Paper'
import {LinearProgress} from 'material-ui/Progress'

const variantStyle = (variant, property) => {
  const variantStyles = {
    standard: {width: '220px', height: '100px'},
    large: {width: 'auto', height: '175px'},
    horizontal: {width: 'auto', height: 'auto'},
  }
  const key = variantStyles.hasOwnProperty(variant) ? variant : 'standard'
  return variantStyles[key][property]
}

const StyledPaper = styled(Paper)`
  width: ${({variant}) => variantStyle(variant, 'width')};
  height: ${({variant}) => variantStyle(variant, 'height')};
  margin: 10px;
  position: relative;
`

export default ({progress, children, variant, ...props}) => (
  <StyledPaper variant={variant} {...props}>
    {children}
    <div style={{position: 'absolute', bottom: 0, width: '100%'}}>
      <LinearProgress variant="determinate" value={progress * 100} />
    </div>
  </StyledPaper>
)
