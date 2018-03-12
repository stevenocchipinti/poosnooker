import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Firebase from 'firebase'

import 'typeface-roboto'
import './index.css'

import App from './components/App'
import Home from './components/Home'
import registerServiceWorker from './registerServiceWorker'

import JssProvider from 'react-jss/lib/JssProvider'
import {create} from 'jss'
import {createGenerateClassName, jssPreset} from 'material-ui/styles'

const generateClassName = createGenerateClassName()
const jss = create(jssPreset())
jss.options.insertionPoint = document.getElementById('mui-insertion-point')

Firebase.initializeApp({
  apiKey: 'AIzaSyDrrvMbQ1RUbwMVIcr6QntAZ77qk5d-sBQ',
  authDomain: 'poo-snooker.firebaseapp.com',
  databaseURL: 'https://poo-snooker.firebaseio.com',
  projectId: 'poo-snooker',
  storageBucket: 'poo-snooker.appspot.com',
  messagingSenderId: '323021990325',
})

ReactDOM.render(
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <Router>
      <Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sessions/:sessionId" component={App} />
          {/* TODO: Another route for group games
          <Route path="/groups/:groupId/sessions/:sessionId" component={App} />
          */}
        </Switch>
      </Fragment>
    </Router>
  </JssProvider>,
  document.getElementById('root'),
)
registerServiceWorker()
