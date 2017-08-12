import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Home from './Home.jsx'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Route>
  </Router>
), document.getElementById('app'))


