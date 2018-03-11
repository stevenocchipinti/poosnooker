import React from 'react'
import styled from 'styled-components'
import MuiButton from 'material-ui/Button'
import {EventEmitter} from '../fire-event-store'

const Button = styled(MuiButton)`
  padding: 15px;
`

export default ({player, event, children, ...props}) => (
  <EventEmitter stream="game-events">
    {emit => (
      <Button
        onClick={() => emit({player: player.name, ...event})}
        size="small"
        style={{color: 'white'}}
        {...props}
      >
        {children}
      </Button>
    )}
  </EventEmitter>
)
