import React from 'react'
import styled from 'styled-components'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import TabPanel from './TabPanel'
import {PlayerCardItem} from '../PlayerCard'
import AddPlayerDialog from '../AddPlayerDialog'

const AddPlayerButton = styled(Button)`
  position: fixed;
  right: 20px;
  bottom: 76px;
`

const TabPanelContainer = TabPanel.extend`
  padding-bottom: 86px;
`

export default ({players, currentPlayerIndex}) => {
  return (
    <TabPanelContainer>
      {players.map(player => (
        <PlayerCardItem key={player.name} player={player} />
      ))}
      <AddPlayerDialog>
        {showDialog => (
          <AddPlayerButton
            onClick={() => showDialog()}
            variant="fab"
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </AddPlayerButton>
        )}
      </AddPlayerDialog>
    </TabPanelContainer>
  )
}