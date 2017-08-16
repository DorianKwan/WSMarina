import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <p>ProfilePage</p>
      </div>
    );
  }
}

export default ProfilePage;