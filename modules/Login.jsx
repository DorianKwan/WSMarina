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
      if (statusCode >= 100 && statusCode < 600)
        res.status(statusCode);
      else
        res.status(500);
      // if(response.status === 200) {
      //   alert('Your account has been created successfully!');
      // } else if (response.status === 409) {
      //   alert('Bad credentials!');
      // } else if (response.status === 420) {
      //   alert('Email or password cannot be empty!');
      // } else {
      //   console.log(response.status);
      //   alert(response.status);
      // }
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


