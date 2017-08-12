import React from 'react'

export default React.createClass({
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up!</h3>
        <label>
          Full Name:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <label>
          Password:
          <input type="text" name="password" />
        </label>
        <label>
          Password Confirmation:
          <input type="text" name="password_confirmation" />
        </label>
        <label>
          Bio:
          <input type="text" name="bio" />
        </label>
        <label>
          Birthday:
          <input type="date" name="birthday" />
        </label>
        <label>
          Upload A Profile Photo:
          <input type="file" name="profile_image" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
})