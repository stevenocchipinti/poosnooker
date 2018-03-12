import React from 'react'
import TabPanel from './TabPanel'
import styled from 'styled-components'
import Paper from 'material-ui/Paper'

const TabPanelContainer = TabPanel.extend`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Box = styled(Paper)`
  padding: 10px;
`

export default () => (
  <TabPanelContainer>
    <Box>Coming soon...</Box>
  </TabPanelContainer>
)
