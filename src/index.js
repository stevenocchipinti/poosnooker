import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Firebase from 'firebase'

import 'typeface-roboto'
import './index.css'

import App from './App'
import Home from './Home'
import registerServiceWorker from './registerServiceWorker'

Firebase.initializeApp({
  apiKey: 'AIzaSyDrrvMbQ1RUbwMVIcr6QntAZ77qk5d-sBQ',
  authDomain: 'poo-snooker.firebaseapp.com',
  databaseURL: 'https://poo-snooker.firebaseio.com',
  projectId: 'poo-snooker',
  storageBucket: 'poo-snooker.appspot.com',
  messagingSenderId: '323021990325',
})

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
