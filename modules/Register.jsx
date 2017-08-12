import React from 'react'

export default React.createClass({
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up!</h3>
        <label>
          Full Name:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <label>
          Email:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <label>
          Password:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <label>
          Password Confirmation:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <label>
          Bio:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <label>
          Birthday:
          <input type="date" ref={(input) => this.input = input} />
        </label>
        <label>
          Upload A Profile Photo:
          <input type="file" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
})