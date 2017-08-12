import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App'
import Login from './Login'
import Register from './Register'
import Home from './Home'

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </Route>
    </Router>
), document.getElementById('app'))


