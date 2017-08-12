import React from 'react'

export default React.createClass({
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Login!</h3>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <label>
          Password:
          <input type="text" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
})