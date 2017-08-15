import React from 'react';
import NavLink from './NavLink.jsx';

export default React.createClass({
  render() {
    return (
      <div>
        <h1>W.S. Marina</h1>
        <h2>...because you need a second yacht</h2>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/register">Register</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});