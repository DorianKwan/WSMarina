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
      date_of_birth: ''
  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    if (new Date().getFullYear() - this.state.date_of_birth.substring(0, 4) < 21) {
      alert('You are underage!');
      event.preventDefault();
      return;
    }
    if (this.state.password !== this.state.password_confirmation) {
      alert('Your passwords do not match!');
      event.preventDefault();
      return;
    }
    alert('Your account has been created successfully!');
    event.preventDefault();
    console.log(this.state);

    $.ajax({
      url: '/register',
      type: 'POST',
      data: {username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
            bio: this.state.bio,
            date_of_birth: this.state.date_of_birth},
          success: (response) => {
              console.log('it worked', response);
          }
    });
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
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Register;