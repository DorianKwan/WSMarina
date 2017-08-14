import React from 'react'
import { browserHistory } from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  handleSubmit(event) {
    event.preventDefault()
    const email = event.target.elements[0].value
    const password = event.target.elements[1].value

    const body = JSON.stringify({
      email: email,
      password: password
    })

    fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': new Buffer(body).length
      },
      body: body
    })
    .then((response) => {
      console.log(response)
    })
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="email" /> {' '}
        <input type="password" placeholder="password" />{' '}
        <button type="submit">Log in</button>
      </form>
    );
  }
});


