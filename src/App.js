import React, {Component} from 'react'
import Button from 'material-ui/Button'

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Welcome to React</h1>
        </header>
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
          <Button raised color="primary">
            Hello World
          </Button>
        </p>
      </div>
    )
  }
}

export default App
