import React, {Fragment} from 'react'
import styled from 'styled-components'
import Button from 'material-ui/Button'
import PersonAddIcon from 'material-ui-icons/PersonAdd'
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import {EventEmitter} from '../fire-event-store'

const PlaceholderButton = styled(Button)`
  width: 220px;
  height: 100px;
  /* TODO: Find a better alternative to !important and the override in
   * CurrentPlayerPanel. See here for more info:
   * https://material-ui-next.com/customization/css-in-js/#css-injection-order
   */
  background-color: #eee !important;
  color: #888 !important;
  font-size: 3em;
  margin: 10px;
`

export default class AddPlayerButton extends React.Component {
  defaultState = {
    open: false,
    name: '',
    target: 31,
  }
  state = this.defaultState

  handleOpen() {
    this.setState({open: true})
  }
  handleClose() {
    this.setState(this.defaultState)
  }
  handleNameChange(value) {
    this.setState({name: value})
  }
  handleTargetChange(value) {
    this.setState({target: value})
  }

  addPlayerEvent() {
    return {
      type: 'ADD_PLAYER',
      player: this.state.name,
      target: this.state.target,
    }
  }

  render() {
    return (
      <Fragment>
        <PlaceholderButton
          onClick={() => this.handleOpen()}
          aria-label="Add Player"
        >
          <PersonAddIcon />
        </PlaceholderButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add New Player</DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label="Player Name"
              fullWidth
              value={this.state.name}
              onChange={e => this.handleNameChange(e.target.value)}
            />
            <TextField
              required
              type="number"
              margin="dense"
              id="target"
              label="target"
              fullWidth
              value={this.state.target}
              inputProps={{step: '10', min: '31'}}
              onChange={e => this.handleTargetChange(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary">
              Cancel
            </Button>
            <EventEmitter stream="game-events">
              {emit => (
                <Button
                  onClick={() => {
                    emit(this.addPlayerEvent())
                    this.handleClose()
                  }}
                  color="primary"
                >
                  Add Player
                </Button>
              )}
            </EventEmitter>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}
