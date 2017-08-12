import React from 'react'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      bio: '',
      date_of_birth: '',
      image: ''
  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    alert('Your account has been created successfully!');
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up!</h3>
        <label>
          Username:
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        </label>
        <label>
          Email:
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <label>
          Password Confirmation:
          <input type="text" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} />
        </label>
        <label>
          Bio:
          <input type="text" name="bio" value={this.state.bio} onChange={this.handleChange} />
        </label>
        <label>
          Date of Birth:
          <input type="date" name="date_of_birth" value={this.state.date_of_birth} onChange={this.handleChange} />
        </label>
        <label>
          Upload A Profile Picture:
          <input type="file" name="image" value={this.state.image} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Register;