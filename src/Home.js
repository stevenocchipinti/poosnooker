import React, {Fragment} from 'react'
import Button from 'material-ui/Button'
import {Link} from 'react-router-dom'

export default () => (
  <Fragment>
    <header>
      <h1>Poo Snooker</h1>
      <p>
        <Button component={Link} to="/game" raised color="primary">
          Start new game
        </Button>
        <Button raised color="primary">
          Register a group
        </Button>
      </p>
    </header>
    <section>
      <h2>How To Play</h2>
      <p>You basically just keep resetting your score back to zero</p>
    </section>
  </Fragment>
)
