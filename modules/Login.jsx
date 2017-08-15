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

    fetch('http://localhost:3000/login', {
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
      if (response.status === 200) {
        alert('Logged in successfully!');
      } else if (response.status === 409) {
        alert('Bad credentials!');
      } else if (response.status === 410) {
        alert('Email or password cannot be blank!');
      } else {
        alert('Something went wrong!');
      }
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


