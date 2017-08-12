import React from 'react'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state);
    alert('You have been logged in successfully!');
    event.preventDefault();

    $.ajax({
      url: '/register',
      type: 'POST',
      data: {
            email: this.state.email,
            password: this.state.password,
            },
          success: (response) => {
              console.log('it worked', response);
          }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Login!</h3>
        <label>
          Email:
          <input type="text" name="email" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input type="text" name="password" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Login;
