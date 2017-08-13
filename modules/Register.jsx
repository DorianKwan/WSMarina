import React from 'react'
import { browserHistory } from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  handleSubmit(event) {
    event.preventDefault()
    const username = event.target.elements[0].value
    const email = event.target.elements[1].value
    const password = event.target.elements[2].value
    const password_confirmation = event.target.elements[3].value
    const date_of_birth = event.target.elements[4].value

    const body = JSON.stringify({
      username: "hi",
      email: "hi",
      password: "hi",
      password_confirmation: "hi",
      date_of_birth: "hi"
    })

    fetch('/register', {
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
        <input type="text" placeholder="name" /> {' '}
        <input type="text" placeholder="email" /> {' '}
        <input type="text" placeholder="password" /> {' '}
        <input type="text" placeholder="password confirmation" /> {' '}
        <input type="text" placeholder="date of birth" /> {' '}
        <button type="submit">Register</button>
      </form>
    );
  }
});
