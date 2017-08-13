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
    const path = `/login/${email}/${password}`
    console.log(path)
    this.context.router.push(path)
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="email" /> {' '}
        <input type="text" placeholder="password" />{' '}
        <button type="submit">Go</button>
      </form>
    );
  }
});


