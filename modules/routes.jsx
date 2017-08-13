import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Home from './Home.jsx'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Route>
)