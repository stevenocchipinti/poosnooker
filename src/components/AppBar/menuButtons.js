import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import IconButton from 'material-ui/IconButton'
import UndoIcon from 'material-ui-icons/Undo'
import ShuffleIcon from 'material-ui-icons/Shuffle'
import ShareIcon from 'material-ui-icons/Share'
import Dialog, {DialogTitle, DialogContent} from 'material-ui/Dialog'
import {EventEmitter} from '../../fire-event-store'
import QRCode from 'qrcode.react'

export const UndoButton = ({player}) => (
  <EventEmitter stream="game-events">
    {emit => (
      <IconButton
        onClick={() => emit({type: 'UNDO', player: player.name})}
        color="inherit"
        disabled={!player || player.history.length === 0}
      >
        <UndoIcon />
      </IconButton>
    )}
  </EventEmitter>
)

export const ShuffleButton = () => (
  <EventEmitter stream="game-events">
    {emit => (
      <IconButton
        onClick={() => emit({type: 'SHUFFLE_PLAYERS', seed: Math.random()})}
        color="inherit"
      >
        <ShuffleIcon />
      </IconButton>
    )}
  </EventEmitter>
)

const Center = styled.div`
  text-align: center;
  margin: 40px 0 10px;
`

export class ShareButton extends Component {
  state = {open: false}

  render() {
    return (
      <Fragment>
        <IconButton onClick={() => this.setState({open: true})} color="inherit">
          <ShareIcon />
        </IconButton>
        <Dialog
          aria-labelledby="Share game"
          aria-describedby="Give this URL or QR code to others to share"
          open={this.state.open}
          onClose={() => this.setState({open: false})}
        >
          <DialogTitle>Share game</DialogTitle>
          <DialogContent>
            <p>
              Scan this code or send <a href={window.location.href}>this URL</a>{' '}
              to your friends
            </p>
            <Center>
              <QRCode size={200} value={window.location.href} />
            </Center>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}
