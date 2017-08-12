import React from 'react'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      bio: '',
      birthday: '',
      photo: ''
  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    alert('A {event.target.name} was submitted: ' + this.state.name);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up!</h3>
        <label>
          Full Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
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
          Birthday:
          <input type="date" name="birthday" value={this.state.birthday} onChange={this.handleChange} />
        </label>
        <label>
          Upload A Profile Photo:
          <input type="file" name="photo" value={this.state.photo} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Register;