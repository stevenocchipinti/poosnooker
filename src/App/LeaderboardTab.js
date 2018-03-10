import React from 'react'
import styled from 'styled-components'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import {PlayerCardItem} from '../PlayerCard'
import AddPlayerDialog from '../AddPlayerDialog'

const AddPlayerButton = styled(Button)`
  position: fixed;
  right: 10px;
  bottom: 66px;
`

const Container = styled.div`
  margin-bottom: 76px;
`

export default ({players, currentPlayerIndex}) => {
  return (
    <Container>
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
    </Container>
  )
}
