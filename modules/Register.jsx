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
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      date_of_birth: date_of_birth
    })

    if (new Date().getFullYear() - date_of_birth.substring(0, 4) < 21) {
      alert('You are underage!');
      event.preventDefault();
      return;
    }
    if (password !== password_confirmation) {
      alert('Your passwords do not match!');
      event.preventDefault();
      return;
    }

    fetch('http://localhost:3000/register', {
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
      if(response.status === 200) {
        alert('Your account has been created successfully!');
      } else if (response.status === 409) {
        alert('Email already exist!');
      } else if (response.status === 410) {
        alert('Username already exist!');
      } else {
        alert('Email or password cannot be empty!');
      }
    })
  },


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="name" /> {' '}
        <input type="email" placeholder="email" /> {' '}
        <input type="password" placeholder="password" /> {' '}
        <input type="password" placeholder="password confirmation" /> {' '}
        <input type="date" placeholder="date of birth" /> {' '}
        <button type="submit">Register</button>
      </form>
    );
  }
});
