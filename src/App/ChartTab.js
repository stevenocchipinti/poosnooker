import React from 'react'
import styled from 'styled-components'
import Paper from 'material-ui/Paper'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // Nasty hack to make this fill the parent container :/
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const Box = styled(Paper)`
  padding: 10px;
`

export default () => (
  <Container>
    <Box>Coming soon...</Box>
  </Container>
)
