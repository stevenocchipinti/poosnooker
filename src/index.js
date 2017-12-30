import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import 'typeface-roboto'
import './index.css'

import App from './App'
import Home from './Home'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Router>
    <Fragment>
      <Route exact path="/" component={Home} />
      <Route path="/game" component={App} />
    </Fragment>
  </Router>,
  document.getElementById('root'),
)
registerServiceWorker()
