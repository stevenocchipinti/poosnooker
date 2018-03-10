import React, {Fragment} from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import {EventEmitter} from '../fire-event-store'

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
    const render = this.props.children

    return (
      <Fragment>
        {render(() => this.handleOpen())}

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
