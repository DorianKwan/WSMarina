import React from 'react'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      bio: '',
      birthday: '',
      photo: ''
  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up!</h3>
        <label>
          Full Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Email:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Password Confirmation:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Bio:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Birthday:
          <input type="date" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Upload A Profile Photo:
          <input type="file" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Register;